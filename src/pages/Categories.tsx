import EmptyCategories from "@/components/EmptyCategories"
import Spinner from "@/components/Spinner"
import { useCategories } from "@/hooks/useGetCategories"
import { Plus } from "lucide-react"
import { Link } from "react-router-dom"

export default function Categories() {
    const { categories, loading: loadingCategories } = useCategories()

    if (loadingCategories) {
        return (
            <div className="w-full h-full flex items-center justify-center">
                <Spinner />
            </div>
        )
    }

    return (
        <>
            {categories.length <= 0 ? (
                <EmptyCategories />
            ) : (
                <section className="text-center">
                    <h2>Categorias</h2>
                    <Link
                        to="/app/categories/create"
                        className="flex items-center gap-2 bg-primary text-white px-5 py-2.5 rounded-lg no-underline"
                    >
                        <Plus size={18} />
                        Criar categoria
                    </Link>
                </section>
            )}
        </>
    )
} 