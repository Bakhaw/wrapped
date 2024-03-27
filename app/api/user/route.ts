import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { hash } from "bcryptjs";
import * as z from "zod";

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

export async function POST(req: Request) {
  const userSchema = z.object({
    username: z.string().min(1, "Username is required").max(100),
    email: z.string().min(1, "Email is required").email("Invalid email"),
    password: z
      .string()
      .min(1, "Password is required")
      .min(8, "Password must have than 8 characters"),
  });

  try {
    const body = await req.json();
    const { email, password, username } = userSchema.parse(body);

    const existingUserByEmail = await db.user.findUnique({
      where: {
        email,
      },
    });

    if (existingUserByEmail) {
      return NextResponse.json({
        user: null,
        message: "This email already exists",
        status: 409,
        field: "email",
      });
    }

    const existingUserByUsername = await db.user.findUnique({
      where: {
        username,
      },
    });

    if (existingUserByUsername) {
      return NextResponse.json({
        user: null,
        message: "This username already exists",
        status: 409,
        field: "username",
      });
    }

    const hashedPassword = await hash(password, 10);
    const newUser = await db.user.create({
      data: {
        email,
        password: hashedPassword,
        username,
      },
    });

    const { password: pwd, ...safeUser } = newUser;

    return NextResponse.json({
      user: safeUser,
      message: "User created successfully",
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
