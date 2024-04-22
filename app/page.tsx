"use client";

import { useQuery } from "@tanstack/react-query";

import { getWrapped } from "@/app/api/me/methods";

import Wrapped from "@/components/Wrapped";

function Home() {
  const { data: wrapped } = useQuery({
    queryKey: ["getWrapped"],
    queryFn: getWrapped,
  });

  return (
    <section className="flex flex-col h-full">
      <Wrapped showEditButton wrapped={wrapped} />
    </section>
  );
}

export default Home;
