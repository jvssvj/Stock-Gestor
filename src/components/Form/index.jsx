import { useState, useEffect, useCallback } from "react";
import styles from "./index.module.css";
import {
  cleanCurrencyString,
  formatToCurrency,
} from "../../utils/currencyUtils";

export default function Form({
  mode = "create", // "create" | "update"
  itemId = null,
  itemName = "",
  itemQuantity = "",
  itemPrice = "0",
  itemCategory = "",
  itemDescription = "",
  itemSku = "",
  categories = [],
  onSubmit,
}) {
  const [formData, setFormData] = useState({
    name: "",
    quantity: "",
    price: "",
    category: "",
    description: "",
    sku: "",
  });

  // preenche os dados iniciais (modo update)
  useEffect(() => {
    if (mode === "update") {
      setFormData({
        name: itemName,
        quantity: itemQuantity,
        price: String(itemPrice),
        category: itemCategory,
        description: itemDescription,
        sku: itemSku,
      });
    } else {
      setFormData({
        name: "",
        quantity: "",
        price: "0.00",
        category: "",
        description: "",
        sku: "",
      });
    }
  }, [
    mode,
    itemName,
    itemQuantity,
    itemPrice,
    itemCategory,
    itemDescription,
    itemSku,
  ]);

  const isModified =
    formData.name !== itemName ||
    formData.quantity !== itemQuantity ||
    formData.price !== String(itemPrice) ||
    formData.category !== itemCategory ||
    formData.description !== itemDescription ||
    formData.sku !== itemSku;

  // 👈 Função de mudança de input adaptada para o preço
  const handleChange = useCallback((e) => {
    const { name, value } = e.target;

    if (name === "price") {
      const cleanedValue = cleanCurrencyString(value);
      setFormData((prev) => ({ ...prev, [name]: cleanedValue }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    const convertedData = {
      ...formData,
      quantity: Number(formData.quantity),
      price: Number(formData.price),
      updatedDate: new Date().toISOString().split("T")[0],
    };

    // 👇 o form apenas devolve os dados
    onSubmit({
      ...convertedData,
      id: itemId, // pode vir null no modo "create"
      mode,
    });
  };

  return (
    <>
      <form
        className={styles.form}
        onSubmit={handleSubmit}
      >
        <div className={styles.input__container}>
          <label htmlFor="name">Nome do item</label>
          <input
            type="text"
            name="name"
            id="name"
            required
            placeholder="Nome do item"
            value={formData.name}
            onChange={handleChange}
          />
        </div>

        <div className={styles.row}>
          <div className={styles.input__container}>
            <label htmlFor="quantity">Quantidade</label>
            <input
              type="number"
              name="quantity"
              id="quantity"
              required
              min={1}
              value={formData.quantity}
              onChange={handleChange}
            />
          </div>

          <div className={styles.input__container}>
            <label htmlFor="price">Preço unitário (R$)</label>
            <input
              type="text"
              name="price"
              id="price"
              required
              value={formatToCurrency(formData.price)}
              onChange={handleChange}
            />
          </div>

          <div className={styles.input__container}>
            <label htmlFor="sku">Código/SKU</label>
            <input
              type="text"
              name="sku"
              id="sku"
              required
              value={formData.sku}
              onChange={handleChange}
            />
          </div>
        </div>

        {/* categoria */}
        <div className={styles.input__container}>
          <label htmlFor="category">Categoria</label>
          <select
            name="category"
            id="category"
            value={formData.category}
            onChange={handleChange}
          >
            <option
              value=""
              disabled
              hidden
            >
              {formData.category || "Selecione uma categoria"}
            </option>
            {categories.map((cat) => (
              <option
                key={cat}
                value={cat}
              >
                {cat}
              </option>
            ))}
          </select>
        </div>

        {/* descrição */}
        <div className={styles.input__container}>
          <label htmlFor="description">Descrição</label>
          <textarea
            name="description"
            id="description"
            required
            placeholder="Adicione detalhes sobre o item..."
            value={formData.description}
            onChange={handleChange}
          ></textarea>
        </div>

        {/* validação */}
        {mode === "update" && (
          <span className={styles.error}>
            {!isModified ? "Altere algo para enviar." : ""}
          </span>
        )}

        <button
          disabled={mode === "update" && !isModified}
          type="submit"
        >
          {mode === "update" ? "Atualizar" : "Cadastrar"}
        </button>
      </form>
    </>
  );
}
