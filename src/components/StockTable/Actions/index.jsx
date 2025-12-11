import PropTypes from "prop-types";
import styles from "./index.module.css";

export default function Actions({ icon, text, isTrash }) {
  return (
    <div className={styles.icon__container}>
      <div className={`${styles.icon} ${isTrash ? styles.icon__trash : ""}`}>{icon}</div>
      <div className={styles.icon__modal}>{text}</div>
    </div>
  );
}

Actions.propTypes = {
  icon: PropTypes.elementType.isRequired,
  text: PropTypes.string.isRequired,
  isTrash: PropTypes.bool,
};
