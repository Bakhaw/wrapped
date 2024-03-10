import { NextResponse } from "next/server";

import { AlbumCardProps } from "@/components/AlbumCard";
import { WrappedResponse } from "./methods";

const mockedAlbumCard: AlbumCardProps = {
  artist: "Josman",
  album: "J.000.$",
  image:
    "https://music.bakhaw.dev/_next/image?url=https%3A%2F%2Fi.scdn.co%2Fimage%2Fab67616d0000b2735a7c027718559ea175420718&w=1920&q=75",
  release_date: 2023,
};

const mockedWrapped: WrappedResponse = [
  {
    albums: [mockedAlbumCard, mockedAlbumCard, mockedAlbumCard],
    year: 2024,
  },
  {
    albums: [mockedAlbumCard],
    year: 2023,
  },
  {
    albums: [mockedAlbumCard, mockedAlbumCard],
    year: 2022,
  },
  {
    albums: [],
    year: 2021,
  },
  {
    albums: [],
    year: 2020,
  },
];

// TODO link this function with back-end service (strapi)
export async function GET(req: Request) {
  return NextResponse.json({ albums: mockedWrapped });
}
