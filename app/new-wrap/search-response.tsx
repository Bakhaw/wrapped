import { useRef, useState } from "react";
import { MinusCircledIcon, PlusCircledIcon } from "@radix-ui/react-icons";

import {
  SearchAlbumItem,
  SearchResponse as SearchResponseType,
} from "../api/search/methods";

import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";

import AlbumCard from "@/components/AlbumCard";

interface SearchResponseProps {
  isAlbumAddedToWrap: (album: SearchAlbumItem) => boolean;
  onAdd: (album: SearchAlbumItem) => void;
  onRemove: (album: SearchAlbumItem) => void;
  searchResponse: SearchResponseType;
  year: string;
}

function SearchResponse({
  isAlbumAddedToWrap,
  onRemove,
  onAdd,
  searchResponse,
  year,
}: SearchResponseProps) {
  //   function handleDrawerTriggerClick(album: SearchAlbumItem) {
  //     if (album.year?.toString() !== year?.toString()) {
  //       setDrawerOpen;
  //     } else {
  //       onAdd(album);
  //     }
  //   }
  const [open, setOpen] = useState(false);

  const ActionButton = ({ album }: { album: SearchAlbumItem }) =>
    isAlbumAddedToWrap(album) ? (
      <MinusCircledIcon
        className="cursor-pointer h-6 w-6 hover:scale-[1.15] duration-300"
        onClick={() => onRemove(album)}
      />
    ) : (
      <PlusCircledIcon
        className="cursor-pointer h-6 w-6 hover:scale-[1.15] duration-300"
        onClick={() => onAdd(album)}
      />
    );

  return (
    <ul className="flex flex-wrap gap-4 justify-center md:justify-start mx-auto md:mx-0">
      {searchResponse.map((album) => (
        <li key={album.albumId}>
          <AlbumCard
            album={album.name}
            artist={album.artist.name}
            image={album.thumbnails[3]?.url}
            release_date={album.year ?? ""}
            actionButton={<ActionButton album={album} />}
          />
        </li>
      ))}
    </ul>
  );
}

export default SearchResponse;
