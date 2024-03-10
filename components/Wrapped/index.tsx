"use client";

import Link from "next/link";

import { WrappedResponse } from "@/app/api/wrapped/methods";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import AlbumCard from "@/components/AlbumCard";
import Title from "@/components/Title";

import AddNewWrapButton from "./AddNewWrapButton";

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
            style={{
              backgroundColor: accordionColors[index],
            }}
          >
            <AccordionTrigger className="px-4">
              <Title>{item.year}</Title>
            </AccordionTrigger>
            <AccordionContent className="p-4">
              {item.albums.length > 0 ? (
                <ul className="flex flex-wrap gap-4">
                  {item.albums.map((album, index) => (
                    <li key={index}>
                      <AlbumCard {...album} />
                    </li>
                  ))}
                </ul>
              ) : (
                <Link href={`/new-wrap/${item.year}`}>
                  <AddNewWrapButton />
                </Link>
              )}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </ul>
  );
}

export default Wrapped;
