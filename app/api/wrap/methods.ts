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

// TODO fix any type
export async function saveWrap({ albums, year }: any) {
  const res = await fetch("/api/wrap", {
    method: "PUT",
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
