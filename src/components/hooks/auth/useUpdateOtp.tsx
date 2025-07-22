// "use client";

// import { updateOtp } from "@/lib/action";
// import { useMutation } from "@tanstack/react-query";

// export function useUpdateOtp() {
//   const { mutate: update, status } = useMutation({
//     mutationFn: async (obj: {
//       id: string;
//       obj: { expiresAt: string; otp: string };
//     }) => await updateOtp(obj),
//   });

//   return { update, status };
// }
