import { AlertTriangle } from "lucide-react"
import Spinner from "./Spinner"

type Resource = "item" | "category"

interface ConfirmDeletionProps {
  resource: Resource
  name: string
  sku?: string
  cancelAction: () => void
  confirmAction: () => void
  loadingDeletion: boolean
}

export default function ConfirmDeletion({
  resource,
  name,
  sku,
  cancelAction,
  confirmAction,
  loadingDeletion
}: ConfirmDeletionProps) {
  const isItem = resource === "item"

  return (
    <div className="h-screen w-full flex items-center justify-center fixed top-0 left-0 z-[9999]">
      <div
        className="absolute inset-0 bg-black/80"
        onClick={cancelAction}
      />

      <div className="relative p-4 w-full flex justify-center">
        <section
          role="alertdialog"
          aria-modal="true"
          aria-labelledby="delete-title"
          className="bg-white py-8 px-4 rounded-lg w-full max-w-[600px] grid place-items-center text-center"
        >
          <span className="bg-danger-subtle leading-[0] rounded-full p-4">
            <AlertTriangle color="#ff1010" />
          </span>

          <h2
            id="delete-title"
            className="text-text-main font-bold text-2xl mt-8"
          >
            Você tem certeza?
          </h2>

          <p className="mt-2 mb-4 text-text-muted">
            Esta ação não pode ser desfeita. Você está prestes a{" "}
            <strong>
              excluir permanentemente {isItem ? "o item:" : "a categoria:"}
            </strong>
          </p>

          <h3 className="w-full max-w-[400px] font-semibold overflow-hidden text-ellipsis text-nowrap">
            {name}
          </h3>

          {isItem && sku && (
            <span className="w-full max-w-[400px] overflow-hidden text-muted text-ellipsis text-nowrap">
              SKU: [{sku}]
            </span>
          )}

          <div className="w-full flex items-center justify-center gap-4 mt-8 max-[395px]:flex-col">
            <button
              type="button"
              className="bg-light-gray py-[0.8rem] px-4 rounded-lg min-w-[135px] font-bold cursor-pointer transition-all duration-200 ease-in-out hover:scale-110 max-[395px]:w-full"
              onClick={cancelAction}
            >
              Cancelar
            </button>

            <button
              type="button"
              className="bg-danger text-white py-[0.8rem] px-4 rounded-lg min-w-[135px] font-bold cursor-pointer transition-all duration-200 ease-in-out hover:scale-110 max-[395px]:w-full"
              onClick={confirmAction}
            >
              {loadingDeletion
                ? "Deletando..."
                : `Sim, excluir ${isItem ? "item" : "categoria"}`}
            </button>
          </div>
        </section>
      </div>
    </div>
  )
}