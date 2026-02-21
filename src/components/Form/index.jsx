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
  itemPriceInCents = 0, // Vem em centavos (ex: 200)
  itemCategory = "",
  itemDescription = "",
  itemSku = "",
  categories = [],
  onSubmit,
}) {
  // 2. Estado Inicial
  const [formData, setFormData] = useState({
    name: itemName,
    quantity: itemQuantity,
    priceInCents: mode === "update" ? Number(itemPriceInCents) / 100 : 0,
    category: itemCategory,
    description: itemDescription,
    sku: itemSku,
  });

  const [errors, setErrors] = useState({});

  // 3. Sincronização (Edição vs Criação)
  useEffect(() => {
    if (mode === "update") {
      setFormData({
        name: itemName,
        quantity: itemQuantity,
        priceInCents: Number(itemPriceInCents) / 100,
        category: itemCategory,
        description: itemDescription,
        sku: itemSku,
      });
    } else {
      setFormData({
        name: "",
        quantity: 0,
        priceInCents: "0",
        category: "",
        description: "",
        sku: "",
      });
    }
  }, [
    mode,
    itemName,
    itemQuantity,
    itemPriceInCents,
    itemCategory,
    itemDescription,
    itemSku,
  ]);

  // 4. Lógica de Modificação
  const currentPriceInCents = Math.round(
    parseFloat(formData.priceInCents) * 100
  );
  const isModified =
    formData.name !== itemName ||
    Number(formData.quantity) !== Number(itemQuantity) ||
    currentPriceInCents !== Number(itemPriceInCents) ||
    formData.category !== itemCategory ||
    formData.description !== itemDescription ||
    formData.sku !== itemSku;

  // 5. Handlers
  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    const finalValue =
      name === "priceInCents" ? cleanCurrencyString(value) : value;

    setFormData((prev) => ({ ...prev, [name]: finalValue }));

    // Limpa o erro do campo enquanto o usuário digita
    setErrors((prev) => {
      const newErrors = { ...prev };
      delete newErrors[name];
      return newErrors;
    });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Se passou, envia o payload limpo
    const payload = {
      ...formData,
      id: itemId,
      quantity: Number(formData.quantity),
      priceInCents: Math.round(parseFloat(formData.priceInCents) * 100),
      updatedDate: new Date().toISOString().split("T")[0],
    };

    onSubmit(payload);
  };

  return (
    <form
      className={styles.form}
      onSubmit={handleSubmit}
    >
      {/* NOME */}
      <div className={styles.input__container}>
        <label htmlFor="name">Nome do item</label>
        <input
          type="text"
          name="name"
          id="name"
          value={formData.name}
          onChange={handleChange}
          className={errors.name ? styles.error__input : ""}
        />
        {errors.name && (
          <span className={styles.error__text}>{errors.name[0]}</span>
        )}
      </div>

      <div className={styles.row}>
        {/* QUANTIDADE */}
        <div className={styles.input__container}>
          <label htmlFor="quantity">Quantidade</label>
          <input
            type="number"
            name="quantity"
            id="quantity"
            value={formData.quantity}
            onChange={handleChange}
            className={errors.quantity ? styles.error__input : ""}
          />
          {errors.quantity && (
            <span className={styles.error__text}>{errors.quantity[0]}</span>
          )}
        </div>

        {/* PREÇO */}
        <div className={styles.input__container}>
          <label htmlFor="priceInCents">Preço unitário (R$)</label>
          <input
            type="text"
            name="priceInCents"
            id="priceInCents"
            value={formatToCurrency(formData.priceInCents)}
            onChange={handleChange}
            className={errors.priceInCents ? styles.error__input : ""}
          />
          {errors.priceInCents && (
            <span className={styles.error__text}>{errors.priceInCents[0]}</span>
          )}
        </div>

        {/* SKU */}
        <div className={styles.input__container}>
          <label htmlFor="sku">Código/SKU</label>
          <input
            type="text"
            name="sku"
            id="sku"
            value={formData.sku}
            onChange={handleChange}
            className={errors.sku ? styles.error__input : ""}
          />
          {errors.sku && (
            <span className={styles.error__text}>{errors.sku[0]}</span>
          )}
        </div>
      </div>

      {/* CATEGORIA */}
      <div className={styles.input__container}>
        <label htmlFor="category">Categoria</label>
        <select
          name="category"
          id="category"
          value={formData.category}
          onChange={handleChange}
          className={errors.category ? styles.error__input : ""}
        >
          <option
            value=""
            disabled
            hidden
          >
            Selecione uma categoria
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
        {errors.category && (
          <span className={styles.error__text}>{errors.category[0]}</span>
        )}
      </div>

      {/* DESCRIÇÃO */}
      <div className={styles.input__container}>
        <label htmlFor="description">Descrição</label>
        <textarea
          name="description"
          id="description"
          value={formData.description}
          onChange={handleChange}
          className={errors.description ? styles.error__input : ""}
        ></textarea>
        {errors.description && (
          <span className={styles.error__text}>{errors.description[0]}</span>
        )}
      </div>

      {/* RODAPÉ DO FORM */}
      <div className={styles.footer}>
        <button
          disabled={mode === "update" && !isModified}
          type="submit"
        >
          {mode === "update" ? "Atualizar" : "Cadastrar"}
        </button>

        {mode === "update" && !isModified && (
          <span className={styles.update__error}>Altere algo para enviar.</span>
        )}
      </div>
    </form>
  );
}
