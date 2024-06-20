import { siteConfig } from "@/site-config";
import { currentRole } from "@/lib/auth";
import { redirect } from "next/navigation";

const ProtectedLayout = async ({ children }: { children: React.ReactNode }) => {

  const role = await currentRole();
  const isUnderConstruction = siteConfig.isUnderConstruction;

  if(isUnderConstruction && role !== 'ADMIN') {
   redirect('/under-construction') 
  }

  return (
    <div>
      {isUnderConstruction && (
        <div className="text-center p-1 bg-destructive text-white">Under Construction Mode Active</div>
      )}
      {children}
    </div>
  )
};

export default ProtectedLayout;
