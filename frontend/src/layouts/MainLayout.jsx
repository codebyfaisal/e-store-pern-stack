import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { Sidebar, Navbar } from "@/components/index.js";
import { motion } from "motion/react";
import { useApiDataStore } from "@/store/index.js";
import api from "@/services/api.js";

const MainLayout = () => {
  const { loading } = useApiDataStore();
  const [permissions, setPermission] = useState([]);
  const [notifications, setNotifications] = useState([]);

  const fetchData = async () => {
    try {
      const response = await api.get("/api/bootstrap");

      setPermission([...response.data.result.role]);
      setNotifications([...response.data.result.notifications]);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      {/* Sidebar */}
      <Sidebar permissions={permissions} />
  
      {/* Main Content */}
      <div className="h-full flex-1 flex flex-col overflow-hidden">
        {/* Navbar */}
        <Navbar notifications={notifications}/>

        {/* Main Area for nested routes */}
        <motion.main
          initial={{ opacity: 0 }}
          animate={{ opacity: loading ? 0 : 1 }}
          className="w-full h-full flex-1 p-4.5 lg:p-6 overflow-y-scroll"
        >
          <Outlet />

          {/* Footer */}
          <hr
            className={`${
              loading ? "hidden" : "border-base-content/20 mt-10 mb-5"
            }`}
          />
          <div
            className={`${loading ? "hidden" : "text-sm flex justify-between"}`}
          >
            <p>2025 © E-Store. All Right Reserved</p>
            <p>
              Designed & Developed by{" "}
              <a
                href="https://codebyfaisal.netlify.app"
                className="text-primary font-bold"
                target="_blank"
              >
                Codebyfaisal
              </a>
            </p>
          </div>
        </motion.main>
      </div>
    </>
  );
};

export default MainLayout;
