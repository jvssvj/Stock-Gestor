import type { Item } from "@/types"

interface LowStockProps {
  data: Item[]
}

export default function LowStock({ data }: LowStockProps) {
  return (
    /* 1. Div pai controla o arredondamento e o scroll */
    <div className="w-full overflow-x-auto rounded-xl border border-border">
      <table className="bg-white w-full min-w-[600px] border-separate border-spacing-0">
        <thead className="bg-border">
          <tr>
            <th className="p-4 text-start text-xs uppercase font-medium text-text-muted">Nome</th>
            <th className="p-4 text-center text-xs uppercase font-medium text-text-muted">Quantidade</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr
              key={item.id}
              className="group hover:bg-off-white transition-colors"
            >
              <td className="p-4 text-sm text-text-main border-t border-border whitespace-nowrap overflow-hidden text-ellipsis max-w-[245px]">
                {item.name}
              </td>
              <td className="p-4 border-t border-border whitespace-nowrap">
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
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
