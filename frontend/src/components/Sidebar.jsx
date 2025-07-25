import React, { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import {
  ListMinus,
  LayoutPanelLeft,
  Package,
  CirclePlus,
  ChartBarStacked,
  Badge,
  QrCode,
  CornerDownRight,
  Receipt,
  UserCircle2Icon,
  BarChart,
  Database,
  CircleDollarSign,
  ClipboardMinus,
  UserCircle,
  ShieldCheck,
} from "lucide-react";
import { useSidebarStore } from "../store/index.js";

const navigation = [
  {
    main: [{ path: "dashboard", icon: LayoutPanelLeft }],
  },
  {
    inventory: [
      { path: "products", icon: Package },
      { path: "create-product", icon: CirclePlus },
      { path: "categories", icon: ChartBarStacked },
      { path: "brands", icon: Badge },
      { path: "qr-barcode", icon: QrCode },
    ],
  },
  {
    sales: [
      { path: "sales-return", icon: CornerDownRight },
      { path: "invoices", icon: Receipt },
    ],
  },
  {
    customers: [{ path: "users", icon: UserCircle2Icon }],
  },
  {
    reports: [
      { path: "sales-report", icon: BarChart },
      { path: "inventory-report", icon: Database },
      { path: "profit-loss", icon: CircleDollarSign },
      { path: "annual-report", icon: ClipboardMinus },
    ],
  },
  {
    admin: [
      { path: "profile", icon: UserCircle },
      { path: "security", icon: ShieldCheck },
    ],
  },
];

function Sidebar() {
  const { isSidebarOpen, setIsSidebarOpen } = useSidebarStore();
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
        setIsSidebarOpen((prev) => !prev);
      } else if (!clickedSidebar && isSidebarOpen && windowSize.width < 1024) {
        setIsSidebarOpen(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [isSidebarOpen]);

  return (
    <aside
      className={`h-screen bg-neutral text-base-100 pl-6 pt-4.5 pr-0 transition-all duration-300 [&>*]:transition-all [&>*]:duration-300 absolute top-0 -left-100 lg:static z-[10000] group hover:lg:w-64 ${
        isSidebarOpen ? "w-full max-w-72 left-0 lg:w-64" : "lg:w-20"
      }`}
      id="sidebar"
    >
      <div className="flex items-center justify-between relative">
        <Link to="/dashboard" className="text-xl font-bold">
          {isSidebarOpen ? "E Store" : "ES"}
        </Link>

        <button
          onClick={() => setIsSidebarOpen(false)}
          className="absolute top-1 right-6 z-[10000]"
        >
          <ListMinus
            className={`transition-transform duration-300 cursor-pointer rotate-180 ${
              isSidebarOpen ? "" : "hidden"
            }`}
          />
        </button>
      </div>

      <div className="h-full pb-10">
        <ul className="mt-8 flex flex-col gap-2 h-full overflow-y-scroll">
          {navigation.map((section, index) => {
            const sectionName = Object.keys(section)[0]; // Get the section name like 'inventory', 'sales', etc.
            const links = section[sectionName];

            return (
              <ul key={index}>
                {/* Render Section Name (optional) */}
                <li
                  className={`text-xs font-semibold opacity-50 capitalize ${
                    !isSidebarOpen && "hidden group-hover:block"
                  }`}
                >
                  {sectionName}
                </li>
                {/* Render Links in this Section */}
                {links.map(({ path, icon: Icon }) => (
                  <li key={path}>
                    <NavLink
                      to={`/${path}`}
                      className={({ isActive }) =>
                        `flex items-center gap-3 text-[0.95rem] min-h-[40px] ${
                          isActive ? "" : "opacity-50"
                        }`
                      }
                      onClick={() =>
                        setIsSidebarOpen(windowSize.width < 1024 ? false : true)
                      }
                    >
                      <div
                        className={`min-w-[20px] ${
                          isSidebarOpen ? "" : "pl-[2px]"
                        }`}
                      >
                        <Icon size={18} />
                      </div>
                      <span
                        className={`transition-all duration-300 whitespace-nowrap overflow-hidden capitalize group-hover:visible group-hover:opacity-100 ${
                          isSidebarOpen
                            ? "opacity-100 visible"
                            : "opacity-0 invisible"
                        }`}
                      >
                        {path}
                      </span>
                    </NavLink>
                  </li>
                ))}
                <li
                  className={`opacity-10 pr-4 ${isSidebarOpen ? "" : "pr-5"}`}
                >
                  <span className="border-b border-0 border-base-100 block w-full h-0 my-2"></span>
                </li>
              </ul>
            );
          })}
        </ul>
      </div>
    </aside>
  );
}

export default Sidebar;
