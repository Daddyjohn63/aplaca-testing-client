import { CheckCircle, XCircle } from "lucide-react"
import { BuyNowBtn } from "@/components/buy-now-btn"
import { currentUser } from "@/lib/auth"
import { Plan } from "@/types"

export async function PricingCard({plan}: {plan: Plan}) {

  const {name, description, price, features, isFeatured, priceAnchor} = plan;

  const user = await currentUser()

  return (
    <div className={`${isFeatured? "border-2 border-primary" : ""} relative w-[380px] bg-card rounded-md px-9 py-14`}>
      {!!isFeatured && (
        <span className="bg-accent px-5 py-2 text-card absolute top-0 -right-4 rotate-12">Most Popular</span>
      )}
      <div className="space-y-8">
        <div className="space-y-3">
          <div>
          <h3 className="text-3xl text-center mb-1">{name}</h3>
          <p className="text-center text-card-foreground/70">{description}</p>
          </div>
          <div className="flex items-center justify-center gap-3">
            <div className="line-through font-semibold">
              ${priceAnchor}
            </div>
            <div className="text-5xl font-bold text-center">
              ${price.toString()}
            </div>
            <div className="font-semibold">
              USD
            </div>
          </div>
        </div>
        <ul className="space-y-3">
          {!!features && features.map((feature, i) => {
            return <li key={i} className={`flex gap-2 ${!feature.included ? "text-muted-foreground" : ""}`}>
              {feature.included ? <CheckCircle className="text-accent" size={29} /> : <XCircle size={30}/>} {feature.name}</li>
          })}
        </ul>
        <div className="space-y-4">
          <BuyNowBtn user={user} plan={plan} />
        </div>
      </div>
    </div>
  )
}
