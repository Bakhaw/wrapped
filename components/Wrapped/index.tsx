import AlbumCard, { AlbumCardProps } from "@/components/AlbumCard";
import Title from "@/components/Title";

interface WrappedProps {
  albums: AlbumCardProps[];
  title: string;
}

function Wrapped({ albums, title }: WrappedProps) {
  return (
    <div className="flex flex-col justify-center">
      <Title>{title}</Title>

      <ul className="flex gap-2">
        {albums.map((album, index) => (
          <li key={`${album}__${index}`}>
            <AlbumCard {...album} />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Wrapped;
