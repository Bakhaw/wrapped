import Image from "next/image";

export interface AlbumCardProps {
  artist: string;
  album: string;
  image: string;
  release_date: string | number;
}

const AlbumCard: React.FC<AlbumCardProps> = ({
  image,
  artist,
  album,
  release_date,
}) => (
  <div className="flex flex-col h-64 w-full rounded-b-sm text-amber-950 bg-amber-100 hover:ring-4 hover:ring-amber-950/60 transition-all duration-150">
    <Image
      alt={album}
      src={image}
      height={136}
      width={136}
      className="object-cover"
    />

    <div className="flex flex-col justify-between p-2 h-32 max-w-[136px] rounded-b-sm">
      <div>
        <h1 className="font-black line-clamp-2">{album}</h1>
        <h2 className="text-sm font-bold line-clamp-2">{artist}</h2>
      </div>

      <p className="text-sm font-bold">{release_date}</p>
    </div>
  </div>
);

export default AlbumCard;
