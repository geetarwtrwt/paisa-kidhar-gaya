"use client";
import React, { useState } from "react";
import { FaBars } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import SideBar from "@/app/component/SideBar";
import { useAuth } from "./UseAuth";

export default function UserLayout({ children }) {
  const [open, setOpen] = useState(false);
  let { pathName } = useAuth();
  let hideSideBar = pathName === "/my-account";

  return (
    <div className="flex flex-col min-h-screen">
      <div className="fixed z-50 top-0 w-full bg-bgColor border-b-2 border-borderLight font-bold py-4">
        <div className="containerBox flex items-center gap-4">
          {!hideSideBar && (
            <>
              {open ? (
                <IoClose
                  onClick={() => setOpen(false)}
                  className="cursor-pointer md:hidden block text-2xl"
                />
              ) : (
                <FaBars
                  onClick={() => setOpen(true)}
                  className="cursor-pointer md:hidden block text-2xl"
                />
              )}
            </>
          )}
          <h2 className="text-2xl">Paisa Kidhar Gaya?</h2>
        </div>
      </div>

      <div className="flex mt-16">
        {!hideSideBar && (
          <div className="hidden md:block w-[20%] sticky top-16 h-screen bg-bgColor border-r-2 border-borderLight px-4">
            <SideBar setOpen={setOpen} />
          </div>
        )}

        {!hideSideBar && open && (
          <div className="fixed z-50 top-16 left-0 h-screen w-[40%] bg-bgColor border-r-2 border-t-2 border-borderLight p-4 md:hidden shadow-xl">
            <SideBar setOpen={setOpen} />
          </div>
        )}

        <div className={`w-full ${!hideSideBar ? "md:w-[80%]" : ""} py-4`}>
          {children}
        </div>
      </div>
    </div>
  );
}
