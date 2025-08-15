import React from "react";
import { Link } from "react-router-dom";
import { useSidebarStore, useAuthStore } from "@/store/index.js";
import { Bell, ListMinus } from "lucide-react";

function Navbar({ notifications }) {
  const { isSidebarOpen } = useSidebarStore();
  const { logout } = useAuthStore();

  const handleLogout = async () => await logout();
  return (
    <nav className={`w-full sticky z-[999]`}>
      <div className="navbar pl-2 lg:pl-6 pr-[9px] bg-base-100 justify-between">
        <div className="flex">
          <button
            id="sidebar-toggle1"
            style={{
              boxShadow: "none",
            }}
          >
            <ListMinus
              className={`transition-transform duration-300 cursor-pointer ${
                isSidebarOpen ? "lg:hidden" : "mr-4"
              }`}
            />
          </button>
        </div>
        <h1 className="text-xl font-[501]">Welcome</h1>
        <div className="flex gap-4 items-center">
          <div className="dropdown dropdown-end">
            <div className="relative cursor-pointer" tabIndex={0} role="button">
              <span className="absolute -top-1 -right-0.5 bg-red-600 rounded-full text-[0.6rem] w-4 h-4 text-center flex justify-center items-center text-white">
                {notifications.length ?? 0}
              </span>
              <Bell />
            </div>
            <div
              tabIndex={0}
              className="menu dropdown-content bg-base-100 rounded-box z-1 mt-1 w-max max-w-xs -translate-x-4 shadow gap-2 p-4"
            >
              {notifications.map((not, i) => (
                <div
                  key={i}
                  className={`grid border-base-300 gap-1 mb-2 pb-2 ${
                    notifications.length - 1 === i ? "border-0" : "border-b"
                  }`}
                >
                  <span className="font-bold">{not.event_type}</span>
                  <span>{not.message}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar !rounded-full"
            >
              <div className="w-14 rounded-full border-primary">
                <img
                  alt="Tailwind CSS Navbar component"
                  src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                />
              </div>
            </div>
            <ul
              tabIndex={0}
              className="menu dropdown-content bg-base-100 rounded-box z-1 mt-3 w-max px-3 py-4 space-y-1 -translate-x-4 shadow"
            >
              <li>
                <Link to="/user/profile" className="text-right justify-end ">
                  Profile
                </Link>
              </li>
              <li>
                <Link to="/user/security" className="text-right justify-end ">
                  Security
                </Link>
              </li>
              <li>
                <Link to="/activities" className="text-right justify-end ">
                  Activities
                </Link>
              </li>
              <li>
                <button
                  onClick={handleLogout}
                  className="text-right justify-end"
                >
                  Logout
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
