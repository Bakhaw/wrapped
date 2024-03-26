"use client";

import { useQuery } from "@tanstack/react-query";

import { getUserWrapped } from "@/app/api/user/methods";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import AddNewWrapButton from "@/components/AddNewWrapButton";
import AlbumCard from "@/components/AlbumCard";
import { cn } from "@/lib/utils";

function Wrapped() {
  const {
    isPending,
    error,
    data: wrapped,
  } = useQuery({
    queryKey: ["getUserWrapped"],
    queryFn: async () => await getUserWrapped(),
  });

  // todo add this in tailwind theme
  const accordionColors = [
    // Other Colors
    {
      bg: "#E896FA",
    },
    {
      bg: "#FFFF55",
    },
    {
      bg: "#83EE92",
    },
    {
      bg: "#DB3325",
      useWhiteText: true,
    },
    {
      bg: "#6793EC",
    },
    {
      bg: "#E19A5A",
    },
    // Other Colors
    // "#1C1917",
    // "#262220",
    // "#302A27",
    // "#3B3330",
    // "#493E3A",
    // Other Colors
    // "#4D3000",
    // "#3F2700",
    // "#302008",
    // "#1D180F",
    // "#16120C",
  ];

  if (error) return null;

  if (isPending)
    return (
      <div className="flex justify-center items-center h-full">
        Wrappping...
      </div>
    );

  if (wrapped.length === 0)
    return (
      <div className="flex justify-center items-center h-full">
        No wraps found
      </div>
    );

  return (
    <ul className="flex flex-col justify-center gap-4">
      <Accordion type="multiple">
        {wrapped.map((item, index) => (
          <AccordionItem
            key={item.year}
            value={item.year.toString()}
            style={{
              backgroundColor: accordionColors[index].bg,
            }}
          >
            <AccordionTrigger className="px-4">
              <p
                className={cn(
                  "font-black text-3xl md:text-6xl",
                  accordionColors[index]?.useWhiteText
                    ? "text-accent"
                    : "text-accent-foreground"
                )}
              >
                {item.year}
              </p>
            </AccordionTrigger>
            <AccordionContent className="px-2 py-4">
              {item.albums.length > 0 ? (
                <ul className="flex flex-wrap gap-4">
                  {item.albums.map((album, index) => (
                    <li key={index}>
                      <AlbumCard
                        album={album.album}
                        artist={album.artist}
                        image={album.image}
                        release_date={album.release_date}
                      />
                    </li>
                  ))}
                </ul>
              ) : (
                <AddNewWrapButton year={item.year.toString()} />
              )}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </ul>
  );
}

export default Wrapped;
