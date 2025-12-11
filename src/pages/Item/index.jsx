import styles from "./index.module.css";
import { Link, useParams } from "react-router-dom";
import { Pencil, Trash2 } from "lucide-react";
import useGetItems from "../../hooks/useGetItems";
import Information from "../../components/Information";

export default function Item() {
  const { items, loading, error } = useGetItems();
  const { itemId } = useParams();
  const item = items.find((i) => i.id === +itemId);

  if (loading) return <p>Carregando..</p>;
  if (error) return <p>Erro ao carregar itens.</p>;

  const totalPrice = item.price * item.quantity;

  const priceFormated = item.price.toLocaleString("pt-BR", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  const totalPriceFormated = totalPrice.toLocaleString("pt-BR", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  function formatDateISO(dateStr) {
    if (!dateStr || typeof dateStr !== "string") return "";

    const [year, month, day] = dateStr.split("-");
    return `${day.padStart(2, "0")}/${month.padStart(2, "0")}/${year}`;
  }

  const itemDate = formatDateISO(item.date);
  const updatedDate = formatDateISO(item.updatedDate);

  return (
    <section className={styles.section}>
      <h2 className={styles.main__t}>Detalhes do item</h2>

      <div className={styles.container}>
        <section className={styles.details__container}>
          <img
            className={styles.item__img}
            src={item.image}
            alt="Imagem do produto"
          />
          <h3 className={styles.details__container__t}>Informações gerais</h3>

          <hr className={styles.line} />

          <div className={styles.infomation__container}>
            <div className={styles.column}>
              <Information
                title={"Nome do item"}
                information={item.name}
              />
              <Information
                title={"Categoria"}
                information={item.category}
              />
              <Information
                title={"Preço unitário"}
                information={`R$ ${priceFormated}`}
              />
            </div>
            <div className={styles.column}>
              <Information
                title={"Código/SKU"}
                information={item.sku}
              />
              <Information
                title={"Em estoque"}
                information={`${item.quantity} unidades`}
              />
              <Information
                title={"Valor total em estoque"}
                information={`R$ ${totalPriceFormated}`}
                emphasis
              />
            </div>
          </div>

          <section>
            <h3 className={styles.description__t}>Descrição do item</h3>
            <p className={styles.description__p}>{item.description}</p>
          </section>
        </section>
        <section className={styles.actions__panel}>
          <h3 className={styles.actions__panel__t}>Ações</h3>
          <div className={styles.action__container}>
            <Link
              to={`/update/${item.id}`}
              className={`${styles.action} ${styles.update}`}
            >
              <Pencil /> Atualizar item
            </Link>

            <button className={`${styles.action} ${styles.delete}`}>
              <Trash2 /> Excluir item
            </button>
          </div>

          <hr className={styles.line} />

          <h3 className={styles.actions__panel__t}>Metadados</h3>
          <div className={styles.metadata__container}>
            <Information
              title={"Data de adição:"}
              information={itemDate}
              metadata
            />
            <Information
              title={"Última modificação:"}
              information={updatedDate}
              metadata
            />
          </div>
        </section>
      </div>
    </section>
  );
}
