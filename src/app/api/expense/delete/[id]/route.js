import { NextResponse } from "next/server";
import { connectDb } from "@backend/db/db";
import { Expense } from "@backend/model/expense";
import { validateToken } from "@backend/helper";

export const DELETE = async (request, { params }) => {
  try {
    await connectDb();
    let userData = await validateToken();
    let expenseId = params.id;

    let expenseData = await Expense.findOne({
      _id: expenseId,
      userId: userData._id,
    });

    if (!expenseData) {
      return NextResponse.json(
        { success: false, msg: "Not authorized" },
        { status: 403 }
      );
    }

    await Expense.findByIdAndDelete({ expenseId });
    return NextResponse.json({
      success: true,
      msg: "Expense deleted successfully",
    });
  } catch (err) {
    return NextResponse.json({
      success: false,
      msg: err.message,
    });
  }
};
