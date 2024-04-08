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
