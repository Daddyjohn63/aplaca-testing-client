import { Heading } from "@/components/ui/heading";
import { db } from "@/lib/db";
import { Card } from "@/components/ui/card";

const AdminDashboardPage = async () => {

  const userCount = await db.user.count()

  const now = new Date();
  const yesterday = new Date(now);
  yesterday.setDate(yesterday.getDate() - 1);

  const recentUserCount = await db.user.count({
    where: {
      emailVerified: {
        gte: yesterday,
      },
    },
  });

  return (
    <div className="h-full">
      <div>
        <Heading
          title="Admin Dashboard"
          description="Manage admin here"
        /> 
      </div>
      <div className="max-w-5xl">
        <div className="flex flex-wrap gap-8">
        <Card className="aspect-square w-52 p-5 flex flex-col gap-5 justify-center items-center text-center">
            <span className="text-5xl font-bold">{userCount}</span>
            <h5 className="text-xl">Users Total</h5>
          </Card>
        <Card className="aspect-square w-52 p-5 flex flex-col gap-5 justify-center items-center text-center">
            <span className="text-5xl font-bold">{recentUserCount}</span>
            <h5 className="text-xl">New users in the last 24 hours</h5>
          </Card>
        </div>
      </div>
      
    </div>
  )
}

export default AdminDashboardPage
