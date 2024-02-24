import Image from "next/image";

export interface AlbumCardProps {
  image: string;
  subtitle: string;
  title: string;
}

const AlbumCard: React.FC<AlbumCardProps> = ({ image, subtitle, title }) => (
  <div className="flex rounded-lg h-14 ring-1 ring-gray-300">
    <div className="relative w-14">
      <Image
        alt={title}
        src={image}
        layout="fill"
        className="object-cover rounded-l-lg"
      />
    </div>

    <div className="p-2 max-w-36 font-mono">
      <h1 className="text-md text-zinc-200 truncate">{title}</h1>
      <h2 className="text-xs text-zinc-300 truncate">{subtitle}</h2>
    </div>
  </div>
);

export default AlbumCard;
