import { getCategoriesService } from "@/services/appService";
import { useState, useEffect } from "react";
import type { Category } from "@/types";

export function useCategories() {
    const [categories, setCategories] = useState<Category[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        async function loadCategories() {
            try {
                setLoading(true);
                const response = await getCategoriesService();
                setCategories(Array.isArray(response) ? response : response?.data ?? []);
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
