import { useNavigate } from "react-router-dom";
import CreateItemForm from "@/components/CreateItemForm";
import { createItemService } from "@/services/appService";
import { useState } from "react";
import { useCategories } from "@/hooks/useGetCategories";
import Spinner from "@/components/Spinner";
import { hasValidationErrors } from "@/utils/apiErrors";
import { parseApiValidationErrors } from "@/utils/parseApiValidationErrors";
import type { FieldErrors } from "@/types";

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

  const handleCreateItem = async (formData: FormData) => {
    setLoading(true)

    try {
      const response = await createItemService(formData)

      navigate("/app/success", {
        state: {
          status: "create",
          resource: "item",
          data: {
            id: response.data.id,
            name: String(formData.get("name")),
            quantity: Number(formData.get("quantity")),
            sku: String(formData.get("sku")),
          },
        },
      })

    } catch (error) {
      if (hasValidationErrors(error)) {
        setServerErrors(parseApiValidationErrors(error.errors))
      }

      console.error("Erro ao criar item:", error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className="w-full max-w-container">
      <h2 className="text-text-dark font-bold text-3xl">Cadastro de item</h2>
      <p className="text-text-muted mt-2 mb-8">Preencha os detalhes abaixo para cadastrar o item no seu inventário.</p>
      <CreateItemForm
        categories={categories}
        onSubmit={handleCreateItem}
        serverErrors={serverErrors}
        loading={loading}
      />
    </section>
  )
}
