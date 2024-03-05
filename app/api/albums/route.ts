import { NextResponse } from "next/server";

import { AlbumCardProps } from "@/components/AlbumCard";
import { AlbumsResponse } from "./methods";

const mockedAlbumCard: AlbumCardProps = {
  image:
    "https://music.bakhaw.dev/_next/image?url=https%3A%2F%2Fi.scdn.co%2Fimage%2Fab67616d0000b2735a7c027718559ea175420718&w=1920&q=75",
  subtitle: "Josman",
  title: "J.000.$",
};

const mockedAlbums: AlbumsResponse = {
  "2024": {
    bgColor: "#E896FA",
    data: [mockedAlbumCard, mockedAlbumCard, mockedAlbumCard],
  },
  "2023": {
    bgColor: "#FFFF55",
    data: [mockedAlbumCard, mockedAlbumCard, mockedAlbumCard],
  },
  "2022": {
    bgColor: "#83EE92",
    data: [mockedAlbumCard, mockedAlbumCard, mockedAlbumCard],
  },
};

// TODO link this function with back-end service (strapi)
export async function GET(req: Request) {
  return NextResponse.json({ albums: mockedAlbums });
}
