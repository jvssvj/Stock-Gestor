import NavItem from "./NavItem";
import styles from "./index.module.css";
import stockflowicon from "@/assets/images/stockgestor-icon-blue.png";
import { LayoutDashboard, Box } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";

export default function Sidebar() {
  const location = useLocation();
  const [active, setActive] = useState("home");
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Sem isso → o botão só muda quando você clica no menu.
  useEffect(() => {
    if (location.pathname === "/dashboard") setActive("home");
    if (location.pathname === "/dashboard/items") setActive("stock");
  }, [location.pathname]);
  // Sem isso → o botão só muda quando você clica no menu.

  return (
    <>
      <div className={`${styles.sidebar} ${isMenuOpen ? styles.active : ""}`}>
        <section className={styles.title}>
          <img
            src={stockflowicon}
            style={{ width: "25px" }}
            alt="Abrir e fechar menu"
            onClick={() => setIsMenuOpen((prev) => !prev)}
            className={`${styles.icon} ${isMenuOpen ? styles.activeIcon : ""}`}
          />
          <h1>Stock Flow</h1>
        </section>

        <nav className={styles.nav}>
          <Link
            to="/dashboard"
            style={{ textDecoration: "none" }}
            onClick={() => setIsMenuOpen((prev) => !prev)}
          >
            <NavItem
              isActive={active === "home"}
              onClick={() => setActive("home")}
              imageElement={<LayoutDashboard />}
              name="Início"
            />
          </Link>

          <Link
            to="items"
            style={{ textDecoration: "none" }}
            onClick={() => setIsMenuOpen((prev) => !prev)}
          >
            <NavItem
              isActive={active === "stock"}
              onClick={() => setActive("stock")}
              imageElement={<Box />}
              name="Estoque"
            />
          </Link>
        </nav>

      </div>
      <div onClick={() => setIsMenuOpen((prev) => !prev)} className={`${isMenuOpen ? styles.overlay : ""}`}></div>
    </>
  );
}
