import { Logo } from "@/components/logo"
import { MobileNavBtn } from "@/components/mobile-nav-btn";
import { UserNav } from "@/components/user-nav";
import { adminNavItems } from "@/constants/nav-routes";
import { currentUser } from "@/lib/auth";

export async function AdminHeader() {

  const user = await currentUser()

  return (
    <header className="py-3 bg-muted border-b border-border">
      <div className="container md:max-w-full flex justify-between items-center">
        <div className="md:hidden">
          <MobileNavBtn navItemsArray={adminNavItems} />
        </div>
        <div>
          <Logo className="md:hidden" size="md" />
        </div>
        <div>
          <UserNav user={user} />
        </div>
      </div>
    </header>
  )

}
