"use client";
import React, { useState } from "react";
import { IoMdCard } from "react-icons/io";
import { RiHandCoinFill } from "react-icons/ri";
import { FaBars } from "react-icons/fa";
import { IoClose, IoWallet } from "react-icons/io5";
import SideBar from "@/app/component/SideBar";
import RecentTransitions from "@/app/component/RecentTransitions";
import CustomPieChart from "@/app/component/CustomPieChart";
import BarChartData from "@/app/component/BarChartData";
import { useAuth } from "@/app/UseAuth";

export default function Home() {
  let { dashboardData } = useAuth();
  const [open, setOpen] = useState(false);
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
        <div className="border-borderLight border-b-2 font-bold py-4">
          <div className="containerBox flex items-center gap-4">
            {open ? (
              <IoClose
                onClick={() => setOpen(!open)}
                className="cursor-pointer md:hidden block text-2xl"
              />
            ) : (
              <FaBars
                onClick={() => setOpen(!open)}
                className="cursor-pointer md:hidden block text-2xl"
              />
            )}
            <h2 className="text-2xl">Paisa Kidhar Gaya?</h2>
          </div>
        </div>

        <div className="containerBox flex gap-8 min-h-screen">
          <div className="h-full sticky top-10">
            {open && (
              <div
                className={`${
                  open ? "block" : "hidden"
                } absolute left-0 h-screen z-50 bg-bgColor md:hidden`}
              >
                <SideBar setOpen={setOpen} />
              </div>
            )}
            <div className="hidden md:block">
              <SideBar setOpen={setOpen} />
            </div>
          </div>

          <div className="pt-8 w-full border-l-2 border-borderLight pl-8">
            <div className="flex justify-between gap-8 md:flex-row flex-col">
              {dashboardData && (
                <>
                  <div className="flex gap-4  md:w-[30%] w-full font-semibold shadow-xl px-4 py-6 rounded-md border-borderLight border-2">
                    <IoMdCard className="text-6xl bg-primary p-4 rounded-full text-bgColor" />
                    <div>
                      <h4 className="text-label">Total Balance</h4>
                      <p className="text-2xl">
                        ₹ {dashboardData?.totalBalance || 0}
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-4 md:w-[30%] w-full font-semibold shadow-xl px-4 py-6 rounded-md border-borderLight border-2">
                    <IoWallet className="text-6xl bg-orange-500 p-4 rounded-full text-bgColor" />
                    <div>
                      <h4 className="text-label">Total Income</h4>
                      <p className="text-2xl">
                        ₹ {dashboardData?.totalIncome || 0}
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-4 md:w-[30%] w-full font-semibold shadow-xl px-4 py-6 rounded-md border-borderLight border-2">
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

            <div className="flex justify-between gap-8 md:flex-row flex-col my-12 md:gap-0">
              <RecentTransitions
                headingTitle={"Recent Transitions"}
                link={"/expense"}
                transition={dashboardData?.recentTransitions}
              />
              {recentTransitionData.length > 0 && (
                <CustomPieChart
                  title={"Financial Overview"}
                  pieChartData={recentTransitionData}
                  centerText={"Total Overview"}
                />
              )}
            </div>

            <div className="flex justify-between gap-8 md:flex-row flex-col my-12 md:gap-0">
              <RecentTransitions
                headingTitle={"Expenses"}
                link={"/expense"}
                transition={dashboardData?.last30DaysExpense.transition?.slice(
                  0,
                  5
                )}
              />
              {recentExpenseData && recentExpenseData.length > 0 && (
                <BarChartData
                  headingTitle={"Last 30 Days Expenses"}
                  transition={recentExpenseData}
                />
              )}
            </div>

            <div className="flex justify-between gap-8 md:flex-row flex-col my-12 md:gap-0">
              {recentIncomeData && recentIncomeData.length > 0 && (
                <CustomPieChart
                  title={"Incomes"}
                  pieChartData={recentIncomeData}
                />
              )}
              <RecentTransitions
                headingTitle={"Incomes"}
                link={"/income"}
                transition={dashboardData?.last60DaysIncome.transition}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
