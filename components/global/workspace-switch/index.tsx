"use client";

import CreateWorkspaceDialog from "@/components/modals/create-workspace";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { authClient } from "@/lib/auth-client";
import { Building } from "lucide-react";
import { useRouter } from "next/navigation";

export default function WorkspaceSwitch() {
  const { data: workspaces, isPending, refetch } = authClient.useListOrganizations();
  const { data: activeOrganization } = authClient.useActiveOrganization();
  const router = useRouter();
  
  if (isPending) {
    return (
      <div className="w-full max-w-2xl h-10 flex items-center text-sm text-muted-foreground">
        Loading workspaces...
      </div>
    );
  }

  return (
    <Select
      value={activeOrganization?.id}
      onValueChange={async (orgId) => {
        const data = await authClient.organization.setActive({
          organizationId: orgId,
        });
        refetch()
        router.push(`/w/${data.data?.slug}/projects`)
      }}
    >
      <SelectTrigger className="w-full max-w-2xl">
        <SelectValue
          placeholder={activeOrganization?.name || "Select workspace"}
        />
      </SelectTrigger>

      <SelectContent position="popper">
        <SelectGroup>
          {workspaces?.map((workspace) => (
            <SelectItem key={workspace.id} value={workspace.id}>
              <div className="flex items-center gap-2">
                <Building size={16} />
                {workspace.name}
              </div>
            </SelectItem>
          ))}

          {/* Create new workspace */}
          <CreateWorkspaceDialog />
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
