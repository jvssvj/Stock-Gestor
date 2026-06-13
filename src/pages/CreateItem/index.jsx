import { useNavigate } from "react-router-dom";
import CreateItemForm from "@/components/CreateItemForm";
import { createItemService } from "@/services/appService";
import { useState } from "react";
import { useCategories } from "@/hooks/useGetCategories";
import Spinner from "@/components/Spinner";

export default function CreateItem() {
  const navigate = useNavigate()
  const [serverErrors, setServerErrors] = useState({})
  const [loading, setLoading] = useState(false)
  const { categories, loading: loadingCategories } = useCategories()

  if (loadingCategories) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <Spinner />
      </div>
    )
  }

  const handleCreateItem = async (formData) => {
    setLoading(true)

    try {
      const response = await createItemService(formData)
      const createdId = response?.data?.id

      if (createdId) {
        navigate("/app/success", {
          state: {
            mode: "create",
            itemId: createdId,
            itemName: formData.get("name"),
            itemQuantity: formData.get("quantity"),
            itemSku: formData.get("sku"),
          },
        })
      } else {
        console.error("ID não retornado pela API")
      }

    } catch (error) {
      if (error.errors) {
        const parsed = error.errors.reduce((acc, { field, message }) => {
          acc[field] = message
          return acc
        }, {})
        setServerErrors(parsed)
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
