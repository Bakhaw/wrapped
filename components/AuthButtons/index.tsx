"use client";

import { useState } from "react";
import { signOut } from "next-auth/react";

import { Button } from "@/components/ui/button";
import { Icons } from "@/components/ui/icons";

function SignOutButton() {
  const [isLoading, setIsLoading] = useState(false);

  function handleButtonClick() {
    setIsLoading(true);
    signOut({ callbackUrl: "/sign-in" });
  }

  return (
    <Button
      className="w-full"
      disabled={isLoading}
      onClick={handleButtonClick}
      variant="outline"
    >
      {isLoading && <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />}
      Sign out
    </Button>
  );
}

export default SignOutButton;
