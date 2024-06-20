import { SectionTitle } from "@/components/section-title"
import { Section, SectionHeader, SectionTitle2, SectionDescription, SectionContent} from "@/components/uiAlpaca/section"
import { testimonialsData2 } from "@/constants/testimonials"

export function TestimonialSection2() {
  return (
    <Section id="testimonials2-section" className="pt-5"> 
      <SectionHeader>
        <SectionTitle2>Testimonials</SectionTitle2>
        <SectionDescription>Hear from customer who have transformed their lives with [your product/busines].</SectionDescription>
        </SectionHeader>
      <SectionContent>
        <ul className="sm:columns-2 md:columns-3 gap-5">
          {!!testimonialsData2 && testimonialsData2.map((testimonial, i) => {
            return (
              <li key={i} className="break-inside-avoid mb-5">
                <div className="bg-muted p-5 rounded-sm">
                  <div className="italic">{testimonial.review}</div>
                  <hr className="my-5 border border-muted-foreground/50 border-dashed"/>
                  <div className="flex gap-4 items-center">
                    <div className="w-10 h-10 rounded-full border-2 border-foreground bg-muted bg-cover aspect-ratio" style={{backgroundImage: `url(/${testimonial.image})`}}></div>
                    <div>
                      <div className="text-sm"><strong>{testimonial.name}</strong> | {testimonial.handle}</div>
                      <div className="text-xs">{testimonial.stars}</div>
                    </div>
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
