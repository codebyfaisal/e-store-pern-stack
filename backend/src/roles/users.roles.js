const roles = {
  admin: [
    "dashboard",
    "products",
    "products/new",
    "categories",
    "brands",
    "qr-barcode",
    "orders",
    "sales-returns",
    "invoices",
    "accounts/invites",
    "accounts/users",
    "accounts/customers",
    "reports/sales",
    "reports/inventory",
    "reports/profit-loss",
    "reports/annual",
  ],
  moderator: [
    "dashboard",
    "products",
    "categories",
    "orders",
    "sales-returns",
    "invoices",
    "reports/sales",
    "reports/inventory",
  ],
  editor: [
    "dashboard",
    "products",
    "products/new",
    "categories",
    "brands",
    "orders",
    "sales-returns",
  ],
};

export default roles;
// const roles = {
//   admin: [
//     "dashboard",
//     "products",
//     "products/new",
//     "categories",
//     "brands",
//     "qr-barcode",
//     "orders",
//     "sales-returns",
//     "invoices",
//     "accounts/invites",
//     "accounts/users",
//     "accounts/customers",
//     "reports/sales",
//     "reports/inventory",
//     "reports/profit-loss",
//     "reports/annual",
//   ],

//   salesManager: [
//     "dashboard",
//     "orders",
//     "sales-returns",
//     "invoices",
//     "accounts/customers",
//     "reports/sales",
//     "reports/profit-loss",
//   ],

//   inventoryManager: [
//     "dashboard",
//     "products",
//     "products/new",
//     "categories",
//     "brands",
//     "qr-barcode",
//     "reports/inventory",
//   ],

//   accountant: [
//     "dashboard",
//     "reports/sales",
//     "reports/profit-loss",
//     "reports/annual",
//   ],

//   customerService: [
//     "dashboard",
//     "sales-returns",
//     "accounts/customers",
//   ],

//   marketingManager: [
//     "dashboard",
//     "reports/sales",
//     "reports/profit-loss",
//   ],

//   supplier: [
//     "products",
//     "categories",
//     "brands",
//   ],

//   guest: [
//     "products",
//     "categories",
//     "brands",
//   ]
// };

// export default roles;
