import { Image, SquareArrowOutUpLeft } from "lucide-react"
import Pagination from "@mui/material/Pagination"
import Stack from "@mui/material/Stack"
import { Link } from "react-router-dom"
import type { ChangeEvent, Dispatch, SetStateAction } from "react"
import type { Item, PaginatedResponse } from "@/types"

const formatCentsToBRL = (valueInCents: number) => {
  if (!valueInCents && valueInCents !== 0) return "R$ 0,00"
  return (valueInCents / 100).toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  })
}

function getCategoryName(category: Item["category"]) {
  if (!category) return ""
  return typeof category === "string" ? category : category.name
}

function SkeletonRows() {
  return Array.from({ length: 10 }).map((_, i) => (
    <tr key={i}>
      {Array.from({ length: 5 }).map((_, j) => (
        <td key={j} className="p-4 border-t border-border">
          <div className="h-4 bg-border rounded animate-pulse" />
        </td>
      ))}
    </tr>
  ))
}
interface StockTableProps {
  items: PaginatedResponse<Item>
  allItems: Item[]
  setItems?: Dispatch<SetStateAction<PaginatedResponse<Item>>>
  onPageChange?: (page: number) => void
  loadingPage?: boolean
}

export default function StockTable({ items, onPageChange }: StockTableProps) {

  const currentItems = items?.data || []
  const { totalPages, currentPage } = items?.meta || { totalPages: 1, currentPage: 1 }

  const handlePageChange = (_event: ChangeEvent<unknown>, value: number) => {
    onPageChange?.(value)
  }

  return (
    <>
      <div className="min-h-[565px] flex flex-col w-full max-w-container mt-8 overflow-hidden">

        <div className="flex flex-col gap-4 mb-10">
          {currentItems.map((item) => (
            <section
              key={item.id}
              className="flex flex-col sm:flex-row sm:items-center gap-4 border border-border rounded-2xl px-4 py-6"
            >
              {/* Imagem + Nome */}
              <div className="flex items-center gap-4 flex-1 min-w-0">
                {item.imageUrl ? (
                  <img className="w-16 h-16 rounded-xl object-cover shrink-0" src={item.imageUrl} alt="" />
                ) : (
                  <div className="w-16 h-16 rounded-xl bg-bg flex items-center justify-center shrink-0">
                    <Image color="gray" size={24} />
                  </div>
                )}

                <Link
                  className="flex items-center gap-2 font-bold underline decoration-border truncate"
                  to={`/app/items/${item.id}`}
                >
                  <span className="truncate">{item.name}</span>
                  <SquareArrowOutUpLeft size={14} color="gray" className="shrink-0" />
                </Link>
              </div>

              {/* Estoque + Preço */}
              <div className="flex justify-between sm:justify-center gap-6 sm:gap-10 sm:ml-auto">
                <div className="text-start sm:text-end">
                  <p className="text-[12px] text-text-muted">Estoque</p>
                  <span className="font-bold text-base">{item.quantity} un</span>
                </div>

                <div className="text-start sm:text-end">
                  <p className="text-[12px] text-text-muted">Preço unit.</p>
                  <span className="font-bold text-base text-primary">{formatCentsToBRL(item.priceInCents)}</span>
                </div>
              </div>
            </section>
          ))}
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
                '& .Mui-selected': {
                  backgroundColor: 'var(--color-primary) !important',
                  color: 'white',
                }
              }}
            />
          </Stack>
        </div>

      </div>
    </>
  )
}
