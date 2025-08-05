import React from "react";
import moment from "moment";
import { FaArrowRight, FaArrowUp, FaArrowDown } from "react-icons/fa6";
import { FaUtensils } from "react-icons/fa";
import { FaPlus, FaMinus } from "react-icons/fa6";
import { MdDelete } from "react-icons/md";
import { useAuth } from "@/app/UseAuth";

function RecentTransitions({
  headingTitle,
  link,
  transition,
  handleDelete,
  buttonTrue,
  deleteButton,
}) {
  let { route } = useAuth();

  return (
    <>
      <div className="flex flex-col gap-12 px-6 py-8">
        <div className="flex justify-between font-semibold">
          <h5 className="text-xl">{headingTitle}</h5>
          {buttonTrue && (
            <button
              onClick={() => route.push(link)}
              className="cursor-pointer flex items-center gap-4 bg-primary hover:bg-secondary py-1 px-2 rounded-md  text-white "
            >
              See More <FaArrowRight />
            </button>
          )}
        </div>

        <div className="flex flex-col gap-8">
          {transition?.map((e) => {
            return (
              <div
                className="flex justify-between 
              "
                key={e._id}
              >
                <div className="flex items-center gap-4">
                  <div className="bg-borderLight p-4 text-3xl max-lg:text-3xl w-16 h-16 border-2 border-primary text-primary flex items-center justify-center rounded-full">
                    {e.icon ? <div>{e.icon}</div> : <FaUtensils />}
                  </div>
                  <div className="flex flex-col">
                    <p className="capitalize text-lg font-medium">
                      {e.type === "expense" ? e.title : e.source}
                    </p>
                    <p className="text-label text-sm">
                      {moment(e.date).format("Do MMM YY")}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  {deleteButton && (
                    <MdDelete
                      onClick={() => handleDelete(e._id)}
                      className="text-3xl text-primary hover:text-red-500 duration-1000 cursor-pointer"
                    />
                  )}
                  <div
                    className={`flex items-center gap-2 text-sm h-fit py-0.5 px-2 rounded-md ${
                      e.type === "expense"
                        ? "bg-red-300 text-red-600"
                        : "bg-green-300 text-green-600"
                    }`}
                  >
                    {e.type === "expense" ? <FaMinus /> : <FaPlus />}
                    <p className="text-lg">₹{e.amount}</p>
                    {e.type === "expense" ? <FaArrowDown /> : <FaArrowUp />}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}

export default RecentTransitions;
