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
  <CardContainer className="group rounded-xl h-full w-44">
    <CardBody className="p-4 bg-white/20 h-full rounded-xl ring ring-white/[0.4] hover:shadow-2xl hover:shadow-white/[0.1]">
      <CardItem translateZ="50" className="mx-auto">
        <Image
          alt={album}
          className="h-full w-full object-cover rounded-xl shadow-xl ring ring-white/[0.4]"
          src={image}
          height={140}
          width={140}
        />
      </CardItem>

      {/* <Image
        src={image}
        height={200}
        width={200}
        className="absolute -z-10 inset-0 overflow-hidden h-full w-full zopacity-40 group-hover:zopacity-100 duration-300 object-cover rounded-xl shadow-xl"
        alt={album}
      /> */}

      <CardItem
        translateZ="50"
        className="font-bold text-white mt-4 w-fit max-w-36"
      >
        <h1 className="bg-black p-2 rounded-sm bg-opacity-30 truncate">
          {album}
        </h1>
      </CardItem>

      <div className="w-full flex justify-between mt-2">
        <CardItem
          as="p"
          translateZ="60"
          className="text-white h-fit text-sm bg-black p-2 rounded-sm bg-opacity-30"
        >
          {/* {release_date} */}
          {artist}
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
