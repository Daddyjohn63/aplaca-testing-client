import { Heading } from '@/components/ui/heading';
import { currentAccess } from '@/lib/auth';
import BreadCrumb from '@/components/dashboard/breadcrumb';
import { CTAAlert } from '@/components/cta-alert';

const breadcrumbItems = [{ title: 'Example', link: '/dashboard/example' }];

//This is an example page showing how you can conditionally render content that is free vs paid.
const ExamplePage = async () => {
  const hasAccess = await currentAccess();

  return (
    <div>
      <BreadCrumb items={breadcrumbItems} />
      <Heading
        title="Dashboard"
        description="Explore downloads, documentation and guides."
      />
      {!hasAccess && <CTAAlert title="Must be a paid user to get access" />}
      {!!hasAccess && (
        <div className="max-w-3xl space-y-4">
          Only paid users will be able to see this content.
        </div>
      )}
    </div>
  );
};

export default ExamplePage;
