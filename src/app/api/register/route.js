import { MongoClient } from 'mongodb';
import bcrypt from 'bcryptjs';
import { z } from 'zod';

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

const registrationSchema = z.object({
  email: z.string().email({ message: 'Invalid email address' }).trim(),
  password: z.string().min(5, { message: 'Password must be at least 5 characters' }).trim(),
  confirmPassword: z.string().trim(),
  phoneNumber: z.string().min(10, { message: 'Phone number must be at least 10 characters' }).trim(),
  address: z.string().min(5, { message: 'Address must be at least 5 characters' }).trim(),
});

export async function POST(req) {
  const { name, email, password, confirmPassword, phoneNumber, address } = await req.json();

  // Validate the registration data
  const result = registrationSchema.safeParse({ email, password, confirmPassword, phoneNumber, address });
  if (!result.success) {
    return new Response(JSON.stringify({ error: result.error.flatten().fieldErrors }), { status: 400 });
  }

  if (password !== confirmPassword) {
    return new Response(JSON.stringify({ error: 'Passwords do not match' }), { status: 400 });
  }

  try {
    const db = await connectToDatabase();

    // Check if email already exists
    const existingUser = await db.collection('users').findOne({ email });
    if (existingUser) {
      return new Response(JSON.stringify({ error: 'Email is already registered' }), { status: 400 });
    }

    // Hash the password before saving
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert the new user into the database
    const result = await db.collection('users').insertOne({
      name,
      email,
      password: hashedPassword,
      phoneNumber,
      address,
      createdAt: new Date(),
      role: "seller"
    });

    // Return the user details (you can omit password from this)
    const newUser = await db.collection('users').findOne({ _id: result.insertedId });

    return new Response(JSON.stringify({ user: newUser }), { status: 201 });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ error: 'Something went wrong' }), { status: 500 });
  }
}
