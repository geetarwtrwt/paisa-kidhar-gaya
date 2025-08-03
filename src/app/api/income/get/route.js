import { NextResponse } from "next/server";
import { connectDb } from "@backend/db/db";
import { Income } from "@backend/model/income";
import { validateToken } from "@backend/helper";

export const GET = async (request) => {
  try {
    await connectDb();
    let userData = await validateToken();

    let data = await Income.findById({ userId: userData._id }).sort({
      createAt: -1,
    });

    return NextResponse.json({
      success: true,
      msg: "Income Data",
      data: data,
    });
  } catch (err) {
    return NextResponse.json({
      success: false,
      msg: err.message,
    });
  }
};
