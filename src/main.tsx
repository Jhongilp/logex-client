import React from "react";
import ReactDOM from "react-dom/client";
import { Provider as ReduxProvider } from "react-redux";
import { store } from "store";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import {
  createClient,
  Provider,
  cacheExchange,
  fetchExchange,
  subscriptionExchange,
} from "urql";
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
import { ExpoPage } from "components/expo-page/ExpoPage";
import { ActivityModule } from "components/expo-page/screens/activity-module/ActivityModule";
import { ShipmentModule } from "components/expo-page/screens/shipment-module/ShipmentModule";

import { createClient as createSSEClient } from "graphql-sse";

import "./index.css";
import { WaitingListForm } from "components/landing-page/WaitingListForm";

const sseClient = createSSEClient({
  url: "https://logex-server.onrender.com/graphql",
  // url: "http://localhost:4000/graphql",
  // url: "http://its.urql:4000/graphql",
});

const client = createClient({
  url: "https://logex-server.onrender.com/graphql",
  // url: "http://localhost:4000/graphql",
  // url: "/graphql/stream",
  exchanges: [
    cacheExchange,
    authExchange(async (utils) => {
      const localSession = localStorage.getItem(
        "sb-edmyrapaqwyonmwrazea-auth-token"
      );
      const token = JSON.parse(localSession)?.access_token;
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
        async refreshAuth() {},
      };
    }),
    fetchExchange,
    subscriptionExchange({
      forwardSubscription(operation) {
        return {
          subscribe: (sink) => {
            // @ts-expect-error it works
            const dispose = sseClient.subscribe(operation, sink);
            return {
              unsubscribe: dispose,
            };
          },
        };
      },
    }),
  ],
});

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <div>404 Not Found.</div>,
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
        path: "/waiting-list",
        element: <WaitingListForm />,
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
      {
        path: "/expo/:expoId",
        element: <ExpoPage />,
        children: [
          {
            index: true,
            element: <ActivityModule />,
          },
          {
            path: "/expo/:expoId/actividades",
            element: <ActivityModule />,
          },
          {
            path: "/expo/:expoId/shipment",
            element: <ShipmentModule />,
          },
        ],
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ReduxProvider store={store}>
      <Provider value={client}>
        <RouterProvider router={router} />
      </Provider>
    </ReduxProvider>
  </React.StrictMode>
);
