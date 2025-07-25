import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";
import Facebook from "next-auth/providers/facebook";
import {
  createUserWithoutPassword,
  getGuestViaEmail,
  getUserViaEmail,
  updateGuest,
} from "@/lib/action";

interface User {
  id: string;
  name: string;
  email: string;
}

export const { handlers, signIn, signOut, auth } = NextAuth((req) => {
  let callUrl: string | null | undefined = null;
  if (req) {
    const cookieStore = req?.cookies;
    const callbackUrlCookie = cookieStore?.get("authjs.callback-url");
    callUrl = callbackUrlCookie?.value;
  }

  const value = callUrl?.split("/").at(3)?.split("?").at(0) || 'login';
  console.log(callUrl, "call");

  return {
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
          email: {
            label: "Email",
            type: "text",
            placeholder: "Enter your email",
          },
          password: {
            label: "Password",
            type: "password",
            placeholder: "Enter your password",
          },
        },
        authorize: async (credentials): Promise<User | null> => {
          try {
            if (typeof credentials.email === "string") {
              const existingUser = await getUserViaEmail(credentials.email);
              if (!existingUser) {
                throw new Error("User not found.");
              }
              return {
                id: existingUser["$id"],
                name: existingUser.name,
                email: existingUser.email,
              };
            } else {
              return null;
            }
          } catch (error) {
            console.log(error);
            return null;
          }
        },
      }),
    ],

    callbacks: {
      async signIn({ user }) {
        console.log(value, "value");
        if (value === "sign-up") {
          try {
            if (user.email) {
              const existingUser = await getGuestViaEmail(user.email);
              if (!existingUser) {
                await createUserWithoutPassword({
                  email: user.email,
                  name: user.name || "Default",
                });
                const guest = await getGuestViaEmail(user.email);
                await updateGuest({
                  id: guest.$id,
                  obj: { image: user.image || "" },
                });

                return `/sign-up?success=true&userId=${guest.userId}`;
              } else {
                return "/login";
              }
            }
            return false;
          } catch (error) {
            console.error("Sign-in error:", error);
            return "/sign-up?success=ServerError";
          }
        } else {
          try {
            if (user.email) {
              const existingUser = await getGuestViaEmail(user.email);
              if (!existingUser) {
                return "/login?error=NoAccount";
              } else {
                return true;
              }
            }
            return false;
          } catch (error) {
            console.error("Sign-in error:", error);
            return "/login?error=ServerError";
          }
        }
      },
      async session({ session }) {
        try {
          const users = await getGuestViaEmail(session.user.email);
          return {
            ...session,
            user: { ...session.user, userId: users.userId },
          };
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
        return session;
      },
    },
    pages: {
      signIn: "/login",
    },
  };
});
