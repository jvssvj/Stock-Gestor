import { CircleCheck } from "lucide-react"
import { Link } from "react-router-dom"

import type { Id } from "@/types"

type SuccessStatus = "create" | "update" | "delete"
type Resource = "item" | "category"

interface SuccessData {
  id?: Id
  name?: string
  sku?: string
  quantity?: number | null
  color?: string
  iconName?: string
}

interface SuccessStatusCardProps {
  status: SuccessStatus
  resource: Resource
  data: SuccessData
}

export default function SuccessStatusCard({
  status,
  resource,
  data,
}: SuccessStatusCardProps) {
  const isItem = resource === "item"

  const resourceName = isItem ? "Item" : "Categoria"

  const actionText = {
    create: isItem ? "criado" : "criada",
    update: isItem ? "atualizado" : "atualizada",
    delete: isItem ? "deletado" : "deletada",
  }

  const backUrl = isItem ? "/app/items" : "/app/categories"

  const detailsUrl = isItem
    ? `/app/items/${data.id}`
    : `/app/categories/${data.id}`

  return (
    <section className="border border-light-gray w-full max-w-[480px] bg-white rounded-xl px-8 py-8 flex flex-col items-center text-center shadow-lg">

      {/* Ícone */}
      <span className="p-4 rounded-full bg-success-subtle flex items-center justify-center mb-7">
        <CircleCheck size={24} className="text-success" />
      </span>

      {/* Título */}
      <h2 className="text-2xl font-bold text-text-main mb-2">
        {resourceName} {actionText[status]} com sucesso!
      </h2>

      {/* Descrição */}
      <p className="text-base text-text-muted max-w-[380px] leading-6">
        {status === "create" &&
          (isItem
            ? "O novo item foi registrado e já está disponível no estoque."
            : "A nova categoria foi criada e já pode ser utilizada nos seus itens.")}

        {status === "update" &&
          (isItem
            ? "As informações do item foram atualizadas com sucesso."
            : "As informações da categoria foram atualizadas com sucesso.")}

        {status === "delete" && (
          <>
            <span className="font-medium text-text-main">
              "{data.name}"
            </span>{" "}
            foi {isItem
              ? "removido do seu estoque."
              : "removida das suas categorias."}
          </>
        )}
      </p>

      {/* Informações */}
      {(status === "create" || status === "update") && (
        <div className="w-full bg-bg rounded-lg px-6 py-3 mt-9 text-left">

          <InfoRow
            label={isItem ? "Nome" : "Categoria"}
            value={data.name}
          />

          {isItem ? (
            <>
              <InfoRow
                label="Código SKU"
                value={data.sku}
              />

              <InfoRow
                label="Quantidade"
                value={
                  data.quantity !== null && data.quantity !== undefined
                    ? `${data.quantity} unidades`
                    : "-"
                }
                last
              />
            </>
          ) : (
            <>
              <InfoRow
                label="Cor"
                value={data.color}
              />

              <InfoRow
                label="Ícone"
                value={data.iconName}
                last
              />
            </>
          )}
        </div>
      )}

      {/* Botões */}
      <div className="w-full flex flex-col gap-3 mt-8">
        {status !== "delete" && (
          <Link
            to={detailsUrl}
            className={`no-underline w-full py-3.5 px-6 bg-primary hover:bg-primary-light text-white text-sm font-semibold rounded-lg text-center transition-colors duration-200 ${isItem ? "block" : "hidden"}`}
          >
            {isItem ? "Ver Detalhes do Item" : ""}
          </Link>
        )}

        <Link
          to={backUrl}
          className={`no-underline w-full py-3.5 px-6 text-sm font-semibold rounded-lg text-center transition-colors duration-200 
            ${status === "delete"
              ? "bg-primary hover:bg-primary-light text-white"
              : "border border-border hover:bg-bg text-text-main"
            }
            ${!isItem && "bg-primary text-white hover:bg-primary-light"}

          `}
        >
          {isItem ? "Voltar ao Estoque" : "Voltar às Categorias"}
        </Link>
      </div>
    </section>
  )
}

interface InfoRowProps {
  label: string
  value?: string | number | null
  last?: boolean
}

function InfoRow({ label, value, last = false }: InfoRowProps) {
  return (
    <div
      className={`flex items-center justify-between gap-6 py-4 ${!last ? "border-b border-border" : ""
        }`}
    >
      <span className="text-sm text-text-muted">
        {label}
      </span>

      <span className="text-sm font-semibold text-text-main text-right truncate max-w-[230px]">
        {value ?? "-"}
      </span>
    </div>
  )
}