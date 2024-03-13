import Image from "next/image";

import { CardBody, CardContainer, CardItem } from "@/components/ui/3d-card";

export interface AlbumCardProps {
  actionButton: React.ReactNode;
  artist: string;
  album: string;
  image: string;
  release_date: string | number;
}

const AlbumCard: React.FC<AlbumCardProps> = ({
  actionButton,
  artist,
  album,
  image,
  release_date,
}) => (
  <CardContainer className="group rounded-xl">
    <CardBody className="relative p-6 bg-transparent h-full rounded-xl border border-white/[0.4] hover:shadow-2xl hover:shadow-white/[0.1]">
      <CardItem translateZ="50">
        <Image
          src={image}
          height={200}
          width={200}
          className="h-full w-full object-cover rounded-xl shadow-xl border border-white/[0.4]"
          alt={album}
        />
      </CardItem>

      <Image
        src={image}
        height={200}
        width={200}
        className="absolute -z-10 inset-0 blur-sm h-full w-full object-cover rounded-xl shadow-xl"
        alt={album}
      />

      <CardItem
        translateZ="50"
        className="font-bold text-white mt-4 bg-black p-2 rounded-sm bg-opacity-30 w-auto truncate"
      >
        {artist} • {album}
      </CardItem>

      <div className="w-full flex justify-between">
        <CardItem
          as="p"
          translateZ="60"
          className="text-white h-fit text-sm mt-2 bg-black p-2 rounded-sm bg-opacity-30"
        >
          {release_date}
        </CardItem>

        <CardItem
          as="p"
          translateZ="60"
          className="text-white text-sm bg-black mt-2 p-2 rounded-sm bg-opacity-30 opacity-0 group-hover:opacity-100"
        >
          {actionButton}
        </CardItem>
      </div>
    </CardBody>
  </CardContainer>
);
export default AlbumCard;
