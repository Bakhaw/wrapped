import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const query = searchParams.get("query");

  if (!query) throw new Error("search: query param not provided");

  const url = `${process.env.GENIUS_API_BASE_URL}/?search=${query}`;

  const res = await fetch(url, {
    method: "GET",
    headers: {
      Authorization: "Bearer " + process.env.GENIUS_API_ACCESS_TOKEN,
      "Content-Type": "application/json",
    },
  });

  const json = await res.json();

  return NextResponse.json({ json });
}
