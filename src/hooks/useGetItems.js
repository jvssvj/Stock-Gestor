import { getItemsService } from "@/services/appService";
import { useEffect, useState } from "react";

export default function useGetItems() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchItems = async () => {
      setLoading(true)

      try {
        const data = await getItemsService()
        setItems(data)
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    }

    fetchItems()
  }, []);

  return { items, setItems, loading, error };
}
