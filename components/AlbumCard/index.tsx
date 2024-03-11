import Image from "next/image";
import { CardBody, CardContainer, CardItem } from "../ui/3d-card";
import { PlusCircledIcon } from "@radix-ui/react-icons";

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
    <CardBody className="bg-transparent h-auto border border-white/[0.1] relative group/card hover:shadow-2xl hover:shadow-yellow-500/[0.1] w-auto sm:w-[25rem] rounded-xl p-6">
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
        className="text-xl font-bold text-white mt-2 bg-black p-2 rounded-sm bg-opacity-30"
      >
        {album} • {release_date}
      </CardItem>
      <div className="w-full flex justify-between">
        <CardItem
          as="p"
          translateZ="60"
          className="text-white h-fit text-sm mt-2 bg-black p-2 rounded-sm bg-opacity-30"
        >
          {artist}
        </CardItem>

        <CardItem
          as="p"
          translateZ="60"
          className="text-white text-sm max-w-sm mt-2 mb-4 bg-black p-2 rounded-sm bg-opacity-30 transition-all opacity-0 group-hover:opacity-100"
        >
          <PlusCircledIcon className="h-8 w-8 cursor-pointer transition-all hover:scale-125" />
        </CardItem>
      </div>
    </CardBody>
  </CardContainer>
);
export default AlbumCard;
