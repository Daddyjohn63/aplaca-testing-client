import { Heading } from "@/components/ui/heading";
import { currentAccess } from "@/lib/auth";

export default async function DashboardHome() {

  const hasAccess = await currentAccess()

  return (
      <div>
        <Heading
          title="Dashboard"
          description="Explore downloads, documentation and guides."
        />
      <p>
      This is the user dashboard
      </p>
    </div>
  );
}
