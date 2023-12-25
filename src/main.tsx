import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Root from "routes/root";
import Dashboard from "components/dashboard/Dashboard";
import Settings from "components/settings-page/Settings";
import Customer from "components/customer/Customer";

import "./index.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      { path: "/dashboard", element: <Dashboard /> },
      {
        path: "/customers",
        element: <Customer />,
      },
      {
        path: "/suppliers",
        element: <div>Suppliers page</div>,
      },
      {
        path: "/indicators",
        element: <div>Indicators page</div>,
      },
      {
        path: "/costs",
        element: <div>Costs page</div>,
      },
      {
        path: "/directory",
        element: <div>Directory page</div>,
      },
      {
        path: "/settings",
        element: <Settings />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
