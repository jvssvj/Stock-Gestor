import { Link } from "react-router-dom";
import styles from "./index.module.css";

export default function RecentItems({ data }) {
  return (
    <div className={styles.table__container}>
      <table className={styles.table}>
        <thead className={styles.table__header}>
          <tr>
            <th className={styles.table__header__name}>Nome</th>
            <th className={styles.table__header__name}>Quatidade</th>
            <th className={styles.table__header__name}>Adicionado em</th>
          </tr>
        </thead>
        <tbody>
          {data &&
            data.map((item) => (
              <tr
                key={item.id}
                className={styles.table__row__container}
              >
                <td>{item.name}</td>
                <td className={styles.table__row__item}>{item.quantity}</td>
                <td className={styles.table__row__item}>{item.date}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}
