"use client";

import { createUser } from "@/lib/action";
import { useMutation } from "@tanstack/react-query";

export function useCreateUser() {
  const { mutate: create, status } = useMutation({
    mutationFn: async (obj: {
      email: string;
      password: string;
      name: string;
    }) => await createUser(obj),
  });

  return { create, status };
}

// "use client";

// // import { createUser } from "@/lib/action";
// import { useMutation } from "@tanstack/react-query";
// import { Account, Client, ID } from "appwrite";

// export function useCreateUser() {
//   const client = new Client()
//     .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT!)
//     .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT!);

//   const account = new Account(client);

//   async function createUser({
//     email,
//     password,
//     name,
//   }: {
//     email: string;
//     password: string;
//     name: string;
//   }) {
//     try {
//       // 1. Create user account
//       await account.create(ID.unique(), email, password, name);

//       // 2. Create a session for the new user
//       await account.createEmailPasswordSession(email, password);

//       // 3. Send email verification link
//       await account.createVerification("http://localhost:3000/otp");

//       console.log("Signup successful, verification email sent.");
//     } catch (error) {
//       console.error("Signup or verification error:", error);
//     }
//   }

//   const { mutate: create, status } = useMutation({
//     mutationFn: async (obj: {
//       email: string;
//       password: string;
//       name: string;
//     }) => await createUser(obj),
//   });

//   return { create, status };
// }
