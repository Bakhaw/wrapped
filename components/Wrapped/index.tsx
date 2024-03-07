"use client";

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
    "#6793EC",
    "#E19A5A",
  ];

  return (
    <ul className="flex flex-col justify-center gap-4">
      {wrapped.map((item, index) => (
        <li
          key={item.year}
          className="px-4"
          style={{
            backgroundColor: accordionColors[index],
          }}
        >
          <Title>{item.year}</Title>
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
        </li>
      ))}
    </ul>
  );
}

export default Wrapped;
