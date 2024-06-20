import Stripe from "stripe";
import { NextResponse, NextRequest} from 'next/server';
import { stripe } from '@/lib/stripe';
import { db } from '@/lib/db';
import { getCheckoutSession } from '@/lib/stripe';
import { siteConfig } from '@/site-config';
import { findUserByStripeCustomerId } from "@/data/user";

export async function POST(req: NextRequest) {

  const payload = await req.text()
  // const response = JSON.parse(payload)
  const sig = req.headers.get("Stripe-Signature")

  // const dateTime = new Date(response?.created * 1000).toLocaleDateString()
  // const timeString = new Date(response?.created * 1000).toLocaleDateString()

  let event;

  // Verify Stripe webhook. 
  try {
    event = stripe.webhooks.constructEvent(
      payload,
      sig!,
      process.env.STRIPE_WEBHOOK_SECRET!
    )
  }
  catch(error) {
    return NextResponse.json({status: "Error"});
  }

  try {

    //This is where all the magic happens.
    // Handle the event
    switch (event.type) {
      case 'checkout.session.completed': {

        const checkoutObj = event.data.object;
        const sessionId = checkoutObj.id;
        const session = await getCheckoutSession(sessionId);

        if(!session) {
          break;
        }

        //Grab important data from customer session
        const customerId = session.customer;
        const clientReferenceId = session.client_reference_id;
        let priceId: string | undefined

        if (session.line_items?.data[0]?.price) {
          priceId = session?.line_items?.data[0]?.price.id;
        }

        const plan = siteConfig.stripe.plans.some((plan) => plan.priceId === priceId) 

        if(!plan || !clientReferenceId || !priceId) {
          break;
        }

        // // Incase you need more data. Get customer data to update email in database.
        // const stripeCustomerData = (await stripe.customers.retrieve(
        //   customerId as string
        // )) as Stripe.Customer;

        //Update user in database and Allow access to product
        await db.user.update({
          where: {
            id: clientReferenceId,
          },
          data: {
            stripeCustomerId: customerId as string,
            stripePriceId: priceId,
            hasAccess: true,
          }
        })
        
        //Send email after successful purchase. 

        break;
      }

      case 'checkout.session.expired': {
        const checkoutSessionExpired = event.data.object;
        // Then define and call a function to handle the event checkout.session.expired
        break;
      }

      case 'customer.subscription.deleted': {
        // Then define and call a function to handle the event customer.subscription.deleted
        const customerDeletedSubscriptionObj: Stripe.Subscription = event.data
          .object as Stripe.Subscription;

        //Verify the subscription customer id for database update
        const subscription = await stripe.subscriptions.retrieve(
          customerDeletedSubscriptionObj.id
        );

        const user = await findUserByStripeCustomerId(subscription.customer)

        if(!user) {
          console.error("User not found.");
          break;
        }

        // Remove access from product. 
        await db.user.update({
          where: {
            id: user.id
          },
          data: {
            hasAccess: false,
          }
        }) 

        break;
      }

      case 'customer.subscription.updated': {

        const customerSubscriptionUpdated = event.data.object;
        // Then define and call a function to handle the event customer.subscription.updated
        break;
      }
      case 'invoice.paid': {
        // Customer paid subscription
        const invoicePaidObj = event.data.object;
        //Verify the subscription customer id for database update
        const subscription = await stripe.subscriptions.retrieve(
          invoicePaidObj.id
        );

        if(subscription.customer) {
          console.error("Could not find customer")
          break;
        }

        // Remove access from product
        await db.user.update({
          where: {
            stripeCustomerId: subscription.customer
          },
          data: {
            hasAccess: false,
          }
        }) 

        break;
      }

      case 'invoice.payment_failed': {
        const invoicePaymentFailed = event.data.object;

        // A payment failed (for instance the customer does not have a valid payment method)
        // Revoke access to the product or wait for the customer to pay (more friendly):
        //      - Stripe will automatically email the customer (Smart Retries)
        //      - We will receive a "customer.subscription.deleted" when all retries were made and the subscription has expired
        break;
      }
      
      // ... handle other event types
      default:
    }

    return NextResponse.json({status: "Success", event: event.type});

  }
  catch(e) {
    console.error(e)
    return NextResponse.json({status: "Failed", e})
  }


}
