"use client";

import { WrappedResponse } from "@/app/api/wrapped/methods";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import AlbumCard from "@/components/AlbumCard";
import Title from "@/components/Title";

interface WrappedProps {
  wrapped: WrappedResponse;
}

function Wrapped({ wrapped }: WrappedProps) {
  // todo add this in tailwind theme
  const accordionColors = [
    "#E896FA",
    "#FFFF55",
    "#83EE92",
    "#6793EC",
    "#E19A5A",
  ];

  return (
    <ul className="flex flex-col justify-center gap-4">
      <Accordion type="multiple">
        {wrapped.map((item, index) => (
          <AccordionItem
            key={item.year}
            value={item.year.toString()}
            className="px-4"
            style={{
              backgroundColor: accordionColors[index],
            }}
          >
            <AccordionTrigger>
              <Title>{item.year}</Title>
            </AccordionTrigger>
            <AccordionContent>
              {item.albums.length > 0 ? (
                <ul className="flex flex-wrap gap-4">
                  {item.albums.map((album, index) => (
                    <li key={index} className="w-28">
                      <AlbumCard {...album} />
                    </li>
                  ))}
                </ul>
              ) : (
                <h2 className="text-gray-800">No items found</h2>
              )}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </ul>
  );
}

export default Wrapped;
