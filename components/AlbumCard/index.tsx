import Image from "next/image";
import { CardBody, CardContainer, CardItem } from "../ui/3d-card";

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
  <CardContainer className="inter-var">
    <CardBody className="border bg-transparent border-white/[0.2] relative group/card hover:shadow-2xl hover:shadow-yellow-500/[0.1] w-auto sm:w-[25rem] h-auto rounded-xl p-6">
      <Image
        src={image}
        height="1000"
        width="1000"
        className="absolute blur-2xl	top-0 left-0 w-full object-cover rounded-xl group-hover/card:shadow-xl"
        alt="thumbnail"
      />
      <CardItem translateZ="100" className="w-full mt-2">
        <Image
          src={image}
          height="1000"
          width="1000"
          className="h-60 w-full object-cover rounded-xl group-hover/card:shadow-xl"
          alt="thumbnail"
        />
      </CardItem>
      <CardItem translateZ="50" className="text-xl font-bold text-white mt-2">
        {album} • {release_date}
      </CardItem>
      <CardItem
        as="p"
        translateZ="60"
        className="text-white text-sm max-w-sm mt-2 mb-4"
      >
        {artist}
      </CardItem>
    </CardBody>
  </CardContainer>
);

export default AlbumCard;
