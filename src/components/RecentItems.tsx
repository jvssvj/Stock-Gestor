import type { Id, Item } from "@/types"
import { formatDateTime } from "@/utils/formatDateTime"
import { Link2, SquareArrowOutUpLeft } from "lucide-react"
import { Link } from "react-router-dom"

interface RecentItem {
  id: Id
  name: string
  quantity: number
  createdAt: string
}
interface RecentItemsProps {
  data: RecentItem[]
}

export default function RecentItems({ data }: RecentItemsProps) {
  return (
    <div className="
      w-full overflow-x-auto scrol rounded-xl
      [scrollbar-width:thin]
      [scrollbar-color:var(--color-primary)_transparent]
      [&::-webkit-scrollbar]:h-2
      [&::-webkit-scrollbar-track]:bg-transparent
      [&::-webkit-scrollbar-thumb]:bg-primary
      [&::-webkit-scrollbar-thumb]:rounded-full
    ">
      <table className="bg-white w-full min-w-[700px] border-separate border-spacing-0 border border-gray-200">
        <thead className="bg-gray-200">
          <tr>
            <th className="text-start p-4 whitespace-nowrap text-xs uppercase font-medium text-muted">
              Nome
            </th>
            <th className="text-start p-4 whitespace-nowrap text-xs uppercase font-medium text-muted">
              Quantidade
            </th>
            <th className="text-start p-4 whitespace-nowrap text-xs uppercase font-medium text-muted">
              Adicionado em
            </th>
            <th className="text-start p-4 whitespace-nowrap text-xs uppercase font-medium text-muted">
              Ação
            </th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr
              key={item.id}
              className="group hover:bg-off-white transition-colors"
            >
              {/* Usamos border-t para evitar conflito com o arredondamento da div pai */}
              <td className="p-4 font-medium text-sm text-text-main border-t border-gray-200 whitespace-nowrap overflow-hidden text-ellipsis max-w-[245px]">
                {item.name}
              </td>
              <td className="p-4 text-sm text-muted border-t border-gray-200 whitespace-nowrap">
                {item.quantity}
              </td>
              <td className="p-4 text-sm text-muted border-t border-gray-200 whitespace-nowrap">
                {formatDateTime(item.createdAt)}
              </td>
              <td className="p-4 text-sm text-text-main border-t border-gray-200 whitespace-nowrap overflow-hidden text-ellipsis max-w-[245px]">
                <Link className="text-primary font-semibold flex items-center gap-2" to={`/app/items/${item.id}`}>
                  Editar
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
