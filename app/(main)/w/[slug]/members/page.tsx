import { listMembers } from "@/server/member";
import MemberClient from "./client";

export default async function Page({ params }: { params: { slug: string } }) {
  const { slug } = await params;
  const membersData = await listMembers(slug);

  const refinedData =
    membersData.data?.members.map((m) => ({
      id: m.id,
      image: m.user.image || "",
      name: m.user.name,
      email: m.user.email,
      role: m.role as "owner" | "member",
    })) ?? [];

    
  return (
    <>
      <main className="flex flex-col gap-6 p-4 w-full max-7-wxl">
        <div className="flex justify-between">
          <div className="space-y-2">
            <h1 className="text-3xl font-semibold">Members</h1>
            <p className="text-sm text-muted-foreground">
              Manage your members and more
            </p>
          </div>
        </div>
        <MemberClient members={refinedData} />
      </main>
    </>
  );
}
