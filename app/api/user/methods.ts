import { Album } from "@prisma/client";
import { signOut } from "next-auth/react";

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

// export async function getCurrentUserWrapped() {
//   const res = await fetch("/api/user");
//   const json = (await res.json()) as UserResponse;

//   if (res.status === 404) {
//     signOut({ callbackUrl: "/sign-in" });
//   }

//   return json.user.wrapped;
// }

export async function deleteCurrentUser() {
  const res = await fetch("/api/user", { method: "DELETE" });
  const json = await res.json();

  if (res.status === 200) {
    signOut({ callbackUrl: "/sign-in" });
  }

  return json;
}

export async function getUserByUsername(username: string) {
  const res = await fetch(`/api/user/${username}`);
  const json = (await res.json()) as UserResponse;

  return json.user;
}
