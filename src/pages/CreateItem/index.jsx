import { useNavigate } from "react-router-dom";
import Form from "../../components/Form";
import useGetItems from "../../hooks/useGetItems";

export default function CreateItem() {
  const navigate = useNavigate();
  const { items, loading, error } = useGetItems();

  if (loading) return <p>Carregando itens...</p>;
  if (error) return <p>Erro ao carregar itens: {error}</p>;

  const categories = [...new Set(items.map((item) => item.category))].sort();

  const handleCreateItem = (formData) => {
    const generatedId =
      items.length > 0 ? Math.max(...items.map((i) => i.id)) + 1 : 1;

    const newItem = {
      id: generatedId,
      image: `http://dummyimage.com/800x500/c30ddb/ffffff`,
      name: formData.name,
      description: formData.description,
      quantity: formData.quantity,
      date: new Date().toISOString().split("T")[0],
      updatedDate: new Date().toISOString().split("T")[0],
      priceInCents: formData.priceInCents,
      category: formData.category,
      sku: formData.sku,
    };

    const updatedList = [...items, newItem];
    localStorage.setItem("items", JSON.stringify(updatedList));

    navigate("/dashboard/success", {
      state: {
        mode: "create",
        itemId: newItem.id,
        itemName: newItem.name,
        itemQuantity: newItem.quantity,
        itemSku: newItem.sku,
      },
    });
  };

  return (
    <section className="w-full max-w-container">
      <h2 className="text-text-dark font-bold text-3xl">Cadastro de item</h2>
      <p className="text-text-muted mt-2 mb-8">Preencha os detalhes abaixo para cadastrar o item no seu inventário.</p>
      <Form mode="create" categories={categories} onSubmit={handleCreateItem} />
    </section>
  );
}
