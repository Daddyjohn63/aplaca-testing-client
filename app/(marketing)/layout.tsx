import { MarketingHeader } from "@/components/marketing/header-section";
import { MarketingFooter } from "@/components/marketing/footer-section";
import { redirect } from "next/navigation";
import { currentRole } from "@/lib/auth";
import { siteConfig } from "@/site-config";
import { getSEOMetadata } from "@/lib/seo";

export const metadata = getSEOMetadata()

const MarketingLayout = async ({ children }: { children: React.ReactNode }) => {

  const role = await currentRole()
  const isUnderConstruction = siteConfig.isUnderConstruction

  if(isUnderConstruction && role !== 'ADMIN') {
   redirect('/under-construction') 
  }


  return (
    <div>
      {isUnderConstruction && (
        <div className="text-center p-1 bg-destructive text-white">Under Construction Mode Active</div>
      )}
      <MarketingHeader />
      <div>
      {children}
      </div>
      <MarketingFooter />
    </div>
  )
}

export default MarketingLayout
