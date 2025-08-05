import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import { connectDb } from "@/backend/db/db";
import { NextResponse } from "next/server";

const secret = process.env.JWT_SECRET;

export const POST = async (request) => {
  try {
    await connectDb();
    jwt.sign("", secret);
    cookies().set("token", "", {
      httpOnly: true,
      maxAge: 0,
      expires: new Date(0),
    });
    return NextResponse.json({ success: true, msg: "Logout successful" });
  } catch (err) {
    return NextResponse.json({ success: false, msg: err.message });
  }
};
