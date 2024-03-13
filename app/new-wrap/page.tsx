"use client";

import { useRef, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { MinusCircledIcon, PlusCircledIcon } from "@radix-ui/react-icons";

import { SearchAlbumItem, searchFromApi } from "@/app/api/search/methods";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
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

  const [selectedAlbums, setSelectedAlbums] = useState<SearchAlbumItem[]>([]);

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

  const isAlbumAddedToWrap = (selectedAlbum: SearchAlbumItem) =>
    selectedAlbums.find((album) => album.albumId === selectedAlbum.albumId);

  function toggleAddAlbum(selectedAlbum: SearchAlbumItem) {
    if (selectedAlbum.year?.toString() !== year?.toString()) {
      alertDialogRef.current?.click();
      return;
    }

    if (isAlbumAddedToWrap(selectedAlbum)) {
      removeAlbumFromSelection(selectedAlbum);
    } else {
      addAlbumToSelection(selectedAlbum);
    }
  }

  function addAlbumToSelection(selectedAlbum: SearchAlbumItem) {
    const newAlbums = [...selectedAlbums, selectedAlbum];
    setSelectedAlbums(newAlbums);
  }

  function removeAlbumFromSelection(selectedAlbum: SearchAlbumItem) {
    const newAlbums = selectedAlbums.filter(
      (album) => album.albumId !== selectedAlbum.albumId
    );
    setSelectedAlbums(newAlbums);
  }

  const currentYear = new Date().getFullYear();
  const years = Array.from(new Array(50), (val, index) => currentYear - index);

  const alertDialogRef = useRef<HTMLButtonElement>(null);

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
          No results found for <b>{search}</b> in <b>{year}</b>
        </div>
      )}

      {searchResponse && searchResponse.length > 0 && (
        <div className="flex flex-col gap-4">
          <Title className="text-center md:text-left">
            Your wrap for {year}
          </Title>

          {selectedAlbums.length === 0 && (
            <div className="text-center md:text-left">
              Add your favorite albums here
            </div>
          )}

          <ul className="flex flex-wrap gap-4 justify-center md:justify-start mx-auto md:mx-0">
            {selectedAlbums.map((album) => (
              <li key={album.albumId}>
                <AlbumCard
                  album={album.name}
                  artist={album.artist.name}
                  image={album.thumbnails[3]?.url}
                  release_date={album.year ?? ""}
                  actionButton={
                    <MinusCircledIcon
                      className="cursor-pointer h-6 w-6 hover:scale-[1.15] duration-300"
                      onClick={() => removeAlbumFromSelection(album)}
                    />
                  }
                />
              </li>
            ))}
          </ul>
        </div>
      )}

      {searchResponse && searchResponse.length > 0 && (
        <div className="flex flex-col gap-4">
          <Title className="text-center md:text-left">All results</Title>

          <ul className="flex flex-wrap gap-4 justify-center md:justify-start mx-auto md:mx-0">
            {searchResponse.map((album) => (
              <li key={album.albumId}>
                <AlbumCard
                  album={album.name}
                  artist={album.artist.name}
                  image={album.thumbnails[3]?.url}
                  release_date={album.year ?? ""}
                  actionButton={
                    isAlbumAddedToWrap(album) ? (
                      <MinusCircledIcon
                        className="cursor-pointer h-6 w-6 hover:scale-[1.15] duration-300"
                        onClick={() => removeAlbumFromSelection(album)}
                      />
                    ) : (
                      <AlertDialog>
                        <AlertDialogTrigger>
                          <PlusCircledIcon
                            className="cursor-pointer h-6 w-6 hover:scale-[1.15] duration-300"
                            onClick={() => toggleAddAlbum(album)}
                          />
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                            <AlertDialogDescription>
                              This album was not relased in {year}
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction
                              onClick={() => addAlbumToSelection(album)}
                            >
                              Add anyway
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    )
                  }
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
