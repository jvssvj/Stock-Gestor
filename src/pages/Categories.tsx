import { useState } from "react"
import { Link } from "react-router-dom"
import {
    Plus, Search, Pencil, Trash2, Tag,
    Package, Box, Truck, ShoppingCart, Layers, Archive, Boxes,
    ShoppingBag, Wrench, Headphones, Monitor, Keyboard, Mouse, HardDrive,
    Cable, Camera, Cpu, Smartphone, Wifi, Battery, Printer, Gamepad2,
    Watch, Speaker, Tv, Router, Usb, Disc, Server, Lightbulb, Plug,
    Shirt, Gift, Book, Coffee, Utensils,
    type LucideIcon
} from "lucide-react"
import { useCategories } from "@/hooks/useGetCategories"
import Spinner from "@/components/Spinner"
import { deleteCategoryService } from "@/services/appService"
import ConfirmDeletion from "@/components/ConfirmDeletion"
import EmptyCategories from "@/components/EmptyCategories"
import type { Category, Id } from "@/types"
import { EmptySearch } from "@/components/EmptySearch"

const ICON_MAP: Record<string, LucideIcon> = {
    Package, Tag, Box, Truck, ShoppingCart, Layers, Archive, Boxes,
    ShoppingBag, Wrench, Headphones, Monitor, Keyboard, Mouse, HardDrive,
    Cable, Camera, Cpu, Smartphone, Wifi, Battery, Printer, Gamepad2,
    Watch, Speaker, Tv, Router, Usb, Disc, Server, Lightbulb, Plug,
    Shirt, Gift, Book, Coffee, Utensils,
}

export default function Categories() {
    const { categories, loading, refetch } = useCategories()
    const [search, setSearch] = useState("")
    const [deletingId, setDeletingId] = useState<Id | null>(null)
    const [categoryToDelete, setCategoryToDelete] = useState<Category | null>(null)
    const [loadingDeletion, setLoadingDeletion] = useState<boolean>(false)

    const filtered = categories.filter((c) =>
        c.name.toLowerCase().includes(search.toLowerCase())
    )

    async function handleDelete() {
        if (!categoryToDelete) return
        setLoadingDeletion(true)

        try {
            await deleteCategoryService(categoryToDelete.id)
            setDeletingId(categoryToDelete.id)
            setCategoryToDelete(null)

            await new Promise((resolve) => setTimeout(resolve, 300))
            await refetch()
        } catch (error) {
            console.error(error)
        } finally {
            setDeletingId(null)
            setLoadingDeletion(false)
        }
    }

    if (loading) {
        return (
            <div className="h-full flex items-center justify-center">
                <Spinner />
            </div>
        )
    }

    if (categories.length === 0) {
        return <EmptyCategories />
    }

    return (
        <>
            {categoryToDelete && (
                <ConfirmDeletion
                    resource="category"
                    name={categoryToDelete.name}
                    cancelAction={() => setCategoryToDelete(null)}
                    confirmAction={handleDelete}
                    loadingDeletion={loadingDeletion}
                />
            )}

            <div className="w-full max-w-container">

                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
                    <div className="w-full">
                        <h1 className="text-2xl font-bold text-text-main">Categorias</h1>
                        <p className="text-sm text-muted mt-1">
                            {categories.length} {categories.length === 1 ? "categoria cadastrada" : "categorias cadastradas"}
                        </p>
                    </div>

                    <div className="w-full flex flex-col sm:flex-row items-center justify-end gap-3">
                        <label htmlFor="search" className="w-full sm:w-auto relative">
                            <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted pointer-events-none" />
                            <input
                                id="search"
                                type="text"
                                placeholder="Buscar categoria..."
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                className="w-full pl-9 pr-4 py-2.5 text-sm border border-border rounded-lg bg-white focus:outline-none focus:border-primary transition-colors"
                            />
                        </label>

                        <Link
                            to="/app/categories/create"
                            className="w-full sm:w-auto inline-flex items-center gap-2 bg-primary hover:bg-primary-light text-white text-sm font-semibold px-4 py-2.5 rounded-lg transition-colors no-underline whitespace-nowrap"
                        >
                            <Plus size={16} />
                            Nova categoria
                        </Link>
                    </div>
                </div>

                {/* Empty search */}
                {search.trim() && filtered.length === 0 ? (
                    <EmptySearch
                        type="category"
                        search={search}
                        onClear={() => setSearch("")}
                    />
                ) : (
                    /* Grid */
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                        {filtered.map((category) => {
                            const Icon = ICON_MAP[category.iconName] ?? Package
                            const isDeleting = deletingId === category.id

                            return (
                                <div
                                    key={category.id}
                                    className={`bg-white border border-gray-200 rounded-2xl p-5 relative group transition-all duration-300 hover:shadow-md ${isDeleting
                                        ? "opacity-0 scale-95 pointer-events-none"
                                        : "opacity-100 scale-100"
                                        }`}
                                >
                                    {/* Ações — aparecem no hover */}
                                    <div className="absolute top-3 right-3 flex gap-1 transition-opacity">
                                        <Link
                                            to={`/app/categories/${category.id}/update`}
                                            className="w-7 h-7 flex items-center justify-center rounded-lg text-muted hover:bg-primary-subtle hover:text-primary transition-colors"
                                            aria-label={`Editar ${category.name}`}
                                        >
                                            <Pencil size={15} />
                                        </Link>
                                        <button
                                            onClick={() => setCategoryToDelete(category)}
                                            className="w-7 h-7 flex items-center justify-center rounded-lg text-muted hover:bg-danger-subtle hover:text-danger transition-colors cursor-pointer"
                                            aria-label={`Excluir ${category.name}`}
                                        >
                                            <Trash2 size={15} />
                                        </button>
                                    </div>

                                    {/* Ícone */}
                                    <div
                                        className="w-11 h-11 rounded-xl flex items-center justify-center mb-4"
                                        style={{ backgroundColor: `${category.color}1A`, color: category.color }}
                                    >
                                        <Icon size={22} />
                                    </div>

                                    {/* Nome */}
                                    <p className="text-sm font-semibold text-text-main truncate mb-1">
                                        {category.name}
                                    </p>

                                    {/* Contagem de itens */}
                                    <p className="text-xs text-muted">
                                        {category._count.items} {category._count.items === 1 ? "item" : "itens"}
                                    </p>

                                    {/* Barra de cor */}
                                    <div className="mt-4 flex items-center gap-2">
                                        <span
                                            className="w-3 h-3 rounded-full shrink-0"
                                            style={{ backgroundColor: category.color }}
                                        />
                                        <span className="text-xs text-muted font-mono">{category.color}</span>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                )}
            </div>
        </>
    )
}