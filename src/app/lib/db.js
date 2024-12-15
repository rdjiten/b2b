import { MongoClient } from 'mongodb';

const MONGODB_URI = process.env.MONGODB_URI;
const MONGODB_DB = 'b2b'; // Your MongoDB database name

let cachedDb = null;
const client = new MongoClient(MONGODB_URI);

export const connectToDatabase = async () => {
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