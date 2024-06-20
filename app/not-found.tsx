import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { MarketingHeader } from '@/components/marketing/header-section'
import { MarketingFooter } from '@/components/marketing/footer-section'
import { Home, MessageCircle } from 'lucide-react'

export default function NotFound() {
  return (
    <div>
      <MarketingHeader />
      <div className="container text-center py-40">
        <h1 className="text-[150px] font-black leading-[160px]">404</h1>
        <h2 className="text-4xl">Page Not Found</h2>
        <p className="py-5">We can&apos;t find the page you&apos;re looking for. Check out our Help Center or head back to home.</p>
        <div className="flex gap-5 justify-center">
          <Button asChild variant="outline" className="border border-primary">
            <Link href="/contact-us" className="text-primary hover:text-primary-foreground gap-2">
              <MessageCircle size={15} />
              Help
            </Link>
          </Button>
          <Button asChild variant="outline" className="border border-primary">
            <Link href="/" className="text-primary hover:text-primary-foreground gap-2">
              <Home size={15}/>
              Home
            </Link>
          </Button>
        </div>
      </div>
      <MarketingFooter />
    </div>
  )
}
