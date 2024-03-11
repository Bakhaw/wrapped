import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

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
  <Card className="w-[350px]">
    <CardHeader>
      <Image
        alt={album}
        src={image}
        height={136}
        width={136}
        className="object-cover"
      />
    </CardHeader>
    <CardContent></CardContent>
    <CardFooter className="flex justify-between">
      <div>
        <h1 className="font-black line-clamp-2">{album}</h1>
        <h2 className="text-sm font-bold line-clamp-2">{artist}</h2>
      </div>

      <p className="text-sm font-bold">{release_date}</p>
    </CardFooter>
  </Card>
);

export default AlbumCard;
