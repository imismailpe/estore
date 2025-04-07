import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";


const protectedRoutes = ["/products"];
export default async function middleware(request) {
  const { pathname } = request.nextUrl;
  console.log("pathname", pathname);

  const isProtected = protectedRoutes.some((item) => pathname.startsWith(item));
  if (!isProtected) {
    return NextResponse.next();
  }
  const token = await getToken({ req: request });
  if (!session) {
    return NextResponse.redirect("/api/auth/signin", request.url);
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/products"],
};
