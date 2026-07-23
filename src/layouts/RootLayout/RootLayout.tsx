import { Outlet } from "react-router-dom";
import Sidebar from "./components/Sidebar";

export default function RootLayout() {
  return (
    <div style={{ display: "flex", overflow: "hidden" }}>
      <Sidebar />
      <main className="w-full flex items-center justify-start flex-col overflow-y-auto min-h-[100dvh] p-4 ml-[55px]">
        <Outlet />
      </main>
    </div>
  );
}
