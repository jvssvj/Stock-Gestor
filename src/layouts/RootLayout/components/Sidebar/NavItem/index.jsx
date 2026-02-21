import styles from "./index.module.css";

export default function NavItem({ imageElement, name, isActive, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`${styles.nav__item} ${isActive ? styles.active : ""}`}
    >
      <span className={styles.icon}>{imageElement}</span>
      <span className={styles.label}>{name}</span>
    </button>
  );
}