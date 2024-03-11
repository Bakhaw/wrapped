import Image from "next/image";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";

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
  <Card className="w-80">
    <CardHeader>
      <Image
        alt={album}
        src={image}
        height={16}
        width={136}
        className="w-full h-full object-cover"
      />
    </CardHeader>
    <CardContent>
      <h1 className="font-black line-clamp-2">{album}</h1>
      <h2 className="text-sm font-bold line-clamp-2">{artist}</h2>
    </CardContent>
    <CardFooter>
      <p className="text-sm font-bold">{release_date}</p>
    </CardFooter>
  </Card>
);

export default AlbumCard;
