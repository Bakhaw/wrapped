import { signOut } from "next-auth/react";
import { Album } from "@prisma/client";

interface UserResponse {
  user: {
    id: string;
    email: string;
    image: string | null;
    createdAt: Date;
    updatedAt: Date;
    username: string;
    password: string;
    wrapped: {
      id: string;
      albums: Album[];
      year: string;
      ownerId: string | null;
    }[];
  };
}

export async function getUserWrapped() {
  const res = await fetch("/api/user");
  const json = (await res.json()) as UserResponse;

  if (res.status === 404) {
    signOut({ callbackUrl: "/sign-in" });
  }

  return json.user.wrapped;
}

export async function deleteCurrentUser() {
  const res = await fetch("/api/user", { method: "DELETE" });
  const json = await res.json();

  if (res.status === 200) {
    signOut({ callbackUrl: "/sign-in" });
  }

  return json;
}
