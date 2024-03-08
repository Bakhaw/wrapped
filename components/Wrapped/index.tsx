"use client";

import { CardStackPlusIcon } from "@radix-ui/react-icons";

import { WrappedResponse } from "@/app/api/wrapped/methods";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";

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
                <div className="p-2">
                  <Button className="uppercase font-bold rounded-lg text-foreground text-xs px-5 py-2.5 bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 hover:bg-gradient-to-br hover:ring-4 hover:ring-amber-300 focus:ring-4 focus:ring-amber-300 focus:scale-95 transition-all duration-150">
                    <CardStackPlusIcon className="mr-2 h-5 w-5" />
                    Add a new wrap
                  </Button>
                </div>
              )}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </ul>
  );
}

export default Wrapped;
