import { Logo } from "@/components/logo"
import { MobileNavBtn } from "@/components/mobile-nav-btn";
import { UserNav } from "@/components/user-nav";
import { dashboardNavItems } from "@/constants/nav-routes";
import { currentUser } from "@/lib/auth";

export async function DashboardHeader() {

  const user = await currentUser()


  return (
    <header className="py-3 border-b border-border">
      <div className="container md:max-w-full flex justify-between items-center">
        <div className="md:hidden">
          <MobileNavBtn navItemsArray={dashboardNavItems} />
        </div>
        <div>
          <Logo className="md:hidden" size="xs" />
        </div>
        <div>
            <UserNav user={user} />
        </div>
      </div>
    </header>
  )

}
