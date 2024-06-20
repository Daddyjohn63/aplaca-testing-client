import Image from "next/image"
import { Section, SectionTitle2, SectionDescription, SectionContent} from "@/components/uiAlpaca/section"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export function CTASection1() {
  return (
    <Section className="bg-foreground text-background text-center md:text-left">
      <div className="grid grid-cols-1 md:grid-cols-5 gap-y-5 md:gap-20">
        <SectionContent className="col-span-2 my-auto">
          <Image src="https://place-hold.it/500x500" alt="hero image" width={500} height={500} className="rounded-md mx-auto" />
        </SectionContent>
        <SectionContent className="col-span-3 my-auto">
            <SectionTitle2>Streamline Your Workflow with Our Product Today!</SectionTitle2>
            <SectionDescription className="pb-3">Unlock exclusive savings with your purchase today. Act now—this special offer ends soon!</SectionDescription>
          <Button variant="outline" className="border-background bg-foreground hover:bg-background hover:text-foreground" asChild><Link href="/#pricing-section">Get Access Now!</Link></Button>
        </SectionContent>
      </div>
    </Section>
  )
}
