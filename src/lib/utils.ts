import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { formatDistanceToNow, parseISO } from 'date-fns';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


   export const formatRelativeDate = (dateString: string): string => {
     const date = parseISO(dateString);
     const relativeDate = formatDistanceToNow(date, { addSuffix: true });
     return relativeDate.charAt(0).toUpperCase() + relativeDate.slice(1);
   };