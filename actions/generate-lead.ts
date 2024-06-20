'use server'

import * as z from 'zod';
import { LeadGenSchema } from "@/schemas";
import { db } from '@/lib/db';

export async function generateLead (values: z.infer<typeof LeadGenSchema>) {

  const validateFields = LeadGenSchema.safeParse(values)

  if(!validateFields.success){
    return {error: "Invalid fields"};
  }

  const {name, email, phone} = validateFields.data

  try {

    await db.lead.create({
      data: {
        name: name,
        email: email,
        phone: phone,
      }
    })

    return {success: "Thank you for subscribing!"}
  }catch(e) {
    return {error: "Something went wrong, try again later!"}
  }

}
