"use client";

import Link from "next/link";
import { useQuery } from "@tanstack/react-query";

import { getAllUsers } from "@/app/api/user/methods";

import Title from "@/components/Title";

function WrapppersPage() {
  const { data: users } = useQuery({
    queryKey: ["getAllUsers"],
    queryFn: getAllUsers,
  });

  return (
    <section className="flex flex-col gap-8 px-2 py-4">
      <Title>Explore wrapppers</Title>

      <ul className="flex flex-wrap gap-6">
        {users?.map((user) => (
          <Link
            href={`/wrapppers/${user.username}`}
            key={user.id}
            className="border p-4 rounded-md hover:bg-accent-foreground"
          >
            <h1>{user.username}</h1>
          </Link>
        ))}
      </ul>
    </section>
  );
}

export default WrapppersPage;
