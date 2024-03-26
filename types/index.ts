export type Album = {
  albumId: string;
  playlistId: string;
  name: string;
  artist: {
    artistId: string;
    name: string;
  };
  release_date: string;
  year: string;
  thumbnails: {
    url: string;
    width: number;
    height: number;
  }[];
};
