import { AlbumCardProps } from "@/components/AlbumCard";

interface WrappedItem {
  albums: AlbumCardProps[];
  year: number;
}

export type WrappedResponse = WrappedItem[];

export async function getWrapped(): Promise<WrappedResponse> {
  const res = await fetch("/api/wrapped");
  const { wrapped } = await res.json();

  return wrapped;
}

// TODO fix any type
export async function saveWrap({ albums, year }: any) {
  const res = await fetch("/api/wrapped", {
    method: "POST",
    body: JSON.stringify({
      albums,
      year,
    }),
  });

  const json = await res.json();

  if (res.status === 500) {
    // TODO show error alert
    console.error(`An error occured when creating your ${year} wrap`);
  }

  if (res.status === 200) {
    // TODO show success alert
    console.log(`${year} Wrap created with success`, json);
  }
}
