import styles from "./index.module.css";

export default function Metadata({ formattedDate, formattedUpdateDate }) {
  return (
    <section className={styles.metadata__container}>
      <h3 className={styles.metadata__t}>Metadados</h3>
      <div className={styles.metadata__infos__container}>
        <div className={styles.metadata__info__container}>
          <span className={styles.title}>Data de adição:</span>
          <span className={styles.information}>{formattedDate}</span>
        </div>
        <div className={styles.metadata__info__container}>
          <span className={styles.title}>Última modificação:</span>
          <span className={styles.information}>{formattedUpdateDate}</span>
        </div>
      </div>
    </section>
  );
}
