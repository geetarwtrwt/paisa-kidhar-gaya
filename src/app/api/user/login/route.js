import jwt from "jsonwebtoken";
import { connectDb } from "@/backend/db/db";
import { User } from "@/backend/model/user";
import { NextResponse } from "next/server";

export const POST = async (req) => {
  try {
    await connectDb();
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json(
        { success: false, msg: "All fields required" },
        { status: 400 }
      );
    }

    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json(
        { success: false, msg: "Invalid email or password" },
        { status: 401 }
      );
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return NextResponse.json(
        { success: false, msg: "Invalid email or password" },
        { status: 401 }
      );
    }

    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    const response = NextResponse.json({
      success: true,
      msg: "Login successful",
    });
    console.log(response);

    response.cookies.set("token", token, {
      httpOnly: true,
      maxAge: 86400,
    });

    return response;
  } catch (err) {
    return NextResponse.json({ success: false, msg: err.message });
  }
};
