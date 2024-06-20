import BreadCrumb from "@/components/dashboard/breadcrumb";
import { Heading } from "@/components/ui/heading";
import { SettingsForm } from "@/components/dashboard/settings-form";
import { Card } from "@/components/ui/card";

const breadcrumbItems = [{ title: "Settings", link: "/dashboard/settings" }];

const SettingsPage = () => {
  return (
      <div>
        <BreadCrumb items={breadcrumbItems} />
        <Heading
          title="Settings"
          description="Manage your account settings"
        />
        <Card className="p-5 max-w-xl" >
          <SettingsForm />
        </Card>
      </div>
  );
}
export default SettingsPage
