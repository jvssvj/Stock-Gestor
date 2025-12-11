import { Link } from "react-router-dom";
import Information from "../Information";
import { CircleCheck } from "lucide-react";
import styles from "./index.module.css";

export default function SucessStatusCard({
  itemId,
  itemName,
  itemSku,
  itemQuantity,
  status,
}) {
  return (
    <>
      <section className={styles.card__container}>
        <div className={styles.icon__container}>
          <CircleCheck className={styles.icon} />
        </div>
        <h2>
          Item{" "}
          {status === "update"
            ? "atualizado"
            : status === "create"
            ? "cadastrado"
            : status === "delete"
            ? "deletado"
            : "processado"}{" "}
          com Sucesso!
        </h2>
        <p>
          O item foi
          {status === "update"
            ? "atualizado"
            : status === "create"
            ? "cadastrado"
            : status === "delete"
            ? "deletado"
            : "processado"}{" "}
          no seu inventário.
        </p>
        <div className={styles.item__infos}>
          <Information
            title={"Nome do item:"}
            information={itemName}
            metadata
          />
          <Information
            title={"Código/SKU:"}
            information={itemSku}
            metadata
          />
          <Information
            title={"Estoque atual:"}
            information={itemQuantity}
            metadata
          />
        </div>
        <div className={styles.buttons__container}>
          {status === "delete" && (
            <Link
              className={`${styles.button} ${styles.to__stock}`}
              to={"/items"}
            >
              Voltar para o estoque
            </Link>
          )}
          <Link
            className={`${styles.button} ${styles.to__stock}`}
            to={"/items"}
          >
            Voltar para o estoque
          </Link>
          <Link
            className={`${styles.button} ${styles.to__detail}`}
            to={`/items/${itemId}`}
          >
            Ver detalhes do item
          </Link>
        </div>
      </section>
    </>
  );
}
