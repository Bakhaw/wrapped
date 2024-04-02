import { NextResponse } from "next/server";
import SpotifyWebApi from "spotify-web-api-node";
import { Album } from "@prisma/client";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const query = searchParams.get("query");

  if (!query) throw new Error("search: query param not provided");

  const credentials = {
    clientId: process.env.SPOTIFY_CLIENT_ID,
    clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
  };

  const spotifyApi = new SpotifyWebApi(credentials);
  const clientCredentials = await spotifyApi.clientCredentialsGrant();

  spotifyApi.setAccessToken(clientCredentials.body.access_token);

  const search = await spotifyApi.search(query, ["album"]);

  const searchResponse: Omit<Album, "wrapId">[] =
    search.body.albums?.items.map((album) => ({
      id: album.id,
      album: album.name,
      artist: album.artists[0].name,
      image: album.images[0].url,
      release_date: album.release_date,
    })) ?? [];

  return NextResponse.json(searchResponse);
}
