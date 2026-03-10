'use client'

import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { updateProjectTitle } from "@/server/project";
import { formatDateTime } from "@/utils/date-formatter";
import { ArrowRight, Pencil } from "lucide-react";
import Link from "next/link";
import { useRef, useState } from "react";

interface CardProps {
  id: string;
  title: string;
  slug: string;
  description: string | null;
  createdAt: Date;
}

export default function ProjectCard({
  id,
  slug,
  title,
  createdAt,
  description,
}: CardProps) {
  const [isEditing, setIsEditing] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const [name, setName] = useState(title);

  async function handleSave() {
    setIsEditing(false);
    if (name === title) return;
    await updateProjectTitle(id, name);
  }

  function startEditing() {
    setIsEditing(true);
    setTimeout(() => inputRef.current?.focus(), 0);
  }

  return (
    <Card className="h-50 flex flex-col">
      <CardHeader className="flex-none">
        <div className="flex items-start gap-2">
          <div className="flex-1 min-w-0">
            {isEditing ? (
              <Input
                ref={inputRef}
                value={name}
                onChange={(e) => setName(e.target.value)}
                onBlur={handleSave}
                onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
                  if (e.key === "Enter") handleSave();
                }}
                className="h-7 text-base font-semibold"
              />
            ) : (
              <CardTitle className="line-clamp-1">{name}</CardTitle>
            )}
          </div>
          <CardAction
            onClick={startEditing}
            className="bg-muted p-2 rounded-md cursor-pointer flex-none"
          >
            <Pencil className="h-3 w-3" />
          </CardAction>
        </div>
      </CardHeader>
      <CardContent>
        <CardDescription className="line-clamp-1">
          { description ? description : "No description"}
        </CardDescription>
      </CardContent>

      <CardFooter className="flex-none mt-auto flex flex-col items-start text-sm">
        <div>
          <Link
            className="flex items-center gap-2 hover:gap-4 transition-all justify-between mb-4"
            href={`/p/${slug}`}
          >
            Go to project <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <p className="text-xs text-muted-foreground">
          {`Created on ${formatDateTime(createdAt)}`}
        </p>
      </CardFooter>
    </Card>
  );
}
