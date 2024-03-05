"use client";

import { Accordion, AccordionItem } from "@nextui-org/react";

import AlbumCard, { AlbumCardProps } from "@/components/AlbumCard";
import Title from "@/components/Title";

interface WrappedProps {
  albums: { [key: string]: AlbumCardProps[] };
  title?: string;
}

function Wrapped({ albums, title }: WrappedProps) {
  const defaultContent =
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.";

  console.log("albums", albums);

  return (
    <div className="flex flex-col justify-center gap-4">
      <Accordion selectionMode="multiple" className="p-0">
        {Object.keys(albums).map((year: string) => (
          <AccordionItem
            key={year}
            title={<Title>{year}</Title>}
            aria-label={`Accordion ${year}`}
            className="bg-red-900 px-4"
          >
            {albums[year].length > 0 ? (
              <ul className="grid grid-cols-2 gap-4 p-1">
                {albums[year].map((album, index) => (
                  <li key={index} className="w-32">
                    <AlbumCard {...album} />
                  </li>
                ))}
              </ul>
            ) : (
              <div>No items found</div>
            )}
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}

export default Wrapped;
