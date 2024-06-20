'use client'

import { siteConfig } from "@/site-config";
import { Section, SectionHeader, SectionTitle1, SectionDescription, SectionContent} from "@/components/uiAlpaca/section"

type Props = {
  title: string;
  description?: string;
  bgImagePath?: string;
}

export function PageHeroSection(props: Props) {

  const {title, description, bgImagePath} = props;

  const backgroundImageUrl = bgImagePath ? `url('${siteConfig.fileStorage.bucketUrl}/${bgImagePath}')` : undefined;

  return (
    <div className="bg-muted bg-center" style={{backgroundImage: backgroundImageUrl}}>
      <div className={`w-full h-full ${backgroundImageUrl && 'bg-background/90'}`}>
        <Section>
          <SectionHeader className="text-left md:w-[80%]">
            <SectionTitle1>{title}</SectionTitle1>
            <SectionDescription>{description}</SectionDescription>
          </SectionHeader>
        </Section>
      </div>
    </div>
  )
}
