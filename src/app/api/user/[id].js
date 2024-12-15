// pages/api/user/[id].js

import { MongoClient } from 'mongodb';

const MONGODB_URI = process.env.MONGODB_URI;
const MONGODB_DB = 'b2b'; // Your database name

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

export default async function handler(req, res) {
    const { id } = req.query; // Get the dynamic ID from the URL

    if (req.method === 'GET') {
        try {
            const db = await connectToDatabase();

            // Fetch user from the database by ID
            const user = await db.collection('users').findOne({ _id: new MongoClient.ObjectId(id) });

            if (!user) {
                return res.status(404).json({ error: 'User not found' });
            }

            // Remove password from the user data for security
            const { password, ...userWithoutPassword } = user;

            // Return the user data
            return res.status(200).json(userWithoutPassword);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: 'Failed to fetch user details' });
        }
    } else {
        // Handle any non-GET requests
        res.status(405).json({ error: 'Method Not Allowed' });
    }
}
