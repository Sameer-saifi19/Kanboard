import { Plus } from "lucide-react";
import { Button } from "../ui/button";
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "../ui/dialog";
import CreateWorkspaceForm from "../forms/create-workspace";


export default function CreateWorkspaceDialog() {
  return (
    <>
      <Dialog>
        <DialogTrigger asChild>
           <Button className="w-full justify-start" variant={"ghost"}>
              <Plus className="h-2 w-2"/> Create workspace
            </Button>
        </DialogTrigger>

        <DialogContent className="w-104">
          <DialogTitle className="text-xl">Create new workspace</DialogTitle>
          <CreateWorkspaceForm/>
        </DialogContent>
      </Dialog>
    </>
  );
}
