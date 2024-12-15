
"use server";
// app/api/login/route.js

import { MongoClient } from 'mongodb';
import bcrypt from 'bcryptjs';
import { createSession } from '../lib/session'; // Your session handling logic
import { redirect } from 'next/navigation';

const MONGODB_URI = process.env.MONGODB_URI;
const MONGODB_DB = 'b2b'; // Your MongoDB database name

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

// Login schema
import { z } from 'zod';

const loginSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }).trim(),
  password: z
    .string()
    .min(5, { message: "Password must be at least 5 characters" })
    .trim(),
});

export async function login(prevState, formData) {
  const result = loginSchema.safeParse(Object.fromEntries(formData));

  if (!result.success) {
    return {
      errors: result.error.flatten().fieldErrors,
    };
  }

  const { email, password } = result.data;

  try {
    const db = await connectToDatabase();

    // Find the user by email
    const user = await db.collection('users').findOne({ email });
    if (!user) {
      return {
        errors: { email: ['Invalid email or password'] },
      };
    }

    // Compare passwords
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return {
        errors: { email: ['Invalid email or password'] },
      };
    }

    // Create session for the user
    await createSession(user._id);

    // Redirect to dashboard after login
    redirect('/dashboard');
  } catch (error) {
    console.error(error);
    return {
      errors: { email: ['Something went wrong during login'] },
    };
  }
}
