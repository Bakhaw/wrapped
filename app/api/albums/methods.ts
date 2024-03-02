import { AlbumCardProps } from "@/components/AlbumCard";

interface AlbumsResponse {
  albums: { [key: string]: AlbumCardProps[] };
}

export async function getAlbums(): Promise<AlbumsResponse> {
  const url = `${process.env.APP_BASE_URL}/api/albums`;
  const { signal } = new AbortController();

  const res = await fetch(url, { signal });
  const json = res.json();

  return json;
}
