import Image from "next/image"
import { Section, SectionHeader, SectionTitle1, SectionDescription, SectionContent} from "@/components/uiAlpaca/section"
import { trustLogosData1 } from "@/constants/trust-logos";
import { type TrustLogo } from "@/types";

export function TrustLogosSection1({data}: {data?: TrustLogo[]}) {

  const logoData: TrustLogo[] = data || trustLogosData1

  return (
    <Section className="pt-5 bg-muted/20">
        <SectionHeader className="pb-5">
          <h2 className="font-light text-center">Featured On:</h2>
        </SectionHeader>
        <SectionContent>
          <ul className="flex flex-wrap gap-y-5 gap-x-12 items-center justify-center">
            {logoData && logoData.map((logo,i) => {
              return (
                <li key={i} className="flex justify-center items-center py-3"><Image src={logo.imageUrl} width={130} height={50} alt="logo" /></li>
              )
            })}
          </ul>
        </SectionContent>
    </Section>
  )
}
