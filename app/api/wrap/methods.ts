import { Album, Wrap as PrismaWrap } from "@prisma/client";

interface Wrap extends PrismaWrap {
  albums: Album[];
}

interface WrapResponse {
  wrap: Wrap;
}

export async function getWrapByYear(year: string) {
  const res = await fetch(`/api/wrap/${year}`);
  const json = (await res.json()) as WrapResponse;

  return json.wrap;
}

export async function saveWrap({
  albums,
  year,
}: {
  albums: Omit<Album, "wrapId">[];
  year: string;
}) {
  const res = await fetch("/api/wrap", {
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
    console.log(`${year} Wrap saved with success`, json);
  }
}

interface DeleteWrapResponse {
  wrap: Wrap;
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
