import { MongoClient, ObjectId } from 'mongodb';
import { cookies } from 'next/headers';
import { z } from 'zod';
import { decrypt } from '../../lib/session';

const MONGODB_URI = process.env.MONGODB_URI;
const MONGODB_DB = 'b2b';

let cachedDb = null;
const client = new MongoClient(MONGODB_URI);

const connectToDatabase = async () => {
    if (cachedDb) {
        return cachedDb;
    }
    try {
        const db = await client.connect();
        cachedDb = db.db(MONGODB_DB);
        return cachedDb;
    } catch (error) {
        throw new Error('Failed to connect to MongoDB');
    }
};

const userEditSchema = z.object({
    phoneNumber: z.string().min(10, { message: 'Phone number must be at least 10 characters' }).optional(),
    address: z.string().min(5, { message: 'Address must be at least 5 characters' }).optional(),
    name: z.string().min(1, { message: 'Name is required' }).optional(),
});

export async function PATCH(req) {
    const cookiesStore = await cookies();
    const cookie = cookiesStore.get("session")?.value;
    const session = await decrypt(cookie);
    const userId = session.userId;
    const { email, name, phoneNumber, address } = await req.json();

    // Validate the data
    const result = userEditSchema.safeParse({ name, phoneNumber, address });
    if (!result.success) {
        return new Response(JSON.stringify({ error: result.error.flatten().fieldErrors }), { status: 400 });
    }

    try {
        const db = await connectToDatabase();

        // Find the user by ID
        const user = await db.collection('users').findOne({ _id: new ObjectId(userId) });

        if (!user) {
            return new Response(JSON.stringify({ error: 'User not found' }), { status: 404 });
        }

        const updatedData = {};
        if (name) updatedData.name = name;
        if (phoneNumber) updatedData.phoneNumber = phoneNumber;
        if (address) updatedData.address = address;
        if (email) updatedData.email = email;

        const result = await db.collection('users').updateOne(
            { _id: new ObjectId(userId) },
            { $set: updatedData }
        );

        if (result.matchedCount === 0) {
            return new Response(JSON.stringify({ error: 'Failed to update user' }), { status: 400 });
        }

        const updatedUser = await db.collection('users').findOne({ _id: new ObjectId(userId) });
        const { password: _, _id, createdAt, ...userDetails } = updatedUser;
        return new Response(
            JSON.stringify({
                message: 'User updated successfully',
                user: userDetails
            }),
            { status: 200 }
        );
    } catch (error) {
        console.error(error);
        return new Response(JSON.stringify({ error: 'Something went wrong' }), { status: 500 });
    }
}
