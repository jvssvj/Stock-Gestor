import PropTypes from "prop-types";
import styles from "./index.module.css";

export default function Actions({ icon, text, isTrash, onClick }) {
  return (
    <div
      onClick={onClick}
      className={styles.icon__container}
    >
      <span className={`${styles.icon} ${isTrash ? styles.icon__trash : ""}`}>
        {icon}
      </span>
      <span className={styles.icon__modal}>{text}</span>
    </div>
  );
}

Actions.propTypes = {
  icon: PropTypes.elementType.isRequired,
  text: PropTypes.string.isRequired,
  isTrash: PropTypes.bool,
};
