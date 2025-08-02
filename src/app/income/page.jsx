"use client";
import React, { useState } from "react";
import BarChartData from "@/app/component/BarChartData";
import AddForm from "@/app/component/AddForm";
import { useAuth } from "@/app/UseAuth";
import { FaPlus } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";

function page() {
  let { dashboardData } = useAuth();
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  let incomeForm = [
    { label: "Income Source", input: "text", name: "source", id: "source" },
    { label: "Amount", input: "number", name: "amount", id: "amount" },
    { label: "Date", input: "date", name: "date", id: "date" },
  ];

  let { last30DaysExpense } = dashboardData || {};

  let recentExpenseData = last30DaysExpense?.transition.map((e) => ({
    name: e.title.charAt(0).toUpperCase() + e.title.slice(1),
    amount: e.amount,
    fill: "#4f46e5",
  }));
  return (
    <>
      <div className="min-h-screen relative">
        <div className="containerBox pt-8">
          <div>
            <Modal
              open={open}
              onClose={handleClose}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box className="absolute top-1/2 left-1/2 bg-bgColor -translate-y-1/2 -translate-x-1/2 w-[400px] rounded-md shadow-xl px-6 py-10">
                <IoClose
                  onClick={handleClose}
                  className="absolute right-4 bg-primary text-2xl rounded-full text-white p-1 cursor-pointer"
                />
                <Typography id="modal-modal-title" variant="h6" component="h2">
                  Text in a modal
                </Typography>
                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                  <form>
                    <AddForm data={incomeForm} />
                  </form>
                </Typography>
              </Box>
            </Modal>
          </div>
          <div className="flex flex-col gap-12 shadow-xl border-borderLight border-2 rounded-md px-6 py-8">
            <div className="flex justify-between font-semibold">
              <h5 className="text-xl">Income Overview</h5>
              <button
                onClick={handleOpen}
                className="cursor-pointer flex items-center gap-4 bg-primary hover:bg-secondary py-2 px-2 rounded-md text-white"
              >
                <FaPlus /> See More
              </button>
            </div>
            <div>
              {recentExpenseData && recentExpenseData.length > 0 && (
                <BarChartData
                  headingTitle={"Last 30 Days Expenses"}
                  transition={recentExpenseData}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default page;
