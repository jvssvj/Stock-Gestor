import { Delete, SearchX } from "lucide-react";
import styles from "./index.module.css";

export default function NoItemsFound({ onCLick, value }) {
  return (
    <div className={styles.container}>
      <span className={styles.icon}>
        {
          <SearchX
            size={30}
            color="#5f5f5f"
          />
        }
      </span>
      <section>
        <h2 className={styles.title}>Nenhum item encontrado</h2>
        <p className={styles.description}>
          Não encontramos resultados correspondentes a{" "}
          <strong>"{value}"</strong>. Verifique a ortografia ou tente usar
          termos mais genéricos.
        </p>
      </section>
      <button
        onClick={onCLick}
        className={styles.clean__input}
      >
        {<Delete color="#ffff" />} Limpar pesquisa
      </button>
    </div>
  );
}
