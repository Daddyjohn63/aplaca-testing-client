import Image from "next/image";
import { Icons } from "@/components/icons";
import { Section, SectionHeader, SectionTitle2, SectionDescription, SectionContent} from "@/components/uiAlpaca/section"
import { featuresData1 } from "@/constants/features";

export function FeaturesSection1() {

  return (
    <Section>
      <SectionHeader>
        <SectionTitle2 className="text-center">Key Features of [Product/Service]</SectionTitle2>
        <SectionDescription className="text-center">Explore the advanced capabilities that sets our product apart in the from the rest of the competition.</SectionDescription>
      </SectionHeader>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-14">
        <SectionContent className="my-auto">
          <Image src="https://place-hold.it/500x400" width={500} height={400} alt="feature Image" className="rounded-md" />
        </SectionContent>
        <SectionContent className="my-auto" >
          <ul className="space-y-5">
            {!!featuresData1 && featuresData1.map((feature, i) => {
              const Icon = Icons[feature.icon || 'dashboard']
              return (
                <li key={i}>
                  <div className="flex gap-4">
                    <div>{Icon ? <Icon className="text-accent" size="40"/> : null}</div>
                    <div>
                      <h4 className="text-xl font-bold">{feature.title}</h4>
                      <p>{feature.description}</p>
                    </div>
                  </div>
                </li>
              )
            })}
          </ul>
        </SectionContent>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        <SectionContent className="my-auto md:order-last">
          <Image src="https://place-hold.it/500x400" width={500} height={400} alt="feature Image" className="rounded-md" />
        </SectionContent>
        <SectionContent className="my-auto" >
          <ul className="space-y-5">
            {!!featuresData1 && featuresData1.map((feature, i) => {
              const Icon = Icons[feature.icon || 'dashboard']
              return (
                <li key={i}>
                  <div className="flex gap-4">
                    <div>{Icon ? <Icon className="text-accent" size="40"/> : null}</div>
                    <div>
                      <h4 className="text-xl font-bold">{feature.title}</h4>
                      <p>{feature.description}</p>
                    </div>
                  </div>
                </li>
              )
            })}
          </ul>
        </SectionContent>
      </div>
    </Section>

  )
}
