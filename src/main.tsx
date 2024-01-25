import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { createClient, Provider, cacheExchange, fetchExchange } from "urql";
import { authExchange } from "@urql/exchange-auth";
import Root from "routes/root";
import { Home } from "components/landing-page/Home";
import { SignUp } from "components/landing-page/SignUp";
import { SignIn } from "components/landing-page/SignIn";
import Dashboard from "components/dashboard/Dashboard";
import Settings from "components/settings-page/Settings";
import Customer from "components/customer/Customer";
import { CustomerPage } from "components/customer/screens/CustomerPage";
import { CustomerDetails } from "components/customer/screens/customer-details/CustomerDetails";
import { Shippings } from "components/customer/shippings/Shippings";
import { ShippingList } from "components/customer/shippings/Shippings";
import { ShippingDetails } from "components/customer/shippings/screens/shipping-details/ShippingDetails";

import "./index.css";

const client = createClient({
  url: import.meta.env.VITE_API_URL || "http://localhost:4000/graphql",
  exchanges: [
    cacheExchange,
    authExchange(async (utils) => {
      const localSession = localStorage.getItem(
        "sb-edmyrapaqwyonmwrazea-auth-token"
      );
      const token = JSON.parse(localSession)?.access_token;
      console.log("[auth exchange] token: ", token);
      return {
        addAuthToOperation(operation) {
          if (!token) return operation;
          return utils.appendHeaders(operation, {
            Authorization: `Bearer ${token}`,
          });
        },
        didAuthError(error) {
          return error.graphQLErrors.some(
            (e) => e.extensions?.code === "FORBIDDEN"
          );
        },
        async refreshAuth() {
          // const result = await utils.mutate(REFRESH, { token });
          // if (result.data?.refreshLogin) {
          //   token = result.data.refreshLogin.token;
          //   refreshToken = result.data.refreshLogin.refreshToken;
          //   localStorage.setItem('token', token);
          //   localStorage.setItem('refreshToken', refreshToken);
          // }
        },
      };
    }),
    fetchExchange,
  ],
});

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "/signup",
        element: <SignUp />,
      },
      {
        path: "/signin",
        element: <SignIn />,
      },
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
            children: [
              {
                index: true,
                element: <ShippingList />,
              },
              {
                path: "/customers/:customerId/shippings/:shippingId",
                element: <ShippingDetails />,
              },
            ],
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
