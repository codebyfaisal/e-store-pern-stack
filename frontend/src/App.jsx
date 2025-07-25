import React from "react";
import { Navbar, Sidebar } from "./components/index.js";
import { Dashboard, Products, Product } from "./pages/index.js";
import { Routes, Route, Navigate } from "react-router-dom";

export default function App() {
  return (
    <div className="h-screen w-full bg-base-800 relative flex">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="h-full flex-1 flex flex-col overflow-hidden">
        {/* Navbar */}
        <Navbar />
        {/* Main Area */}
        <main className="w-full flex-1 p-4.5 lg:p-6 overflow-y-scroll">
          <Routes>
            <Route path="/" element={<Navigate to="/dashboard" />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/products" element={<Products />} />
            <Route path="/product/:id" element={<Product />} />
          </Routes>
        </main>
      </div>
    </div>
  );
}
