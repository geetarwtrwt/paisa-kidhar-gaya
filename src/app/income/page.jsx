"use client";
import React, { useState } from "react";
import BarChartData from "@/app/component/BarChartData";
import RecentTransitions from "@/app/component/RecentTransitions";
import AddForm from "@/app/component/AddForm";
import { useAuth } from "@/app/UseAuth";
import { FaPlus } from "react-icons/fa";

function page() {
  let { dashboardData, axios, toast, getDashBoardData } = useAuth();
  let { last60DaysIncome } = dashboardData || {};

  const [open, setOpen] = useState(false);
  const handleClose = () => setOpen(false);
  const handleOpen = () => setOpen(true);
  let [input, setInput] = useState({
    icon: "",
    source: "",
    amount: "",
    date: "",
  });
  let incomeForm = [
    { label: "Icon", name: "icon", id: "icon" },
    { label: "Income Source", input: "text", name: "source", id: "source" },
    { label: "Amount", input: "number", name: "amount", id: "amount" },
    { label: "Date", input: "date", name: "date", id: "date" },
  ];

  let recentIncome = last60DaysIncome?.transition?.map((e) => ({
    name: e.source.charAt(0).toUpperCase() + e.source.slice(1),
    amount: e.amount,
    fill: "#4f46e5",
  }));

  let handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let res = await axios.post("/api/income/add", input);
      if (res.data.success) {
        toast.success("Income added successfully");
        await getDashBoardData();
        handleClose();
      } else if (!res.data.success) {
        toast.error(res.data.msg);
      }
    } catch (err) {
      toast.error(err.message);
    }
  };

  let handleDelete = async (id) => {
    try {
      let res = await axios.delete(`/api/income/delete/${id}`);
      if (res.data.success) {
        toast.success(res.data.msg);
        await getDashBoardData();
      } else if (!res.data.success) {
        toast.error(res.data.msg);
      }
    } catch (err) {
      toast.error(err.message);
    }
  };

  return (
    <>
      <div className="min-h-screen relative">
        <div className="containerBox py-8 flex flex-col gap-12">
          <AddForm
            data={incomeForm}
            open={open}
            handleClose={handleClose}
            input={input}
            setInput={setInput}
            handleSubmit={handleSubmit}
          />
          <div className="flex flex-col gap-12 shadow-xl border-borderLight border-2 rounded-md px-6 py-8">
            <div className="flex justify-between font-semibold">
              <h5 className="text-xl">Income Overview</h5>
              <button
                onClick={handleOpen}
                className="cursor-pointer flex items-center gap-4 bg-primary hover:bg-secondary py-2 px-2 rounded-md text-white"
              >
                <FaPlus /> Add Income
              </button>
            </div>
            <div className="w-full">
              {recentIncome && recentIncome.length > 0 && (
                <BarChartData
                  headingTitle={"Last 30 Days Income"}
                  transition={recentIncome}
                />
              )}
            </div>
          </div>
          {last60DaysIncome?.transition.length > 0 && (
            <div className="w-full shadow-xl border-borderLight border-2 rounded-md px-6 py-8">
              <RecentTransitions
                headingTitle={"Incomes"}
                link={"/income"}
                transition={dashboardData?.last60DaysIncome.transition}
                handleDelete={handleDelete}
              />
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default page;
