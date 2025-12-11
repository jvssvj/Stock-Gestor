import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";

export default function RootLayout() {
  return (
    <div style={{ display: "flex", overflow: "hidden" }}>
      <Sidebar />
      <main>
        <Outlet />
      </main>
    </div>
  );
}
