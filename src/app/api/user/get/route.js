import { NextResponse } from "next/server";
import { connectDb } from "../../../../../backend/db/db";
import { User } from "../../../../../backend/model/user";
import { validateToken } from "../../../../../backend/helper";

export const GET = async (request) => {
  try {
    await connectDb();
    let userData = await validateToken();

    let data = await User.findById(userData._id).select("-password");

    return NextResponse.json({
      success: true,
      msg: "User Data",
      data: data,
    });
  } catch (err) {
    return NextResponse.json({
      success: false,
      msg: err.message,
    });
  }
};
