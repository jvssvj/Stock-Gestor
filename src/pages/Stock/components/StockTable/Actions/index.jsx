import PropTypes from "prop-types";
import styles from "./index.module.css";

export default function Actions({ icon, isTrash, text, onClick }) {
  return (
    <div
      onClick={onClick}
      className={styles.icon__container}
    >
      <span
        aria-label={text}
        className={`${styles.icon} ${isTrash ? styles.icon__trash : ""}`}
      >
        {icon}
      </span>
    </div>
  );
}

Actions.propTypes = {
  icon: PropTypes.elementType.isRequired,
  text: PropTypes.string.isRequired,
  isTrash: PropTypes.bool,
};
