"use client";

import { Accordion, AccordionItem } from "@nextui-org/react";

import { WrappedResponse } from "@/app/api/wrapped/methods";

import AlbumCard from "@/components/AlbumCard";
import Title from "@/components/Title";

interface WrappedProps {
  wrapped: WrappedResponse;
}

function Wrapped({ wrapped }: WrappedProps) {
  const accordionColors = [
    "#E896FA",
    "#FFFF55",
    "#83EE92",
    "#E896FA",
    "#FFFF55",
    "#83EE92",
  ];

  return (
    <div className="flex flex-col justify-center gap-4">
      <Accordion selectionMode="multiple" className="p-0">
        {wrapped.map((item, index) => (
          <AccordionItem
            key={item.year}
            title={<Title>{item.year}</Title>}
            aria-label={`Accordion ${item.year}`}
            className="px-4"
            style={{
              backgroundColor: accordionColors[index],
            }}
          >
            {item.albums.length > 0 ? (
              <ul className="flex flex-wrap gap-4">
                {item.albums.map((album, index) => (
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
