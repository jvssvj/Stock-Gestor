import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
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
import { Category, Id } from "@/types"

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
    const navigate = useNavigate()

    const filtered = categories.filter((c) =>
        c.name.toLowerCase().includes(search.toLowerCase())
    )

    async function handleDelete() {
        if (!categoryToDelete) return

        try {
            await deleteCategoryService(categoryToDelete.id)

            setCategoryToDelete(null)
            setDeletingId(categoryToDelete.id)

            await new Promise((resolve) => setTimeout(resolve, 300))

            await refetch()
        } catch (error) {
            console.error(error)
        } finally {
            setDeletingId(null)
            setCategoryToDelete(null)
        }
    }

    if (loading) {
        return (
            <div className="h-full flex items-center justify-center">
                <Spinner />
            </div>
        )
    }

    return (
        <>
            {categoryToDelete && (
                <ConfirmDeletion
                    resource="category"
                    name={categoryToDelete.name}
                    cancelAction={() => setCategoryToDelete(null)}
                    confirmAction={handleDelete}
                />
            )}

            <div className="w-full max-w-container flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
                <div>
                    <h1 className="text-2xl font-bold text-text-main">Categorias</h1>
                    <p className="text-sm text-muted mt-1">
                        {categories.length} {categories.length === 1 ? "categoria cadastrada" : "categorias cadastradas"}
                    </p>
                </div>

                <div className="flex items-center gap-5">
                    <label htmlFor="search" className="relative">
                        <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted pointer-events-none" />
                        <input
                            type="text"
                            placeholder="Buscar categoria..."
                            value={search}
                            id="search"
                            onChange={(e) => setSearch(e.target.value)}
                            className="w-full pl-9 pr-4 py-2.5 text-sm border border-border rounded-lg bg-white focus:outline-none focus:border-primary transition-colors"
                        />

                    </label>
                    <Link
                        to="/app/categories/create"
                        className="inline-flex items-center gap-2 bg-primary hover:bg-primary-light text-white text-sm font-semibold px-4 py-2.5 rounded-lg transition-colors no-underline whitespace-nowrap w-fit"
                    >
                        <Plus size={16} />
                        Nova categoria
                    </Link>

                </div>
            </div>

            {filtered.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-20 text-center">
                    <div className="w-14 h-14 rounded-xl bg-primary-subtle flex items-center justify-center mb-4">
                        <Tag size={24} className="text-primary" />
                    </div>
                    <p className="text-base font-semibold text-text-main mb-1">
                        {search ? "Nenhuma categoria encontrada" : "Nenhuma categoria ainda"}
                    </p>
                    <p className="text-sm text-muted mb-6">
                        {search ? `Nenhum resultado para "${search}"` : "Crie sua primeira categoria para organizar o estoque."}
                    </p>
                    {!search && (
                        <Link
                            to="/app/categories/create"
                            className="inline-flex items-center gap-2 bg-primary hover:bg-primary-light text-white text-sm font-semibold px-4 py-2.5 rounded-lg transition-colors no-underline"
                        >
                            <Plus size={16} />
                            Nova categoria
                        </Link>
                    )}
                </div>
            ) : (
                <div className="w-full max-w-container bg-white border border-border rounded-xl overflow-hidden">
                    <div className="hidden sm:grid grid-cols-[1fr_120px_80px] gap-4 px-5 py-3 border-b border-border bg-off-white">
                        <span className="text-xs font-semibold uppercase tracking-wider text-muted">Categoria</span>
                        <span className="text-xs font-semibold uppercase tracking-wider text-muted">Cor</span>
                        <span className="text-xs font-semibold uppercase tracking-wider text-muted text-right">Ações</span>
                    </div>
                    <ul>
                        {filtered.map((category, i) => {
                            const Icon = ICON_MAP[category.iconName] ?? Package
                            const isLast = i === filtered.length - 1
                            const isDeleting = deletingId === category.id

                            return (
                                <li
                                    key={category.id}
                                    className={`flex sm:grid sm:grid-cols-[1fr_120px_80px] items-center gap-4 px-5 py-4 transition-all duration-300 ease-in-out 
                                        ${!isLast ? "border-b border-border" : ""} 
                                        ${isDeleting
                                            ? "opacity-0 -translate-x-3 scale-[0.98] pointer-events-none"
                                            : "opacity-100 translate-x-0 scale-100 hover:bg-off-white"
                                        }`
                                    }
                                >
                                    <div className="flex items-center gap-3 min-w-0 flex-1">
                                        <div
                                            className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0"
                                            style={{ backgroundColor: `${category.color}1A`, color: category.color }}
                                        >
                                            <Icon size={18} />
                                        </div>
                                        <span className="text-sm font-medium text-text-main truncate">{category.name}</span>
                                    </div>
                                    <div className="hidden sm:flex items-center gap-2">
                                        <span className="w-3 h-3 rounded-full shrink-0" style={{ backgroundColor: category.color }} />
                                        <span className="text-xs text-muted font-mono truncate">{category.color}</span>
                                    </div>
                                    <div className="flex items-center justify-end gap-1 shrink-0">
                                        <Link
                                            to={`/app/categories/${category.id}/update`}
                                            className="w-8 h-8 flex items-center justify-center rounded-lg text-muted hover:bg-primary-subtle hover:text-primary transition-colors"
                                            aria-label={`Editar ${category.name}`}
                                        >
                                            <Pencil size={15} />
                                        </Link>
                                        <button
                                            onClick={() => setCategoryToDelete(category)}
                                            className="w-8 h-8 flex items-center justify-center rounded-lg text-muted hover:bg-danger-subtle hover:text-danger transition-colors cursor-pointer"
                                            aria-label={`Excluir ${category.name}`}
                                        >
                                            <Trash2 size={15} />
                                        </button>
                                    </div>
                                </li>
                            )
                        })}
                    </ul>
                </div>
            )}
        </>
    )
}