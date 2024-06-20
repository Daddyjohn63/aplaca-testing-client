import { testimonialsData1 } from "@/constants/testimonials"
import { type Testimonial } from "@/types";
import { Section, SectionContent} from "@/components/uiAlpaca/section"
import Image from "next/image";

export function TestimonialSection1({data}: {data?: Testimonial[]}) {

  const testimonials: Testimonial[] = data || testimonialsData1
  return (
    <Section>
        <SectionContent>
          <ul className="sm:grid md:grid-cols-3 md:gap-10">
            {!!testimonials && testimonials.map((testimonial, i) => {
              return (
                <li key={i} className="flex gap-3 my-5 sm:my-3">
                  <div className="flex-shrink-0">
                    {!!testimonial.image && (
                      <Image 
                        src={testimonial.image}
                        alt={testimonial.name || 'testimonial'}
                        className="rounded-full border-2 border-foreground bg-muted bg-cover aspect-ratio"
                        width={50}
                        height={50}
                      />
                    )}
                  </div>
                  <div>
                    <div className="mb-2 italic">&quot;{testimonial.review}&quot;</div>
                    <div className="text-sm"><strong>{testimonial.name}</strong> | {testimonial.handle}</div>
                    <div className="text-xs">{testimonial.stars}</div>
                  </div>
                </li>
              )
            })} 
          </ul>
        </SectionContent>
    </Section>

  )
}
