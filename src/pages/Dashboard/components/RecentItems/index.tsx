import type { Item } from "@/types"

interface RecentItem extends Item {
  formattedDate?: string
}

interface RecentItemsProps {
  data: RecentItem[]
}

export default function RecentItems({ data }: RecentItemsProps) {
  return (
    /* 1. Container com arredondamento, borda e scroll lateral */
    <div className="w-full overflow-x-auto rounded-xl border border-border">
      <table className="bg-white w-full min-w-[700px] border-separate border-spacing-0">
        <thead className="bg-border">
          <tr>
            <th className="text-start p-4 whitespace-nowrap text-xs uppercase font-medium text-text-muted">
              Nome
            </th>
            <th className="text-start p-4 whitespace-nowrap text-xs uppercase font-medium text-text-muted">
              Quantidade
            </th>
            <th className="text-start p-4 whitespace-nowrap text-xs uppercase font-medium text-text-muted">
              Adicionado em
            </th>
          </tr>
        </thead>
        <tbody>
          {data && data.length > 0 ? (
            data.map((item) => (
              <tr
                key={item.id}
                className="group hover:bg-off-white transition-colors"
              >
                {/* Usamos border-t para evitar conflito com o arredondamento da div pai */}
                <td className="p-4 text-sm text-text-main border-t border-border whitespace-nowrap overflow-hidden text-ellipsis max-w-[245px]">
                  {item.name}
                </td>
                <td className="p-4 text-sm text-text-muted border-t border-border whitespace-nowrap">
                  {item.quantity}
                </td>
                <td className="p-4 text-sm text-text-muted border-t border-border whitespace-nowrap">
                  {item.formattedDate}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={3} className="p-8 text-center text-text-muted border-t border-border">
                Nenhum item recente encontrado.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
