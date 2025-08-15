import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuthStore } from "@/store/index.js";

const PrivateRoute = () => {
  const { isAuthenticated } = useAuthStore();  

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;
