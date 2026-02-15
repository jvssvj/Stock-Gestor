import NavItem from "./NavItem";
import styles from "./index.module.css";
import stockflowicon from "../../../assets/images/stockgestor-icon.png";
import { LayoutDashboard, Box } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { LayoutGroup } from "framer-motion";

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

  function handleMenuClick() {
    setIsMenuOpen((prev) => !prev);
  }

  return (
    <>
      <div className={`${styles.sidebar} ${isMenuOpen ? styles.active : ""}`}>
        <section className={styles.title}>
          <img
            src={stockflowicon}
            style={{ width: "25px" }}
            alt="Abrir e fechar menu"
            onClick={handleMenuClick}
            className={`${styles.icon} ${isMenuOpen ? styles.activeIcon : ""}`}
          />
          <h1>Stock Flow</h1>
        </section>

        <LayoutGroup>
          <nav className={styles.nav}>
            <Link
              to="/dashboard"
              style={{ textDecoration: "none" }}
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
            >
              <NavItem
                isActive={active === "stock"}
                onClick={() => setActive("stock")}
                imageElement={<Box />}
                name="Estoque"
              />
            </Link>
          </nav>
        </LayoutGroup>
      </div>
      <div className={`${isMenuOpen ? styles.overlay : ""}`}></div>
    </>
  );
}
