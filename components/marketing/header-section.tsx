import { Logo } from "@/components/logo"
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { MobileNavBtn } from "@/components/mobile-nav-btn";
import { marketingNavItems } from "@/constants/nav-routes";
import { currentUser } from "@/lib/auth";
import { DesktopNavMenu } from "@/components/desktop-nav-menu"; 

export async function MarketingHeader() {

  const user = await currentUser()

  return (
    <header className="py-5">
      <div className="container flex gap-3 justify-between items-center">
        <div className="md:hidden">
          <MobileNavBtn navItemsArray={marketingNavItems}/>
        </div>
        <div>
          <Logo size="sm" />
        </div>
        <div className="flex gap-5">
        <div>
          <DesktopNavMenu />
        </div>
        <div>
          {!user && (
            <Link href="/login">
              <Button className="text-md">Sign In</Button>
            </Link>
          )}
          {!!user && (
            <div>
              <Button asChild>
                <Link href="/dashboard">Dashboard</Link>
              </Button>
            </div>
          )}

        </div>
      </div>
      </div>
    </header>
  )

}

