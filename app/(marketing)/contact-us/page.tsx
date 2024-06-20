import { PageHeroSection } from "@/components/marketing/page-hero-section"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Facebook, Instagram, Youtube, Linkedin} from "lucide-react"
import { ContactUsForm } from "@/components/contact-us-form"
import { getSEOMetadata } from "@/lib/seo"

export const metadata = getSEOMetadata({
  title: 'Contact Us',
  description: 'Get in touch with the Alpaca Stack team for any inquiries, support, or feedback. We are here to help you with your Next.js projects and provide the assistance you need.',
  openGraph: {
    title: "Contact Us",
    description: "Get in touch with the Alpaca Stack team for any inquiries, support, or feedback. We are here to help you with your Next.js projects and provide the assistance you need."
  }
})

const ContactUsPage = async() => {

  return (
    <div>
      <PageHeroSection title="Contact Us" />
      <section className="pt-14 pb-20">
        <div className="container grid md:grid-cols-2 gap-10 md:gap-20">
          <div className="space-y-3">
            <h3 className="text-2xl">Reach out anytime!</h3>
            <p>We&apos;re here to help! Whether you have questions, feedback, or just want to say hello, we look forward to hearing from you.</p>
            <p><strong>Connect on social media</strong></p>
            <ul>
              <li>
                <Button asChild variant="link" className="gap-3 p-0 text-lg">
                  <Link href="/">
                    <Facebook size={20}/> Facebook
                  </Link>
                </Button>
              </li>
              <li>
                <Button asChild variant="link" className="gap-3 p-0 text-lg">
                  <Link href="/">
                    <Instagram size={20}/> Instagram
                  </Link>
                </Button>
              </li>
              <li>
                <Button asChild variant="link" className="gap-3 p-0 text-lg">
                  <Link href="/">
                    <Youtube size={20}/> Youtube
                  </Link>
                </Button>
              </li>
              <li>
                <Button asChild variant="link" className="gap-3 p-0 text-lg">
                  <Link href="/">
                    <Linkedin size={20}/> LinkedIn
                  </Link>
                </Button>
              </li>
            </ul>
          </div>
          <div>
            <div>
              <ContactUsForm />
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
export default ContactUsPage
