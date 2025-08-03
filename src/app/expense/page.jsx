"use client";
import React, { useState } from "react";
import LineChartData from "@/app/component/LineChartData";
import AddForm from "@/app/component/AddForm";
import RecentTransitions from "@/app/component/RecentTransitions";
import { useAuth } from "@/app/UseAuth";
import { FaPlus } from "react-icons/fa";
import moment from "moment";

function page() {
  let { dashboardData, axios, toast, getDashBoardData } = useAuth();
  let { last30DaysExpense } = dashboardData || {};
  let recentExpenseData = last30DaysExpense?.transition.map((e) => ({
    name: e.title.charAt(0).toUpperCase() + e.title.slice(1),
    amount: e.amount,
    fill: "#4f46e5",
    date: moment(e.date).format("MMM Do YY"),
  }));
  const [open, setOpen] = useState(false);
  const handleClose = () => setOpen(false);
  const handleOpen = () => setOpen(true);
  let [input, setInput] = useState({
    icon: "",
    title: "",
    amount: "",
    category: "",
    date: "",
    note: "",
  });
  let expenseForm = [
    { label: "Icon", name: "icon", id: "icon" },
    { label: "Title", input: "text", name: "title", id: "title" },
    { label: "Amount", input: "number", name: "amount", id: "amount" },
    { label: "Category", input: "text", name: "category", id: "category" },
    { label: "Date", input: "date", name: "date", id: "date" },
    { label: "Note", input: "text", name: "note", id: "note" },
  ];

  let handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let res = await axios.post("/api/expense/add", input);
      if (res.data.success) {
        toast.success("Expense added successfully");
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
      let res = await axios.delete(`/api/expense/delete/${id}`);
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
            data={expenseForm}
            open={open}
            handleClose={handleClose}
            input={input}
            setInput={setInput}
            handleSubmit={handleSubmit}
          />

          <div className="flex flex-col gap-12 shadow-xl border-borderLight border-2 rounded-md px-6 py-8">
            <div className="flex justify-between font-semibold">
              <h5 className="text-xl">Expense Overview</h5>
              <button
                onClick={handleOpen}
                className="cursor-pointer flex items-center gap-4 bg-primary hover:bg-secondary py-2 px-2 rounded-md text-white"
              >
                <FaPlus /> Add Expense
              </button>
            </div>
            <div>
              {recentExpenseData && recentExpenseData.length > 0 && (
                <LineChartData
                  headingTitle={"Last 30 Days Expenses"}
                  transition={recentExpenseData}
                />
              )}
            </div>
          </div>

          {last30DaysExpense?.transition > 0 && (
            <div className="w-full shadow-xl border-borderLight border-2 rounded-md px-6 py-8">
              <RecentTransitions
                headingTitle={"Expense"}
                link={"/expense"}
                transition={dashboardData?.last30DaysExpense.transition}
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
