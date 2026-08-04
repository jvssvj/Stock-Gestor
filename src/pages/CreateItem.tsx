import { useNavigate } from "react-router-dom";
import { createItemService } from "@/services/appService";
import { useState } from "react";
import { useCategories } from "@/hooks/useGetCategories";
import Spinner from "@/components/Spinner";
import { hasValidationErrors } from "@/utils/apiErrors";
import { parseApiValidationErrors } from "@/utils/parseApiValidationErrors";
import type { FieldErrors, ItemFormSubmit } from "@/types";
import ItemForm from "@/components/ItemForm";

export default function CreateItem() {
  const navigate = useNavigate()
  const [serverErrors, setServerErrors] = useState<FieldErrors>({})
  const [loading, setLoading] = useState(false)
  const { categories, loading: loadingCategories } = useCategories()

  if (loadingCategories) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <Spinner />
      </div>
    )
  }

  const handleCreateItem = async (payload: ItemFormSubmit) => {
    setLoading(true)
    setServerErrors({})

    const formData = new FormData()

    formData.append("name", payload.name)
    formData.append("quantity", String(payload.quantity))
    formData.append("priceInCents", String(payload.priceInCents))
    formData.append("sku", payload.sku)
    formData.append("description", payload.description)
    formData.append("categoryId", payload.category)

    if (payload.image) {
      formData.append("image", payload.image)
    }

    try {
      const response = await createItemService(formData)

      navigate("/app/success", {
        state: {
          status: "create",
          resource: "item",
          data: {
            id: response.data.id,
            name: payload.name,
            quantity: payload.quantity,
            sku: payload.sku,
          },
        },
      })
    } catch (error) {
      if (hasValidationErrors(error)) {
        setServerErrors(parseApiValidationErrors(error.errors))
      } else {
        console.error(error)
      }
    } finally {
      setLoading(false)
    }
  }

  if (loadingCategories) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <Spinner />
      </div>
    )
  }

  return (
    <section className="w-full max-w-container">
      <h2 className="text-text-dark font-bold text-3xl">Cadastro de item</h2>
      <p className="text-text-muted mt-2 mb-8">Preencha os detalhes abaixo para cadastrar o item no seu inventário.</p>
      <ItemForm
        mode="create"
        categories={categories}
        onSubmit={handleCreateItem}
        loading={loading}
        serverErrors={serverErrors}
      />
    </section>
  )
}
