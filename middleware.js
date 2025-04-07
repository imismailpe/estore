import { NextResponse } from "next/server";
import { auth } from "./pages/api/auth/[...nextauth]";

const protectedRoutes = [
  "/products"
];
export default async function middleware(request){
  const { pathname } = request.nextUrl;
  console.log("pathname", pathname)
  const isProtected = protectedRoutes.some(item => pathname.startsWith(item));
  if(!isProtected){
    return NextResponse.next();
  }
  const session = await auth();
  if(!session){
    return NextResponse.redirect("/api/auth/signin", request.url);
  }
  return NextResponse.next();
}

export const config = {
  matcher: ['/api/:path*'],
};