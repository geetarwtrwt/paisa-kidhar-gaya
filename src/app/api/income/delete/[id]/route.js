import { NextResponse } from "next/server";
import { connectDb } from "../../../../../backend/db/db";
import { Income } from "../../../../../backend/model/income";
import { validateToken } from "../../../../../backend/helper";

export const DELETE = async (request, { params }) => {
  try {
    await connectDb();
    let userData = await validateToken();
    let incomeId = params.id;

    let incomeData = await Income.findOne({
      _id: incomeId,
      userId: userData._id,
    });

    if (!incomeData) {
      return NextResponse.json(
        { success: false, msg: "Not authorized" },
        { status: 403 }
      );
    }

    await Income.findByIdAndDelete({ incomeId });
    return NextResponse.json({
      success: true,
      msg: "Income deleted successfully",
    });
  } catch (err) {
    return NextResponse.json({
      success: false,
      msg: err.message,
    });
  }
};
