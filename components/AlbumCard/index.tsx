import Image from "next/image";

import { CardBody, CardContainer, CardItem } from "@/components/ui/3d-card";

export interface AlbumCardProps {
  actionButton?: React.ReactNode;
  album: string;
  artist: string;
  image: string;
  release_date: string;
  showBlurBackground: boolean;
}

const AlbumCard: React.FC<AlbumCardProps> = ({
  actionButton,
  album,
  artist,
  image,
  release_date,
  showBlurBackground,
}) => (
  <CardContainer className="group rounded-xl h-full w-56">
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

      {showBlurBackground && (
        <Image
          alt={album}
          className="absolute -z-10 scale-95 inset-0 blur-md overflow-hidden h-full w-full opacity-40 group-hover:scale-100 group-hover:opacity-100 duration-300 object-cover rounded-xl shadow-xl"
          height={200}
          src={image}
          width={200}
        />
      )}

      <div className="flex flex-col gap-2 mt-4">
        <CardItem
          translateZ="50"
          className="font-bold text-white bg-black bg-opacity-30 max-w-48 p-2 rounded-sm truncate"
        >
          {album}
        </CardItem>

        <CardItem
          as="p"
          translateZ="60"
          className="text-white text-sm bg-black bg-opacity-30 max-w-48 p-2 rounded-sm truncate"
        >
          {artist}
        </CardItem>

        <CardItem
          as="p"
          translateZ="70"
          className="text-white h-fit text-sm bg-black p-2 rounded-sm bg-opacity-30"
        >
          {new Date(release_date).toLocaleDateString("en-us", {
            year: "numeric",
            month: "long",
          })}
        </CardItem>

        {actionButton && (
          <CardItem
            as="p"
            translateZ="60"
            className="absolute bottom-0 right-0 flex items-center justify-center text-white text-sm bg-black p-2 rounded-md bg-opacity-30 opacity-0 group-hover:opacity-100"
          >
            {actionButton}
          </CardItem>
        )}
      </div>
    </CardBody>
  </CardContainer>
);
export default AlbumCard;
