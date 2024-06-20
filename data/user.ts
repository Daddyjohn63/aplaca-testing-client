import { db } from "@/lib/db";
import Stripe from "stripe";

export const getUserByEmail = async (email: string) => {
  try {
    const user = await db.user.findUnique({
      where: {
        email,
      },
    });

    return user;
  } catch {
    return null;
  }
};

export const getUserById = async (id: string) => {
  try {
    const user = await db.user.findUnique({
      where: {
        id,
      },
    });

    return user;
  } catch {
    return null;
  }
};

export const getUserStripeCustomerId = async (id: string) => {

  try {

    const data = await db.user.findFirst({
      where: {
        id: id,
      },
      select: {
        stripeCustomerId: true,
      }
    })

    if(!data || data.stripeCustomerId === '') {
      return null
    }

    const stripeCustomerId = data.stripeCustomerId
    return stripeCustomerId

  } catch(e) {
    console.error(e)
    return null
  }

}

export const findUserByStripeCustomerId = async (id: string | Stripe.Customer | Stripe.DeletedCustomer) => {

  if(!id) {
    return null
  }

  try {

    const data = await db.user.findFirst({
      where: {
        stripeCustomerId: id as string,
      },
    })

    return data

  } catch(e) {
    console.error(e)
    return null
  }

}
