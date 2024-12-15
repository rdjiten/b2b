import { cookies } from "next/headers";
import { decrypt } from "./app/lib/session";
import { NextResponse } from "next/server";

const adminRoutes = ["/add-admin", '/sellers'];
const protectedRoutes = ["/", "/product/*", ...adminRoutes];
const publicRoutes = ["/login", "/signup"];

export default async function middleware(req) {
    const path = req.nextUrl.pathname;
    const isProtectedRoute = protectedRoutes.includes(path);
    const isPublicRoute = publicRoutes.includes(path);
    const isAdminRoute = adminRoutes.includes(path);

    const cookiesStore = await cookies();
    const cookie = cookiesStore.get("session")?.value;
    const session = await decrypt(cookie);

    if (isProtectedRoute && !session?.userId) {
        return NextResponse.redirect(new URL("/login", req.nextUrl));
    }

    if (isAdminRoute && session?.role !== "admin") {
        return NextResponse.redirect(new URL("/", req.nextUrl)); // Redirect non-admins
    }

    if (isPublicRoute && session?.userId) {
        return NextResponse.redirect(new URL("/", req.nextUrl));
    }

    return NextResponse.next();
}
