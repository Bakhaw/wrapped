"use client";

import { ChangeEvent, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";

import { searchFromApi } from "@/app/api/search/methods";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
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

  function onSelectYearChange(e: ChangeEvent<HTMLSelectElement>) {}

  const currentYear = new Date().getFullYear();
  const years = Array.from(new Array(50), (val, index) => currentYear - index);

  return (
    <section className="flex flex-col gap-8 lg:px-0">
      <Title>Add a new wrap</Title>

      <Select>
        <SelectTrigger className="w-[280px]">
          <SelectValue placeholder="Select a timezone" />
        </SelectTrigger>
        <SelectContent>
          {years.map((year) => (
            // <SelectLabel>Select a year</SelectLabel>
            <SelectItem key={year} value={year.toString()}>
              {year}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {/* <div className="flex flex-col gap-1">
        <label htmlFor="">Select a year</label>

        <select onChange={onSelectYearChange}>
          {years.map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </select>
      </div> */}

      <div className="flex flex-col gap-1">
        <label htmlFor="">Search your favorite albums</label>
        <SearchBar placeholder="Drake - More Life" />
      </div>

      {search && isPending && <div>Pending...</div>}

      {search && searchResponse?.length === 0 && (
        <div>
          No results found for {search} in {year}
        </div>
      )}

      {filterSearchResponseByYear && filterSearchResponseByYear.length > 0 && (
        <div className="flex flex-col gap-4">
          <Title>Albums released in {year}</Title>
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
