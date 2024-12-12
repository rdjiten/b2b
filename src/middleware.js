import { cookies } from "next/headers";
import { decrypt } from "./app/lib/session";
import { NextResponse } from "next/server";

const protectedRoutes = ["/dashboard"];
const publicRoutes = ["/login"];
export default async function middleware(req) {
    const path = req.nextUrl.pathname;
    const isProtectedRoute = protectedRoutes.includes(path);
    const isPublicRoute = publicRoutes.includes(path);
    
    const cookiesStore = await cookies();
    const cookie = cookiesStore.get("session")?.value;
    const session = await decrypt(cookie);
    console.log(session, 'ss2')
    if (isProtectedRoute && !session?.userId) {
        return NextResponse.redirect(new URL("/login", req.nextUrl));
    }

    if (isPublicRoute && session?.userId) {
        return NextResponse.redirect(new URL("/dashboard", req.nextUrl));
    }

    return NextResponse.next();

}