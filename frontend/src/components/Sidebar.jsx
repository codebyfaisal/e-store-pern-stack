import {
  ListMinus,
  LayoutPanelLeft,
  Package,
  Shirt,
  ShoppingBasket,
} from "lucide-react";
import React, { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";

import useSidebarStore from "../store/sidebarStore.js";

const navigation = [
  {
    path: "dashboard",
    icon: LayoutPanelLeft,
  },
  {
    path: "products",
    icon: Shirt,
  },
  {
    path: "orders",
    icon: ShoppingBasket,
  },
  {
    path: "inventory",
    icon: Package,
  },
];

function Sidebar() {
  const { isSidebarOpen, setIsSidebarOpen } = useSidebarStore();

  const [activeLink, setActiveLink] = useState("dashboard");

  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e) => {
      const clickedSidebar = e.target.closest("#sidebar");
      const clickedToggle = e.target.closest("#sidebar-toggle1");

      if (clickedToggle) {
        if (isSidebarOpen) {
          setIsSidebarOpen(false);
        } else {
          setIsSidebarOpen(true);
        }
        // setIsSidebarOpen((prev) => !prev);
      } else if (!clickedSidebar && isSidebarOpen && windowSize.width < 1024) {
        setIsSidebarOpen(false);
      }
    };
    console.log(isSidebarOpen);

    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [isSidebarOpen]);

  return (
    <div
      className={`h-screen bg-neutral text-base-100 p-6 transition-all duration-300 absolute top-0 -left-100 lg:static z-[10000] 
        ${isSidebarOpen ? "w-full max-w-72 left-0 lg:w-64" : "lg:w-20"}
        `}
      id="sidebar"
    >
      <div className="flex items-center justify-between">
        <span className="text-xl font-bold">
          {isSidebarOpen ? "EStore" : "ES"}
        </span>

        <button
          onClick={() => {
            setIsSidebarOpen(false);
          }}
        >
          <ListMinus
            className={`transition-transform duration-300 cursor-pointer ${
              isSidebarOpen ? "" : "hidden"
            }`}
          />
        </button>
      </div>

      <ul className="mt-8 flex flex-col gap-2">
        {navigation.map(({ path, icon: Icon }) => (
          <li key={path}>
            <NavLink
              to={`/${path}`}
              className={({ isActive }) =>
                `flex items-center gap-3 min-h-[40px] ${
                  isActive ? "" : "opacity-50"
                }`
              }
              onClick={() =>
                setIsSidebarOpen(windowSize.width < 1024 ? false : true)
              }
            >
              <div className="min-w-[24px]">
                <Icon size={20} />
              </div>
              <span
                className={`transition-all duration-300 whitespace-nowrap overflow-hidden capitalize
            ${
              isSidebarOpen
                ? "opacity-100 ml-2 visible"
                : "opacity-0 ml-0 invisible"
            }
          `}
              >
                {path}
              </span>
            </NavLink>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Sidebar;
