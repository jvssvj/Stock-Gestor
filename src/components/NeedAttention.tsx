import { Id } from "@/types"
import { SquareArrowOutUpLeft } from "lucide-react"
import { Link } from "react-router-dom"

interface NeedsAttentionItem {
    id: Id
    name: string
    missingFields: string[]
}

interface NeedsAttentionProps {
    data: NeedsAttentionItem[]
}

function translateField(field: string) {
    const fieldMap: Record<string, { label: string; className: string }> = {
        image: {
            label: "Imagem",
            className: "bg-blue-100 text-blue-700",
        },
        quantity: {
            label: "Quantidade",
            className: "bg-orange-100 text-orange-700",
        },
        price: {
            label: "Preço unitário",
            className: "bg-green-100 text-green-700",
        },
        category: {
            label: "Categoria",
            className: "bg-purple-100 text-purple-700",
        },
        description: {
            label: "Descrição",
            className: "bg-red-100 text-red-700",
        },
    }

    return fieldMap[field] || {
        label: field,
        className: "text-text-muted",
    }
}

export default function NeedAttention({ data }: NeedsAttentionProps) {
    if (!data?.length) {
        return (
            <div className="bg-white flex flex-col items-center justify-center py-10 text-center rounded-xl border border-light-gray">
                <p className="mt-1 text-sm text-muted">
                    Nenhum item precisa de atenção no momento.
                </p>
            </div>
        )
    }

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
            <table className="bg-white w-full min-w-[700px] border-separate border-spacing-0">
                <thead className="bg-primary">
                    <tr>
                        <th className="text-start p-4 whitespace-nowrap text-xs uppercase font-medium text-white">
                            Nome
                        </th>
                        <th className="text-start p-4 whitespace-nowrap text-xs uppercase font-medium text-white">
                            Informação faltando
                        </th>
                        <th className="text-start p-4 whitespace-nowrap text-xs uppercase font-medium text-white">
                            Ação
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {data.slice(0, 5).map((item) => (
                        <tr
                            key={item.id}
                            className="group hover:bg-off-white transition-colors"
                        >
                            <td className="p-4 text-sm font-medium text-text-main border-t border-gray-200 whitespace-nowrap overflow-hidden text-ellipsis max-w-[245px]">
                                {item.name}
                            </td>
                            <td className="flex gap-2 p-4 text-sm text-muted border-t border-gray-200 whitespace-nowrap">
                                {item.missingFields.map((field) => {
                                    const fieldInfo = translateField(field)

                                    return (
                                        <span
                                            key={field}
                                            className={`px-2 py-1 rounded-4xl text-xs font-medium inline-flex items-center gap-1.5 ${fieldInfo.className}`}
                                        >
                                            <span className="w-1.5 h-1.5 rounded-4xl bg-current" />
                                            {fieldInfo.label}
                                        </span>
                                    )
                                })}
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
    )
}