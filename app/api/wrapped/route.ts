import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";

import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";

export async function GET(req: Request) {
  const session = await getServerSession(authOptions);

  if (!session || !session.user.email)
    return NextResponse.json({ message: "Not Authenticated" }, { status: 401 });

  try {
    const user = await db.user.findUnique({
      where: {
        email: session.user.email,
      },
      include: {
        wrapped: {
          include: {
            albums: true,
          },
        },
      },
    });
    const userWrapped = user?.wrapped ?? [];
    return NextResponse.json({ wrapped: userWrapped }, { status: 200 });
  } catch (error) {
    console.log(error);

    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 }
    );
  }

  return NextResponse.json({ albums: [] });
}

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);

  if (!session)
    return NextResponse.json({ message: "Not Authenticated" }, { status: 401 });

  const { albums, year } = await req.json();

  try {
    const newWrap = await db.wrap.create({
      data: {
        albums: {
          create: albums,
        },
        year,
        ownerEmail: session.user.email,
      },
    });

    return NextResponse.json({ newWrap }, { status: 200 });
  } catch (error) {
    console.log(error);

    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 }
    );
  }
}
