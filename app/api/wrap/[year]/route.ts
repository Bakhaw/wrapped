import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";

import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";

export async function GET(
  req: Request,
  { params }: { params: { year: string } }
) {
  const session = await getServerSession(authOptions);

  if (!session || !session.user.email)
    return NextResponse.json({ message: "Not Authenticated" }, { status: 401 });

  try {
    const wrap = await db.wrap.findFirst({
      where: {
        ownerId: session.user.id,
        year: params.year,
      },
      include: {
        albums: true,
      },
    });

    return NextResponse.json({ wrap }, { status: 200 });
  } catch (error) {
    console.log(error);

    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { year: string } }
) {
  const session = await getServerSession(authOptions);

  if (!session || !session.user.email)
    return NextResponse.json({ message: "Not Authenticated" }, { status: 401 });

  try {
    const wrap = await db.wrap.delete({
      where: {
        id: params.year, // slug is called [year] but in reality it corresponds to a wrapId, (yes its bad)
      },
    });

    return NextResponse.json({ wrap }, { status: 200 });
  } catch (error) {
    console.log(error);

    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 }
    );
  }
}
