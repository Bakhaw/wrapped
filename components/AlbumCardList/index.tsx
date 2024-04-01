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
  showBlurBackground?: boolean; // default false
}

function AlbumCardList({
  albums,
  isAlbumAddedToWrap,
  onAdd,
  onRemove,
  showBlurBackground = false,
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
        className="cursor-pointer h-6 w-6 text-white hover:scale-[1.15] duration-300"
        onClick={() => onRemove(album)}
      />
    ) : (
      <PlusCircledIcon
        className="cursor-pointer h-6 w-6 text-white hover:scale-[1.15] duration-300"
        onClick={() => onAdd(album)}
      />
    );

  return (
    <ul className="grid grid-cols-2 sm:grid-cols-5 gap-4">
      {albums?.map((album) => (
        <li key={album.albumId}>
          <AlbumCard
            album={album.name}
            artist={album.artist.name}
            image={album.thumbnails[0].url}
            release_date={album.release_date}
            actionButton={<ActionButton album={album} />}
            showBlurBackground={showBlurBackground}
          />
        </li>
      ))}
    </ul>
  );
}

export default AlbumCardList;
