"use client";

import { LinkIcon, UserPlus2 } from "lucide-react";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { toast } from "sonner";
import SigninForm from "@/app/auth/_components/signin-form";

export default function InviteMember() {
  const copyLink = async () => {
    await navigator.clipboard.writeText(window.location.href);
    toast.success("Invite link copied");
  };

  return (
    <>
      <Dialog>
        <DialogTrigger asChild>
          <Button>
            <UserPlus2 className="w-4 h-4 mr-2" />
            Invite Workspace Members
          </Button>
        </DialogTrigger>

        {/* Content */}
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>Invite to Workspace</DialogTitle>
          </DialogHeader>

      
          <DialogFooter className="sm:justify-between">
            <Button type="submit">Invite to Workspace</Button>

            <Button type="button" variant="outline" onClick={copyLink}>
              <LinkIcon className="w-4 h-4 mr-2" />
              Copy Link
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
