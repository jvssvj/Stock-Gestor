import styles from "./index.module.css";

export default function Information({
  title,
  information,
  emphasis,
  metadata,
}) {
  return (
    <div
      className={`${styles.information__container} ${
        metadata ? styles.metadata : ""
      }`}
    >
      <span className={styles.title}>{title}</span>
      <span
        className={`${styles.information} ${emphasis ? styles.emphasis : ""}`}
      >
        {information}
      </span>
    </div>
  );
}
