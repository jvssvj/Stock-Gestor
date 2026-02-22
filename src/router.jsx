import { createBrowserRouter } from "react-router-dom";
import RootLayout from "./layouts/RootLayout";
import Dashboard from "./pages/Dashboard";
import Stock from "./pages/Stock";
import Item from "./pages/Item";
import CreateItem from "./pages/CreateItem";
import UpdateItem from "./pages/UpdateItem";
import SuccessStatus from "./pages/SuccessStatus";

import Home from "./pages/Home";
import Login from "./pages/Auth/Login";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/dashboard",
    element: <RootLayout />,
    children: [
      { index: true, element: <Dashboard /> },
      { path: "create", element: <CreateItem /> },
      {
        path: "items",
        children: [
          { index: true, element: <Stock /> },
          { path: ":itemId", element: <Item /> },
          { path: ":itemId/update", element: <UpdateItem /> },
        ],
      },
      { path: "success", element: <SuccessStatus /> },
    ],
  },
]);

export default router;
