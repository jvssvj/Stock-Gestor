import styles from "./index.module.css";
import { Link, useParams } from "react-router-dom";
import { Pencil, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";

import useGetItems from "../../hooks/useGetItems";
import useDeleteItem from "../../hooks/useDeleteItem";

import ConfirmDeletion from "../../components/ConfirmDeletion";
import Information from "../../components/Information";

export default function Item() {
  // carrega do localStorage
  const { items: initialItems, loading, error } = useGetItems();

  // estado local (OBRIGATÓRIO)
  const [items, setItems] = useState([]);

  useEffect(() => {
    setItems(initialItems);
  }, [initialItems]);

  const { itemToDelete, setItemToDelete, confirmDelete } = useDeleteItem({
    items,
    setItems,
  });

  const { itemId } = useParams();
  const item = items.find((i) => i.id === Number(itemId));

  if (loading) return <p>Carregando...</p>;
  if (error) return <p>Erro ao carregar item.</p>;
  if (!item) return <p>Item não encontrado.</p>;

  const price = item.price;
  const totalPrice = item.price * item.quantity;

  function formatDateISO(dateStr) {
    if (!dateStr) return "";
    const [y, m, d] = dateStr.split("-");
    return `${d}/${m}/${y}`;
  }

  return (
    <>
      {itemToDelete && (
        <ConfirmDeletion
          productName={itemToDelete.name}
          productSku={itemToDelete.sku}
          cancelAction={() => setItemToDelete(null)}
          confirmAction={confirmDelete}
        />
      )}

      <h2 className={styles.main__t}>Detalhes do item</h2>

      <div className={styles.container}>
        <section className={styles.details__container}>
          <img
            className={styles.item__img}
            src={item.image}
            alt={item.name}
          />

          <section>
            <h3 className={styles.general__information__container__t}>
              Informações gerais
            </h3>

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
                  information={`R$ ${price.toLocaleString("pt-BR")}`}
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
                  information={`R$ ${totalPrice.toLocaleString("pt-BR")}`}
                  emphasis
                />
              </div>
            </div>
          </section>

          <section>
            <h3 className={styles.description__t}>Descrição</h3>
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

            <button
              onClick={() => setItemToDelete(item)}
              className={`${styles.action} ${styles.delete}`}
            >
              <Trash2 /> Excluir item
            </button>
          </div>

          <hr className={styles.line} />

          <section className={styles.metadata__container}>
            <h3 className={styles.metadata__t}>Metadados</h3>
            <div className={styles.metadata__infos__container}>
              <Information
                title="Data de adição:"
                information={formatDateISO(item.date)}
                metadata
              />
              <Information
                title="Última modificação:"
                information={formatDateISO(item.updatedDate)}
                metadata
              />
            </div>
          </section>
        </section>
      </div>
    </>
  );
}
