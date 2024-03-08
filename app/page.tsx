import { use } from "react";
import { GrLineChart } from "react-icons/gr";

import { getWrapped } from "@/app/api/wrapped/methods";

import Wrapped from "@/components/Wrapped";
import Title from "@/components/Title";

function Home() {
  const wrapped = use(getWrapped());

  return (
    <main className="min-h-screen lg:p-24 bg-amber-700">
      <div className="flex justify-start items-center gap-4 p-4 lg:px-0">
        <Title>WRAPPED</Title>
        <GrLineChart className="h-8 w-8 lg:h-12 lg:w-12 text-foreground" />
      </div>

      <Wrapped wrapped={wrapped} />
    </main>
  );
}

export default Home;
