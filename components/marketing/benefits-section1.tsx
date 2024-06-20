import { Icons } from "@/components/icons";
import { Section, SectionHeader, SectionTitle2, SectionDescription, SectionContent} from "@/components/uiAlpaca/section"
import { benefits } from '@/constants/benefits';

export function BenefitsSection1() {
  return (
    <Section>
      <SectionHeader className="text-center">
        <SectionTitle2>Explore the Benefits of [Our Product]</SectionTitle2>
        <SectionDescription>Why settle for less when you can have the best? Here are the key benefits that set our product apart:</SectionDescription>
      </SectionHeader>
      <SectionContent className="text-left">
        <ul className="grid md:grid-cols-3 gap-7 py-4">
          {!!benefits && benefits.map((benefit, i) => {

            const Icon = Icons[benefit.icon || 'dashboard']

            return (
              <li key={i}>
                <div className="flex gap-4">
                  <div>{Icon ? <Icon className="text-accent" size="40"/> : null}</div>
                  <div>
                    <h4 className="text-xl font-black">{benefit.title}</h4>
                    <p>{benefit.description}</p>
                  </div>
                </div>
              </li>
            )
          })}
        </ul>
      </SectionContent>
    </Section>
  )
}
