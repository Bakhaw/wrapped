import { AlbumCardProps } from "@/components/AlbumCard";

interface WrappedItem {
  albums: AlbumCardProps[];
  year: number;
}

export type WrappedResponse = WrappedItem[];

export async function getWrapped(): Promise<WrappedResponse> {
  const url = `${process.env.APP_BASE_URL}/api/wrapped`;
  const res = await fetch(url);
  const { albums } = await res.json();

  return albums;
}
