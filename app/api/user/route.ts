import { NextResponse } from "next/server";
import { hash } from "bcrypt";
import * as z from "zod";

import { db } from "@/lib/db";

const userSchema = z.object({
  username: z.string().min(1, "Username is required").max(100),
  email: z.string().min(1, "Email is required").email("Invalid email"),
  password: z
    .string()
    .min(1, "Password is required")
    .min(8, "Password must have than 8 characters"),
});

export async function POST(req: Request) {
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
