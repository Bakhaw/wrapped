import AlbumCard, { AlbumCardProps } from "@/components/AlbumCard";
import Title from "@/components/Title";

interface WrappedProps {
  albums: AlbumCardProps[];
  title: string;
}

function Wrapped({ albums, title }: WrappedProps) {
  return (
    <div className="flex flex-col justify-center gap-4">
      <Title>{title}</Title>

      <ul className="flex flex-wrap gap-4">
        {albums.map((album, index) => (
          <li key={index}>
            <AlbumCard {...album} />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Wrapped;
