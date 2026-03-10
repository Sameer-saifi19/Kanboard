"use client";

import ProjectCard from "@/components/global/projectCard";
import ProjectDropdown from "@/components/modals/project-action-dropdown";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { createProjectSchema } from "@/schema/project-schema";
import { deleteProject, updateProject } from "@/server/project";
import { EllipsisVertical } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";

type Projects = {
  id: string;
  name: string;
  slug: string;
  description?: string | null;
  createdAt: Date;
};

export default function ProjectClient({ projects }: { projects: Projects[] }) {
  async function handleDelete(projectId: string) {
    const deleteOne = await deleteProject(projectId);
    if (!deleteOne.success) {
      toast.error("Error deleting project");
      return;
    }

    toast.success("Project deleted");
  }

  return (
    <>
      <div className="grid grid-cols-4 gap-4">
        {projects.length > 0
          ? projects.map((item) => (
              <ProjectCard
                key={item.id}
                id={item.id}
                description={item.description ?? ""}
                slug={item.slug}
                createdAt={item.createdAt}
                title={item.name}
              />
            ))
          : "no project found"}
      </div>
    </>
  );
}
