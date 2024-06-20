import Stripe from "stripe";

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    apiVersion: "2024-04-10",
    typescript: true,
})

export const createStripeCustomer = async(name: string | null | undefined, email: string | null | undefined) => {

    let payload = {
        name: name ? name : undefined,
        email: email ? email : undefined,
    }

    try {
        const customer = await stripe.customers.create(payload)
        const stripeCustomerId = customer.id

        if(!stripeCustomerId) {
            throw Error()
        }

        return stripeCustomerId
    } 
    catch(e) {
        console.error(e)
        return null
    }

}

export const getCheckoutSession = async(sessionId: string) => {
    
    try {

        const session = await stripe.checkout.sessions.retrieve(sessionId, {
            expand: ["line_items"],
        });

        return session;

    } catch(e) {
        console.error(e)
        return null
    }
}

// This is used to create Customer Portal sessions, so users can manage their subscriptions (payment methods, cancel, etc..)
export const createCustomerPortal = async (customerId: string, returnUrl: string) => {

  const portalSession = await stripe.billingPortal.sessions.create({
    customer: customerId,
    return_url: returnUrl,
  });

  return portalSession.url;
};

