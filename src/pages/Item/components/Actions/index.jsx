import { Link } from "react-router-dom";
import styles from "./index.module.css";
import { Pencil, Trash2 } from "lucide-react";

export default function Actions({ item, setItemToDelete }) {
  return (
    <section>
      <h3 className={styles.actions__panel__t}>Ações</h3>

      <div className={styles.action__container}>
        <Link
          to={`/update/${item.id}`}
          className={`${styles.action} ${styles.update}`}
        >
          <Pencil /> Atualizar item
        </Link>

        <button
          onClick={setItemToDelete}
          className={`${styles.action} ${styles.delete}`}
        >
          <Trash2 /> Excluir item
        </button>
      </div>
    </section>
  );
}
