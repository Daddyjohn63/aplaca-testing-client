'use server'
import { sendContactUsEmail } from "@/lib/mail"

import * as z from 'zod';
import { ContactUsSchema } from "@/schemas";

export async function contactUs (values: z.infer<typeof ContactUsSchema>) {

  const validateFields = ContactUsSchema.safeParse(values)

  if(!validateFields.success){
    return {error: "Invalid fields"};
  }

  const {name, email, message} = validateFields.data

  try {
    sendContactUsEmail(name, email, message)
    return {success: "Email has been sent!"}
  }catch(e) {
    return {error: "Email could not be sent, try again later."}
  }

}
