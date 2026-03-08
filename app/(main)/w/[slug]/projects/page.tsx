import { Button } from "@/components/ui/button";
import ProjectClient from "./client";
import { CreateProjectSheet } from "@/components/modals/create-project";

const projectData = [
  {
    name: "project 1",
    slug: "project-1",
    id: "1",
    description: "Tere liye jannate sazayi",
    createdAt: new Date()
  }
]

export default async function Page() {

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
        <ProjectClient projects={projectData} />
      </main>
    </>
  );
}
