// src/hooks/useDeleteItem.js
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

export default function useDeleteItem({ items, setItems }) {
  const navigate = useNavigate();

  const [itemToDelete, setItemToDelete] = useState(null);
  const [deletedItem, setDeletedItem] = useState(null);

  function confirmDelete() {
    if (!itemToDelete) return;

    const newList = items.filter((item) => item.id !== itemToDelete.id);
    localStorage.setItem("items", JSON.stringify(newList));

    setDeletedItem(itemToDelete);
    setItemToDelete(null);
    setItems(newList);
  }

  useEffect(() => {
    if (!deletedItem) return;

    navigate("/dashboard/success", {
      state: {
        mode: "delete",
        itemName: deletedItem.name,
      },
    });
  }, [deletedItem, navigate]);

  return {
    itemToDelete,
    setItemToDelete,
    confirmDelete,
  };
}
