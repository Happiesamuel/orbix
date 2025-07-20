import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";
import Facebook from "next-auth/providers/facebook";
import { getUserViaEmail } from "@/lib/action";
interface User {
  id: string;
  name: string;
  email: string;
}

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Google({
      clientId: process.env.AUTH_GOOGLE_ID!,
      clientSecret: process.env.AUTH_GOOGLE_SECRET!,
    }),
    Facebook({
      clientId: process.env.AUTH_FACEBOOK_ID!,
      clientSecret: process.env.AUTH_FACEBOOK_SECRET!,
    }),
    Credentials({
      credentials: {
        username: { label: "Username" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials): Promise<User | null> => {
        try {
          console.log(credentials);
          return {
            id: "dfsdfsd",
            name: "sffsfs",
            email: "sfsfsf",
          };
        } catch (err) {
          if (err) return null;
        }
        return null;
      },
    }),
  ],

  callbacks: {
    async signIn({ user }) {
      try {
        if (user.email) {
          const existingUser = await getUserViaEmail(user?.email);
          if (!existingUser) {
            return "/login?error=NoAccount";
          }
          return "/";
        }
        return true;
      } catch (error) {
        console.error("Sign-in error:", error);
        return "/login?error=ServerError";
      }
    },
    // async session({ session }) {
    //   console.log(session, "pack");
    //   return session;
    //   //   try {
    //   //     const users = await getUsersByEmail(session.user.email);
    //   //     session.user.userId = users.$id;
    //   //   } catch (error) {
    //   //     console.error("Error fetching user data:", error);
    //   //   }
    //   //   return session;
    // },
  },
  pages: {
    signIn: "/login",
  },
});
