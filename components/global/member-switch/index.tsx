"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type Props = {
    role: string
}

export default function MemberSwitch({role}: Props) {
    
  return (
    <>
      <Select>
        <SelectTrigger className="w-full">
          <SelectValue placeholder={
            role
          } />
        </SelectTrigger>
        <SelectContent position="popper">
          <SelectItem value="user">Member</SelectItem>
          <SelectItem value="admin">Owner</SelectItem>
        </SelectContent>
      </Select>
    </>
  );
}
