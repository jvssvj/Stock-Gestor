import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useCategories } from "@/hooks/useGetCategories";
import { getItemService, updateItemService } from "@/services/appService";
import Spinner from "@/components/Spinner";
import { hasValidationErrors } from "@/utils/apiErrors";
import { parseApiValidationErrors } from "@/utils/parseApiValidationErrors";
import type { ApiEnvelope, FieldErrors, Item, ItemFormSubmit } from "@/types";
import ItemForm from "@/components/ItemForm";

function unwrapItem(response: ApiEnvelope<Item> | Item): Item {
  return "data" in response ? response.data : response
}

export default function UpdateItem() {
  const navigate = useNavigate()
  const { itemId } = useParams()
  const { categories, loading: loadingCategories } = useCategories()

  const [item, setItem] = useState<Item | null>(null)
  const [loadingItem, setLoadingItem] = useState(true)
  const [errorItem, setErrorItem] = useState<string | null>(null)
  const [serverErrors, setServerErrors] = useState<FieldErrors>({})
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    async function fetchItem() {
      if (!itemId) return
      try {
        setLoadingItem(true)
        const response = await getItemService(itemId)
        setItem(unwrapItem(response))
      } catch (err) {
        setErrorItem("Erro ao carregar os detalhes do item.")
        console.error(err)
      } finally {
        setLoadingItem(false)
      }
    }

    fetchItem()
  }, [itemId])

  if (loadingItem || loadingCategories) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <Spinner />
      </div>
    )
  }

  if (errorItem) return <p>{errorItem}</p>
  if (!item) return <p>Item não encontrado.</p>

  const handleUpdate = async (payload: ItemFormSubmit) => {
    setSubmitting(true)
    setServerErrors({})

    const formData = new FormData()
    formData.append("name", payload.name)
    formData.append("quantity", String(payload.quantity))
    formData.append("priceInCents", String(payload.priceInCents))
    formData.append("sku", payload.sku)
    formData.append("description", payload.description ?? "")
    formData.append("categoryId", payload.category ?? "")
    formData.append("reason", payload.reason)

    if (payload.image) formData.append("image", payload.image)
    if (payload.imageRemoved) formData.append("removeImage", "true")

    try {
      const response = await updateItemService(item.id, formData)
      navigate("/app/success", {
        state: {
          status: "update",
          resource: "item",
          data: {
            id: response.data.id,
            name: response.data.name,
            quantity: response.data.quantity,
            sku: response.data.sku,
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
      setSubmitting(false)
    }
  }

  return (
    <section className="w-full max-w-container">
      <h2 className="text-text-dark font-bold text-3xl">Atualização do item</h2>
      <p className="text-text-muted mt-2 mb-8">
        Atualize os detalhes abaixo para atualizar o item no seu inventário.
      </p>
      <ItemForm
        mode="update"
        itemId={item.id}
        itemName={item.name}
        itemQuantity={item.quantity}
        itemPriceInCents={item.priceInCents}
        itemCategory={item.category?.id ? String(item.category.id) : ""}
        itemDescription={item.description ?? ""}
        itemSku={item.sku}
        itemImageUrl={item.imageUrl ?? ""}
        categories={categories}
        onSubmit={handleUpdate}
        serverErrors={serverErrors}
        loading={submitting}
      />
    </section>
  )
}
