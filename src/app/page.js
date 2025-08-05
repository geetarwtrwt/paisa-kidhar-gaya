"use client";
import React from "react";
import { IoMdCard } from "react-icons/io";
import { RiHandCoinFill } from "react-icons/ri";
import { IoWallet } from "react-icons/io5";
import RecentTransitions from "@/app/component/RecentTransitions";
import CustomPieChart from "@/app/component/CustomPieChart";
import BarChartData from "@/app/component/BarChartData";
import { useAuth } from "@/app/UseAuth";
import moment from "moment";

export default function Home() {
  let { dashboardData } = useAuth();
  let {
    totalBalance,
    totalIncome,
    totalExpense,
    last30DaysExpense,
    last60DaysIncome,
  } = dashboardData || {};

  let recentTransitionData = [
    { name: "Balance", value: totalBalance || 0, fill: "#6b7280" },
    { name: "Income", value: totalIncome || 0, fill: "#4f46e5" },
    { name: "Expense", value: totalExpense || 0, fill: "#a5b4fc" },
  ];

  let recentIncomeData = last60DaysIncome?.transition.map((e) => ({
    name: e.source.charAt(0).toUpperCase() + e.source.slice(1),
    value: e.amount || 0,
    fill: "#4f46e5",
  }));

  let recentExpenseData = last30DaysExpense?.transition.map((e) => ({
    name: e.title.charAt(0).toUpperCase() + e.title.slice(1),
    amount: e.amount,
    fill: "#4f46e5",
  }));
  return (
    <>
      <div className="min-h-screen relative">
        <div className="containerBox flex gap-8 min-h-screen">
          <div className="pt-8 w-full pl-8">
            <div className="flex justify-between gap-8 md:flex-row flex-col">
              {dashboardData && (
                <>
                  <div className="flex gap-4  md:w-[30%] flex-wrap w-full font-semibold shadow-xl px-4 py-6 rounded-md border-borderLight border-2">
                    <IoMdCard className="text-6xl bg-primary p-4 rounded-full text-bgColor" />
                    <div>
                      <h4 className="text-label">Total Balance</h4>
                      <p className="text-2xl">
                        ₹ {dashboardData?.totalBalance || 0}
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-4 md:w-[30%] flex-wrap w-full font-semibold shadow-xl px-4 py-6 rounded-md border-borderLight border-2">
                    <IoWallet className="text-6xl bg-orange-500 p-4 rounded-full text-bgColor" />
                    <div>
                      <h4 className="text-label">Total Income</h4>
                      <p className="text-2xl">
                        ₹ {dashboardData?.totalIncome || 0}
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-4 md:w-[30%] flex-wrap w-full font-semibold shadow-xl px-4 py-6 rounded-md border-borderLight border-2">
                    <RiHandCoinFill className="text-6xl bg-red-500 p-4 rounded-full text-bgColor" />
                    <div>
                      <h4 className="text-label">Total Expense</h4>
                      <p className="text-2xl">
                        ₹ {dashboardData?.totalExpense || 0}
                      </p>
                    </div>
                  </div>
                </>
              )}
            </div>
            {dashboardData?.recentTransitions.length > 0 ? (
              <>
                {dashboardData?.recentTransitions.length > 0 && (
                  <div className="flex justify-between my-12 lg:flex-row flex-col gap-8">
                    <div className="w-full lg:w-[45%] h-[300px] overflow-y-scroll shadow-xl border-borderLight border-2 rounded-md">
                      <RecentTransitions
                        headingTitle={"Recent Transitions"}
                        link={"/expense"}
                        buttonTrue={true}
                        transition={dashboardData?.recentTransitions}
                      />
                    </div>

                    <div className="w-full lg:w-[45%] h-[300px] shadow-xl border-borderLight border-2 rounded-md px-6 py-8">
                      {recentTransitionData.length > 0 && (
                        <CustomPieChart
                          title={"Financial Overview"}
                          pieChartData={recentTransitionData}
                          centerText={"Total Overview"}
                        />
                      )}
                    </div>
                  </div>
                )}

                {dashboardData?.last30DaysExpense.transition.length > 0 && (
                  <div className="flex justify-between gap-8 lg:flex-row flex-col my-12">
                    <div className="w-full lg:w-[45%] h-[300px] overflow-y-scroll shadow-xl border-borderLight border-2 rounded-md px-6 py-8">
                      <RecentTransitions
                        headingTitle={"Expenses"}
                        link={"/expense"}
                        buttonTrue={true}
                        transition={dashboardData?.last30DaysExpense.transition}
                      />
                    </div>
                    <div className="w-full lg:w-[45%] h-[300px] shadow-xl border-borderLight border-2 rounded-md px-6 py-8">
                      {recentExpenseData && recentExpenseData.length > 0 && (
                        <BarChartData
                          headingTitle={"Last 30 Days Expenses"}
                          transition={recentExpenseData}
                        />
                      )}
                    </div>
                  </div>
                )}

                {dashboardData?.last60DaysIncome.transition.length > 0 && (
                  <div className="flex justify-between gap-8 lg:flex-row flex-col my-12 ">
                    <div className="w-full lg:w-[45%] h-[300px] shadow-xl border-borderLight border-2 rounded-md px-6 py-8">
                      {recentIncomeData && recentIncomeData.length > 0 && (
                        <CustomPieChart
                          title={"Last 30 Days Incomes"}
                          pieChartData={recentIncomeData}
                        />
                      )}
                    </div>

                    <div className="w-full lg:w-[45%] h-[300px] overflow-y-scroll shadow-xl border-borderLight border-2 rounded-md px-6 py-8">
                      <RecentTransitions
                        headingTitle={"Incomes"}
                        link={"/income"}
                        buttonTrue={true}
                        transition={dashboardData?.last60DaysIncome.transition}
                      />
                    </div>
                  </div>
                )}
              </>
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <p className="text-3xl font-bold text-primary">No Data</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
