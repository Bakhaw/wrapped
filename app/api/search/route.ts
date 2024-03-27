import { NextResponse } from "next/server";
import SpotifyWebApi from "spotify-web-api-node";

import { Album } from "@/types";

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

  const searchResponse: Album[] =
    search.body.albums?.items.map((album) => ({
      albumId: album.id,
      artist: {
        artistId: album.artists[0].id,
        name: album.artists[0].name,
      },
      name: album.name,
      playlistId: "",
      thumbnails: [
        {
          height: album.images[0].height ?? 100,
          url: album.images[0].url,
          width: album.images[0].width ?? 100,
        },
      ],
      release_date: album.release_date,
      year: new Date(album.release_date).getFullYear().toString(),
    })) ?? [];

  return NextResponse.json(searchResponse);
}
