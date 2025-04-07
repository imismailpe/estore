import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google"

export const { auth, handlers, signIn, signOut } = NextAuth({
  providers: [GoogleProvider],
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET, // required for getToken()
});