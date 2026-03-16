"use client";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Controller, useForm } from "react-hook-form";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import MemberSwitch from "@/components/global/member-switch";
import { Trash } from "lucide-react";

type Members = {
  id: string;
  image: string;
  name: string;
  email: string;
  role: "owner" | "member";
};

export default function MemberClient({ members }: { members: Members[] }) {
  const form = useForm();
  return (
    <>
      <div className="flex items-start gap-4">
        <div className="w-3/4">
          <Table className="border rounded-lg overflow-hidden">
            <TableCaption className="py-4 text-muted-foreground">
              A list of all members in this organization
            </TableCaption>

            {/* HEADER */}
            <TableHeader>
              <TableRow className="h-14">
                <TableHead className="w-10 border text-start">Avatar</TableHead>

                <TableHead className="w-20 border">Name</TableHead>

                <TableHead className="w-30 border">Email</TableHead>

                <TableHead className="w-25 text-start border">Role</TableHead>

                <TableHead className="w-25 text-end border">Action</TableHead>
              </TableRow>
            </TableHeader>

            {/* BODY */}
            <TableBody>
              {members.map((item) => (
                <TableRow key={item.id} className="h-8">
                  {/* Avatar */}
                  <TableCell className="text-center">
                    <Image
                      src={item.image ?? null}
                      height={30}
                      width={30}
                      alt="member avatar"
                    />
                  </TableCell>

                  {/* Name */}
                  <TableCell className="font-medium">{item.name}</TableCell>

                  {/* Email */}
                  <TableCell className="text-muted-foreground">
                    {item.email}
                  </TableCell>

                  {/* Role */}
                  <TableCell className="text-center">
                    <MemberSwitch role={item.role}/>
                  </TableCell>

                  {/* Action */}
                  <TableCell className="text-end">
                    <Button
                      variant="destructive"
                      size={'icon-lg'}
                      disabled={item.role === "owner"}
                    >
                      <Trash/>
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        <div className="h-full w-1/4">
          <Card>
            <CardHeader>
              <CardTitle>Invite Member</CardTitle>
              <CardDescription>
                Send invite to members to add to this workspace
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form>
                <FieldGroup>
                  <Controller
                    name="email"
                    control={form.control}
                    render={({ field, fieldState }) => (
                      <Field data-invalid={fieldState.invalid}>
                        <FieldLabel htmlFor="email">Email</FieldLabel>
                        <Input {...field} id="email" type="email" required />
                        {fieldState.invalid && (
                          <FieldError errors={[fieldState.error]} />
                        )}
                      </Field>
                    )}
                  />
                </FieldGroup>

                <FieldGroup className="mt-4">
                  <Button className="w-full" type="submit" disabled={form.formState.isSubmitting}>
                    {form.formState.isSubmitting ? "Sending..." : "Send Invitation"}
                  </Button>
                </FieldGroup>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
}
