import { Logo } from "@/components/logo"
import Link from "next/link"
import { interestingNavItems, boringNavItems} from "@/constants/nav-routes"
import { getYearStringFromDate } from "@/lib/utils"
import { siteConfig } from "@/site-config"

type LinkObj = {
  text: string;
  href: string;
}

type NavCardProps = {
  title: string;
  links: LinkObj[]
}

function NavCol(props: NavCardProps) {

  const {title, links} = props

return (
  <div className="space-y-4">
    <h5 className="text-lg bold text-muted-foreground">{title}</h5>
    <ul className="space-y-1">
      {!!links && links.map((item, i) => {
        return (
          <li key={i}>
            <Link href={item.href} className="hover:text-primary">
              {item.text}
            </Link>
          </li>
        )})}
    </ul>
  </div>
  )}

export function MarketingFooter() {

  const currentYear = getYearStringFromDate(new Date())

  return (
    <section className="bg-muted pt-14 pb-5">
      <div className="container">
        <div className="flex flex-col md:flex-row justify-between gap-10 mb-16">
        <div className="space-y-3 md:max-w-[300px]">
          <Logo size="sm" />
          <p className="text-sm leading-6">{siteConfig.appDescription}</p>
        </div>
        <div>
          <ul className="flex flex-col md:flex-row gap-5 md:gap-10">
            <li>
              <NavCol title="Interesting Links" links={interestingNavItems}/>
            </li>
            <li>
              <NavCol title="Boring Links" links={boringNavItems}/>
            </li>
          </ul>
        </div>
      </div>
        <div className="text-center">
          <p className="text-sm text-muted-foreground">Copyright © {currentYear} {siteConfig.primaryDomain}. All rights reserved.</p>
        </div>
    </div>
    </section>
  )
}
