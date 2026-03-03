"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader, 
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { authClient } from "@/lib/auth-client";
import { Loader2, Pencil, Plus, X } from "lucide-react";
import Image from "next/image";
import { useRef, useState } from "react";
import { toast } from "sonner";

interface Props {
  imageUrl: string;
  initialName: string;
  email: string;
}

export default function ProfileClient({ imageUrl, initialName, email }: Props) {
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(initialName);
  const [isLoading, setIsLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  function handleEditClick() {
    setIsEditing(true);
    setTimeout(() => inputRef.current?.focus());
  }

  function handleCancel() {
    setName(initialName);
    setIsEditing(false);
  }

  async function handleSave() {
    if (name === initialName) {
      setIsEditing(false);
      return;
    }

    setIsLoading(true);
    const result = await authClient.updateUser({
      name: name
    })
    setIsLoading(false);

    if (result.error) {
      toast.error(result.error.message || "An error occurred");
    } else {
      toast.success("Profile updated!");
      setIsEditing(false);
    }
  }

  return (
    <>
      <div className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle className="text-base">General</CardTitle>
            <CardDescription className="text-sm text-muted-foreground">
              General settings for your workspace.
            </CardDescription>
            <CardAction>
              {!isEditing ? (
                <Button variant="outline" size="sm" onClick={handleEditClick}>
                  <Pencil className="w-4 h-4 mr-2" />
                  Edit Profile
                </Button>
              ) : (
                <Button variant="ghost" size="sm" onClick={handleCancel}>
                  <X className="w-4 h-4 " />
                  Cancel
                </Button>
              )}
            </CardAction>
          </CardHeader>
          <Separator />
          <CardContent className="space-y-6">
            <div className="flex items-center justify-start gap-6">
              <div>
                <Image src={imageUrl} width={80} height={80} alt="user avatar" className="rounded-full border-2"/>
              </div>
              <div className="flex flex-col gap-2 justify-center">
                <div className="space-x-2 flex items-center">
                  <Button>
                    <Plus /> Change Image
                  </Button>
                  <Button variant={"outline"}>Remove Image</Button>
                </div>
                <div>
                  <p className="text-muted-foreground text-sm">
                    We support PNG, JPEG's and JPG under 2 MB
                  </p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  ref={inputRef}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  disabled={!isEditing}
                  placeholder={name}
                  className={!isEditing ? "bg-muted cursor-default disabled:text-black-900" : ""}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  value={email}
                  disabled
                  className="bg-muted cursor-default"
                />
                <p className="text-xs text-muted-foreground">
                  Email cannot be changed
                </p>
              </div>
            </div>

            {isEditing && (
              <Button
                onClick={handleSave}
                disabled={isLoading}
                className="w-full"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Saving...
                  </>
                ) : (
                  "Save Changes"
                )}
              </Button>
            )}
          </CardContent>
        </Card>

        <Card></Card>
      </div>
    </>
  );
}
