import { NextResponse } from "next/server";

import { db } from "@/lib/db";

export async function GET(
  req: Request,
  { params }: { params: { username: string } }
) {
  try {
    if (!params.username) {
      return NextResponse.json(
        { user: null },
        { status: 401, statusText: "Username parameter not provided" }
      );
    }

    const user = await db.user.findFirst({
      where: {
        username: params.username,
      },
      include: {
        wrapped: {
          include: {
            albums: true,
          },
          orderBy: [
            {
              year: "desc",
            },
          ],
        },
      },
    });

    if (!user)
      return NextResponse.json(
        { user: null },
        { status: 404, statusText: "User Not Found" }
      );

    const { password, ...safeUser } = user;

    return NextResponse.json(
      {
        user: safeUser,
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.log(error);

    return NextResponse.json(
      {
        user: null,
      },
      {
        status: 500,
        statusText: "Something went wrong",
      }
    );
  }
}
