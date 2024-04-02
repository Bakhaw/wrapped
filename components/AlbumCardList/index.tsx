import { MinusCircledIcon, PlusCircledIcon } from "@radix-ui/react-icons";
import { Album } from "@prisma/client";

import { cn } from "@/lib/utils";

import AlbumCard from "@/components/AlbumCard";

interface AlbumCardListProps {
  albums: Album[];
  className?: string;
  isAlbumAddedToWrap: (albumId: Album["id"]) => boolean;
  onAdd: (album: Album) => void;
  onRemove: (album: Album) => void;
  showBlurBackground?: boolean; // default false
}

function AlbumCardList({
  albums,
  className,
  isAlbumAddedToWrap,
  onAdd,
  onRemove,
  showBlurBackground = false,
}: AlbumCardListProps) {
  const ActionButton = ({ album }: { album: Album }) =>
    isAlbumAddedToWrap(album.id) ? (
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
    <ul className={cn("grid grid-cols-2 sm:grid-cols-4 gap-4", className)}>
      {albums?.map((album) => (
        <li key={album.id}>
          <AlbumCard
            album={album.album}
            artist={album.artist}
            image={album.image}
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
