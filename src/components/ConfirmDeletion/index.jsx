import { AlertTriangle } from "lucide-react";
import styles from "./index.module.css";

export default function ConfirmDeletion({
  productName,
  productSku,
  cancelAction,
  confirmAction,
}) {
  return (
    <div className={styles.container}>
      <div className={styles.overlay}></div>
      <div className={styles.card__container}>
        <section className={styles.card__content}>
          <span className={styles.icon}>
            {<AlertTriangle color="#ff1010" />}
          </span>
          <h2>Você tem certeza?</h2>
          <p>
            Esta ação não pode ser desfeita. Você está prestes a excluir
            permanentemente o item:
          </p>
          <h3>"{productName}"</h3>
          <span>SKU:[{productSku}]</span>

          <div className={styles.buttons__container}>
            <button
              className={`${styles.cancel__btn} ${styles.button}`}
              onClick={cancelAction}
            >
              Cancelar
            </button>
            <button
              className={`${styles.confirm__btn} ${styles.button}`}
              onClick={confirmAction}
            >
              Sim, excluir item
            </button>
          </div>
        </section>
      </div>
    </div>
  );
}
