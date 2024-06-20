import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

import { 
  Section, 
  SectionHeader, 
  SectionTitle1, 
  SectionDescription, 
  SectionContent
} from "@/components/uiAlpaca/section"

export function HeroSection1() {

  return (
    <Section className="bg-muted text-center">
      <SectionHeader>
        <SectionTitle1 className="text-5xl md:text-6xl">Unlock Your Business&apos; Full Potential With our Product!</SectionTitle1>
        <SectionDescription className="text-xl pb-3">Experience innovation and creativity with AI-enhanced interior design. Get started today and see your home transformed!</SectionDescription>
        <div className="flex flex-col items-center space-y-3">
          <Button asChild size="lg"><Link href="/#pricing-section">Buy Now</Link></Button>
          <Link href="#" className="text-sm">Learn More</Link>
        </div>
      </SectionHeader>
      <SectionContent>
        <Image src="https://place-hold.it/1100x600" alt="hero image" width={1100} height={600} className="rounded-md" />
      </SectionContent>
    </Section>
  )
}
