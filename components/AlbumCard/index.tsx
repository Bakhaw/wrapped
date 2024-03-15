import Image from "next/image";

import { CardBody, CardContainer, CardItem } from "@/components/ui/3d-card";

export interface AlbumCardProps {
  actionButton?: React.ReactNode;
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
    <CardBody className="p-6 bg-transparent h-full rounded-xl ring-1 ring-white/[0.3] hover:shadow-2xl hover:shadow-white/[0.1]">
      <CardItem translateZ="50">
        <Image
          src={image}
          height={200}
          width={200}
          className="h-full w-full object-cover rounded-xl shadow-xl group-hover:ring-1 group-hover:ring-white/[0.3]"
          alt={album}
        />
      </CardItem>

      <Image
        src={image}
        height={200}
        width={200}
        className="absolute -z-10 inset-0 blur-sm overflow-hidden h-full w-full opacity-40 group-hover:opacity-100 duration-300 object-cover rounded-xl shadow-xl"
        alt={album}
      />

      <CardItem
        translateZ="50"
        className="font-bold text-white mt-4 w-fit max-w-60"
      >
        <h1 className="bg-black p-2 rounded-sm bg-opacity-30 truncate">
          {artist} • {album}
        </h1>
      </CardItem>

      <div className="w-full flex justify-between mt-2">
        <CardItem
          as="p"
          translateZ="60"
          className="text-white h-fit text-sm  bg-black p-2 rounded-sm bg-opacity-30"
        >
          {release_date}
        </CardItem>

        {actionButton && (
          <CardItem
            as="p"
            translateZ="60"
            className="flex items-center justify-center text-white text-sm bg-black p-2 rounded-sm bg-opacity-30 opacity-0 group-hover:opacity-100"
          >
            {actionButton}
          </CardItem>
        )}
      </div>
    </CardBody>
  </CardContainer>
);
export default AlbumCard;
