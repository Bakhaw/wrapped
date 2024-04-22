"use client";

import { useQuery } from "@tanstack/react-query";

import { getUserByUsername } from "@/app/api/user/methods";

import Title from "@/components/Title";
import Wrapped from "@/components/Wrapped";

function WrapppersDetailPage({ params }: { params: { username: string } }) {
  const { data: user } = useQuery({
    queryKey: ["getUserByUsername", params.username],
    queryFn: async () => await getUserByUsername(params.username),
    enabled: Boolean(params.username),
  });

  if (!user) return <div>Loading....</div>;

  return (
    <div>
      <Title className="mb-2">{user.username}</Title>

      <Wrapped showEditButton={false} wrapped={user.wrapped} />
    </div>
  );
}

export default WrapppersDetailPage;
