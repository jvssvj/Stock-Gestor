import { useState, useEffect, useCallback, useRef } from "react"
import { UploadCloud, X } from "lucide-react"
import { cleanCurrencyString, formatToCurrency } from "@/utils/currencyUtils"
import { Link } from "react-router-dom"
import Spinner from "../Spinner"

const inputBase =
  "border border-border p-2.5 rounded-lg mt-1.5 w-full focus:outline-none focus:border-primary transition-colors bg-white text-sm"
const inputErrorClass =
  "border-danger bg-danger-subtle focus:border-danger"
const labelClass = "text-sm font-medium text-text-main"
const errorText = "text-danger text-xs mt-1"

export default function UpdateItemForm({
  itemName = "",
  itemQuantity = 0,
  itemPriceInCents = 0,
  itemCategory = "",
  itemDescription = "",
  itemSku = "",
  itemImage = "",
  categories = [],
  onSubmit,
  isLoading,
  serverErrors = {}
}) {
  const fileInputRef = useRef(null)

  const [formData, setFormData] = useState({
    image: itemImage,
    name: itemName,
    quantity: itemQuantity,
    priceInCents: Number(itemPriceInCents) / 100,
    category: itemCategory,
    description: itemDescription,
    sku: itemSku,
    reason: ""
  })

  const [imageFile, setImageFile] = useState(null)
  const [imageRemoved, setImageRemoved] = useState(false)
  const [imagePreview, setImagePreview] = useState(itemImage || null)
  const [errors, setErrors] = useState({})
  const [localServerErrors, setLocalServerErrors] = useState({})
  const [isDragging, setIsDragging] = useState(false)

  const allErrors = { ...errors, ...localServerErrors }

  useEffect(() => {
    setFormData({
      image: itemImage,
      name: itemName,
      quantity: itemQuantity,
      priceInCents: Number(itemPriceInCents) / 100,
      category: itemCategory,
      description: itemDescription,
      sku: itemSku,
      reason: ""
    })
    setImagePreview(itemImage || null)
    setImageFile(null)
    setImageRemoved(false)
  }, [itemName, itemQuantity, itemPriceInCents, itemCategory, itemDescription, itemSku, itemImage])

  useEffect(() => {
    setLocalServerErrors(serverErrors)
  }, [serverErrors])

  const currentPriceInCents = Math.round(parseFloat(formData.priceInCents) * 100)
  const isModified =
    formData.name !== itemName ||
    Number(formData.quantity) !== Number(itemQuantity) ||
    currentPriceInCents !== Number(itemPriceInCents) ||
    formData.category !== itemCategory ||
    formData.description !== itemDescription ||
    formData.sku !== itemSku ||
    imageFile !== null ||
    imageRemoved

  const handleChange = useCallback((e) => {
    const { name, value } = e.target
    const finalValue = name === "priceInCents" ? cleanCurrencyString(value) : value
    setFormData((prev) => ({ ...prev, [name]: finalValue }))
    setErrors((prev) => { const n = { ...prev }; delete n[name]; return n })
    setLocalServerErrors((prev) => { const n = { ...prev }; delete n[name]; return n })
  }, [])

  function handleImageFile(file) {
    if (!file) return

    const allowed = ["image/jpeg", "image/png", "image/webp"]
    if (!allowed.includes(file.type)) {
      setErrors((p) => ({ ...p, image: "Apenas JPG, PNG ou WEBP." }))
      return
    }
    if (file.size > 2 * 1024 * 1024) {
      setErrors((p) => ({ ...p, image: "A imagem deve ter no máximo 2MB." }))
      return
    }

    setImageFile(file)
    setImagePreview(URL.createObjectURL(file))
    setImageRemoved(false)
    setErrors((p) => { const n = { ...p }; delete n.image; return n })
  }

  function handleDrop(e) {
    e.preventDefault()
    setIsDragging(false)
    handleImageFile(e.dataTransfer.files[0])
  }

  function validate() {
    const newErrors = {}

    if (!formData.name || formData.name.trim().length < 4)
      newErrors.name = "O nome precisa ter no mínimo 4 caracteres."

    if (!formData.sku || formData.sku.trim().length === 0)
      newErrors.sku = "O SKU é obrigatório."

    if (formData.quantity === "" || Number(formData.quantity) < 0)
      newErrors.quantity = "A quantidade deve ser 0 ou maior."

    const price = parseFloat(formData.priceInCents)
    if (isNaN(price) || price < 0)
      newErrors.priceInCents = "O preço deve ser um valor positivo."

    if (isModified && !formData.reason.trim())
      newErrors.reason = "Descreva o motivo da alteração."

    return newErrors
  }

  function handleSubmit(e) {
    e.preventDefault()

    const validationErrors = validate()
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors)
      return
    }

    if (Object.keys(localServerErrors).length > 0) return

    const data = new FormData()

    data.append("name", formData.name.trim())
    data.append("quantity", String(Number(formData.quantity)))
    data.append("priceInCents", String(Math.round(parseFloat(formData.priceInCents) * 100)))
    data.append("sku", formData.sku.trim())
    data.append("reason", formData.reason.trim())

    if (formData.category) {
      data.append("categoryId", formData.category)
    } else if (formData.category !== itemCategory) {
      data.append("categoryId", "null")
    }

    if (formData.description?.trim()) {
      data.append("description", formData.description.trim())
    }

    if (imageFile) {
      data.append("image", imageFile)
    } else if (imageRemoved) {
      data.append("removeImage", "true")
    }

    onSubmit(data)
  }

  return (
    <form
      className="flex flex-col gap-5 bg-white p-6 rounded-xl border border-border w-full"
      onSubmit={handleSubmit}
      noValidate
    >
      <div className="flex flex-col">
        <label className={labelClass}>Imagem do Item</label>

        {imagePreview ? (
          <div className="relative mt-1.5 w-full h-48 rounded-lg overflow-hidden border border-border">
            <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
            <button
              type="button"
              onClick={() => {
                setImageFile(null)
                setImagePreview(null)
                setImageRemoved(true)
              }}
              className="absolute top-2 right-2 bg-black/60 text-white rounded-full p-1 hover:bg-black/80 transition-colors cursor-pointer"
            >
              <X size={16} />
            </button>
          </div>
        ) : (
          <div
            onClick={() => fileInputRef.current?.click()}
            onDragOver={(e) => { e.preventDefault(); setIsDragging(true) }}
            onDragLeave={() => setIsDragging(false)}
            onDrop={handleDrop}
            className={`mt-1.5 flex flex-col items-center justify-center gap-2 border-2 border-dashed rounded-lg p-10 cursor-pointer transition-colors ${isDragging ? "border-primary bg-primary-subtle" : "border-border hover:border-primary hover:bg-primary-subtle/40"} ${allErrors.image ? "border-danger bg-danger-subtle" : ""}`}
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

        {allErrors.image && <span className={errorText}>{allErrors.image}</span>}
      </div>

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
          className={`${inputBase} ${allErrors.name ? inputErrorClass : ""}`}
        />
        {allErrors.name && <span className={errorText}>{allErrors.name}</span>}
      </div>

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
            className={`${inputBase} ${allErrors.quantity ? inputErrorClass : ""}`}
          />
          {allErrors.quantity && <span className={errorText}>{allErrors.quantity}</span>}
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
            className={`${inputBase} ${allErrors.priceInCents ? inputErrorClass : ""}`}
          />
          {allErrors.priceInCents && <span className={errorText}>{allErrors.priceInCents}</span>}
        </div>
      </div>

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
          className={`${inputBase} ${allErrors.sku ? inputErrorClass : ""}`}
        />
        {allErrors.sku && <span className={errorText}>{allErrors.sku}</span>}
      </div>

      <div className="flex flex-col gap-1">
        <div className="flex flex-col">
          {(!categories || categories.length === 0) && (
            <>
              <span className={labelClass}>Categoria</span>
              <p className="mt-1.5 text-sm">
                Nenhuma categoria disponível.{" "}
                <Link to="/app/categories" className="text-primary hover:underline font-semibold">
                  Cadastrar categoria
                </Link>
              </p>
            </>
          )}
        </div>

        {categories && categories.length > 0 && (
          <div>
            <label htmlFor="category" className={labelClass}>Categoria</label>
            <select
              name="category"
              id="category"
              value={formData.category ?? ""}
              onChange={handleChange}
              className={`${inputBase} ${allErrors.category ? inputErrorClass : ""}`}
            >
              <option value="">Sem categoria (nenhuma)</option>

              {categories?.map((category) => (
                <option key={category?.id ?? category} value={category?.id ?? category}>
                  {category?.name ?? ""}
                </option>
              ))}
            </select>
          </div>
        )}

        {allErrors.categoryId && <span className={errorText}>{allErrors.categoryId}</span>}
      </div>

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
          className={`${inputBase} resize-none min-h-[120px] ${allErrors.description ? inputErrorClass : ""}`}
        />
        {allErrors.description && <span className={errorText}>{allErrors.description}</span>}
      </div>

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
          className={`${inputBase} resize-none min-h-[100px] ${allErrors.reason ? inputErrorClass : ""}`}
        />
        {allErrors.reason && <span className={errorText}>{allErrors.reason}</span>}
      </div>

      <hr className="my-5 border-t border-border" />

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
            disabled={!isModified}
            type="submit"
            className="px-6 py-2.5 bg-primary text-white rounded-lg text-sm font-medium hover:bg-primary-light transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? <Spinner /> : "Salvar Alterações"}
          </button>
        </div>

        {!isModified && (
          <span className="text-sm text-danger">
            Altere pelo menos um campo para salvar.
          </span>
        )}
      </div>
    </form>
  )
}