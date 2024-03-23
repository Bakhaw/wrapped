import { NextRequest, NextResponse } from "next/server";

import { db } from "@/lib/db";

export async function GET(
  req: NextRequest,
  route: { params: { userId: string } }
) {
  const { userId } = route.params;

  if (!userId) return;

  try {
    const user = await db.user.findUnique({
      where: {
        id: userId,
      },
    });

    return NextResponse.json({
      user,
      status: 201,
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      user: null,
      message: "Something went wrong",
      status: 500,
    });
  }
}
