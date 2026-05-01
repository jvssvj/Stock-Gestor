import { AlertTriangle } from "lucide-react";

export default function ConfirmDeletion({
  productName,
  productSku,
  cancelAction,
  confirmAction,
}) {
  return (
    <div className="h-[100vh] w-full flex items-center justify-center fixed top-0 left-0 z-[9999]">
      <div className="bg-black w-full h-full opacity-80"></div>
      <div className="absolute p-4">
        <section className="bg-white py-8 px-4 rounded-lg w-full max-w-[600px] grid place-items-center text-center">
          <span className="bg-danger-light leading-[0] rounded-full p-4">
            {<AlertTriangle color="#ff1010" />}
          </span>
          <h2 className="text-[var(--color-text)] mt-8">Você tem certeza?</h2>
          <p className="mt-2 mb-4 text-text-muted">
            Esta ação não pode ser desfeita. Você está prestes a excluir
            permanentemente o item:
          </p>
          <h3 className="w-full max-w-[400px] overflow-hidden text-ellipsis text-nowrap">"{productName}"</h3>
          <span className="w-full max-w-[400px] overflow-hidden text-ellipsis text-nowrap">SKU: [{productSku}]</span>

          <div className="w-full flex items-center justify-center gap-4 mt-8 max-[395px]:flex-col">
            <button
              className="bg-border py-[0.8rem] px-4 rounded-lg min-w-[135px] font-bold cursor-pointer transition-all duration-200 ease-in-out hover:scale-110 max-[395px]:w-full"
              onClick={cancelAction}
            >
              Cancelar
            </button>
            <button
              className="bg-danger text-white py-[0.8rem] px-4 rounded-lg min-w-[135px] font-bold cursor-pointer transition-all duration-200 ease-in-out hover:scale-110 max-[395px]:w-full"
              onClick={confirmAction}
            >
              Sim, excluir item
            </button>
          </div>
        </section>
      </div>
    </div>
  );
}
