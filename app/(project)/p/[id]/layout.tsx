import DashboardNavbar from "@/components/global/navbar";
import ProjectNavbar from "@/components/global/project-navbar";
import { getProjectById } from "@/server/project";
import React from "react";

export default async function ProjectLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { id: string };
}) {
  const { id } = await params;
  const { data } = await getProjectById(id);
  console.log(data?.name);
  return (
    <>
      <div className="h-screen flex flex-col overflow-hidden">
        <DashboardNavbar />
        <ProjectNavbar
          id={data?.id as string}
          projectName={data?.name as string}
        />
        <div className="flex-1 px-6 py-6 overflow-hidden">{children}</div>
      </div>
    </>
  );
}
