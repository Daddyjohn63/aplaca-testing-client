import { NextResponse, NextRequest } from "next/server";
import { createCustomerPortal } from "@/lib/stripe";
import { currentUser } from "@/lib/auth";
import { db } from "@/lib/db";

export async function POST(req: NextRequest) {

  const {returnUrl} = await req.json();

  const user = await currentUser()

  if(!user) {
    return NextResponse.json({error: "Need to be logged in first!"})
  }

  try {

    const dbUserData = await db.user.findUnique({
      where: {
        id: user.id,
      },
      select: {
        id: true,
        stripeCustomerId: true,
      }
    });

    if(!dbUserData) {
      return NextResponse.json({error: "No user in database!"})
    }

    if (!dbUserData.stripeCustomerId) {
      return NextResponse.json( { error: "You don't have a billing account yet. Make a purchase first.", },);
    }

    const stripeCustomerId = dbUserData.stripeCustomerId
    const stripePortalUrl = await createCustomerPortal(stripeCustomerId, returnUrl);

    return NextResponse.json({ url: stripePortalUrl });

  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "Something went wrong!" });
  }
}
