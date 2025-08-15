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
  ShieldCheck,
  ListOrdered,
  Users2,
  UserPlus,
  User,
} from "lucide-react";
import {
  useApiDataStore,
  useAuthStore,
  useSidebarStore,
} from "../store/index.js";
const navigation = [
  {
    main: [{ path: "dashboard", icon: LayoutPanelLeft, label: "Dashboard" }],
  },
  {
    inventory: [
      { path: "products", icon: Package, label: "Products" },
      { path: "products/new", icon: CirclePlus, label: "New Product" },
      { path: "categories", icon: ChartBarStacked, label: "Categories" },
      { path: "brands", icon: Badge, label: "Brands" },
      { path: "qr-barcode", icon: QrCode, label: "QR / Barcode" },
    ],
  },
  {
    sales: [
      { path: "orders", icon: ListOrdered, label: "Orders" },
      { path: "invoices", icon: Receipt, label: "Invoices" },
      { path: "sales-returns", icon: CornerDownRight, label: "Sales Return" },
    ],
  },
  {
    Accounts: [
      { path: "accounts/users", icon: Users2, label: "Users" },
      { path: "accounts/invites", icon: UserPlus, label: "Invites" },
      { path: "accounts/customers", icon: UserCircle2Icon, label: "Customers" },
    ],
  },
  {
    reports: [
      { path: "reports/sales", icon: BarChart, label: "Sales Report" },
      { path: "reports/inventory", icon: Database, label: "Inventory Report" },
      {
        path: "reports/profit-loss",
        icon: CircleDollarSign,
        label: "Profit & Loss",
      },
      { path: "reports/annual", icon: ClipboardMinus, label: "Annual Report" },
    ],
  },
  {
    User: [
      { path: "user/profile", icon: User, label: "Profile" },
      { path: "user/security", icon: ShieldCheck, label: "Security" },
    ],
  },
];

function Sidebar({ permissions }) {
  const { setLoading, loading } = useApiDataStore();
  const { logout } = useAuthStore();
  const { isSidebarOpen, setIsSidebarOpen } = useSidebarStore();
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  if (!localStorage.getItem("permissions")) {
    logout();
    localStorage.clear();
    window.location.reload("/login");
  }

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
  });

  function filterNavigation(navigation, permissions) {
    return navigation
      .map((section) => {
        const [key, items] = Object.entries(section)[0];

        const filteredItems = items.filter((item) =>
          permissions.includes(item.path)
        );

        if (filteredItems.length > 0) return { [key]: filteredItems };

        return null;
      })
      .filter(Boolean);
  }

  const filteredNavigation = [
    ...filterNavigation(navigation, permissions),
    navigation[5],
  ];

  return (
    <aside
      className={`h-screen bg-base-100 pl-6 pt-4.5 pr-0 transition-all duration-300 [&>*]:transition-all [&>*]:duration-300 absolute top-0 -left-100 lg:static z-[10000] group hover:lg:w-64 ${
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
          style={{
            boxShadow: "none",
          }}
        >
          <ListMinus
            className={`transition-transform duration-300 cursor-pointer rotate-180 ${
              isSidebarOpen ? "" : "hidden"
            }`}
          />
        </button>
      </div>

      <div className="h-full pb-14 mt-10">
        <ul className="flex flex-col gap-2 h-full overflow-y-scroll">
          {filteredNavigation.map((section, index) => {
            const sectionName = Object.keys(section)[0];
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
                {links.map(({ path, icon: Icon, label }) => (
                  <li key={path}>
                    <NavLink
                      to={`/${path}`}
                      end={path.split("/").length === 1}
                      className={({ isActive }) =>
                        [
                          "flex items-center gap-2 text-[0.95rem] min-h-[35px]",
                          !isActive && "opacity-40",
                          path === "qr-barcode" && "cursor-not-allowed",
                        ]
                          .filter(Boolean)
                          .join(" ")
                      }
                      onClick={() => {
                        setLoading(
                          path === "dashboard" ? false : loading && false
                        );
                        setIsSidebarOpen(
                          windowSize.width < 1024 ? false : true
                        );
                      }}
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
                        {label}
                      </span>
                    </NavLink>
                  </li>
                ))}
                <li
                  className={`opacity-50 pr-4 ${isSidebarOpen ? "" : "pr-5"}`}
                >
                  <span className="border-b border-0 border-neutral-300 block w-full h-0 my-2"></span>
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
