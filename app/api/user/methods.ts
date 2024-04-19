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

export async function getUserByUsername(username: string) {
  const res = await fetch(`/api/user/${username}`);
  const json = (await res.json()) as UserResponse;

  return json.user;
}
