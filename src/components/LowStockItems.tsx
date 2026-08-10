import type { Id, Item } from "@/types"
import { Check, SquareArrowOutUpLeft } from "lucide-react"
import { Link } from "react-router-dom"

interface LowStockItem {
  id: Id
  name: string
  quantity: number
}

interface LowStockProps {
  data: LowStockItem[]
}

export default function LowStockItems({ data }: LowStockProps) {
  return (
    <div className="
      w-full overflow-x-auto rounded-xl
      [scrollbar-width:thin]
      [scrollbar-color:var(--color-primary)_transparent]
      [&::-webkit-scrollbar]:h-2
      [&::-webkit-scrollbar-track]:bg-transparent
      [&::-webkit-scrollbar-thumb]:bg-primary
      [&::-webkit-scrollbar-thumb]:rounded-full
    ">
      {data.length <= 0 ? (
        <section className="bg-white px-5 py-10 text-center flex flex-col items-center">
          <div className="bg-success-subtle p-3 rounded-4xl">
            <Check size={20} className="text-success" />
          </div>
          <h2 className="text-text-main font-semibold text-2xl mt-4 mb-2">Estoque Equilibrado!</h2>
          <p className="text-muted">Todos os seus itens possuem níveis de estoque saudáveis.</p>
        </section>
      ) : (
        <table className="bg-white w-full min-w-[600px] border-separate border-spacing-0 border border-gray-200">
          <thead className="bg-gray-200">
            <tr>
              <th className="p-4 text-start text-xs uppercase font-medium text-muted">Nome</th>
              <th className="p-4 text-center text-xs uppercase font-medium text-muted">Quantidade</th>
              <th className="p-4 text-center text-xs uppercase font-medium text-muted">Ação</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item) => (
              <tr
                key={item.id}
                className="group hover:bg-off-white transition-colors"
              >
                <td className="p-4 text-sm text-text-main font-medium border-t border-gray-200 whitespace-nowrap overflow-hidden text-ellipsis max-w-[245px]">
                  {item.name}
                </td>
                <td className="p-4 border-t border-gray-200 whitespace-nowrap">
                  <div className="flex items-center justify-center">
                    <span
                      className={`flex items-center justify-center font-bold rounded-md w-8 h-8 ${item.quantity <= 5
                        ? "bg-danger-subtle text-danger"
                        : "bg-warning-subtle text-warning"
                        }`}
                    >
                      {item.quantity}
                    </span>
                  </div>
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
      )}
    </div>
  );
}
