// app/api/login/route.js
"use server";

import bcrypt from "bcryptjs";
import { createSession } from '../../lib/session';
import { connectToDatabase } from "../../lib/db";

export async function POST(req) {
    try {
        const { email, password } = await req.json();

        const db = await connectToDatabase();
        const user = await db.collection("users").findOne({ email });

        if (!user) {
            return new Response("Invalid email or password", { status: 401 });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return new Response("Invalid email or password", { status: 401 });
        }

        // Create session logic (this might be using cookies or JWT tokens)
        await createSession(user._id, user.role);

        // Return the user details (excluding password)
        const { password: _, _id, ...userDetails } = user;  // Exclude password
        return new Response(JSON.stringify(userDetails), {
            status: 200,
            headers: { "Content-Type": "application/json" },
        });
    } catch (error) {
        return new Response("Something went wrong", { status: 500 });
    }
}
