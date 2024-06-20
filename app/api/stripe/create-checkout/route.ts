import { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { stripe, createStripeCustomer } from "@/lib/stripe";
import { getUserStripeCustomerId } from "@/data/user";

export async function POST(req: NextRequest) {

  const body = await req.json();
  const {userId, userName, userEmail, priceId, mode, successUrl, cancelUrl} = body;

  if(!userId){
    console.error("Not Authorized")
    return NextResponse.json({error: "Not Authorized!"})
  }
  if(!priceId){

    console.error("Price ID is required")
    return NextResponse.json({error: "Price ID is required"})
  }
  if(!mode) {
    console.error("Mode is required")
    return NextResponse.json({error: "Mode is required"})
  }
  if(!successUrl) {
    console.error("Success URL is required")
    return NextResponse.json({error: "Success URL is required"})
  }
  if(!cancelUrl) {
    console.error("Cancel URL is required")
    return NextResponse.json({error: "Cancel URL is required"})
  } 

  try {

    if(!!userId) {
      
      //Get stripeCustomerId from user table;
      let stripeCustomerId = await getUserStripeCustomerId(userId)

      //if user does not have a stripe customer Id. then we create one. 
      if(!stripeCustomerId) {

        stripeCustomerId = await createStripeCustomer(userName, userEmail)

        if(!stripeCustomerId) {
          throw new Error("Could not create stripe customer Id")
        }

        //Add stripe customerId to user in database
        const userData = await db.user.update({
          where: {
            id: userId
          },
          data: {
            stripeCustomerId: stripeCustomerId
          }
        })

        if(!userData || !userData.stripeCustomerId) {
          throw Error()
        }

      }

      //This creates the stripe checkout url.
      const stripeSession = await stripe.checkout.sessions.create({
        customer: stripeCustomerId,
        client_reference_id: userId,
        mode: mode,
        allow_promotion_codes: true,
        line_items: [{price: priceId, quantity: 1,}],
        customer_update: {address: "auto", name: "auto"},
        billing_address_collection: 'auto',
        payment_method_types: ['card'],
        success_url: successUrl + `?id=${userId}`, //Passing id to determin if use has verified registration. 
        cancel_url: cancelUrl,
      });

      return NextResponse.json({status: 200, url: stripeSession.url})

    } else {

      //This creates the checkout url where customer is created on checkout.
      const stripeSession = await stripe.checkout.sessions.create({
        customer_creation: "always",
        customer_email: userEmail || '',
        client_reference_id: userId,
        mode: mode,
        allow_promotion_codes: true,
        line_items: [{price: priceId, quantity: 1,}],
        billing_address_collection: 'auto',
        payment_method_types: ['card'],
        success_url: successUrl + `?id=${userId}`, //Passing id to determin if use has verified registration. 
        cancel_url: cancelUrl,
      });

      return NextResponse.json({status: 200, url: stripeSession.url})

    }

  }
  catch(e) {
    console.error(e)
    return NextResponse.json({status: 500, error: e})
  }
}
