import z from "zod";

export const loginFormSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address" }),
  password: z.string().min(6, {
    message: "Password must be at least 6 characters.",
  }),
});
export const forgottenPasswordFormSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address" }),
});
export const recoverPasswordFormSchema = z
  .object({
    password: z.string().min(6, {
      message: "Password must be at least 6 characters.",
    }),
    confirmPassword: z.string().min(6, {
      message: "Password must be at least 6 characters.",
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"], // Set error on confirmPassword field
  });
export const signupFormSchema = z
  .object({
    username: z.string().min(2, {
      message: "Username must be at least 2 characters.",
    }),
    // country: z.string({
    //   required_error: "Please select a country.",
    // }),
    email: z.string().email({ message: "Please enter a valid email address" }),
    // tel: z
    //   .string()
    //   .min(7, "Phone number is too short")
    //   .max(15, "Phone number is too long")
    //   .regex(
    //     /^\d+$/,
    //     "Phone number must contain digits only (no spaces or symbols)"
    //   ),
    password: z.string().min(6, {
      message: "Password must be at least 6 characters.",
    }),
    confirmPassword: z.string().min(6, {
      message: "Password must be at least 6 characters.",
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"], // Set error on confirmPassword field
  });
