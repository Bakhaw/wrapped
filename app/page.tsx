"use client";

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
    <section className="flex flex-col h-80">
      <div className="flex justify-between items-center gap-4 p-4">
        <Title>WRAPPPED</Title>
        <div className="md:hidden">
          <AddNewWrapButton />
        </div>

        <div className="hidden md:block">
          <AddNewWrapButton label="Add a new wrap" />
        </div>
      </div>

      {isPending && (
        <div className="flex justify-center items-center h-full">
          Wrappping...
        </div>
      )}

      {wrapped && <Wrapped wrapped={wrapped} />}
    </section>
  );
}

export default Home;
