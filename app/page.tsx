"use client";

import Link from "next/link";
import { useQuery } from "@tanstack/react-query";

import { getWrapped } from "@/app/api/wrapped/methods";

import AddNewWrapButton from "@/components/AddNewWrapButton";
import Title from "@/components/Title";
import Wrapped from "@/components/Wrapped";

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
      <div className="flex justify-between items-center gap-4 p-4 lg:px-0">
        <Title>WRAPPPED</Title>
        <Link href="/new-wrap">
          <AddNewWrapButton />
        </Link>
      </div>

      {wrapped && <Wrapped wrapped={wrapped} />}
    </section>
  );
}

export default Home;
