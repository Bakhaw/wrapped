import { use } from "react";
import { GrLineChart } from "react-icons/gr";

import { getWrapped } from "@/app/api/wrapped/methods";

import Wrapped from "@/components/Wrapped";
import Title from "@/components/Title";

function Home() {
  const wrapped = use(getWrapped());

  return (
    <main className="min-h-screen lg:p-24">
      <div
        className="flex justify-start items-center gap-4 p-4"
        style={{
          backgroundColor: "#F7CBAE",
        }}
      >
        <Title>WRAPPED</Title>
        <GrLineChart className="h-8 w-8 lg:h-12 lg:w-12 text-gray-800" />
      </div>

      <Wrapped wrapped={wrapped} />
    </main>
  );
}

export default Home;
