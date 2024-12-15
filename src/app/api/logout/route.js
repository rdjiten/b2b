// app/api/logout/route.js
"use server";

import { deleteSession } from '../../lib/session';
import { redirect } from 'next/navigation';

export async function POST() {
    try {
      // Destroy the session
      await deleteSession();
  
      // Return a success response
      return new Response(
        JSON.stringify({ message: "Logged out successfully" }),
        {
          status: 200,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
    } catch (error) {
      console.error("Error logging out:", error);
      return new Response(
        JSON.stringify({ error: "Failed to log out" }),
        {
          status: 500,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
    }
  }
  