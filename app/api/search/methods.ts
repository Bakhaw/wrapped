export type SearchAlbumItem = {
  type: "ALBUM";
  albumId: string;
  playlistId: string;
  name: string;
  artist: {
    artistId: string | null;
    name: string;
  };
  year: number | null;
  thumbnails: {
    url: string;
    width: number;
    height: number;
  }[];
};

export type SearchResponse = SearchAlbumItem[];

export async function searchFromApi(query: string): Promise<SearchResponse> {
  const url = `/api/search?query=${query}`;
  const res = await fetch(url);
  const search = await res.json();

  return search;
}
