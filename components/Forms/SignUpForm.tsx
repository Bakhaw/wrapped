"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Icons } from "@/components/ui/icons";
import { Input } from "@/components/ui/input";

const FormSchema = z
  .object({
    username: z
      .string()
      .min(1, "Username is required")
      .min(3, "Username must have at least 3 characters")
      .max(100, "Username max length is 100 characters"),
    email: z.string().min(1, "Email is required").email("Invalid email"),
    password: z
      .string()
      .min(1, "Password is required")
      .min(8, "Password must have at least 8 characters"),
    confirmPassword: z.string().min(1, "Password confirmation is required"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Password do not match",
  });

function SignUpForm() {
  const router = useRouter();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof FormSchema>) => {
    try {
      const response = await fetch("/api/user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: values.email,
          username: values.username,
          password: values.password,
        }),
      });

      const json = await response.json();

      if (json.status === 409) {
        form.setError(json.field, { message: json.message });
      }

      // todo show an altert to tell the user his account is successfully created
      if (json.status === 201) {
        router.push(`/sign-in?email=${values.email}`);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full">
        <div className="space-y-6">
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input placeholder="johndoe" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="johndoe@mail.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input type="password" placeholder="********" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Confirm password</FormLabel>
                <FormControl>
                  <Input placeholder="********" type="password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <Button
          className="w-full mt-6 bg-second-gradient/80 hover:bg-second-gradient text-background font-bold"
          disabled={form.formState.isSubmitting}
        >
          {form.formState.isSubmitting && (
            <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
          )}
          Sign Up
        </Button>
      </form>
      <p className="text-center text-sm text-gray-600 mt-2">
        Already have an account ?&nbsp;
        <Link
          className="text-second-gradient/80 hover:text-second-gradient"
          href="/sign-in"
        >
          Sign In
        </Link>
      </p>
    </Form>
  );
}

export default SignUpForm;
