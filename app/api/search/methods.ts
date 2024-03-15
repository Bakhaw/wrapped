import { Album } from "@/types";

export type SearchResponse = Album[];

export async function searchFromApi(query: string): Promise<SearchResponse> {
  const url = `/api/search?query=${query}`;
  const res = await fetch(url);
  const search = await res.json();

  return search;
}
