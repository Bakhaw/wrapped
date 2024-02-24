import AlbumCard, { AlbumCardProps } from "@/components/AlbumCard";
import Title from "@/components/Title";
import Wrapped from "@/components/Wrapped";

function Home() {
  const albumCardProps: AlbumCardProps = {
    image:
      "https://music.bakhaw.dev/_next/image?url=https%3A%2F%2Fi.scdn.co%2Fimage%2Fab67616d0000b2735a7c027718559ea175420718&w=1920&q=75",
    subtitle: "Josman",
    title: "J.000.$",
  };

  const albums = {
    ["2024" as string]: [albumCardProps, albumCardProps],
    "2023": [],
    "2022": [albumCardProps],
    "2021": [albumCardProps, albumCardProps, albumCardProps],
  };

  return (
    <main className="min-h-screen p-24">
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
