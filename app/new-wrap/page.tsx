"use client";

import { useMemo } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";

import { searchFromApi } from "@/app/api/search/methods";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import AlbumCard from "@/components/AlbumCard";
import SearchBar from "@/components/SearchBar";
import Title from "@/components/Title";

function Home({
  searchParams,
}: {
  searchParams: { search?: string; year?: string };
}) {
  const pathname = usePathname();
  const { replace } = useRouter();
  const { search, year } = searchParams;

  const {
    isPending,
    error,
    data: searchResponse,
  } = useQuery({
    queryKey: ["search", search],
    queryFn: async () => {
      if (!search) return;

      return await searchFromApi(search);
    },
    enabled: typeof search === "string" && search !== "",
  });

  const filterSearchResponseByYear = useMemo(
    () => searchResponse?.filter((album) => album.year?.toString() === year),
    [searchResponse, year]
  );

  function onSelectYearChange(value: string) {
    const params = new URLSearchParams(searchParams);

    if (value) {
      params.set("year", value);
    } else {
      params.delete("year");
    }

    replace(`${pathname}?${params.toString()}`);
  }
  const currentYear = new Date().getFullYear();
  const years = Array.from(new Array(50), (val, index) => currentYear - index);

  return (
    <section className="flex flex-col gap-8 px-4">
      <Title>Add a new wrap</Title>

      <div className="flex flex-col gap-2">
        <label>Select a year</label>
        <Select onValueChange={onSelectYearChange} defaultValue={year}>
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {years.map((year) => (
              <SelectItem key={year} value={year.toString()}>
                {year}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="flex flex-col gap-2">
        <label>Search your favorite albums</label>
        <SearchBar placeholder="Drake - More Life" />
      </div>

      {search && isPending && (
        <div className="flex justify-center items-center h-full">
          Wrappping...
        </div>
      )}

      {search && searchResponse?.length === 0 && (
        <div>
          No results found for {search} in {year}
        </div>
      )}

      {filterSearchResponseByYear && (
        <div className="flex flex-col gap-4">
          <Title>Released in {year}</Title>

          {filterSearchResponseByYear?.length === 0 && (
            <div>
              No results found for <b>{search}</b> in{" "}
              <b>{year ?? currentYear}</b>
            </div>
          )}

          <ul className="flex flex-wrap gap-8">
            {filterSearchResponseByYear?.map((album) => (
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
              <li className="mb-10" key={album.albumId}>
                <AlbumCard
                  album={album.name}
                  artist={album.artist.name}
                  image={album.thumbnails[3]?.url}
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
