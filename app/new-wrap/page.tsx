"use client";

import { useEffect, useMemo, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { Album } from "@prisma/client";

import { FullWrap } from "@/types";

import { searchFromApi } from "@/app/api/search/methods";
import { getWrapByYear } from "@/app/api/wrap/methods";

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

import WrapDrawer from "./wrap-drawer";

import SearchSvg from "@/images/search.svg";
import Image from "next/image";

function NewWrapPage({
  searchParams,
}: {
  searchParams: { search?: string; year?: string };
}) {
  const pathname = usePathname();
  const { replace } = useRouter();
  const { search, year } = searchParams;

  const [wrap, setWrap] = useState<FullWrap>();
  const [selectedAlbums, setSelectedAlbums] = useState<Album[]>([]);

  const { isPending, data: searchResponse } = useQuery({
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

  function isAlbumAddedToWrap(selectedAlbumId: string) {
    return Boolean(
      selectedAlbums.find((album) => album.id === selectedAlbumId)
    );
  }

  function addAlbumToSelection(selectedAlbum: Album) {
    const newAlbums = [...selectedAlbums, selectedAlbum];
    setSelectedAlbums(newAlbums);
  }

  function removeAlbumFromSelection(selectedAlbum: Album) {
    const newAlbums = selectedAlbums.filter(
      (album) => album.id !== selectedAlbum.id
    );
    setSelectedAlbums(newAlbums);
  }

  useEffect(() => {
    if (!year) return;

    async function refreshWrap(year: string) {
      const wrap = await getWrapByYear(year);
      setWrap(wrap);

      setSelectedAlbums(wrap?.albums ?? []);
    }

    refreshWrap(year);
  }, [year]);

  const filterSearchResponseByYear = useMemo(
    () =>
      searchResponse?.filter(
        (item) => new Date(item.release_date).getFullYear()?.toString() === year
      ),
    [searchResponse, year]
  );

  const currentYear = new Date().getFullYear();
  const years = Array.from(new Array(50), (val, index) => currentYear - index);

  return (
    <section className="flex flex-col gap-8 px-2 pt-4 pb-14">
      <Title className="text-center md:text-left">new wrap</Title>

      <div className="flex flex-col gap-2 w-full">
        <label className="text-primary font-bold">Select a year</label>
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

      <div className="flex flex-col gap-2 w-full">
        <label className="text-primary font-bold">
          Search your favorite albums
        </label>
        <SearchBar placeholder="Ipséité" />
      </div>

      {search && isPending && (
        <div className="flex flex-col justify-center items-center gap-4 h-full animate-pulse">
          <span className="block text-primary font-bold uppercase">
            Wrappping ...
          </span>
          <Image
            alt="search empty"
            priority
            src={SearchSvg}
            height={180}
            width={180}
          />
        </div>
      )}

      {searchResponse && searchResponse.length > 0 && (
        <div className="flex flex-col gap-4">
          <Title className="text-primary text-center md:text-left">
            Results in {year}
          </Title>

          {filterSearchResponseByYear?.length === 0 ? (
            <div className="text-primary text-center md:text-left">
              No results found for <b>{search}</b> in <b>{year}</b>
            </div>
          ) : (
            <AlbumCardList
              albums={filterSearchResponseByYear ?? []}
              isAlbumAddedToWrap={isAlbumAddedToWrap}
              onAdd={addAlbumToSelection}
              onRemove={removeAlbumFromSelection}
              showBlurBackground
            />
          )}
        </div>
      )}

      {searchResponse && (
        <div className="flex flex-col gap-4">
          <Title className="text-center md:text-left">All results</Title>

          {searchResponse?.length === 0 ? (
            <div className="text-primary text-center md:text-left">
              No results found for <b>{search}</b>
            </div>
          ) : (
            <AlbumCardList
              albums={searchResponse}
              isAlbumAddedToWrap={isAlbumAddedToWrap}
              onAdd={addAlbumToSelection}
              onRemove={removeAlbumFromSelection}
              showBlurBackground
            />
          )}
        </div>
      )}

      {year && selectedAlbums.length > 0 && (
        <div className="fixed bottom-6 self-center">
          <WrapDrawer
            albums={selectedAlbums}
            onAdd={addAlbumToSelection}
            onRemove={removeAlbumFromSelection}
            wrapId={wrap?.id}
            year={year}
          />
        </div>
      )}
    </section>
  );
}

export default NewWrapPage;
