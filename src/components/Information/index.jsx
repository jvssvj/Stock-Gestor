import styles from "./index.module.css";

export default function Information({
  title,
  information,
  emphasis,
  inStatusCard,
}) {
  return (
    <div
      className={`${styles.information__container} ${
        inStatusCard ? styles.in__status__card : ""
      }`}
    >
      <span className={styles.title}>{title}</span>
      <span
        className={`${styles.information} ${emphasis ? styles.emphasis : ""} ${
          inStatusCard ? styles.in__status__card__information : ""
        }`}
      >
        {information}
      </span>
    </div>
  );
}
