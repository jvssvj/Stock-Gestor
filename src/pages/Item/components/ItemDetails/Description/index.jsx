import styles from "./index.module.css";

export default function Description({ item }) {
  return (
    <section>
      <h3 className={styles.description__t}>Descrição</h3>
      <p className={styles.description__p}>{item.description}</p>
    </section>
  );
}
