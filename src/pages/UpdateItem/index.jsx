import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import UpdateItemForm from "@/components/UpdateItemForm";
import { useCategories } from "@/hooks/useGetCategories";
import { getItemService, updateItemService } from "@/services/appService";
import Spinner from "@/components/Spinner";

export default function UpdateItem() {
  const navigate = useNavigate()
  const { itemId } = useParams()
  const { categories, loading: loadingCategories } = useCategories()

  const [item, setItem] = useState(null)
  const [loadingItem, setLoadingItem] = useState(true)
  const [errorItem, setErrorItem] = useState(null)
  const [serverErrors, setServerErrors] = useState({})
  const [submitting, setSubmitting] = useState(false)


  useEffect(() => {
    async function fetchItem() {
      try {
        setLoadingItem(true)
        const response = await getItemService(itemId)
        setItem(response?.data ?? response)
      } catch (err) {
        setErrorItem("Erro ao carregar os detalhes do item.")
        console.error(err)
      } finally {
        setLoadingItem(false)
      }
    }

    if (itemId) fetchItem()
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

  const handleUpdate = async (formDataInstance) => {
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
      if (error.errors) {
        const parsed = error.errors.reduce((acc, { field, message }) => {
          acc[field] = message
          return acc
        }, {})
        setServerErrors(parsed)
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
        itemCategory={item.category?.id ?? ""}
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