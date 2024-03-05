import { use } from "react";

import { getAlbums } from "@/app/api/albums/methods";

import Wrapped from "@/components/Wrapped";
import Title from "@/components/Title";

function Home() {
  const { albums } = use(getAlbums());

  return (
    <main className="flex flex-col min-h-screen lg:p-24">
      <Title className="p-4 py-8">WRAPPED</Title>

      <Wrapped albums={albums} />
    </main>
  );
}

export default Home;
