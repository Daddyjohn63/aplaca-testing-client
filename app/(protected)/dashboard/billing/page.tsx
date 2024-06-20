import BreadCrumb from "@/components/dashboard/breadcrumb";
import { Heading } from "@/components/ui/heading";
import { createCustomerPortal, createStripeCustomer } from "@/lib/stripe";
import { currentUser } from "@/lib/auth";
import { redirect } from "next/navigation";
import { getUserStripeCustomerId } from "@/data/user";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { CTAAlert } from "@/components/cta-alert";


const breadcrumbItems = [{ title: "Billing", link: "/dashboard/billing" }];

const BillingPage = async () => {

  const returnUrl = process.env.NEXT_PUBLIC_PRIMARY_DOMAIN + '/dashboard/billing'
  const user = await currentUser()

  if(!user) {
    redirect('/')
  }

  const stripeCustomerId = await getUserStripeCustomerId(user.id)

  let portalUrl = ''
  if(stripeCustomerId) {
    portalUrl = await createCustomerPortal(stripeCustomerId, returnUrl)
  }

  return (
    <div>
      <BreadCrumb items={breadcrumbItems} />
      <Heading
        title="Billing Page"
        description="Manage billing here"
      /> 
      {!stripeCustomerId && (
      <CTAAlert
        title="Customer Account Not Created!"
        description="You need to upgrade your account before you can get access to your billing portal"
      />
      )}
      {stripeCustomerId && (
        <Button asChild>
          <Link href={portalUrl}>
            Stripe Billing Portal
          </Link>
        </Button>
      )}
    </div>
  );


}

export default BillingPage;

