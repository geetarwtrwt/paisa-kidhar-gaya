import { NextResponse } from "next/server";
import { connectDb } from "@backend/db/db";
import { Expense } from "@backend/model/expense";
import { validateToken } from "@backend/helper";

export const GET = async (request) => {
  try {
    await connectDb();
    let userData = await validateToken();

    let data = await Expense.findById({ userId: userData._id }).sort({
      createAt: -1,
    });

    return NextResponse.json({
      success: true,
      msg: "Expense Data",
      data: data,
    });
  } catch (err) {
    return NextResponse.json({
      success: false,
      msg: err.message,
    });
  }
};
