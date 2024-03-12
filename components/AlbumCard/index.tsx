import Image from "next/image";
import { PlusCircledIcon } from "@radix-ui/react-icons";

import { CardBody, CardContainer, CardItem } from "@/components/ui/3d-card";

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
  <CardContainer className="group rounded-xl inter-var">
    <CardBody className="relative bg-transparent h-[440px] p-6 rounded-xl border border-white/[0.2] hover:shadow-2xl hover:shadow-white/[0.1]">
      <Image
        src={image}
        height="1000"
        width="1000"
        className="absolute blur-sm top-0 left-0 h-[100%] w-full object-cover rounded-xl shadow-xl"
        alt="thumbnail"
      />
      <CardItem translateZ="100" className="w-full mt-2">
        <Image
          src={image}
          height="1000"
          width="1000"
          className="h-60 w-full object-cover rounded-xl shadow-xl"
          alt="thumbnail"
        />
      </CardItem>

      <CardItem
        translateZ="50"
        className="text-xl font-bold text-white mt-2 bg-black p-2 rounded-sm bg-opacity-30 line-clamp-3"
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
          <PlusCircledIcon className="cursor-pointer h-8 w-8 hover:scale-[1.15] duration-300" />
        </CardItem>
      </div>
    </CardBody>
  </CardContainer>
);
export default AlbumCard;
