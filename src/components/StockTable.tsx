import { Image, MoreHorizontal, Eye, Pencil, Trash2 } from "lucide-react"
import Pagination from "@mui/material/Pagination"
import Stack from "@mui/material/Stack"
import { Link, useNavigate } from "react-router-dom"
import { type ChangeEvent, type Dispatch, type SetStateAction, useState, useRef, useEffect } from "react"
import type { Item, PaginatedResponse } from "@/types"
import ConfirmDeletion from "@/components/ConfirmDeletion"
import { deleteItemService } from "@/services/appService"

const formatCentsToBRL = (valueInCents: number) => {
  if (!valueInCents && valueInCents !== 0) return "R$ 0,00"
  return (valueInCents / 100).toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  })
}

interface DropdownMenuProps {
  item: Item
  onDelete: (item: Item) => void
  onClose: () => void
}

function DropdownMenu({ item, onDelete, onClose }: DropdownMenuProps) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        onClose()
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [onClose])

  return (
    <div
      ref={ref}
      className="absolute right-0 top-8 z-20 w-44 bg-white border border-border rounded-xl shadow-lg p-1"
    >
      <Link
        to={`/app/items/${item.id}`}
        onClick={onClose}
        className="flex items-center gap-2.5 px-3 py-2 text-sm text-text-main hover:bg-off-white rounded-lg no-underline transition-colors"
      >
        <Eye size={15} className="text-muted" />
        Ver detalhes
      </Link>
      <Link
        to={`/app/items/${item.id}/update`}
        onClick={onClose}
        className="flex items-center gap-2.5 px-3 py-2 text-sm text-text-main hover:bg-off-white rounded-lg no-underline transition-colors"
      >
        <Pencil size={15} className="text-muted" />
        Editar
      </Link>
      <div className="border-t border-border my-1" />
      <button
        type="button"
        onClick={() => { onDelete(item); onClose() }}
        className="w-full flex items-center gap-2.5 px-3 py-2 text-sm text-danger hover:bg-danger-subtle rounded-lg transition-colors cursor-pointer border-none bg-transparent text-left"
      >
        <Trash2 size={15} />
        Excluir
      </button>
    </div>
  )
}

interface StockTableProps {
  items: PaginatedResponse<Item>
  allItems: Item[]
  setItems?: Dispatch<SetStateAction<PaginatedResponse<Item>>>
  onPageChange?: (page: number) => void
  loadingPage?: boolean
}

export default function StockTable({ items, onPageChange, setItems }: StockTableProps) {
  const navigate = useNavigate()
  const currentItems = items?.data || []
  const { totalPages, currentPage } = items?.meta || { totalPages: 1, currentPage: 1 }

  const [openMenuId, setOpenMenuId] = useState<string | number | null>(null)
  const [itemToDelete, setItemToDelete] = useState<Item | null>(null)

  const handlePageChange = (_event: ChangeEvent<unknown>, value: number) => {
    onPageChange?.(value)
  }

  async function handleDelete() {
    if (!itemToDelete) return
    try {
      await deleteItemService(itemToDelete.id)

      // Remove da lista local
      if (setItems) {
        setItems((prev) => {
          const prevTotalItems = prev.meta?.totalItems ?? prev.data.length
          return {
            ...prev,
            data: prev.data.filter((i) => i.id !== itemToDelete.id),
            meta: { ...(prev.meta ?? { totalItems: prevTotalItems }), totalItems: prevTotalItems - 1 },
          }
        })
      }

      navigate("/app/success", {
        state: {
          status: "delete",
          resource: "item",
          data: { id: itemToDelete.id, name: itemToDelete.name },
        },
      })
    } catch (error) {
      console.error(error)
    } finally {
      setItemToDelete(null)
    }
  }

  return (
    <>
      {itemToDelete && (
        <ConfirmDeletion
          name={itemToDelete.name}
          resource="item"
          sku={itemToDelete.sku}
          cancelAction={() => setItemToDelete(null)}
          confirmAction={handleDelete}
        />
      )}

      <div className="min-h-[565px] flex flex-col w-full max-w-container mt-8 overflow-hidden">
        <div className="flex flex-col gap-3 mb-10">
          {currentItems.map((item) => {
            const inStock = item.quantity > 10
            const lowStock = item.quantity > 0 && item.quantity <= 10

            return (
              <section
                key={item.id}
                className="flex items-center gap-4 border border-gray-200 rounded-2xl px-4 py-4 bg-white"
              >
                {/* Imagem */}
                <div className="shrink-0">
                  {item.imageUrl ? (
                    <img
                      className="w-12 h-12 rounded-xl object-cover border border-border"
                      src={item.imageUrl}
                      alt=""
                    />
                  ) : (
                    <div className="w-12 h-12 rounded-xl bg-off-white border border-border flex items-center justify-center">
                      <Image size={20} className="text-muted" />
                    </div>
                  )}
                </div>

                {/* Nome + SKU + categoria */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <Link
                      to={`/app/items/${item.id}`}
                      className="font-semibold text-sm text-text-main hover:text-primary transition-colors no-underline truncate"
                    >
                      {item.name}
                    </Link>
                    {item.category && (
                      <span className="text-[11px] font-medium text-muted border border-border rounded-full px-2 py-0.5 shrink-0">
                        {typeof item.category === "string" ? item.category : item.category.name}
                      </span>
                    )}
                  </div>

                  <div className="flex items-center gap-3 mt-1">
                    <span
                      className={`inline-flex items-center gap-1 text-[11px] font-semibold px-2 py-0.5 rounded-full ${inStock
                        ? "bg-success-subtle text-success"
                        : lowStock
                          ? "bg-warning-subtle text-warning"
                          : "bg-danger-subtle text-danger"
                        }`}
                    >
                      <span className={`w-1.5 h-1.5 rounded-full ${inStock ? "bg-success" : lowStock ? "bg-warning" : "bg-danger"
                        }`} />
                      {inStock ? "EM ESTOQUE" : lowStock ? "ESTOQUE BAIXO" : "SEM ESTOQUE"}
                    </span>
                  </div>

                </div>

                {/* Estoque + Preço */}
                <div className="hidden sm:flex items-center gap-8 ml-auto shrink-0">
                  <div className="text-right">
                    <p className="text-[10px] font-semibold uppercase tracking-wider text-muted">Estoque</p>
                    <span className="font-bold text-sm text-text-main">{item.quantity}</span>
                  </div>
                  <div className="text-right">
                    <p className="text-[10px] font-semibold uppercase tracking-wider text-primary">Preço</p>
                    <span className="font-bold text-sm text-text-main">{formatCentsToBRL(item.priceInCents)}</span>
                  </div>
                </div>

                {/* Menu */}
                <div className="relative shrink-0">
                  <button
                    type="button"
                    onClick={() => setOpenMenuId(openMenuId === item.id ? null : item.id)}
                    className={`p-1.5 rounded-lg transition-colors cursor-pointer ${openMenuId === item.id
                      ? "bg-off-white text-text-main"
                      : "text-muted hover:bg-off-white hover:text-text-main"
                      }`}
                    aria-label="Opções"
                  >
                    <MoreHorizontal size={18} />
                  </button>

                  {openMenuId === item.id && (
                    <DropdownMenu
                      item={item}
                      onDelete={setItemToDelete}
                      onClose={() => setOpenMenuId(null)}
                    />
                  )}
                </div>
              </section>
            )
          })}
        </div>

        <div className="mt-auto py-5 px-4 flex justify-center border border-border rounded-2xl">
          <Stack spacing={2} alignItems="center">
            <Pagination
              count={totalPages}
              page={currentPage}
              onChange={handlePageChange}
              shape="rounded"
              size="small"
              sx={{
                "& .Mui-selected": {
                  backgroundColor: "var(--color-primary) !important",
                  color: "white",
                },
              }}
            />
          </Stack>
        </div>
      </div>
    </>
  )
}