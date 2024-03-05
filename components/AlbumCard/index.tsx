import Image from "next/image";

export interface AlbumCardProps {
  image: string;
  subtitle: string;
  title: string;
}

const AlbumCard: React.FC<AlbumCardProps> = ({ image, subtitle, title }) => (
  <div className="flex flex-col items-center w-full">
    <div className="relative h-auto w-full">
      <Image
        alt={title}
        src={image}
        height={128}
        width={128}
        className="object-cover"
      />
    </div>

    {/* <div className="p-2 max-w-32">
      <h1 className="text-base text-gray-100 font-bold truncate">{title}</h1>
      <h2 className="text-sm text-gray-300 truncate">{subtitle}</h2>
    </div> */}
  </div>
);

export default AlbumCard;
