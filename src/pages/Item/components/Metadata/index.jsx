import Information from "../../../../components/Information";
import styles from "./index.module.css";

export default function Metadata({ formattedDate, formattedUpdateDate }) {
  return (
    <section className={styles.metadata__container}>
      <h3 className={styles.metadata__t}>Metadados</h3>
      <div className={styles.metadata__infos__container}>
        <Information
          title="Data de adição:"
          information={formattedDate}
          metadata
        />
        <Information
          title="Última modificação:"
          information={formattedUpdateDate}
          metadata
        />
      </div>
    </section>
  );
}
