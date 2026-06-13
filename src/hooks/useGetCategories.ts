import { getCategoriesService } from "@/services/appService";
import { useState, useEffect } from "react";

export function useCategories() {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        async function loadCategories() {
            try {
                setLoading(true);
                const response = await getCategoriesService();
                // Ajuste aqui dependendo se sua API retorna direto o array ou dentro de .data
                setCategories(response?.data ?? response ?? []);
            } catch (err) {
                setError("Erro ao carregar categorias");
                console.error(err);
            } finally {
                setLoading(false);
            }
        }

        loadCategories();
    }, []);

    return { categories, loading, error };
}