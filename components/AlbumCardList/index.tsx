import { MinusCircledIcon, PlusCircledIcon } from "@radix-ui/react-icons";

import { Album } from "@/types";

// import { Button } from "@/components/ui/button";
// import {
//   Drawer,
//   DrawerClose,
//   DrawerContent,
//   DrawerDescription,
//   DrawerFooter,
//   DrawerHeader,
//   DrawerTitle,
//   DrawerTrigger,
// } from "@/components/ui/drawer";

import AlbumCard from "@/components/AlbumCard";

interface AlbumCardListProps {
  isAlbumAddedToWrap: (album: Album) => boolean;
  onAdd: (album: Album) => void;
  onRemove: (album: Album) => void;
  albums: Album[];
}

function AlbumCardList({
  albums,
  isAlbumAddedToWrap,
  onAdd,
  onRemove,
}: AlbumCardListProps) {
  // todo handle drawer showing when an album release isn't the same year as the selected year
  //   function handleDrawerTriggerClick(album: Album) {
  //     if (album.year?.toString() !== year?.toString()) {
  //       setDrawerOpen;
  //     } else {
  //       onAdd(album);
  //     }
  //   }

  const ActionButton = ({ album }: { album: Album }) =>
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
    <ul className="flex flex-wrap items-center justify-center gap-4 md:justify-start mx-auto md:mx-0">
      {albums.map((album) => (
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

export default AlbumCardList;
