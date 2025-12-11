import styles from "./index.module.css";
import emptyBoxIcon from "../../assets/images/empty-box.png";
import AddItem from "../AddItem";

export default function EmptyStock() {
  return (
    <div className={styles.empty__container}>
      <section className={styles.empty__content}>
        <img
          className={styles.empty__icon}
          src={emptyBoxIcon}
          alt=""
        />
        <h2 className={styles.empty__t}>Seu estoque está vazio</h2>
        <p className={styles.empty__p}>
          Parece que você ainda não adicionou nenhum item. Comece agora para
          organizar seu inventário.
        </p>
        <div className={styles.empty__button}>
          <AddItem />
        </div>
      </section>
    </div>
  );
}
