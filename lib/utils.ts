import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import { ChangeEvent } from "react";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDateVerbose(dateString: string) {

    // Parse the dateString to a Date object
    const date = new Date(dateString);

    // Check if the date parsed correctly
    if (isNaN(date.getTime())) {
        return 'Invalid date';
    }

    // Get the month, day, and year from the Date object
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // months are 0-indexed in JS
    const day = date.getDate().toString().padStart(2, '0');
    const year = date.getFullYear().toString().slice(-2); // get last two digits of year

    // Return the formatted string
    return `${month}/${day}/${year}`;
}

export function getYearStringFromDate(date: Date): string {
   const year = date.getFullYear().toString();
    return year 
}

export function getImageData(event: ChangeEvent<HTMLInputElement>) {


  //FileList is immutable, so we need to create a new one
  const dataTransfer = new DataTransfer();

  // Add newly updaloded images
  Array.from(event.target.files!).forEach((image) => 
      dataTransfer.items.add(image as File)
  );

  const files = dataTransfer.files[0];
  const displayUrl = URL.createObjectURL(event.target.files![0])

  return {files, displayUrl };
};

