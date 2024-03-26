"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";
import { CircleUser, Menu, Package2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

import SignOutButton from "@/components/SignOutButton";
import Title from "@/components/Title";
import AddNewWrapButton from "../AddNewWrapButton";

function Header() {
  const pathname = usePathname();
  const { data: session, status } = useSession();
  const currentYear = new Date().getFullYear().toString();

  if (
    !session?.user ||
    status !== "authenticated" ||
    pathname === "/sign-in" ||
    pathname === "/sign-up"
  )
    return null;

  return (
    <header className="sticky z-50 top-0 flex h-16 items-center gap-4 border-b bg-background px-2 md:px-0 md:py-8">
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" size="icon" className="shrink-0">
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle navigation menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="flex flex-col justify-between">
          <nav className="grid gap-6 text-lg font-medium">
            <Link
              href="#"
              className="flex items-center gap-2 text-lg font-semibold"
            >
              <Package2 className="h-6 w-6" />
              <span className="sr-only">Acme Inc</span>
            </Link>
            <Link href="/" className="hover:text-foreground">
              WRAPPPED
            </Link>
            <Link
              href={`/new-wrap?year=${currentYear}`}
              className="hover:text-foreground"
            >
              NEW WRAP
            </Link>
          </nav>

          <div className="space-y-2">
            <span className="font-thin">
              Logged as <b>{session.user.username}</b>
            </span>
            <SignOutButton />
          </div>
        </SheetContent>
      </Sheet>

      <nav className="hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
        <Link href="/">
          <Title className="md:text-xl">WRAPPPED</Title>
        </Link>
      </nav>

      <div className="ml-auto">
        <AddNewWrapButton />
      </div>

      {/* <div className="flex w-full justify-end items-center gap-4 md:ml-auto md:gap-2 lg:gap-4">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="secondary" size="icon" className="rounded-full">
              <CircleUser className="h-5 w-5" />
              <span className="sr-only">Toggle user menu</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>@{data?.user.username}</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="py-0">
              <SignOutButton />
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div> */}
    </header>
  );
}

export default Header;
