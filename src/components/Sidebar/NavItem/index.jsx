import PropTypes from "prop-types";
import styles from "./index.module.css";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";

export default function NavItem({ imageElement, name, isActive, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`${styles.nav__item} ${isActive ? styles.active : ""}`}
    >
      {isActive && (
        <motion.span
          layoutId="navIndicator" // <- mesma string em todos
          className={styles.indicator}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
        />
      )}
      <span className={styles.teste}>{imageElement}</span>
      <span className={styles.label}>{name}</span>
    </button>
  );
}

NavItem.propTypes = {
  imageElement: PropTypes.element,
  name: PropTypes.string.isRequired,
  isActive: PropTypes.bool,
  onClick: PropTypes.func,
};

NavItem.defaultProps = {
  isActive: false,
  onClick: () => {},
};
