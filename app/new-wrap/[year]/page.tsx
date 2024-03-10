"use client";

import { useMemo } from "react";
import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";

import { search } from "@/app/api/search/methods";

import SearchBar from "@/components/SearchBar";
import Title from "@/components/Title";
import AlbumCard from "@/components/AlbumCard";

function Home({ searchParams }: { searchParams: { search?: string } }) {
  const params = useParams();
  const searchQuery = searchParams.search;

  const {
    isPending,
    error,
    data: searchResponse,
  } = useQuery({
    queryKey: ["search", searchQuery],
    queryFn: async () => {
      if (!searchQuery) return;

      return await search(searchQuery);
    },
    enabled: typeof searchQuery === "string" && searchQuery !== "",
  });

  const filterSearchResponseByYear = useMemo(
    () =>
      searchResponse?.filter((album) => album.year?.toString() === params.year),
    [params, searchResponse]
  );

  return (
    <section className="flex flex-col gap-8 p-4 lg:px-0">
      <div className="flex flex-col gap-4">
        <Title>Add a new {params.year} wrap</Title>
        <SearchBar
          placeholder={`Search your favorite albums of ${params.year}`}
        />
      </div>

      {searchQuery && isPending && <div>Pending...</div>}

      {searchQuery && searchResponse?.length === 0 && (
        <div>
          No results found for {searchQuery} in {params.year}
        </div>
      )}

      {filterSearchResponseByYear && filterSearchResponseByYear.length > 0 && (
        <div className="flex flex-col gap-4">
          <Title>Albums released in {params.year}</Title>
          <ul className="flex flex-wrap gap-4">
            {filterSearchResponseByYear.map((album) => (
              <li key={album.albumId}>
                <AlbumCard
                  album={album.name}
                  artist={album.artist.name}
                  image={album.thumbnails[3].url}
                  release_date={album.year ?? ""}
                />
              </li>
            ))}
          </ul>
        </div>
      )}

      {searchResponse && searchResponse.length > 0 && (
        <div className="flex flex-col gap-4">
          <Title>All results</Title>
          <ul className="flex flex-wrap gap-4">
            {searchResponse.map((album) => (
              <li key={album.albumId}>
                <AlbumCard
                  album={album.name}
                  artist={album.artist.name}
                  image={album.thumbnails[3].url}
                  release_date={album.year ?? ""}
                />
              </li>
            ))}
          </ul>
        </div>
      )}
    </section>
  );
}

export default Home;
