"use server";

import * as z from "zod";
import { RegisterSchema } from "@/schemas";
import bcrypt from "bcryptjs";
import { db } from "@/lib/db";
import { getUserByEmail } from "@/data/user";
import { sendVerificationEmail } from "@/lib/mail";
import { generateVerificationToken } from "@/lib/tokens";

export const register = async (values: z.infer<typeof RegisterSchema>) => {
  const validatedFields = RegisterSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid fields" };
  }

  const { email, password, name } = validatedFields.data;

  try {

    const hashedPassword = await bcrypt.hash(password, 10);

    //Confirm email is not taken.
    const existingUser = await getUserByEmail(email);

    if (existingUser) {
      return { error: "Email already in use!" };
    }

    const user = await db.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      }, select: {
        id: true,
        name: true,
        email: true,
      }
    });

    if(!user) {
      throw Error()
    }

    const userData = {
      id: user.id,
      name: user.name || '',
      email: user.email || ''
    }

    // Send registratio token for user to confirm registration. 
    const verificationToken = await generateVerificationToken(email);
    await sendVerificationEmail(verificationToken.email, verificationToken.token);

    return { success: "Confirmation email sent!", userData };
  }
  catch(e) {
    console.error(e)
    return {error: "Could not register. Try again later."}
  }
};
