import { useState, useEffect, useCallback } from "react";
import styles from "./index.module.css";
import {
  cleanCurrencyString,
  formatToCurrency,
} from "../../utils/currencyUtils";

export default function Form({
  mode = "create",
  itemId = null,
  itemName = "",
  itemQuantity = 0,
  itemPrice = "0.00", // Padronizei o nome para itemPrice
  itemCategory = "",
  itemDescription = "",
  itemSku = "",
  categories = [],
  onSubmit,
}) {
  // 1. Estado com nomes consistentes
  const [formData, setFormData] = useState({
    name: itemName,
    quantity: itemQuantity,
    price: mode === "update" ? Number(itemPrice) / 100 : "0.00",
    category: itemCategory,
    description: itemDescription,
    sku: itemSku,
  });

  // 2. Sincronização corrigida
  useEffect(() => {
    if (mode === "update") {
      setFormData({
        name: itemName,
        quantity: itemQuantity,
        price: Number(itemPrice) / 100,
        category: itemCategory,
        description: itemDescription,
        sku: itemSku,
      });
    } else {
      // Reset para modo criação
      setFormData({
        name: "",
        quantity: 0,
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

  // 3. Verificação de modificação (usando o nome 'price')
  const currentPriceInCents = Math.round(parseFloat(formData.price) * 100);
  const isModified =
    formData.name !== itemName ||
    formData.quantity !== itemQuantity ||
    currentPriceInCents !== itemPrice ||
    formData.category !== itemCategory ||
    formData.description !== itemDescription ||
    formData.sku !== itemSku;

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;

    // Se for preço, limpa a string, se não, salva normal
    const finalValue = name === "price" ? cleanCurrencyString(value) : value;
    setFormData((prev) => ({ ...prev, [name]: finalValue }));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    const payload = {
      ...formData,
      id: itemId,
      quantity: Number(formData.quantity),
      price: Math.round(parseFloat(formData.price) * 100),
      updatedDate: new Date().toISOString().split("T")[0],
    };

    onSubmit(payload);
  };

  console.log();
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
