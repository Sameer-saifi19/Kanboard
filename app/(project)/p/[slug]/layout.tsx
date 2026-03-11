import DashboardNavbar from "@/components/global/navbar";
import ProjectNavbar from "@/components/global/project-navbar";
import { getProjectBySlug } from "@/server/project";

interface ProjectLayoutProps {
  children: React.ReactNode;
  params: {slug: string}
}

export default async function ProjectLayout({
  children, params
}: ProjectLayoutProps) {
  const {slug} = await params;
  const { data } = await getProjectBySlug(slug);
  return (
    <>
      <div>
        <main className="flex-1">
          <DashboardNavbar />
          <ProjectNavbar
            id={data?.id as string}
            projectName={data?.name as string}
            image={data?.id as string}
          />
          <div className="px-6 py-4">
            {children}
          </div>
        </main>
      </div>
    </>
  );
}
