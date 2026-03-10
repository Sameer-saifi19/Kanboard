
"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { updateProjectTitle } from "@/server/project";
import { useRef, useState } from "react";

interface Props {
  id: string;
  projectName: string;
  image: string;
}

export default function ProjectNavbar({ id, projectName, image }: Props) {
  const [isEditing, setIsEditing] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const [name, setName] = useState(projectName);

  async function handleSave() {
    setIsEditing(false);
    if (name === projectName) return;
    await updateProjectTitle(id, name);
  }

  function EditText() {
    setIsEditing(true);
    setTimeout(() => inputRef.current?.focus(), 0);
  }

  return (
    <>
      <div className="bg-accent flex p-4 items-center justify-between h-16 w-full">
        <div>
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
            <h3 className="cursor-pointer" onClick={EditText}>
              {projectName}
            </h3>
          )}
        </div>
        <div>
          <Avatar>
            <AvatarImage>{image}</AvatarImage>
            <AvatarFallback></AvatarFallback>
          </Avatar>
        </div>
      </div>
    </>
  );
}
