import { User } from "@backend/model/user";
import { connectDb } from "@backend/db/db";
import { NextResponse } from "next/server";
// import { cloudinary } from "@backend/cloudinary";

export const POST = async (request) => {
  try {
    await connectDb();
    let body = await request.json();

    const { fullName, email, password, profileImg } = body;

    if (!fullName || !email || !password || !profileImg) {
      return NextResponse.json(
        { success: false, msg: "All fields are required" },
        { status: 400 }
      );
    }

    const exists = await User.findOne({ email });
    if (exists) {
      return NextResponse.json(
        { success: false, msg: "Email already registered" },
        { status: 400 }
      );
    }

    await User.create({
      fullName,
      email,
      password,
      profileImg,
    });

    return NextResponse.json({ success: true, msg: "Signup successful" });
  } catch (err) {
    return NextResponse.json({ success: false, msg: err.message });
  }
};
