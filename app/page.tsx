import { use } from "react";

import { getAlbums } from "@/app/api/albums/methods";

import Wrapped from "@/components/Wrapped";
import Title from "@/components/Title";

function Home() {
  const { albums } = use(getAlbums());

  return (
    <main className="flex flex-col gap-8 min-h-screen p-8 lg:p-24">
      <Title>WRAPPED</Title>

      <ul className="flex flex-col-reverse gap-20">
        {Object.keys(albums).map((year) => (
          <Wrapped key={year} albums={albums[year]} title={year} />
        ))}
      </ul>
    </main>
  );
}

export default Home;
