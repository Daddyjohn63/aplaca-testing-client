import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Section, SectionTitle1, SectionDescription, SectionContent} from "@/components/uiAlpaca/section"

export function HeroSection2() {

  return (
    <Section className="text-center md:text-left bg-muted/30">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        <SectionContent className="my-auto">
            <SectionTitle1 className="text-5xl">Unlock Your Business&apos; Full Potential With our Product!</SectionTitle1>
            <SectionDescription className="pb-3">Experience innovation and creativity with AI-enhanced interior design. Get started today and see your home transformed!</SectionDescription>
        <div className="flex justify-center md:justify-start gap-4">
          <Button asChild size="lg"><Link href="#pricing-section">Buy Now</Link></Button>
          <Button asChild variant="outline" size="lg" className="bg-transpant"><Link href="#">Learn More</Link></Button>
        </div>
          <div className="pt-3">
            Hurry today! Limited seats available. 
          </div>
        </SectionContent>
        <SectionContent className="my-auto">
          <Image src="https://place-hold.it/500x500" alt="hero image" width={500} height={500} className="rounded-md mx-auto" />
        </SectionContent>
      </div>
    </Section>
  )
}
