import { NextResponse } from "next/server";
import YTMusic from "ytmusic-api";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const query = searchParams.get("query");

  if (!query) throw new Error("search: query param not provided");

  const ytmusic = new YTMusic();
  await ytmusic.initialize();

  const searchResponse = await ytmusic.searchAlbums(query);

  return NextResponse.json(searchResponse);
}
