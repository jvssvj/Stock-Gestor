import { createBrowserRouter } from "react-router-dom";
import RootLayout from "./layouts/RootLayout/RootLayout";
import Dashboard from "./pages/Dashboard";
import Stock from "./pages/Stock";
import Item from "./pages/Item";
import CreateItem from "./pages/CreateItem";
import UpdateItem from "./pages/UpdateItem";
import SuccessStatus from "./pages/SuccessStatus";
import Home from "./pages/Home";
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";
import PrivateRoute from "./components/PrivateRoute";
import SettingsPage from "./pages/SettingsPage";
import Categories from "./pages/Categories";

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
    path: '/register',
    element: <Register />
  },
  {
    element: <PrivateRoute />,
    children: [
      {
        path: "/app",
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
          { path: "settings", element: <SettingsPage /> },
          { path: "success", element: <SuccessStatus /> },
          { path: "categories", element: <Categories /> }
        ],
      },
    ]
  },
]);

export default router;
