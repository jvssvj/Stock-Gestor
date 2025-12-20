import styles from "./index.module.css";

export default function LowStock({ data }) {
  return (
    <div className={styles.table__container}>
      <section className={styles.title__container}>
        <h3>{`Itens com baixo estoque (<= 10)`}</h3>
        <button className={styles.report}>Gerar relatório</button>
      </section>

      <table className={styles.table}>
        <thead className={styles.table__header}>
          <tr>
            <th className={styles.table__header__name}>Nome</th>
            <th className={styles.table__header__name}>Quatidade</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr
              key={item.id}
              className={styles.table__row__container}
            >
              <td>{item.name}</td>
              <td className={styles.badge__container}>
                <span
                  className={`${styles.badge} ${
                    item.quantity <= 5 ? styles.very__bad : styles.bad
                  }`}
                >
                  {item.quantity}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
