"use client";

import { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";

import { Album } from "@/types";

import { searchFromApi } from "@/app/api/search/methods";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import AlbumCardList from "@/components/AlbumCardList";
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

  const [selectedAlbums, setSelectedAlbums] = useState<Album[]>([]);

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

  function onSelectYearChange(value: string) {
    const params = new URLSearchParams(searchParams);

    if (value) {
      params.set("year", value);
    } else {
      params.delete("year");
    }

    replace(`${pathname}?${params.toString()}`);
  }

  function isAlbumAddedToWrap(selectedAlbum: Album) {
    return Boolean(
      selectedAlbums.find((album) => album.albumId === selectedAlbum.albumId)
    );
  }

  function addAlbumToSelection(selectedAlbum: Album) {
    const newAlbums = [...selectedAlbums, selectedAlbum];
    setSelectedAlbums(newAlbums);
  }

  function removeAlbumFromSelection(selectedAlbum: Album) {
    const newAlbums = selectedAlbums.filter(
      (album) => album.albumId !== selectedAlbum.albumId
    );
    setSelectedAlbums(newAlbums);
  }

  const filterSearchResponseByYear = searchResponse?.filter(
    (item) => item.year?.toString() === year
  );

  const currentYear = new Date().getFullYear();
  const years = Array.from(new Array(50), (val, index) => currentYear - index);

  return (
    <section className="flex flex-col gap-8 px-4">
      <Title className="text-center md:text-left">new wrap</Title>

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

      {searchResponse && searchResponse.length > 0 && (
        <div className="flex flex-col gap-4">
          <Title className="text-center md:text-left">
            Results for &quot;{search}&quot; in {year}
          </Title>

          {filterSearchResponseByYear?.length === 0 ? (
            <div>
              No results found for <b>{search}</b> in <b>{year}</b>
            </div>
          ) : (
            <AlbumCardList
              albums={filterSearchResponseByYear ?? []}
              isAlbumAddedToWrap={isAlbumAddedToWrap}
              onAdd={addAlbumToSelection}
              onRemove={removeAlbumFromSelection}
            />
          )}
        </div>
      )}

      {searchResponse && (
        <div className="flex flex-col gap-4">
          <Title className="text-center md:text-left">
            All results for &quot;{search}&quot;
          </Title>

          {searchResponse?.length === 0 ? (
            <div>
              No results found for <b>{search}</b>
            </div>
          ) : (
            <AlbumCardList
              albums={searchResponse}
              isAlbumAddedToWrap={isAlbumAddedToWrap}
              onAdd={addAlbumToSelection}
              onRemove={removeAlbumFromSelection}
            />
          )}
        </div>
      )}

      {year && searchResponse && searchResponse.length > 0 && (
        <div className="flex flex-col gap-4 min-h-96">
          <Title className="text-center md:text-left">your {year} wrap</Title>

          {selectedAlbums.length === 0 ? (
            <div>
              Your favorite <b>{year}</b> albums will be shown here
            </div>
          ) : (
            <AlbumCardList
              albums={selectedAlbums}
              isAlbumAddedToWrap={isAlbumAddedToWrap}
              onAdd={addAlbumToSelection}
              onRemove={removeAlbumFromSelection}
            />
          )}
        </div>
      )}
    </section>
  );
}

export default Home;
