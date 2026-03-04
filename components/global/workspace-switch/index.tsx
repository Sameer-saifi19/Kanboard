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

export default function WorkspaceSwitch() {
  const { data: workspaces } = authClient.useListOrganizations();
  const { data: activeOrganization } = authClient.useActiveOrganization();
  return (
    <>
      <Select>
        <SelectTrigger className="w-full max-w-2xl">
          <SelectValue placeholder={activeOrganization?.name} />
        </SelectTrigger>
        <SelectContent position="popper">
          <SelectGroup>
            {workspaces?.map((item, idx) => (
              <SelectItem key={idx} value={item.id}>
                <Building   /> {item.name}
              </SelectItem>
            ))}
            <CreateWorkspaceDialog/>
          </SelectGroup>
        </SelectContent>
      </Select>
    </>
  );
}
