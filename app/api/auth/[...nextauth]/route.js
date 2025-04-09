import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { upsertDocument } from "../../functions";

const handler = NextAuth({
  session: {
    strategy: "jwt",
  },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    async signIn({ profile }){
      if(!profile.email){
        throw new Error("No profile")
      }
      const {
        name,
        email,
        picture
      } = profile;
      const userData = {
        name,
        email,
        picture,
        roleId: profile.email === "mailismailpe@gmail.com" ? "0" : "1"
      }
      // console.log("inside auth", account, profile)
      await upsertDocument("users", userData);
      return true;
    },
    async jwt({token, account}){
      if(account){
        //L758-1
        //add roleid to the token right after signin.
        token.roleId = account.email === "mailismailpe@gmail.com" ? "0" : "1";
      }
      return token;
    },
    async session({session, token}){
      //L758-2
      //send the roleid to the client
      session.roleId = token.roleId;
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET, // required for getToken()
});

export default handler;
