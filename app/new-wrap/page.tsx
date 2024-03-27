"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { Wrap } from "@prisma/client";

import { Album } from "@/types";

import { searchFromApi } from "@/app/api/search/methods";
import { deleteWrap, getWrapByYear, saveWrap } from "@/app/api/wrap/methods";

import { Button } from "@/components/ui/button";
import { Icons } from "@/components/ui/icons";
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
  const { replace, push } = useRouter();
  const { search, year } = searchParams;

  const [wrap, setWrap] = useState<Wrap>();
  const [selectedAlbums, setSelectedAlbums] = useState<Album[]>([]);
  const [isSavingWrap, setIsSavingWrap] = useState(false);
  const [isDeletingWrap, setIsDeletingWrap] = useState(false);

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

  async function handleSaveButtonClick() {
    if (!year) return;

    setIsSavingWrap(true);

    const formattedAlbums = selectedAlbums.map((album) => ({
      album: album.name,
      artist: album.artist.name,
      id: album.albumId,
      image: album.thumbnails[0].url,
      release_date: album.year,
    }));

    await saveWrap({
      albums: formattedAlbums,
      year,
    });

    setIsSavingWrap(false);
  }

  async function handleDeleteButtonClick() {
    if (!wrap) return;

    setIsDeletingWrap(true);

    const deletedWrap = await deleteWrap(wrap.id);

    if (deletedWrap.status === 200) {
      push("/");
    }
  }

  // TODO re-think ?
  useEffect(() => {
    if (!year) return;

    async function initWrap(year: string) {
      const wrap = await getWrapByYear(year);
      setWrap(wrap);

      if (!wrap) {
        return setSelectedAlbums([]);
      }

      const formattedWrap: Album[] = wrap.albums.map((album) => ({
        albumId: album.id,
        artist: {
          artistId: "",
          name: album.artist,
        },
        name: album.album,
        playlistId: "",
        release_date: wrap.year,
        year: wrap.year,
        thumbnails: [
          {
            height: 60,
            width: 60,
            url: album.image,
          },
          {
            height: 120,
            width: 120,
            url: album.image,
          },
          {
            height: 226,
            width: 226,
            url: album.image,
          },
          {
            height: 544,
            width: 544,
            url: album.image,
          },
        ],
        type: "ALBUM",
      }));

      setSelectedAlbums(formattedWrap);
    }

    initWrap(year);
  }, [year]);

  const filterSearchResponseByYear = searchResponse?.filter(
    (item) => item.year?.toString() === year
  );

  const currentYear = new Date().getFullYear();
  const years = Array.from(new Array(50), (val, index) => currentYear - index);

  return (
    <section className="flex flex-col gap-8 px-2 py-4">
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
            <div className="text-center md:text-left">
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
          <Title className="text-center md:text-left">
            All results for &quot;{search}&quot;
          </Title>

          {searchResponse?.length === 0 ? (
            <div className="text-center md:text-left">
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

      {year && (
        <div className="flex flex-col gap-4">
          <Title className="text-center md:text-left">your {year} wrap</Title>

          {selectedAlbums?.length === 0 ? (
            <div className="text-center md:text-left">
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

      <Button
        className="w-full mt-6 bg-second-gradient/80 hover:bg-second-gradient text-background font-bold"
        disabled={selectedAlbums.length === 0 || isSavingWrap || isDeletingWrap}
        onClick={handleSaveButtonClick}
      >
        {isSavingWrap && (
          <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
        )}
        Save
      </Button>

      {wrap && (
        <Button
          className="w-full bg-destructive/80 hover:bg-destructive text-background font-bold"
          disabled={isDeletingWrap || isSavingWrap}
          onClick={handleDeleteButtonClick}
        >
          {isDeletingWrap && (
            <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
          )}
          Delete this wrap
        </Button>
      )}
    </section>
  );
}

export default Home;
