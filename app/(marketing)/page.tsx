import { HeroSection1 } from "@/components/marketing/hero-section1";
import { HeroSection2 } from "@/components/marketing/hero-section2";
import { TrustLogosSection1 } from "@/components/marketing/trust-logos-section1";
import { ProblemSection1 } from "@/components/marketing/problem-section1";
import { TestimonialSection1 } from "@/components/marketing/testimonial-section1";
import { BenefitsSection1 } from "@/components/marketing/benefits-section1";
import { FeaturesSection1 } from "@/components/marketing/features-section1";
import { TestimonialSection2 } from "@/components/marketing/testimonial-section2";
import { PricingSection1 } from "@/components/marketing/pricing-section1";
import { FAQSection1 } from "@/components/marketing/faq-section1";

const Home = async () => {

  return (
    <main> 
      <HeroSection2 />
      <TrustLogosSection1 />
      <TestimonialSection1 />
      <ProblemSection1 />
      <BenefitsSection1 />
      <FeaturesSection1 /> 
      <TestimonialSection2 />
      <PricingSection1 />
      <FAQSection1 />
    </main>
  );
}
export default Home
