"use client";

import { useQuery } from "@tanstack/react-query";
import { GrLineChart } from "react-icons/gr";

import { getWrapped } from "@/app/api/wrapped/methods";

import Wrapped from "@/components/Wrapped";
import Title from "@/components/Title";

function Home() {
  const {
    isPending,
    error,
    data: wrapped,
  } = useQuery({
    queryKey: ["getWrapped"],
    queryFn: async () => await getWrapped(),
  });

  return (
    <section>
      <div className="flex justify-start items-center gap-4 p-4 lg:px-0">
        <Title>WRAPPPED</Title>
        <GrLineChart className="h-8 w-8 lg:h-12 lg:w-12 text-amber-950" />
      </div>

      {wrapped && <Wrapped wrapped={wrapped} />}
    </section>
  );
}

export default Home;
