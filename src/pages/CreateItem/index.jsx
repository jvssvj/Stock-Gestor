import { useNavigate } from "react-router-dom";
import Form from "../../components/Form";
import styles from "./index.module.css";
import useGetItems from "../../hooks/useGetItems";

export default function CreateItem() {
  const navigate = useNavigate();
  const { items, loading, error } = useGetItems(); // adicione o setItems no hook se ainda não tiver

  if (loading) return <p>Carregando itens...</p>;
  if (error) return <p>Erro ao carregar itens: {error}</p>;

  const categories = [...new Set(items.map((item) => item.category))].sort();
  const mode = "create";

  const handleCreateItem = (formData) => {
    // 🧩 Gera novo ID incremental
    const generatedId =
      items.length > 0 ? Math.max(...items.map((i) => i.id)) + 1 : 1;

    // 🆕 Cria o novo item com os dados do form
    const newItem = {
      id: generatedId,
      image: `http://dummyimage.com/800x500/c30ddb/ffffff`,
      name: formData.name,
      description: formData.description,
      quantity: Number(formData.quantity),
      date: new Date().toISOString().split("T")[0],
      updatedDate: new Date().toISOString().split("T")[0],
      price: Number(formData.price),
      category: formData.category,
      sku: formData.sku || `SKU-I${generatedId}`,
    };

    // 💾 Atualiza lista e salva no localStorage
    const updatedList = [...items, newItem];
    localStorage.setItem("items", JSON.stringify(updatedList));

    // ✅ Redireciona pra página de sucesso
    navigate("/success", {
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
    <section className={styles.container}>
      <h2 className={styles.register__t}>
        {mode === "update" ? "Atualização" : "Cadastro"} de item
      </h2>
      <p className={styles.register__p}>
        Preencha os detalhes abaixo para{" "}
        {mode === "update" ? "atualizar" : "cadastrar"} o item no seu
        inventário.
      </p>
      <Form
        mode="create"
        categories={categories}
        onSubmit={handleCreateItem}
      />
    </section>
  );
}
