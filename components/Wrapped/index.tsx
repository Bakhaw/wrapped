"use client";

import { useQuery } from "@tanstack/react-query";

import { getUserWrapped } from "@/app/api/user/methods";

import { cn } from "@/lib/utils";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import AlbumCard from "@/components/AlbumCard";

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

  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

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
            <AccordionTrigger
              className={cn(
                "font-black px-4 text-3xl",
                accordionColors[index]?.useWhiteText
                  ? "text-accent"
                  : "text-accent-foreground"
              )}
            >
              {item.year}
            </AccordionTrigger>
            <AccordionContent>
              <Accordion type="multiple">
                {months.map((month) => (
                  <AccordionItem key={month} value={month}>
                    <AccordionTrigger
                      className={cn(
                        "font-black px-4 text-2xl",
                        accordionColors[index]?.useWhiteText
                          ? "text-accent"
                          : "text-accent-foreground"
                      )}
                    >
                      <div>
                        {month}
                        <sup className="text-sm ml-1">
                          ❜{item.year.substring(2, 4)}
                        </sup>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="px-4 text-accent-foreground">
                      <ul className="flex flex-wrap gap-4">
                        {item.albums.map((album, index) => {
                          const albumReleaseMonth = new Date(
                            album.release_date
                          ).toLocaleDateString("en-us", {
                            month: "short",
                          }); // gives "Feb" for 2018-02-22 (YYYY-MM-DD)

                          return albumReleaseMonth === month ? (
                            <li key={index}>
                              <AlbumCard
                                album={album.album}
                                artist={album.artist}
                                image={album.image}
                                release_date={album.release_date}
                                showBlurBackground={false}
                              />
                            </li>
                          ) : null;
                        })}
                      </ul>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </ul>
  );
}

export default Wrapped;
