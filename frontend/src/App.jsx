import React from "react";
import { Navbar, Sidebar } from "./components/index.js";
import { Dashboard, ProductPage } from "./pages";
import { Routes, Route, Navigate } from "react-router-dom";

export default function App() {
  return (
    <div className="h-screen w-screen overflow-x-hidden bg-base-800 relative lg:flex">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="h-full flex-1 lg:p-2 flex flex-col">
        {/* Navbar */}
        <div className="">
          <Navbar />
        </div>
        {/* Main Area */}
        <div className="w-full flex-1">
          <Routes>
            <Route path="/" element={<Navigate to="/dashboard" />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/product/:id" element={<ProductPage />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}
