import cloudinary from "@backend/cloudinary";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    let payload = await request.json();
    let { paramsToSign } = payload;
    let signature = cloudinary.utils.api_sign_request(
      paramsToSign,
      process.env.CLOUDINARY_API_SECRET
    );
    return NextResponse.json({ signature });
  } catch (err) {
    return NextResponse.json(
      { success: false, msg: err.message },
      { status: 500 }
    );
  }
}
