import { useEffect, useState } from "react";

export default function useGetItems() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    try {
      const data = localStorage.getItem("items");
      if (!data) {
        setItems([]);
      } else {
        setItems(JSON.parse(data));
      }
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  }, []);

  return { items, setItems, loading, error };
}
