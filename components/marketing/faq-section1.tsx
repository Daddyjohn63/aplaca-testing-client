import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Section, SectionHeader, SectionTitle2, SectionDescription, SectionContent} from "@/components/uiAlpaca/section"
import { faqData1 } from "@/constants/faqs"


export function FAQSection1() {
  return (
    <Section id="faq-section">
      <SectionHeader>
        <SectionTitle2>Fequently Asked Questions</SectionTitle2>
        <SectionDescription>Find answers to your questions about using [Product / Service]</SectionDescription>
        </SectionHeader>
      <SectionContent>
        <Accordion type="single" collapsible className="max-w-[650px] mx-auto">
          {faqData1 && faqData1.map((faq, i) => {
            return (
              <AccordionItem key={i} value={i.toString()}>
                <AccordionTrigger className="text-lg text-left pr-3 hover:text-primary">{faq.question}</AccordionTrigger>
                <AccordionContent className="leading-normal pr-3">{faq.answer}</AccordionContent>
              </AccordionItem>
            )
          })}
        </Accordion>
        </SectionContent>
    </Section>
  )
}


