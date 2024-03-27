import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";

import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);

  if (!session || !session.user.email)
    return NextResponse.json({ message: "Not Authenticated" }, { status: 401 });

  const { albums, year } = await req.json();

  try {
    const existingWrap = await db.wrap.findFirst({
      where: {
        ownerId: session.user.id,
        year: year,
      },
      include: {
        albums: true,
      },
    });

    if (existingWrap) {
      const updatedWrap = await db.wrap.update({
        where: {
          id: existingWrap.id,
        },
        data: {
          albums: {
            deleteMany: {},
            create: albums,
          },
        },
        include: {
          albums: true,
        },
      });

      return NextResponse.json({ updatedWrap }, { status: 200 });
    } else {
      const newWrap = await db.wrap.create({
        data: {
          albums: {
            create: albums,
          },
          ownerId: session.user.id,
          year,
        },
        include: {
          albums: true,
        },
      });

      return NextResponse.json({ newWrap }, { status: 200 });
    }
  } catch (error) {
    console.log(error);

    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 }
    );
  }
}
