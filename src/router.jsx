import { createBrowserRouter } from "react-router-dom";
import RootLayout from "./layouts/RootLayout";
import Dashboard from "./pages/Dashboard";
import Stock from "./pages/Stock";
import Item from "./pages/Item";
import CreateItem from "./pages/CreateItem";
import UpdateItem from "./pages/UpdateItem";
import SuccessStatus from "./pages/SuccessStatus";
import Login from "./pages/Login";
import Home from "./pages/Home";

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

/**
 * Quando estiver dentro de estoque a rota vira: /dashboard/items
 * Quando clicar em atualizar um item nas ações da tabela a rota vira: /dashboard/items/update/1
 * Quando clicar em visualizar um item a rota vira: /dashboard/items/1
 * Quando clicar em visualizar um item e clicar para *atualizar* dentro dele a rota vira: /dashboard/items/1/update // Ao atualizar vai para /dashboard/sucess
 *
 *
 */

export default router;
