import { Logo } from "@/components/logo";
import { dashboardNavItems } from "@/constants/nav-routes";
import { CTACard } from "@/components/marketing/cta-card";
import { currentAccess } from "@/lib/auth";
import { DashboardSidebarNav } from "./sidebar-nav";

export async function DashboardSidebar() {

  const hasAccess = await currentAccess()

  return (
    <aside className="hidden border-r bg-muted/40 md:flex py-3 px-5 md:flex-col md:gap-10 w-80">
      <div>
      <Logo size="sm" className="hidden md:block"/>
      </div>
      <div className="flex flex-col gap-5 justify-between h-screen">
        <DashboardSidebarNav data={dashboardNavItems} hasAccess={hasAccess}  />
        {!hasAccess && (
          <CTACard 
            image="https://place-hold.it/300x200"
            title="Upgrade Right Now!" 
            description="Upgrade to a premium account and get full access to all features."
            btnText="Upgrade Now!" 
            btnHref="/#pricing-section"/>
        )}
      </div>
    </aside>
  )
}
