import { Outlet } from "react-router-dom";
import styles from './index.module.css'
import Sidebar from "./components/Sidebar";

export default function RootLayout() {
  return (
    <div style={{ display: "flex", overflow: "hidden" }}>
      <Sidebar />
      <main className={styles.container}>
        <Outlet />
      </main>
    </div>
  );
}
