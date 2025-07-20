import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { formatDistanceToNow, parseISO } from "date-fns";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const formatRelativeDate = (dateString: string): string => {
  const date = parseISO(dateString);
  const relativeDate = formatDistanceToNow(date, { addSuffix: true });
  return relativeDate.charAt(0).toUpperCase() + relativeDate.slice(1);
};

export function generateRandomPhoneNumber() {
  const countryCodes = [
    "+1", // USA/Canada
    "+44", // UK
    "+234", // Nigeria
    "+91", // India
    "+81", // Japan
    "+61", // Australia
    "+49", // Germany
    "+33", // France
    "+39", // Italy
    "+55", // Brazil
  ];

  const code = countryCodes[Math.floor(Math.random() * countryCodes.length)];
  const numberLength = 8 + Math.floor(Math.random() * 3); // 8 to 10 digits
  let number = "";

  for (let i = 0; i < numberLength; i++) {
    number += Math.floor(Math.random() * 10);
  }

  return code + number;
}

// utils/otp.ts
export function generateOTP(): string {
  return Math.floor(100000 + Math.random() * 900000).toString(); // 6-digit
}
