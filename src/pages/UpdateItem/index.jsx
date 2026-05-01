import { useParams, useNavigate } from "react-router-dom";
import Form from "../../components/Form";
import useGetItems from "../../hooks/useGetItems";

export default function UpdateItem() {
  const { itemId } = useParams();
  const navigate = useNavigate();
  const { items, loading, error } = useGetItems();

  if (loading) return <p>Carregando...</p>;
  if (error) return <p>{error}</p>;

  const item = items.find((item) => item.id === Number(itemId));

  if (!item) return <p>Item não encontrado.</p>;

  const categories = [...new Set(items.map((it) => it.category))].sort();

  const handleUpdate = (updatedItem) => {
    const newList = items.map((i) =>
      i.id === updatedItem.id ? { ...i, ...updatedItem } : i
    );

    localStorage.setItem("items", JSON.stringify(newList));

    navigate("/dashboard/success", {
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
    <section className="w-full max-w-[1920px]">
      <h2 className="text-text-dark font-bold text-3xl">Atualização do item</h2>
      <p className="text-text-muted mt-2 mb-8">
        Atualize os detalhes abaixo para atualizar o item no seu inventário.
      </p>
      <Form
        mode="update"
        itemId={item.id}
        itemName={item.name}
        itemQuantity={item.quantity}
        itemPriceInCents={item.priceInCents}
        itemCategory={item.category}
        itemDescription={item.description}
        itemSku={item.sku}
        categories={categories}
        onSubmit={handleUpdate}
      />
    </section>
  );
}
