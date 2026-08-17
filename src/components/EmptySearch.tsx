interface EmptySearchProps {
    type: "item" | "category"
    search: string
    onClear: () => void
}

import { Delete } from "lucide-react"

interface EmptySearchProps {
    type: "item" | "category"
    search: string
    onClear: () => void
}

const labels = {
    item: {
        singular: "item",
        plural: "itens",
        action: "adicionar um novo produto",
    },
    category: {
        singular: "categoria",
        plural: "categorias",
        action: "adicionar uma nova categoria",
    },
}

export function EmptySearch({
    type,
    search,
    onClear,
}: EmptySearchProps) {
    const label = labels[type]

    return (
        <div className="py-10 px-4 rounded-2xl w-full mt-8 grid place-items-center text-center">
            <section>
                <h2 className="text-text-main font-bold text-2xl mb-5">
                    Nenhum {label.singular} encontrado
                </h2>

                <p className="text-text-muted max-w-[500px]">
                    Nenhum resultado para <strong>"{search}"</strong>.
                </p>

                <p>
                    Tente ajustar sua busca ou {label.action}.
                </p>
            </section>

            <button
                onClick={onClear}
                className="bg-primary mt-5 text-white flex items-center justify-center gap-4 py-3 px-6 rounded-lg cursor-pointer transition-all duration-200 ease-in-out hover:bg-primary-light"
            >
                <Delete color="#ffff" />
                Limpar pesquisa
            </button>
        </div>
    )
}