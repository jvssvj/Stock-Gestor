import NavItem from "./NavItem";
import styles from "./index.module.css";
import stockflowicon from "@/assets/images/stockgestor-icon-blue.png";
import { LayoutDashboard, Box, LogOut, Settings, ExternalLink } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useAuth } from "../../../../hooks/useAuth";

export default function Sidebar() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const location = useLocation();
  const [active, setActive] = useState("dashboard");
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Sem isso → o botão só muda quando você clica no menu.
  useEffect(() => {
    if (location.pathname === "/dashboard") setActive("dashboard");
    if (location.pathname === "/dashboard/items") setActive("stock");
  }, [location.pathname]);
  // Sem isso → o botão só muda quando você clica no menu.

  return (
    <>
      <div onClick={() => setIsMenuOpen((prev) => !prev)} className={`${isMenuOpen ? styles.overlay : ""}`}></div>
      <div className={`${styles.sidebar} ${isMenuOpen ? styles.active : ""}`}>
        <label className={styles.hamburger}>
          <input checked={isMenuOpen} onChange={() => setIsMenuOpen((prev) => !prev)} type="checkbox" />

          <svg viewBox="0 0 32 32">
            <path
              className={`${styles.hamburger__line} ${styles.hamburger__lineTopBottom}`}
              d="M27 10 13 10
                                C10.8 10 9 8.2 9 6
                                9 3.5 10.8 2 13 2
                                15.2 2 17 3.8 17 6
                                L17 26
                                C17 28.2 18.8 30 21 30
                                23.2 30 25 28.2 25 26
                                25 23.8 23.2 22 21 22
                                L7 22"
            />
            <path
              className={styles.hamburger__line}
              d="M7 16 27 16"
            />
          </svg>
        </label>
        <Link to={'/'} className={styles.title}>
          <img src={stockflowicon} alt="" className={styles.logo} />
          StockFlow
          <ExternalLink className={styles.icon__link} />
        </Link>

        <nav className={styles.nav}>
          <Link
            to="/dashboard"
            style={{ textDecoration: "none" }}
            onClick={() => setIsMenuOpen(false)}
          >
            <NavItem
              isActive={active === "dashboard"}
              onClick={() => setActive("dashboard")}
              imageElement={<LayoutDashboard />}
              name="Dashboard"
            />
          </Link>

          <Link
            to="items"
            style={{ textDecoration: "none" }}
            onClick={() => setIsMenuOpen(false)}
          >
            <NavItem
              isActive={active === "stock"}
              onClick={() => setActive("stock")}
              imageElement={<Box />}
              name="Estoque"
            />
          </Link>
        </nav>

        <div className={styles.profile__container}>
          <hr className={styles.profile__container__line} />
          <div className={styles.profile__content}>
            {(user?.avatarUrl) ?
              <img
                className={styles.profile__userAvatar}
                src={user.avatarUrl}
                alt=""
              />
              :
              <span className={styles.profile__userAvatar}>
                {user?.name.slice(0, 1)}
              </span>
            }
            <span className={styles.profile__userName}>{user.name}</span>
          </div>

          <button
            className={styles.profile__content__button}
          >
            <Settings />
            Configurações
          </button>

          <button
            className={styles.profile__content__button}
            onClick={() => {
              navigate('/', { replace: true })
              setTimeout(() => logout(), 1);
            }}
          >
            <LogOut />
            Sair
          </button>
        </div>

      </div>
    </>
  );
}
