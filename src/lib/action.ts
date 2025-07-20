"use server";

import axios from "axios";
import { signIn } from "./auth";
import { ID, Query } from "node-appwrite";
import { createAdminClient } from "./appwrite";
import { Resend } from "resend";
import { generateOTP } from "./utils";

export async function loginWithCredentials({
  email,
  password,
}: {
  email: string;
  password: string;
}) {
  await signIn("credentials", { email, password });
}
export async function signInWithGoogleAction() {
  await signIn("google");
  // await signIn("google", { redirectTo: "/" });
}
export async function signInWithFacebookAction() {
  await signIn("facebook");
  // await signIn("facebook", { redirectTo: "/" });
}

// src/lib/server/userActions.ts

export async function getUserViaEmail(email: string) {
  try {
    const { users } = await createAdminClient();
    const response = await users.list();
    const user = response.users.find((u) => u.email === email);
    return user;
  } catch (error) {
    throw error;
  }
}

// export async function getAllUsers() {
//   try {
//     const users = createAdminClient();
//     const response = await users.list(); // optional: users.list({ search: "", limit: 100, offset: 0 })

//     return response.users; // returns array of users
//   } catch (error) {
//     console.error("Failed to fetch users:", error);
//     throw error;
//   }
// }
// export async function getLoggedInUser() {
//   try {
//     const { account } = await createSessionClient();
//     return await account.get();
//   } catch (error) {
//     return null;
//   }
// }

// action.ts

export async function createUser({
  email,
  password,
  name,
}: {
  email: string;
  password: string;
  name: string;
}) {
  try {
    const { account } = await createAdminClient();
    const user = await account.create(ID.unique(), email, password, name);
    const guests = await addGuest({ email: user.email, id: user.$id });
    const resend = new Resend(process.env.RESEND_API_KEY);
    const otp = generateOTP();
    await addOTPTodoc(guests.$id, otp);
    await resend.emails.send({
      from: "Orbix Team <onboarding@resend.dev>",
      to: user.email,
      subject: "Verify your account",
      html: `<p>Your OTP code is: <strong>${otp}</strong></p><p>Expires in 5 minutes</p>`,
    });
    return user;
  } catch (err) {
    throw new Error(err instanceof Error ? err.message : "Unknown error");
  }
}
export async function generateNewOtp({
  id,
  email,
}: {
  email: string;
  id: string;
}) {
  try {
    const resend = new Resend(process.env.RESEND_API_KEY);
    const otp = generateOTP();
    await addOTPTodoc(id, otp);
    await resend.emails.send({
      from: "Orbix Team <onboarding@resend.dev>",
      to: email,
      subject: "Verify your account",
      html: `<p>Your OTP code is: <strong>${otp}</strong></p><p>Expires in 5 minutes</p>`,
    });
  } catch (err) {
    throw new Error(err instanceof Error ? err.message : "Unknown error");
  }
}

export async function getGuestViaUserId(userId: string) {
  const { database } = await createAdminClient();
  const result = await database.listDocuments(
    process.env.APPWRITE_DATABASE_ID!,
    process.env.APPWRITE_GUESTS_ID!,
    [Query.equal("userId", userId)]
  );

  return result.documents[0];
}

export async function addGuest({ email, id }: { email: string; id: string }) {
  const { database } = await createAdminClient();
  const response = await database.createDocument(
    process.env.APPWRITE_DATABASE_ID!,
    process.env.APPWRITE_GUESTS_ID!,
    ID.unique(),
    {
      email: email,
      image: "",
      userId: id,
    }
  );
  return response;
}
export async function addOTPTodoc(id: string, otp: string) {
  const { database } = await createAdminClient();
  const response = await database.createDocument(
    process.env.APPWRITE_DATABASE_ID!,
    process.env.APPWRITE_OTP_ID!,
    ID.unique(),
    {
      otp: otp,
      guests: id,
      expiresAt: new Date(Date.now() + 5 * 60 * 1000).toISOString(),
    }
  );
  return response;
}

export async function getOtp() {
  try {
    const { database } = await createAdminClient();
    const response = await database.listDocuments(
      process.env.APPWRITE_DATABASE_ID!,
      process.env.APPWRITE_OTP_ID!
    );
    return response.documents;
  } catch (err) {
    throw new Error(err instanceof Error ? err.message : "Unknown error");
  }
}
export async function loginUser({
  email,
  password,
}: {
  email: string;
  password: string;
}) {
  try {
    const { account } = await createAdminClient();
    const session = await account.createEmailPasswordSession(email, password);
    console.log(session);
    return session;
  } catch (err) {
    throw new Error(err instanceof Error ? err.message : "Unknown error");
  }
}

// await databases.createDocument(
//   "your-database-id",
//   "user_otp",
//   ID.unique(),
//   {
//     userId: user.$id,
//     otp,
//     expiresAt: new Date(Date.now() + 5 * 60 * 1000).toISOString(), // expires in 5 mins
//   }
// );

// async function signUpWithEmail(formData) {
//   "use server";

//   const email = formData.get("email");
//   const password = formData.get("password");
//   const name = formData.get("name");

//   const { account } = await createAdminClient();

//   await account.create(ID.unique(), email, password, name);
//   const session = await account.createEmailPasswordSession(email, password);

//   cookies().set("my-custom-session", session.secret, {
//     path: "/",
//     httpOnly: true,
//     sameSite: "strict",
//     secure: true,
//   });

//   redirect("/account");
// }

// async function signOut() {
//   "use server";

//   const { account } = await createSessionClient();

//   cookies().delete("my-custom-session");
//   await account.deleteSession("current");

//   redirect("/signup");
// }

export async function getProdoucts() {
  try {
    const response = await axios.get(`${process.env.API_URL}?limit=200`);
    return response.data;
  } catch (err) {
    throw new Error(err instanceof Error ? err.message : "Unknown error");
  }
}
export async function getProdouct(id: number | null) {
  try {
    const response = await axios.get(`${process.env.API_URL}/${id}`);
    return response.data;
  } catch (err) {
    throw new Error(err instanceof Error ? err.message : "Unknown error");
  }
}
export async function getProductCategory(category: string) {
  try {
    const response = await axios.get(
      `${process.env.API_URL}/category/${category}`
    );
    return response.data;
  } catch (err) {
    throw new Error(err instanceof Error ? err.message : "Unknown error");
  }
}
export async function searchProduct(query: string) {
  try {
    const response = await axios.get(
      `${process.env.API_URL}/search?q=${query}`
    );
    return response.data;
  } catch (err) {
    throw new Error(err instanceof Error ? err.message : "Unknown error");
  }
}
export async function getCategory() {
  try {
    const response = await axios.get(`${process.env.API_URL}/categories`);
    return response.data;
  } catch (err) {
    throw new Error(err instanceof Error ? err.message : "Unknown error");
  }
}
