"use client";

import { useState } from "react";
import { signOut } from "next-auth/react";

import { deleteCurrentUser } from "@/app/api/user/methods";

import { Button } from "@/components/ui/button";
import { Icons } from "@/components/ui/icons";

function AuthButtons() {
  const [isSigningOut, setIsSigningOut] = useState(false);
  const [isDeletingAccount, setIsDeletingAccount] = useState(false);

  function handleSignOutButtonClick() {
    setIsSigningOut(true);
    signOut({ callbackUrl: "/sign-in" });
  }

  function handleDeleteAccountButtonClick() {
    setIsDeletingAccount(true);
    deleteCurrentUser();
  }

  return (
    <>
      <Button
        className="w-full"
        disabled={isSigningOut || isDeletingAccount}
        onClick={handleSignOutButtonClick}
        variant="outline"
      >
        {isSigningOut && (
          <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
        )}
        Sign out
      </Button>
      <Button
        className="w-full"
        disabled={isSigningOut || isDeletingAccount}
        onClick={handleDeleteAccountButtonClick}
        variant="destructive"
      >
        {isDeletingAccount && (
          <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
        )}
        Delete my account
      </Button>
    </>
  );
}

export default AuthButtons;
