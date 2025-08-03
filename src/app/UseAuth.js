"use client";
import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useRouter, usePathname } from "next/navigation";

let AuthContext = createContext();

export let ProvideContext = ({ children }) => {
  let route = useRouter();
  let pathName = usePathname();

  let [user, setUser] = useState(null);
  let [dashboardData, setDashboardData] = useState(null);

  let getUserData = async () => {
    try {
      let res = await axios.get("/api/user/get");
      setUser(res.data.data);
    } catch (err) {
      toast.error(err.message);
    }
  };

  let getDashBoardData = async () => {
    try {
      let res = await axios.get("/api/dashboard");
      setDashboardData(res.data.data);
    } catch (err) {
      toast.error(err.message);
    }
  };

  useEffect(() => {
    getUserData();
    getDashBoardData();
  }, []);
  return (
    <AuthContext.Provider
      value={{
        axios,
        toast,
        route,
        pathName,
        getUserData,
        getDashBoardData,
        user,
        dashboardData,
        setUser,
        setDashboardData,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export let useAuth = () => {
  return useContext(AuthContext);
};
