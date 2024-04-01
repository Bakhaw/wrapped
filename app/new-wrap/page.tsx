"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { Wrap } from "@prisma/client";

import { Album } from "@/types";

import { searchFromApi } from "@/app/api/search/methods";
import { deleteWrap, getWrapByYear, saveWrap } from "@/app/api/wrap/methods";

import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerPortal,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
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

function NewWrapPage({
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
      image: album.thumbnails[0].url,
      release_date: album.release_date,
    }));

    const savedWrap = await saveWrap({
      albums: formattedAlbums,
      year,
    });

    if (savedWrap.status === 200) {
      push("/");
    }

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
        release_date: album.release_date,
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
    (item) => new Date(item.release_date).getFullYear()?.toString() === year
  );

  const currentYear = new Date().getFullYear();
  const years = Array.from(new Array(50), (val, index) => currentYear - index);

  return (
    <section className="flex flex-col gap-8 px-2 pt-4 pb-10">
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
          <Title className="text-center md:text-left">Results in {year}</Title>

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
          <Title className="text-center md:text-left">All results</Title>

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

      <Drawer>
        <DrawerTrigger asChild>
          <div className="bg-background">
            <Button
              variant="outline"
              className="uppercase fixed bottom-2 left-2 right-2 max-w-screen-lg mx-auto bg-second-gradient/80 hover:bg-second-gradient text-background font-bold"
            >
              your saved {year} wrap
            </Button>
          </div>
        </DrawerTrigger>
        <DrawerPortal>
          <DrawerOverlay className="fixed inset-0 bg-black/40" />
          <DrawerContent className="flex flex-col fixed bottom-0 left-0 right-0 max-h-[96%] rounded-t-[10px]">
            <div className="max-w-md w-full mx-auto flex flex-col overflow-auto p-4 rounded-t-[10px]">
              <DrawerHeader>
                <DrawerTitle className="uppercase">
                  your {year} wrap
                </DrawerTitle>
              </DrawerHeader>
              <div className="p-4 pb-0">
                {year && (
                  <div className="flex flex-col gap-4">
                    {selectedAlbums?.length === 0 ? (
                      <div className="text-center md:text-left">
                        Your favorite <b>{year}</b> albums will be shown here
                      </div>
                    ) : (
                      <AlbumCardList
                        className="sm:grid-cols-2"
                        albums={selectedAlbums}
                        isAlbumAddedToWrap={isAlbumAddedToWrap}
                        onAdd={addAlbumToSelection}
                        onRemove={removeAlbumFromSelection}
                      />
                    )}
                  </div>
                )}

                <div className="flex flex-col gap-2">
                  <Button
                    className="w-full mt-6 bg-second-gradient/80 hover:bg-second-gradient text-background font-bold"
                    disabled={
                      selectedAlbums.length === 0 ||
                      isSavingWrap ||
                      isDeletingWrap
                    }
                    onClick={handleSaveButtonClick}
                  >
                    {isSavingWrap && (
                      <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                    )}
                    Save
                  </Button>
                </div>
              </div>

              <DrawerFooter>
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
                <DrawerClose asChild>
                  <Button variant="outline">Cancel</Button>
                </DrawerClose>
              </DrawerFooter>
            </div>
          </DrawerContent>
        </DrawerPortal>
      </Drawer>
    </section>
  );
}

export default NewWrapPage;
