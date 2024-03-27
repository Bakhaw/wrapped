export type Album = {
  albumId: string;
  name: string;
  artist: {
    artistId: string;
    name: string;
  };
  release_date: string;
  thumbnails: {
    url: string;
    width: number;
    height: number;
  }[];
};
