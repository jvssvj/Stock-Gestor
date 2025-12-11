import { createBrowserRouter } from "react-router-dom";
import RootLayout from "./layouts/RootLayout";
import Home from "./pages/Home";
import Stock from "./pages/Stock";
import Item from "./pages/Item";
import RegisterItem from "./pages/RegisterItem";
import UpdateItem from "./pages/UpdateItem";
import SuccessStatus from "./pages/SuccessStatus";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      { index: true, element: <Home /> },
      { path: "/items", element: <Stock /> },
      { path: "/items/:itemId", element: <Item /> },
      { path: "/register", element: <RegisterItem /> },
      { path: "/update/:itemId", element: <UpdateItem /> },
      { path: "/success", element: <SuccessStatus /> },
    ],
  },
]);

export default router;
