import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { createClient, Provider, cacheExchange, fetchExchange } from "urql";
import Root from "routes/root";
import Dashboard from "components/dashboard/Dashboard";
import Settings from "components/settings-page/Settings";
import Customer from "components/customer/Customer";
import { CustomerPage } from "components/customer/screens/CustomerPage";
import { CustomerDetails } from "components/customer/screens/customer-details/CustomerDetails";
import { Shippings } from "components/customer/shippings/Shippings";

import "./index.css";

const client = createClient({
  url: import.meta.env.VITE_API_URL || "http://localhost:4000/graphql",
  exchanges: [cacheExchange, fetchExchange],
});

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
        path: "/customers/:customerId",
        element: <CustomerPage />,
        children: [
          {
            index: true,
            element: <CustomerDetails />,
          },
          {
            path: "/customers/:customerId/info",
            element: <CustomerDetails />,
          },
          {
            path: "/customers/:customerId/shippings",
            element: <Shippings />,
          },
          {
            path: "/customers/:customerId/oc",
            element: <p>customer page OC</p>,
          },
        ],
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
    <Provider value={client}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
