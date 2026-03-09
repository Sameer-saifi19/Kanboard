import ProjectDropdown from "@/components/modals/project-action-dropdown";
import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { updateProjectTitle } from "@/server/project";
import { formatDateTime } from "@/utils/date-formatter";
import { Pencil } from "lucide-react";
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
    <>
      <Card>
        <CardHeader>
          {isEditing ? (
            <Input
              ref={inputRef}
              value={name}
              onChange={(e) => setName(e.target.value)}
              onBlur={handleSave}
              onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
                if (e.key === "Enter") handleSave();
              }}
            />
          ) : (
            <CardTitle className="cursor-pointer" onDoubleClick={startEditing}>
              {name}
            </CardTitle>
          )}
          <CardDescription>{description ?? ""}</CardDescription>
          <CardAction onClick={startEditing}>
            <Pencil className="h-3 w-3" />
          </CardAction>
        </CardHeader>
        <CardFooter>
          <p className="text-xs text-muted-foreground">{`Created on ${formatDateTime(createdAt)}`}</p>
        </CardFooter>
      </Card>
    </>
  );
}