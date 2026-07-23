// src/hooks/useDeleteItem.js
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { deleteItemService } from "@/services/appService";
import type { Item } from "@/types";

export default function useDeleteItem(_options?: unknown) {
  const navigate = useNavigate();

  const [itemToDelete, setItemToDelete] = useState<Item | null>(null);

  function confirmDelete() {
    if (!itemToDelete) return;

    try {
      const deletedItem = deleteItemService(itemToDelete.id)
      void deletedItem

      navigate("/app/success", {
        state: {
          mode: "delete",
          itemName: itemToDelete.name,
        },
      })
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
