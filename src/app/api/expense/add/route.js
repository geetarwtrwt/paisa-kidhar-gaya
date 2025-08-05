import { NextResponse } from "next/server";
import { connectDb } from "@/backend/db/db";
import { Expense } from "@/backend/model/expense";
import { validateToken } from "@/backend/helper";

export const POST = async (request) => {
  try {
    await connectDb();
    let userData = await validateToken();

    let body = await request.json();
    const { icon, title, amount, category, note, type } = body;

    if (!title || !amount || !category) {
      return NextResponse.json(
        { success: false, msg: "Required fields missing" },
        { status: 400 }
      );
    }

    let newExpense = await Expense.create({
      userId: userData._id,
      icon,
      title,
      amount,
      category,
      type,
      note,
    });

    return NextResponse.json({
      success: true,
      msg: "Expense added",
      data: newExpense,
    });
  } catch (err) {
    return NextResponse.json({
      success: false,
      msg: err.message,
    });
  }
};
