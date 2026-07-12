// src/hooks/useDeleteItem.js
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { deleteItemService } from "@/services/appService";

export default function useDeleteItem() {
  const navigate = useNavigate();

  const [itemToDelete, setItemToDelete] = useState(null);

  function confirmDelete() {
    if (!itemToDelete) return;

    try {
      const deletedItem = deleteItemService(itemToDelete.id)

      if (deletedItem) {
        navigate("/app/success", {
          state: {
            mode: "delete",
            itemName: itemToDelete.name,
          },
        })
      }
    } catch (error) {
      console.log(error)
    }

    setItemToDelete(null);
  }

  return {
    itemToDelete,
    setItemToDelete,
    confirmDelete,
  };
}
