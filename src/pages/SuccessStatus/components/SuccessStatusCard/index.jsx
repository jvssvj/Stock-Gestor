import { Link } from "react-router-dom";
import { CircleCheck } from "lucide-react";
import Information from "@/components/Information";

export default function SucessStatusCard({
  itemId,
  itemName,
  itemSku,
  itemQuantity,
  status,
}) {
  return (
    <section className="w-full max-w-[520px] bg-white rounded-xl border border-border px-8 py-10 flex flex-col items-center text-center">

      {/* Icon */}
      <span className="w-14 h-14 rounded-full bg-green-200 flex items-center justify-center mb-6">
        <CircleCheck size={28} className="text-success" />
      </span>

      {/* Title */}
      <h2 className="text-xl font-bold text-text-main mb-2">
        Item{" "}
        {status === "update"
          ? "atualizado"
          : status === "create"
            ? "cadastrado"
            : status === "delete"
              ? "deletado"
              : "processado"}{" "}
        com sucesso!
      </h2>

      {/* Subtitle */}
      <p className="text-sm text-text-muted">
        {status === "create" && "O item foi cadastrado no seu inventário."}
        {status === "update" && "As informações do item foram atualizadas."}
        {status === "delete" && (
          <>
            <span className="font-medium text-text-main">"{itemName}"</span> foi removido do seu inventário.
          </>
        )}
      </p>

      {/* Item info */}
      {(status === "create" || status === "update") && (
        <div className="w-full border border-border rounded-lg p-4 mt-8 flex flex-col gap-3 text-left">
          <Information title="Nome do item:" information={itemName} inStatusCard />
          <Information title="Código/SKU:" information={itemSku} inStatusCard />
          <Information title="Estoque atual:" information={itemQuantity} inStatusCard />
        </div>
      )}

      {/* Actions */}
      <div className={`w-full flex gap-3 mt-8 ${status === "delete" ? "" : "flex-col sm:flex-row"}`}>
        {status === "delete" ? (
          <Link
            to="/dashboard/items"
            className="no-underline w-full py-4 px-6 bg-primary hover:bg-primary-light text-white text-sm font-semibold rounded-lg text-center transition-colors duration-200"
          >
            Voltar para o estoque
          </Link>
        ) : (
          <>
            <Link
              to="/dashboard/items"
              className="no-underline w-full py-4 px-6 border border-border hover:border-text-muted text-text-main text-sm font-semibold rounded-lg text-center transition-colors duration-200"
            >
              Voltar para o estoque
            </Link>
            <Link
              to={`/dashboard/items/${itemId}`}
              className="no-underline w-full py-4 px-6 bg-primary hover:bg-primary-light text-white text-sm font-semibold rounded-lg text-center transition-colors duration-200"
            >
              Ver detalhes
            </Link>
          </>
        )}
      </div>

    </section>
  );
}