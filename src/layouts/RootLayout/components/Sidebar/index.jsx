import NavItem from "./NavItem";
import styles from "./index.module.css";
import stockflowicon from "@/assets/images/stockgestor-icon-blue.png";
import { LayoutDashboard, Box, LogOut, Settings } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useAuth } from "../../../../hooks/useAuth";

export default function Sidebar() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()
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
      <div onClick={() => setIsMenuOpen((prev) => !prev)} className={`${isMenuOpen ? styles.overlay : ""}`}></div>
      <div className={`${styles.sidebar} ${isMenuOpen ? styles.active : ""}`}>
        <section className={styles.title}>
          <img
            src={stockflowicon}
            style={{ width: "25px" }}
            alt="Abrir e fechar menu"
            onClick={() => setIsMenuOpen((prev) => !prev)}
            className={`${styles.icon} ${isMenuOpen ? styles.activeIcon : ""}`}
          />
          <h1>StockFlow</h1>
        </section>

        <nav className={styles.nav}>
          <Link
            to="/dashboard"
            style={{ textDecoration: "none" }}
            onClick={() => setIsMenuOpen(false)}
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
            <div>
              <Settings />
            </div>
            Configurações
          </button>

          <button
            className={styles.profile__content__button}
            onClick={() => {
              navigate('/', { replace: true })
              setTimeout(() => logout(), 1);
            }}
          >
            <div>
              <LogOut />
            </div>
            Sair
          </button>
        </div>

      </div>
    </>
  );
}
