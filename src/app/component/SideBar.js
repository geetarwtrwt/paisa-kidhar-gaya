"use client";
import React from "react";
import { IoWallet, IoLogOut } from "react-icons/io5";
import { BiSolidDashboard } from "react-icons/bi";
import { RiHandCoinFill } from "react-icons/ri";
import { FaUser } from "react-icons/fa";
import Link from "next/link";
import Image from "next/image";
import { useAuth } from "@/app/UseAuth";

export default function SideBar({ setOpen }) {
  let { pathName, user } = useAuth();

  return (
    <>
      <div className="capitalize text-xl flex flex-col gap-8 pt-8 ">
        <div className="flex flex-col items-center gap-1 font-bold">
          {user?.profileImg ? (
            <Image
              src={user?.profileImg}
              alt="User Img"
              width={80}
              height={80}
              className="w-[100px] rounded-full border-borderLight border-2"
            />
          ) : (
            <FaUser className="w-[100px] h-[100px] rounded-full border-borderLight border-2" />
          )}
          <p>{user?.fullName}</p>
        </div>
        <Link
          href="/"
          className={`flex items-center justify-center py-1.5 px-2 rounded-md gap-4 ${
            pathName === "/"
              ? "bg-primary text-white"
              : "hover:bg-secondary hover:text-white"
          }`}
          onClick={() => setOpen(false)}
        >
          <BiSolidDashboard /> dashboard
        </Link>
        <Link
          href="/income"
          className={`flex items-center justify-center py-1.5 px-2 rounded-md gap-4 ${
            pathName === "/income"
              ? "bg-primary text-white"
              : "hover:bg-secondary hover:text-white"
          }`}
          onClick={() => setOpen(false)}
        >
          <IoWallet /> Income
        </Link>
        <Link
          href="/expense"
          className={`flex items-center justify-center py-1.5 px-2 rounded-md gap-4 ${
            pathName === "/expense"
              ? "bg-primary text-white"
              : "hover:bg-secondary hover:text-white"
          }`}
          onClick={() => setOpen(false)}
        >
          <RiHandCoinFill /> expense
        </Link>
        <Link
          href="/logout"
          className={`flex items-center justify-center py-1.5 px-2 rounded-md gap-4 ${
            pathName === "/logout"
              ? "bg-primary text-white"
              : "hover:bg-secondary hover:text-white"
          }`}
          onClick={() => setOpen(false)}
        >
          <IoLogOut /> logout
        </Link>
      </div>
    </>
  );
}
