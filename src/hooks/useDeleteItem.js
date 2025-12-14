import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

export default function useDeleteItem({ items, setItems }) {
  const navigate = useNavigate();

  const [itemToDelete, setItemToDelete] = useState(null);
  const [deletedItem, setDeletedItem] = useState(null);

  function confirmDelete() {
    const newList = items.filter((item) => item.id !== itemToDelete.id);

    setItems(newList);
    localStorage.setItem("items", JSON.stringify(newList));

    setDeletedItem(itemToDelete); // salva o item
    setItemToDelete(null); // fecha modal
  }

  useEffect(() => {
    if (!deletedItem) return;
    navigate("/success", {
      state: {
        mode: "delete",
        itemName: deletedItem.name,
      },
    });

    setDeletedItem(null);
  }, [deletedItem, navigate]);

  return { itemToDelete, setItemToDelete, confirmDelete };
}
