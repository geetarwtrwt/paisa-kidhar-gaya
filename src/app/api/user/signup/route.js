import { writeFile } from "fs/promises";
import { User } from "@backend/model/user";
import { connectDb } from "@backend/db/db";
import { NextResponse } from "next/server";
import path from "path";

export const POST = async (request) => {
  try {
    await connectDb();
    const formData = await request.formData();

    const fullName = formData.get("fullName");
    const email = formData.get("email");
    const password = formData.get("password");
    const file = formData.get("profileImg");

    if (!fullName || !email || !password || !file) {
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

    const timeStamp = Date.now();
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const fileName = `${file.name}_${timeStamp}`;
    const filePath = path.join(
      process.cwd(),
      "public",
      "userProfile",
      fileName
    );
    await writeFile(filePath, buffer);

    const profileImg = `/userProfile/${fileName}`;

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
