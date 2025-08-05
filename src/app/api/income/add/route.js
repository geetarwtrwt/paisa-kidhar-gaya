import { NextResponse } from "next/server";
import { connectDb } from "@/backend/db/db";
import { Income } from "@/backend/model/income";
import { validateToken } from "@/backend/helper";

export const POST = async (request) => {
  try {
    await connectDb();
    let userData = await validateToken();

    let body = await request.json();
    const { icon, source, amount, type } = body;

    if (!source || !amount) {
      return NextResponse.json(
        { success: false, msg: "Required fields missing" },
        { status: 400 }
      );
    }

    let newIncome = await Income.create({
      userId: userData._id,
      icon,
      source,
      amount,
      type,
    });

    return NextResponse.json({
      success: true,
      msg: "Income added",
      data: newIncome,
    });
  } catch (err) {
    return NextResponse.json({
      success: false,
      msg: err.message,
    });
  }
};
