import Image from "next/image";

import { CardBody, CardContainer, CardItem } from "@/components/ui/3d-card";

export interface AlbumCardProps {
  actionButton?: React.ReactNode;
  album: string;
  artist: string;
  image: string;
  release_date: string | number;
}

const AlbumCard: React.FC<AlbumCardProps> = ({
  actionButton,
  album,
  artist,
  image,
  release_date,
}) => (
  <CardContainer className="group rounded-xl h-full w-72 md:w-56 lg:w-80">
    <CardBody className="p-4 bg-transparent h-full rounded-xl ring-1 ring-white/[0.3] hover:shadow-2xl hover:shadow-white/[0.1]">
      <CardItem translateZ="50" className="mx-auto">
        <Image
          alt={album}
          className="h-full w-full object-cover rounded-xl shadow-xl group-hover:ring-1 group-hover:ring-white/[0.3]"
          src={image}
          height={140}
          width={140}
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
        className="font-bold text-white mt-4 w-fit max-w-64 md:max-w-52 lg:max-w-72"
      >
        <h1 className="bg-black p-2 rounded-sm bg-opacity-30 truncate">
          {artist} - {album}
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
