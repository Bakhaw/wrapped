"use client";

import { useQuery } from "@tanstack/react-query";

import { getCurrentUserWrapped } from "@/app/api/user/methods";

import Wrapped from "@/components/Wrapped";

function Home() {
  const { data: wrapped } = useQuery({
    queryKey: ["getCurrentUserWrapped"],
    queryFn: getCurrentUserWrapped,
  });

  return (
    <section className="flex flex-col h-full">
      <Wrapped wrapped={wrapped} />
    </section>
  );
}

export default Home;
