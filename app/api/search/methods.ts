import { Album } from "@/types";

export async function searchFromApi(query: string) {
  const url = `/api/search?query=${query}`;
  const res = await fetch(url);
  const search = (await res.json()) as Album[];

  return search;
}
