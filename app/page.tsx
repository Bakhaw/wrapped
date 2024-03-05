import { use } from "react";
import { GrLineChart } from "react-icons/gr";

import { getAlbums } from "@/app/api/albums/methods";

import Wrapped from "@/components/Wrapped";
import Title from "@/components/Title";

function Home() {
  const albums = use(getAlbums());

  return (
    <main className="min-h-screen lg:p-24">
      <div
        className="flex justify-start items-center gap-2 p-4"
        style={{
          backgroundColor: "#F7CBAE",
        }}
      >
        <Title>WRAPPED</Title>
        <GrLineChart className="h-8 w-8 text-gray-800" />
      </div>

      <Wrapped albums={albums} />
    </main>
  );
}

export default Home;
