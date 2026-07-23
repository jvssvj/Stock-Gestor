import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import UpdateItemForm from "@/components/UpdateItemForm";
import { useCategories } from "@/hooks/useGetCategories";
import { getItemService, updateItemService } from "@/services/appService";
import Spinner from "@/components/Spinner";
import { hasValidationErrors } from "@/utils/apiErrors";
import { parseApiValidationErrors } from "@/utils/parseApiValidationErrors";
import type { ApiEnvelope, FieldErrors, Item } from "@/types";

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

  const handleUpdate = async (formDataInstance: FormData) => {
    setSubmitting(true)
    setServerErrors({})


    try {
      await updateItemService(item.id, formDataInstance)

      navigate("/app/success", {
        state: {
          mode: "update",
          itemId: itemId,
          itemName: formDataInstance.get("name") || item.name,
          itemQuantity: formDataInstance.get("quantity") || item.quantity,
          itemSku: formDataInstance.get("sku") || item.sku,
        },
      })
    } catch (error) {
      console.log(error)
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
      <UpdateItemForm
        itemImage={item.imageUrl}
        itemId={item.id}
        itemName={item.name}
        itemQuantity={item.quantity}
        itemPriceInCents={item.priceInCents}
        itemCategory={item.category?.id ? String(item.category.id) : undefined}
        itemDescription={item.description}
        itemSku={item.sku}
        categories={categories}
        onSubmit={handleUpdate}
        serverErrors={serverErrors}
        submitting={submitting}
      />
    </section>
  )
}
