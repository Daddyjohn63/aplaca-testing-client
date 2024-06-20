import Image from "next/image"
import { Section, SectionTitle2, SectionDescription, SectionContent} from "@/components/uiAlpaca/section"

export function ProblemSection1() {
  return (
    <Section className="text-center md:text-left">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        <SectionContent className="my-auto">
          <Image src="https://place-hold.it/500x500" alt="hero image" width={500} height={500} className="rounded-md mx-auto" />
        </SectionContent>
        <SectionContent className="my-auto">
            <SectionTitle2>Unlock Efficiency: Streamline Your Workflow with [Product Name]</SectionTitle2>
            <SectionDescription className="pb-3">The intro section of your landing page should quickly outline your product&apos;s core value and its target audience. It expands on the hero section by highlighting key differentiators and how the product solves specific problems. Engaging language and a compelling graphic can effectively draw the reader in to explore more details in subsequent sections.</SectionDescription>
        </SectionContent>
      </div>
    </Section>
  )
}
