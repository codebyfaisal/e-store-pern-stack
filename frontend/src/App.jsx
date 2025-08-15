import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import { AuthLayout, MainLayout } from "@/layouts/index.js";

import {
  Register,
  Login,
  Dashboard,
  Products,
  Product,
  AddProduct,
  Categories,
  Brands,
  Orders,
  SalesReturn,
  Invoices,
  InvoiceDetails,
  Users,
  SalesReport,
  InventoryReport,
  ProfitAndLossReport,
  AnnualReport,
  NotFound,
  Profile,
  Customers,
  InvitedUsers,
  Security,
  Activities,
} from "@/pages/index.js";
import { PrivateRoute } from "@/components/index.js";
import { Toaster } from "react-hot-toast";
import patchToast from "./utils/patchToast";
import { motion } from "motion/react";
import { useApiDataStore } from "./store";

patchToast();

function App() {
  const navigate = useNavigate();
  const { error, loading } = useApiDataStore();
  const path = () =>
    window.location.pathname == "/login" ||
    window.location.pathname == "/register";

  if (error) navigate("/404");
  return (
    <motion.div
      // initial={{ opacity: 0 }}
      // animate={{ opacity: loading ? 0 : 1 }}
      // transition={{ duration: 0.05 }}
      className="h-screen w-full bg-base-200 flex"
    >
      <Toaster position="top-right" />

      <div className="absolute top-0 left-0 w-full h-full bg-base-200 z-[1] text-4xl text-base-content flex justify-center items-center">
        WAIT
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{
          opacity: loading ? (path() ? 1 : 0) : 1,
        }}
        transition={{ duration: 0.5 }}
        className="h-screen w-full bg-base-200 flex z-10"
      >
        <Routes>
          {/* Public Routes - Uses AuthLayout */}
          <Route element={<AuthLayout />}>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Route>

          {/* Protected Routes */}
          <Route element={<PrivateRoute />}>
            <Route element={<MainLayout />}>
              <Route path="/" element={<Navigate to="/dashboard" />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/products" element={<Products />} />
              <Route path="/products/:id" element={<Product />} />
              <Route
                path="/products/new"
                element={<AddProduct page="Create" />}
              />
              <Route
                path="/products/:id/edit"
                element={<AddProduct page="Edit" />}
              />
              <Route path="/categories" element={<Categories />} />
              <Route path="/brands" element={<Brands />} />
              <Route path="/orders" element={<Orders />} />
              <Route path="/sales-returns" element={<SalesReturn />} />
              <Route path="/invoices" element={<Invoices />} />
              <Route path="/invoices/:id" element={<InvoiceDetails />} />
              <Route path="/people/customers" element={<Customers />} />
              <Route path="/people/users" element={<Users />} />
              <Route path="/people/invited" element={<InvitedUsers />} />
              <Route path="/reports/sales" element={<SalesReport />} />
              <Route path="/reports/inventory" element={<InventoryReport />} />
              <Route
                path="/reports/profit-loss"
                element={<ProfitAndLossReport />}
              />
              <Route path="/reports/annual" element={<AnnualReport />} />
              <Route path="/user/profile" element={<Profile />} />
              <Route path="/user/security" element={<Security />} />
              <Route path="/activities" element={<Activities />} />
            </Route>
          </Route>

          {/* Optional 404 Fallback */}
          <Route path="/404" element={<NotFound />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </motion.div>
    </motion.div>
  );
}

export default App;

// import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
// import { AuthLayout, MainLayout } from "@/layouts/index.js";

// import {
//   Register,
//   Login,
//   Dashboard,
//   Products,
//   Product,
//   AddProduct,
//   Categories,
//   Brands,
//   Orders,
//   SalesReturn,
//   Invoices,
//   InvoiceDetails,
//   Users,
//   SalesReport,
//   InventoryReport,
//   ProfitAndLossReport,
//   AnnualReport,
//   NotFound,
//   Profile,
//   Customers,
//   InvitedUsers,
//   Security,
//   Activities,
// } from "@/pages/index.js";
// import { PrivateRoute } from "@/components/index.js";
// import { Toaster } from "react-hot-toast";
// import patchToast from "./utils/patchToast";
// import { motion } from "motion/react";
// import { useApiDataStore } from "./store";
// import { useEffect } from "react";

// patchToast();

// function App() {
//   const navigate = useNavigate();
//   const { error, loading } = useApiDataStore();

//   if (error) navigate("/404");

//   return (
//     // <motion.div
//     //   initial={{ opacity: 0, scale: 0, width: "0vw", height: "0vh" }}
//     //   animate={{
//     //     opacity: loading ? 0 : 1,
//     //     scale: loading ? 0 : 1,
//     //     width: loading ? "0vw" : "100vw",
//     //     height: loading ? "0vh" : "100vh",
//     //   }}
//     //   transition={{
//     //     duration: 0.4,
//     //   }}
//     //   className="bg-base-200 flex"
//     // >
//     <motion.div
//       initial={{ opacity: 0, y: 20 }}
//       animate={{ opacity: loading ? 0 : 1, y: loading ? 20 : 0 }}
//       transition={{ duration: 0.3 }}
//       className="bg-base-200"
//     >
//       <Toaster position="top-right" />

//       <Routes>
//         {/* Public Routes - Uses AuthLayout */}
//         <Route element={<AuthLayout />}>
//           <Route path="/login" element={<Login />} />
//           <Route path="/register" element={<Register />} />
//         </Route>

//         {/* Protected Routes */}
//         <Route element={<PrivateRoute />}>
//           <Route element={<MainLayout />}>
//             <Route path="/" element={<Navigate to="/dashboard" />} />
//             <Route path="/dashboard" element={<Dashboard />} />
//             <Route path="/products" element={<Products />} />
//             <Route path="/products/:id" element={<Product />} />
//             <Route
//               path="/products/new"
//               element={<AddProduct page="Create" />}
//             />
//             <Route
//               path="/products/:id/edit"
//               element={<AddProduct page="Edit" />}
//             />
//             <Route path="/categories" element={<Categories />} />
//             <Route path="/brands" element={<Brands />} />
//             <Route path="/orders" element={<Orders />} />
//             <Route path="/sales-returns" element={<SalesReturn />} />
//             <Route path="/invoices" element={<Invoices />} />
//             <Route path="/invoices/:id" element={<InvoiceDetails />} />
//             <Route path="/accounts/invites" element={<InvitedUsers />} />
//             <Route path="/accounts/users" element={<Users />} />
//             <Route path="/accounts/customers" element={<Customers />} />
//             <Route path="/reports/sales" element={<SalesReport />} />
//             <Route path="/reports/inventory" element={<InventoryReport />} />
//             <Route
//               path="/reports/profit-loss"
//               element={<ProfitAndLossReport />}
//             />
//             <Route path="/reports/annual" element={<AnnualReport />} />
//             <Route path="/user/profile" element={<Profile />} />
//             <Route path="/user/security" element={<Security />} />
//             <Route path="/activities" element={<Activities />} />
//           </Route>
//         </Route>

//         {/* Optional 404 Fallback */}
//         <Route path="/404" element={<NotFound />} />
//         <Route path="*" element={<NotFound />} />
//       </Routes>
//     </motion.div>
//   );
// }

// export default App;
