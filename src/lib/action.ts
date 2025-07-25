"use server";

import axios from "axios";
import { signIn, signOut } from "./auth";
import { ID, Query } from "node-appwrite";
import { createAdminClient, createSessionClient } from "./appwrite";

export async function loginWithCredentials({
  email,
  password,
}: {
  email: string;
  password: string;
}) {
  const result = await signIn("credentials", {
    redirect: false,
    email,
    password,
    callbackUrl: "/",
  });

  if (result?.error) {
    throw new Error(result.error);
  }

  if (result?.ok) {
    return { success: true };
  }

  return { success: false };
}

export async function signOutAction() {
  await signOut({ redirectTo: "/login" });
}

// export async function signInWithGoogleAction() {
//   await signIn("google", { redirectTo: "/" });
// }
export async function loginInWithGoogleAction() {
  await signIn("google", { callbackUrl: "/?from=login", redirectTo: "/" });
}
export async function loginInWithFacebookAction() {
  await signIn("facebook", { callbackUrl: "/?from=login", redirectTo: "/" });
}
export async function signUpWithGoogleAction() {
  await signIn("google", {   callbackUrl: "https://oorbix.vercel.app/api/auth/callback/google?from=sign-up" });
}
export async function signUpWithFacebookAction() {
  await signIn("facebook", {   callbackUrl: "https://oorbix.vercel.app/api/auth/callback/google?from=sign-up" });
}

export async function getUserViaEmail(email: string) {
  const { users } = await createAdminClient();

  const result = await users.list([Query.equal("email", email)]);

  if (result.total === 0) return null;

  return result.users[0];
}

export async function getLoggedInUser(email: string, password: string) {
  try {
    const { account } = await createSessionClient();
    return await account.createEmailPasswordSession(email, password);
  } catch (error) {
    throw error;
  }
}

export async function getAllUsers() {
  try {
    const { users } = await createAdminClient();
    const response = await users.list(); // optional: users.list({ search: "", limit: 100, offset: 0 })

    return response.users; // returns array of users
  } catch (error) {
    console.error("Failed to fetch users:", error);
    throw error;
  }
}

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
    await addGuest({
      email: user.email,
      id: user.$id,
      name: user.name,
      password: password,
    });

    return user;
  } catch (err) {
    throw new Error(err instanceof Error ? err.message : "Unknown error");
  }
}

export async function createUserWithoutPassword({
  email,
  name,
}: {
  email: string;
  name: string;
}) {
  try {
    const { users } = await createAdminClient();

    const user = await users.create(
      ID.unique(),
      email,
      undefined,
      undefined,
      name
    );

    await addGuest({
      email: user.email,
      id: user.$id,
      name: user.name,
      password: "noPassword",
    });

    return user;
  } catch (err) {
    throw new Error(err instanceof Error ? err.message : "Unknown error");
  }
}

// export async function updateOtp({
//   id,
//   obj,
// }: {
//   id: string;
//   obj: { expiresAt: string; otp: string };
// }) {
//   const { database } = await createAdminClient();
//   const docs = await database.listDocuments(
//     process.env.APPWRITE_DATABASE_ID!,
//     process.env.APPWRITE_OTP_ID!,
//     [Query.equal("guests", id)]
//   );
//   const guest = docs.documents[0];
//   if (docs.total === 0) {
//     throw new Error("No OTP document found for this guest");
//   }

//   const documentId = guest.$id;

//   const email = guest.guests.email; // adjust this if path is different

//   // sgMail
//   //   .send(message)
//   //   .then(() => console.log("sent...."))
//   //   .catch((err) => console.log(err.message));
//   // await resend.emails.send({
//   //   from: "Orbix Team <onboarding@resend.dev>",
//   //   to: guest.guests.email,
//   // subject: "Verify your account",
//   // html: `<p>Your OTP code is: <strong>${obj.otp}</strong></p><p>Expires in 5 minutes</p>`,
//   // });
//   const updated = await database.updateDocument(
//     process.env.APPWRITE_DATABASE_ID!,
//     process.env.APPWRITE_OTP_ID!,
//     documentId,
//     obj
//   );

//   return updated;
// }

// export async function generateNewOtp({
//   id,
//   email,
// }: {
//   email: string;
//   id: string;
// }) {
//   try {
//     const resend = new Resend(process.env.RESEND_API_KEY);
//     const otp = generateOTP();
//     await addOTPTodoc(id, otp);
//     await resend.emails.send({
//       from: "Orbix Team <onboarding@resend.dev>",
//       to: email,
//       subject: "Verify your account",
//       html: `<p>Your OTP code is: <strong>${otp}</strong></p><p>Expires in 5 minutes</p>`,
//     });
//   } catch (err) {
//     throw new Error(err instanceof Error ? err.message : "Unknown error");
//   }
// }

export async function getGuestViaUserId(userId: string) {
  const { database } = await createAdminClient();
  const result = await database.listDocuments(
    process.env.APPWRITE_DATABASE_ID!,
    process.env.APPWRITE_GUESTS_ID!,
    [Query.equal("userId", userId)]
  );

  return result.documents[0];
}
export async function getGuestViaEmail(email: string) {
  const { database } = await createAdminClient();
  const result = await database.listDocuments(
    process.env.APPWRITE_DATABASE_ID!,
    process.env.APPWRITE_GUESTS_ID!,
    [Query.equal("email", email)]
  );

  return result.documents[0];
}

export async function updateGuest({
  id,
  obj,
}: {
  id: string;
  obj: {
    isVerified?: boolean;
    password?: string;
    email?: string;
    name?: string;
    image?: string;
    userId?: string;
  };
}) {
  const { database } = await createAdminClient();
  const updatedDoc = await database.updateDocument(
    process.env.APPWRITE_DATABASE_ID!,
    process.env.APPWRITE_GUESTS_ID!,
    id,
    obj
  );

  return updatedDoc;
}

export async function addGuest({
  email,
  id,
  password,
  name,
}: {
  email: string;
  id: string;
  password: string;
  name: string;
}) {
  const { database } = await createAdminClient();
  const response = await database.createDocument(
    process.env.APPWRITE_DATABASE_ID!,
    process.env.APPWRITE_GUESTS_ID!,
    ID.unique(),
    {
      email: email,
      password: password,
      isVerified: false,
      image: "",
      userId: id,
      name: name,
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
