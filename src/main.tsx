import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Root from "routes/root";
import Dashboard from "components/dashboard/Dashboard"

import "./index.css";



// <Route path="/dashboard">
//                   <Dashboard />
//                 </Route>
//                 <Route exact path="/clientes/:customerId">
//                   <CustomerPage />
//                 </Route>
//                 <Route exact path="/clientes">
//                   <Clientes />
//                 </Route>
//                 <Route path="/proveedores">
//                   <SupplierPage />
//                 </Route>
//                 <Route path="/indicadores">
//                   <Indicadores />
//                 </Route>
//                 <Route path="/liquidaciones">
//                   <Liquidaciones />
//                 </Route>
//                 <Route path="/directorio">
//                   <Directorio />
//                 </Route>
//                 <Route path="/settings">
//                   <Settings />
//                 </Route>
//                 <Route path="/expo/:expoId"></Route>

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [{ path: "/dashboard", element: <Dashboard /> }],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
