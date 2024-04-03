import { Album } from "@prisma/client";

import { FullWrap } from "@/types";

export async function getWrapByYear(
  year: string
): Promise<FullWrap | undefined> {
  const res = await fetch(`/api/wrap/${year}`);
  const json = await res.json();

  return json.wrap;
}

interface SaveWrapResponse {
  wrap: FullWrap;
  status: number;
}

export async function saveWrap({
  albums,
  year,
}: {
  albums: Album[];
  year: string;
}): Promise<SaveWrapResponse> {
  const safeAlbums = albums.map((album) => {
    const { id, wrapId, ...safeAlbum } = album;
    return safeAlbum;
  });

  const res = await fetch("/api/wrap", {
    method: "POST",
    body: JSON.stringify({
      albums: safeAlbums,
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
    console.log(`${year} Wrap saved with success`, json);
  }

  return {
    ...json,
    status: res.status,
  };
}

interface DeleteWrapResponse {
  wrap: FullWrap;
  status: number;
}

export async function deleteWrap(wrapId: string): Promise<DeleteWrapResponse> {
  const res = await fetch(`/api/wrap/${wrapId}`, { method: "DELETE" });
  const json = await res.json();

  return {
    ...json,
    status: res.status,
  };
}
