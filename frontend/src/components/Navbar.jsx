import React, { useState } from "react";
import { Link } from "react-router-dom";
import useSidebarStore from "../store/sidebarStore.js";
import { LucideMenu, Maximize } from "lucide-react";
import { FullscreenToggleButton } from "./index.js";

export default function Navbar() {
  const { isSidebarOpen, setIsSidebarOpen } = useSidebarStore();
  const [isMaxScreen, setMaxScreen] = useState(false);

  return (
    <nav className="w-full h-full px-2">
      <div className="navbar bg-base-100 justify-between">
        <div className="flex-">
          <button id="sidebar-toggle1">
            <LucideMenu
              className={`transition-transform duration-300 cursor-pointer ${
                isSidebarOpen ? "lg:hidden" : ""
              }`}
            />
          </button>
        </div>
        <div className="flex gap-2">
          <FullscreenToggleButton />
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
