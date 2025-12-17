import styles from "./index.module.css";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import useGetItems from "../../hooks/useGetItems";
import useDeleteItem from "../../hooks/useDeleteItem";
import ConfirmDeletion from "../../components/ConfirmDeletion";
import Actions from "./components/Actions";
import Metadata from "./components/Metadata";
import Description from "./components/ItemDetails/Description";
import Informations from "./components/ItemDetails/Informations";

export default function Item() {
  const { items: initialItems, loading, error } = useGetItems();
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
        <div className={styles.details__container}>
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

            <Informations
              item={item}
              price={price}
              totalPrice={totalPrice}
            />
          </section>
          <div style={{ marginTop: "1rem" }}>
            <Description item={item} />
          </div>
        </div>

        <div className={styles.actions__panel}>
          <Actions
            item={item}
            setItemToDelete={() => setItemToDelete(item)}
          />

          <hr className={styles.line} />

          <Metadata
            formattedDate={formatDateISO(item.date)}
            formattedUpdateDate={formatDateISO(item.updatedDate)}
          />
        </div>
      </div>
    </>
  );
}
