import { AlbumCardProps } from "@/components/AlbumCard";

export interface AlbumsResponse {
  [key: string]: {
    bgColor: string;
    data: AlbumCardProps[];
  };
}

export async function getAlbums(): Promise<AlbumsResponse> {
  const url = `${process.env.APP_BASE_URL}/api/albums`;
  const res = await fetch(url);
  const { albums } = await res.json();

  return albums;
}
