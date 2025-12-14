import { createBrowserRouter } from "react-router-dom";
import RootLayout from "./layouts/RootLayout";
import Dashboard from "./pages/Dashboard";
import Stock from "./pages/Stock";
import Item from "./pages/Item";
import CreateItem from "./pages/CreateItem";
import UpdateItem from "./pages/UpdateItem";
import SuccessStatus from "./pages/SuccessStatus";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      { index: true, element: <Dashboard /> },
      { path: "/items", element: <Stock /> },
      { path: "/items/:itemId", element: <Item /> },
      { path: "/create", element: <CreateItem /> },
      { path: "/update/:itemId", element: <UpdateItem /> },
      { path: "/success", element: <SuccessStatus /> },
    ],
  },
]);

export default router;
