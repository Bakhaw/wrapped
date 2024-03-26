"use client";

import { signOut } from "next-auth/react";

import { Button } from "@/components/ui/button";

function SignOutButton() {
  return (
    <Button
      className="p-0 w-full"
      onClick={() => signOut({ callbackUrl: "/sign-in" })}
    >
      Sign out
    </Button>
  );
}

export default SignOutButton;
