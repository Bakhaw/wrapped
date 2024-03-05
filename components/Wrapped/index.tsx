"use client";

import { Accordion, AccordionItem } from "@nextui-org/react";

import AlbumCard, { AlbumCardProps } from "@/components/AlbumCard";
import Title from "@/components/Title";

interface WrappedProps {
  albums: {
    [key: string]: {
      bgColor: string;
      data: AlbumCardProps[];
    };
  };
}

function Wrapped({ albums }: WrappedProps) {
  return (
    <div className="flex flex-col justify-center gap-4">
      <Accordion selectionMode="multiple" className="p-0">
        {Object.keys(albums).map((year: string) => (
          <AccordionItem
            key={year}
            title={<Title>{year}</Title>}
            aria-label={`Accordion ${year}`}
            className="px-4"
            style={{
              backgroundColor: albums[year].bgColor,
            }}
          >
            {albums[year].data?.length > 0 ? (
              <ul className="flex flex-wrap gap-4">
                {albums[year].data.map((album, index) => (
                  <li key={index} className="w-28">
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
