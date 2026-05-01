import { useState, useEffect, useCallback, useRef } from "react";
import { UploadCloud, X } from "lucide-react";
import { cleanCurrencyString, formatToCurrency } from "@/utils/currencyUtils";

const inputBase =
  "border border-border p-2.5 rounded-lg mt-1.5 w-full focus:outline-none focus:border-primary transition-colors bg-white text-sm";
const inputErrorClass =
  "border-danger bg-danger-subtle focus:border-danger";
const labelClass = "text-sm font-medium text-text-main";
const errorText = "text-danger text-xs mt-1";

export default function Form({
  mode = "create",
  itemId = null,
  itemName = "",
  itemQuantity = 0,
  itemPriceInCents = 0,
  itemCategory = "",
  itemDescription = "",
  itemSku = "",
  itemImageUrl = "",
  categories = [],
  onSubmit,
}) {
  const fileInputRef = useRef(null);

  const [formData, setFormData] = useState({
    name: itemName,
    quantity: itemQuantity,
    priceInCents: mode === "update" ? Number(itemPriceInCents) / 100 : 0,
    category: itemCategory,
    description: itemDescription,
    sku: itemSku,
    reason: "",
  });

  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(itemImageUrl || null);
  const [errors, setErrors] = useState({});
  const [isDragging, setIsDragging] = useState(false);

  useEffect(() => {
    if (mode === "update") {
      setFormData({
        name: itemName,
        quantity: itemQuantity,
        priceInCents: Number(itemPriceInCents) / 100,
        category: itemCategory,
        description: itemDescription,
        sku: itemSku,
        reason: "",
      });
      setImagePreview(itemImageUrl || null);
    } else {
      setFormData({
        name: "",
        quantity: 0,
        priceInCents: "0",
        category: "",
        description: "",
        sku: "",
        reason: "",
      });
      setImagePreview(null);
      setImageFile(null);
    }
  }, [mode, itemName, itemQuantity, itemPriceInCents, itemCategory, itemDescription, itemSku, itemImageUrl]);

  // ── Detectar modificações (update) ──
  const currentPriceInCents = Math.round(parseFloat(formData.priceInCents) * 100);
  const isModified =
    formData.name !== itemName ||
    Number(formData.quantity) !== Number(itemQuantity) ||
    currentPriceInCents !== Number(itemPriceInCents) ||
    formData.category !== itemCategory ||
    formData.description !== itemDescription ||
    formData.sku !== itemSku ||
    imageFile !== null;

  // ── Handlers de campo ──
  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    const finalValue = name === "priceInCents" ? cleanCurrencyString(value) : value;
    setFormData((prev) => ({ ...prev, [name]: finalValue }));
    setErrors((prev) => { const n = { ...prev }; delete n[name]; return n; });
  }, []);

  // ── Handlers de imagem ──
  function handleImageFile(file) {
    if (!file) return;

    const allowed = ["image/jpeg", "image/png", "image/webp"];
    if (!allowed.includes(file.type)) {
      setErrors((p) => ({ ...p, image: "Apenas JPG, PNG ou WEBP." }));
      return;
    }
    if (file.size > 2 * 1024 * 1024) {
      setErrors((p) => ({ ...p, image: "A imagem deve ter no máximo 2MB." }));
      return;
    }

    setImageFile(file);
    setImagePreview(URL.createObjectURL(file));
    setErrors((p) => { const n = { ...p }; delete n.image; return n; });
  }

  function handleDrop(e) {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    handleImageFile(file);
  }

  // ── Validação ──
  function validate() {
    const newErrors = {};

    if (!formData.name || formData.name.trim().length < 4)
      newErrors.name = "O nome precisa ter no mínimo 4 caracteres.";

    if (!formData.sku || formData.sku.trim().length === 0)
      newErrors.sku = "O SKU é obrigatório.";

    if (formData.quantity === "" || Number(formData.quantity) < 0)
      newErrors.quantity = "A quantidade deve ser 0 ou maior.";

    const price = parseFloat(formData.priceInCents);
    if (isNaN(price) || price < 0)
      newErrors.priceInCents = "O preço deve ser um valor positivo.";

    if (mode === "update" && isModified && !formData.reason.trim())
      newErrors.reason = "Descreva o motivo da alteração.";

    return newErrors;
  }

  // ── Submit ──
  function handleSubmit(e) {
    e.preventDefault();

    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    const payload = {
      ...formData,
      id: itemId,
      quantity: Number(formData.quantity),
      priceInCents: Math.round(parseFloat(formData.priceInCents) * 100),
      updatedDate: new Date().toISOString().split("T")[0],
      image: imageFile,
    };

    onSubmit(payload);
  }

  return (
    <form
      className="flex flex-col gap-5 bg-white p-6 rounded-xl border border-border w-full"
      onSubmit={handleSubmit}
      noValidate
    >
      {/* ── IMAGEM ── */}
      <div className="flex flex-col">
        <label className={labelClass}>
          Imagem do Item
        </label>

        {imagePreview ? (
          <div className="relative mt-1.5 w-full h-48 rounded-lg overflow-hidden border border-border">
            <img
              src={imagePreview}
              alt="Preview"
              className="w-full h-full object-cover"
            />
            <button
              type="button"
              onClick={() => { setImageFile(null); setImagePreview(null); }}
              className="absolute top-2 right-2 bg-black/60 text-white rounded-full p-1 hover:bg-black/80 transition-colors cursor-pointer"
            >
              <X size={16} />
            </button>
          </div>
        ) : (
          <div
            onClick={() => fileInputRef.current?.click()}
            onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
            onDragLeave={() => setIsDragging(false)}
            onDrop={handleDrop}
            className={`mt-1.5 flex flex-col items-center justify-center gap-2 border-2 border-dashed rounded-lg p-10 cursor-pointer transition-colors ${isDragging ? "border-primary bg-primary-subtle" : "border-border hover:border-primary hover:bg-primary-subtle/40"
              } ${errors.image ? "border-danger bg-danger-subtle" : ""}`}
          >
            <UploadCloud size={32} className="text-text-muted" />
            <p className="text-sm text-center">
              <span className="font-semibold text-primary">Clique para fazer upload</span>{" "}
              <span className="text-text-muted">ou arraste e solte</span>
            </p>
            <p className="text-xs text-center text-text-muted">JPG, PNG ou WEBP (máx. 2MB)</p>
          </div>
        )}

        <input
          ref={fileInputRef}
          type="file"
          accept="image/jpeg,image/png,image/webp"
          className="hidden"
          onChange={(e) => handleImageFile(e.target.files[0])}
        />

        {errors.image && <span className={errorText}>{errors.image}</span>}
      </div>

      {/* ── NOME ── */}
      <div className="flex flex-col">
        <label htmlFor="name" className={labelClass}>
          Nome do Item <span className="text-danger">*</span>
        </label>
        <input
          type="text"
          name="name"
          id="name"
          placeholder="Ex: Monitor Dell 24 polegadas"
          value={formData.name}
          onChange={handleChange}
          className={`${inputBase} ${errors.name ? inputErrorClass : ""}`}
        />
        {errors.name && <span className={errorText}>{errors.name}</span>}
      </div>

      {/* ── QUANTIDADE + PREÇO ── */}
      <div className="flex gap-4 max-[640px]:flex-col">
        <div className="flex flex-col w-full">
          <label htmlFor="quantity" className={labelClass}>
            Quantidade <span className="text-danger">*</span>
          </label>
          <input
            type="number"
            name="quantity"
            id="quantity"
            min={0}
            placeholder="0"
            value={formData.quantity}
            onChange={handleChange}
            className={`${inputBase} ${errors.quantity ? inputErrorClass : ""}`}
          />
          {errors.quantity && <span className={errorText}>{errors.quantity}</span>}
        </div>

        <div className="flex flex-col w-full">
          <label htmlFor="priceInCents" className={labelClass}>
            Preço Unitário (R$) <span className="text-danger">*</span>
          </label>
          <input
            type="text"
            name="priceInCents"
            id="priceInCents"
            value={formatToCurrency(formData.priceInCents)}
            onChange={handleChange}
            className={`${inputBase} ${errors.priceInCents ? inputErrorClass : ""}`}
          />
          {errors.priceInCents && <span className={errorText}>{errors.priceInCents}</span>}
        </div>
      </div>

      {/* ── SKU ── */}
      <div className="flex flex-col">
        <label htmlFor="sku" className={labelClass}>
          Código / SKU <span className="text-danger">*</span>
        </label>
        <input
          type="text"
          name="sku"
          id="sku"
          placeholder="Ex: MON-DELL-24"
          value={formData.sku}
          onChange={handleChange}
          className={`${inputBase} ${errors.sku ? inputErrorClass : ""}`}
        />
        {errors.sku && <span className={errorText}>{errors.sku}</span>}
      </div>

      {/* ── CATEGORIA ── */}
      <div className="flex flex-col">
        <label htmlFor="category" className={labelClass}>
          Categoria
        </label>
        <select
          name="category"
          id="category"
          value={formData.category}
          onChange={handleChange}
          className={`${inputBase} ${errors.category ? inputErrorClass : ""}`}
        >
          <option value="" disabled hidden>Selecione uma categoria</option>
          {categories.map((cat) => (
            <option key={cat.id ?? cat} value={cat.id ?? cat}>
              {cat.name ?? cat}
            </option>
          ))}
        </select>
        {errors.category && <span className={errorText}>{errors.category}</span>}
      </div>

      {/* ── DESCRIÇÃO ── */}
      <div className="flex flex-col">
        <label htmlFor="description" className={labelClass}>
          Descrição <span className="text-text-muted font-normal">(Opcional)</span>
        </label>
        <textarea
          name="description"
          id="description"
          placeholder="Adicione detalhes sobre o item, como especificações, cor, modelo, etc."
          value={formData.description}
          onChange={handleChange}
          className={`${inputBase} resize-none min-h-[120px] ${errors.description ? inputErrorClass : ""}`}
        />
        {errors.description && <span className={errorText}>{errors.description}</span>}
      </div>

      {/* ── REASON (só no update) ── */}
      {mode === "update" && (
        <div className="flex flex-col">
          <label htmlFor="reason" className={labelClass}>
            Motivo da Atualização <span className="text-danger">*</span>
          </label>
          <textarea
            name="reason"
            id="reason"
            placeholder="Descreva o motivo desta alteração no estoque..."
            value={formData.reason}
            onChange={handleChange}
            className={`${inputBase} resize-none min-h-[100px] ${errors.reason ? inputErrorClass : ""}`}
          />
          {errors.reason && <span className={errorText}>{errors.reason}</span>}
        </div>
      )}

      <hr className="my-5 border-t border-border" />

      {/* ── FOOTER ── */}
      <div className="flex flex-col items-end gap-2">
        <div className="flex items-center justify-end gap-3">
          <button
            type="button"
            onClick={() => window.history.back()}
            className="px-6 py-2.5 rounded-lg border border-border text-sm font-medium text-text-muted hover:bg-surface-offset transition-colors cursor-pointer"
          >
            Cancelar
          </button>
          <button
            disabled={mode === "update" && !isModified}
            type="submit"
            className="px-6 py-2.5 bg-primary text-white rounded-lg text-sm font-medium hover:bg-primary-light transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {mode === "update" ? "Salvar Alterações" : "Salvar Item"}
          </button>
        </div>

        {mode === "update" && !isModified && (
          <span className="text-sm text-danger">
            Altere pelo menos um campo para salvar.
          </span>
        )}
      </div>
    </form>
  );
}