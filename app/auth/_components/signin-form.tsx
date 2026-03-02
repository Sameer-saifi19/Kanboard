"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { useState, useTransition } from "react";
import { Eye, EyeOff } from "lucide-react";
import { Controller, useForm } from "react-hook-form";
import { signinSchema, signinSchemaType } from "@/schema/auth-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { GoogleBtn } from "./google-btn";

export default function SigninForm({
  ...props
}: React.ComponentProps<typeof Card>) {

  const [isPending, startTransition] = useTransition()
  const [showPassword, setShowPassword] = useState(false);

  const form = useForm<signinSchemaType>({
    resolver: zodResolver(signinSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  function onSubmit(data: signinSchemaType) {
   
  }

  return (
    <Card {...props}>
      <CardHeader>
        <CardTitle>Log in to account</CardTitle>
        <CardDescription>
          Enter your information below to continue to prodSaas
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <FieldGroup>
            <Controller
              name="email"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="email">Email</FieldLabel>
                  <Input
                    {...field}
                    id="email"
                    type="email"
                    required
                    placeholder="m@example.com"
                    autoComplete="off"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            <Controller
              name="password"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="password">Password</FieldLabel>

                  <div className="relative">
                    <Input
                      {...field}
                      id="password"
                      aria-invalid={fieldState.invalid}
                      type={showPassword ? "text" : "password"}
                      required
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                    <Button
                      className="absolute top-0 right-1 h-full px-3 hover:bg-transparent"
                      onClick={() => setShowPassword(!showPassword)}
                      size="icon"
                      type="button"
                      variant="ghost"
                    >
                      {showPassword ? (
                        <EyeOff className="h-5 w-5 text-muted-foreground" />
                      ) : (
                        <Eye className="h-5 w-5 text-muted-foreground" />
                      )}
                    </Button>
                  </div>
                </Field>
              )}
            />

            <FieldGroup>
              <Field>
                <Button type="submit">Login</Button>
                <GoogleBtn/>
                <FieldDescription className="px-6 text-center">
                  Don&apos;t have an account?{" "}
                  <Link href="/auth/sign-up">Sign up</Link>
                </FieldDescription>
              </Field>
            </FieldGroup>
          </FieldGroup>
        </form>
      </CardContent>
    </Card>
  );
}
