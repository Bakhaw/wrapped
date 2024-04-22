"use client";

import { useState } from "react";
import { signOut } from "next-auth/react";

import { deleteAccount } from "@/app/api/me/methods";

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
    deleteAccount();
  }

  return (
    <div className="flex flex-col gap-2">
      <Button
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
        disabled={isSigningOut || isDeletingAccount}
        onClick={handleDeleteAccountButtonClick}
        variant="destructive"
      >
        {isDeletingAccount && (
          <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
        )}
        Delete my account
      </Button>
    </div>
  );
}

export default AuthButtons;
