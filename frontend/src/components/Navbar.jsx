import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useSidebarStore } from "../store/index.js";
import { ListMinus } from "lucide-react";

export default function Navbar() {
  const { isSidebarOpen, setIsSidebarOpen } = useSidebarStore();

  return (
    <nav className="w-full pl-2 lg:pl-4 pr-[9px] border-b border-gray-100 sticky">
      <div className="navbar bg-base-100 justify-between">
        <div className="flex">
          <button id="sidebar-toggle1">
            <ListMinus
              className={`transition-transform duration-300 cursor-pointer ${
                isSidebarOpen ? "lg:hidden" : "mr-4"
              }`}
            />
          </button>
        </div>
        <h1 className="text-xl font-[501]">Welcome</h1>
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Search"
            className="input input-bordered w-24 md:w-auto"
          />
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >
              <div className="w-10 rounded-full">
                <img
                  alt="Tailwind CSS Navbar component"
                  src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                />
              </div>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
            >
              <li>
                <Link to="/profile" className="justify-between">
                  Profile
                </Link>
              </li>
              <li>
                <Link to="/profile" className="justify-between">
                  Settings
                </Link>
              </li>
              <li>
                <Link to="/profile" className="justify-between">
                  Logout
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
}
