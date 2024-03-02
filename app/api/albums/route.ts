import { NextResponse } from "next/server";

import { AlbumCardProps } from "@/components/AlbumCard";

const mockedAlbumCard: AlbumCardProps = {
  image:
    "https://music.bakhaw.dev/_next/image?url=https%3A%2F%2Fi.scdn.co%2Fimage%2Fab67616d0000b2735a7c027718559ea175420718&w=1920&q=75",
  subtitle: "Josman",
  title: "J.000.$",
};

const mockedAlbums = {
  ["2024" as string]: [mockedAlbumCard, mockedAlbumCard],
  "2023": [],
  "2022": [mockedAlbumCard],
  "2021": [
    mockedAlbumCard,
    mockedAlbumCard,
    mockedAlbumCard,
    mockedAlbumCard,
    mockedAlbumCard,
  ],
};

// TODO link this function with back-end service (strapi)
export async function GET(req: Request) {
  return NextResponse.json({ albums: mockedAlbums });
}
