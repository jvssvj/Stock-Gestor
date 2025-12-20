import { useParams, useNavigate } from "react-router-dom";
import Form from "../../components/Form";
import styles from "./index.module.css";
import useGetItems from "../../hooks/useGetItems";

export default function UpdateItem() {
  const { itemId } = useParams();
  const navigate = useNavigate();
  const { items, loading, error } = useGetItems();

  // enquanto carrega
  if (loading) return <p>Carregando...</p>;
  if (error) return <p>{error}</p>;

  const item = items.find((it) => it.id === Number(itemId));

  if (!item) return <p>Item não encontrado.</p>;

  const categories = [...new Set(items.map((it) => it.category))].sort();

  const handleUpdate = (updatedItem) => {
    // atualiza o array mantendo todos os outros itens
    const newList = items.map((i) =>
      i.id === updatedItem.id ? { ...i, ...updatedItem } : i
    );

    localStorage.setItem("items", JSON.stringify(newList));

    // navega pra página de sucesso com dados do item atualizado
    navigate("/success", {
      state: {
        mode: "update",
        itemId: updatedItem.id,
        itemName: updatedItem.name,
        itemQuantity: updatedItem.quantity,
        itemSku: updatedItem.sku,
      },
    });
  };

  return (
    <section className={styles.container}>
      <h2 className={styles.register__t}>Atualização do item</h2>
      <p className={styles.register__p}>
        Atualize os detalhes abaixo para atualizar o item no seu inventário.
      </p>
      <Form
        mode="update"
        itemId={item.id}
        itemName={item.name}
        itemQuantity={item.quantity}
        itemPrice={item.price}
        itemCategory={item.category}
        itemDescription={item.description}
        itemSku={item.sku}
        categories={categories}
        onSubmit={handleUpdate}
      />
    </section>
  );
}
