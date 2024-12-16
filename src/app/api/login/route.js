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

        await createSession(user._id, user.role);

        const { password: _, _id, createdAt, ...userDetails } = user;  
        return new Response(JSON.stringify(userDetails), {
            status: 200,
            headers: { "Content-Type": "application/json" },
        });
    } catch (error) {
        return new Response("Something went wrong", { status: 500 });
    }
}
