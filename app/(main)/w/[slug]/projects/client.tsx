"use client";

import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { EllipsisVertical } from "lucide-react";
import Link from "next/link";

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
        {projects.length > 0 ? (
          projects.map((item) => (
            <Link key={item.id} href={`/p/${item.slug}`}>
              <Card>
                <CardHeader>
                  <CardTitle>{item.name}</CardTitle>
                  <CardDescription>{item.description}</CardDescription>
                  <CardAction className="z-10"
                    onClick={(e) => {
                      e.stopPropagation();
                    }}
                  >
                    <EllipsisVertical />
                  </CardAction>
                </CardHeader>
                <CardFooter>
                  <CardDescription>
                    {item.createdAt.toLocaleDateString()}
                  </CardDescription>
                </CardFooter>
              </Card>
            </Link>
          ))
        ) : (
          <Card className="h-34">
            <CardHeader>
              <CardTitle>No Projects found</CardTitle>
            </CardHeader>
          </Card>
        )}
      </div>
    </>
  );
}
