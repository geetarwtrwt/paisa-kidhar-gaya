import { NextResponse } from "next/server";
import { connectDb } from "@/backend/db/db";
import { Expense } from "@/backend/model/expense";
import { Income } from "@/backend/model/income";
import { validateToken } from "@/backend/helper";

export const GET = async (request) => {
  try {
    await connectDb();
    let userData = await validateToken();

    let allExpense = await Expense.find({ userId: userData._id });
    let allIncome = await Income.find({ userId: userData._id });

    let date = new Date();
    let day60 = new Date(date.getTime() - 60 * 24 * 60 * 60 * 1000);
    let day30 = new Date(date.getTime() - 30 * 24 * 60 * 60 * 1000);

    let totalExpense = allExpense.reduce((acc, item) => acc + item.amount, 0);
    let totalIncome = allIncome.reduce((acc, item) => acc + item.amount, 0);

    let last30DaysExpenseTransition = allExpense.filter(
      (e) => e.createdAt >= day30
    );
    let last30DaysTotalExpense = last30DaysExpenseTransition.reduce(
      (acc, item) => acc + item.amount,
      0
    );

    let last60DaysIncomeTransition = allIncome.filter(
      (e) => e.createdAt >= day60
    );
    let last60DaysTotalIncome = last60DaysIncomeTransition.reduce(
      (acc, item) => acc + item.amount,
      0
    );

    let total5DaysExpense = last30DaysExpenseTransition
      .sort((a, b) => b.createdAt - a.createdAt)
      .slice(0, 5);

    let total5DaysIncome = last60DaysIncomeTransition
      .sort((a, b) => b.createdAt - a.createdAt)
      .slice(0, 5);

    let recentTransitions = [...total5DaysExpense, ...total5DaysIncome]
      .sort((a, b) => b.createdAt - a.createdAt)
      .slice(0, 5);
    return NextResponse.json({
      success: true,
      msg: "Dashboard data",
      data: {
        totalBalance: totalIncome - totalExpense,
        totalExpense: totalExpense,
        totalIncome: totalIncome,
        last30DaysExpense: {
          total: last30DaysTotalExpense,
          transition: last30DaysExpenseTransition,
        },
        last60DaysIncome: {
          total: last60DaysTotalIncome,
          transition: last60DaysIncomeTransition,
        },
        recentTransitions: recentTransitions,
      },
    });
  } catch (err) {
    return NextResponse.json({
      success: false,
      msg: err.message,
    });
  }
};
