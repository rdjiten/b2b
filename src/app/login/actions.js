"use server";

import { z } from "zod";
import { createSession, deleteSession } from "../lib/session";
import { redirect } from "next/navigation";

const testUser = {
    id: "1",
    email: "admin@admin.com",
    password: "admin",
};

const loginSchema = z.object({
    email: z.string().email({ message: "Invalid email address" }).trim(),
    password: z
        .string()
        .min(8, { message: "Password must be at least 8 characters" })
        .trim(),
});

export async function login(prevState, formData) {
    console.log("loggin")
    
    const result = loginSchema.safeParse(Object.fromEntries(formData));

    if (!result.success) {
        return {
            errors: result.error.flatten().fieldErrors,
        };
    }

    const { email, password } = result.data;
    console.log(email, password)

    if (email !== testUser.email || password !== testUser.password) {
        return {
            errors: {
                email: ["Invalid email or password"],
            },
        };
    }

    await createSession(testUser.id);
    debugger

    redirect("/dashboard");

}


export async function logout() {
    await deleteSession();
    redirect("/login");
  }
  