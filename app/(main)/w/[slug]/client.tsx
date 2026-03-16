"use client";

import ProjectCard from "@/components/global/projectCard";

type Projects = {
  id: string;
  name: string;
  slug: string;
  description?: string | null;
  createdAt: Date;
};

export default function ProjectClient({ projects }: { projects: Projects[] }) {

  return (
    <>
      <div className="grid grid-cols-4 gap-4">
        {projects.length > 0
          ? projects.map((item) => (
              <ProjectCard
                key={item.id}
                id={item.id}
                description={item.description ?? ""}
                createdAt={item.createdAt}
                title={item.name}
              />
            ))
          : "no project found"}
      </div>
    </>
  );
}
