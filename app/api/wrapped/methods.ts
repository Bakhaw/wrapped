import { AlbumCardProps } from "@/components/AlbumCard";

interface WrappedItem {
  albums: AlbumCardProps[];
  year: number;
}

export type WrappedResponse = WrappedItem[];

export async function getWrapped(): Promise<WrappedResponse> {
  const res = await fetch("/api/wrapped");
  const { albums } = await res.json();

  return albums;
}
