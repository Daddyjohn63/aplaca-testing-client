import { PricingCard } from "@/components/pricing-card"
import { siteConfig } from "@/site-config"
import { Section, SectionHeader, SectionTitle2, SectionDescription, SectionContent, SectionFooter} from "@/components/uiAlpaca/section"

export const PricingSection1 = () => {

  const plans = siteConfig.stripe.plans

  return (
  <Section id="pricing-section" className="bg-gradient-to-br from-muted/70 to-black/10">
      <SectionHeader>
      <SectionTitle2>Simple, Transparent Pricing</SectionTitle2>
        <SectionDescription>Choose the plan that best fits your needs with no hidden fees. Upgrade, downgrade, or cancel at any time.</SectionDescription>
      </SectionHeader>
      <SectionContent className="flex justify-center">
        <ul className="flex flex-col md:flex-row gap-14">
            {!!plans && plans.map((plan, i) => {
              return (
                <li key={i}>
                  <PricingCard plan={plan}/>
                </li>
              )
            })}
        </ul>
        </SectionContent>
      <SectionFooter className="pt-10">We accept visa, mastercard, AMEX, and Ecoin</SectionFooter>
    </Section>
  )
}
