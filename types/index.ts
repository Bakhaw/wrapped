export type Album = {
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
