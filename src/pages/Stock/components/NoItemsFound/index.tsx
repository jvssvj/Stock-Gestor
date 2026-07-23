import { Delete, SearchX } from "lucide-react";

interface NoItemsFoundProps {
  onCLick: () => void
  value: string
}

export default function NoItemsFound({ onCLick, value }: NoItemsFoundProps) {
  return (
    <div className="bg-white py-10 px-4 rounded-2xl w-full max-w-[1920px] mt-8 grid place-items-center text-center border-2 border-dotted border-border">
      <section>
        <h2 className="text-text-main font-bold text-2xl mb-5">Nenhum item encontrado</h2>
        <p className="text-text-muted max-w-[500px]">
          Nenhum resultado para {" "}<strong>"{value}"</strong>.
        </p>
        <p>Tente ajustar sua busca ou adicionar um novo produto.</p>
      </section>
      <button
        onClick={onCLick}
        className="bg-primary mt-5 text-white flex items-center justify-center gap-4 py-3 px-6 rounded-lg cursor-pointer transition-all duration-200 ease-in-out hover:bg-primary-light"
      >
        {<Delete color="#ffff" />} Limpar pesquisa
      </button>
    </div>
  );
}
