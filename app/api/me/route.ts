import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";

import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user.email) {
      return NextResponse.json(
        { user: null },
        { status: 401, statusText: "Not Authenticated" }
      );
    }

    const user = await db.user.findUnique({
      where: {
        email: session.user.email,
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

    return NextResponse.json(safeUser, {
      status: 200,
    });
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

export async function DELETE() {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user.id) {
      return NextResponse.json(
        { user: null },
        { status: 401, statusText: "Not Authenticated" }
      );
    }

    const user = await db.user.findUnique({
      where: {
        id: session.user.id,
      },
      include: {
        wrapped: true,
      },
    });

    if (!user) {
      return NextResponse.json(
        { user: null },
        { status: 401, statusText: "Account not found" }
      );
    }

    const deletedUser = await db.user.delete({
      where: {
        id: user.id,
      },
    });

    const deletedUserAlbums = await db.album.deleteMany({
      where: {
        wrapId: {
          in: user.wrapped.map((wrap) => wrap.id),
        },
      },
    });

    const deletedUserWraps = await db.wrap.deleteMany({
      where: {
        id: {
          in: user.wrapped.map((wrap) => wrap.id),
        },
      },
    });

    return NextResponse.json(
      { deletedUser, deletedUserAlbums, deletedUserWraps },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);

    return NextResponse.json(
      { user: null },
      {
        status: 500,
        statusText: "Something went wrong",
      }
    );
  }
}
