import { getAllProjects } from "@/server/project";
import ProjectClient from "./client";
import { CreateProjectSheet } from "@/components/modals/create-project";

export default async function Page() {
  const projectData = await getAllProjects()
  return (
    <>
      <main className="flex flex-col gap-6 p-4 w-full max-7-wxl">
        <div className="flex justify-between">
          <div className="space-y-2">
            <h1 className="text-3xl font-semibold">Projects</h1>
            <p className="text-sm text-muted-foreground">
              Manage your Project and more
            </p>
          </div>
          <div>
            <CreateProjectSheet/>
          </div>
        </div>
        <ProjectClient projects={projectData.data ?? []} />
      </main>
    </>
  );
}
