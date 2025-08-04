import { writeFile } from "fs/promises";
import { User } from "@backend/model/user";
import { connectDb } from "@backend/db/db";
import { NextResponse } from "next/server";
import path from "path";
import { cloudinary } from "@backend/cloudinary";

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

    let mimeType = image.type;
    if (!["image/png", "image/jpg", "image/jped"].includes(mimeType)) {
      return NextResponse.json(
        { error: true, msg: "Invalid image formate" },
        { status: 400 }
      );
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const uploadRes = await cloudinary.uploader.upload_stream(
      {
        folder: "userProfile",
        resource_type: "image",
      },
      async (error, result) => {
        if (error) {
          throw new Error("Cloudinary upload failed");
        }
        await User.create({
          fullName,
          email,
          password,
          profileImg: result.secure_url,
        });
      }
    );
    uploadRes.end(buffer);
    return NextResponse.json({ success: true, msg: "Signup successful" });
  } catch (err) {
    return NextResponse.json({ success: false, msg: err.message });
  }
};
