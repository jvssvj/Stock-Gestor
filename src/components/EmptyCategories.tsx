import { Link } from "react-router-dom"
import { Plus } from "lucide-react"
import emptyFolder from "@/assets/images/empty-folder.webp"

export default function EmptyCategories() {
    return (
        <div className="flex flex-col items-center justify-center text-center h-full max-w-[400px]">
            <div className="flex flex-col items-center">
                <img className="max-w-[150px]" src={emptyFolder} alt="" />
                <h2 className="mt-10 text-4xl font-semibold text-text-main">
                    Organize seu estoque
                </h2>

                <p className="text-base text-muted mt-4 mb-8 w-full">
                    Crie sua primeira categoria para organizar melhor os itens do seu estoque.
                </p>
            </div>

            <Link
                to="/app/categories/create"
                className="flex items-center gap-2 bg-primary text-white px-5 py-2.5 rounded-lg no-underline"
            >
                <Plus size={18} />
                Criar categoria
            </Link>
        </div>
    )
}