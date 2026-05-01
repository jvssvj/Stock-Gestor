import { Delete, SearchX } from "lucide-react";

export default function NoItemsFound({ onCLick, value }) {
  return (
    <div className="bg-white py-8 px-4 rounded-2xl w-full max-w-[1920px] mt-8 grid place-items-center text-center">
      <span className="bg-bg p-4 rounded-full leading-[0] mb-8">
        {<SearchX size={30} color="#5f5f5f" />}
      </span>
      <section>
        <h2 className="text-[var(--color-text)]">Nenhum item encontrado</h2>
        <p className="text-text-muted my-4 mb-8 max-w-[500px]">
          Não encontramos resultados correspondentes a{" "}
          <strong>"{value}"</strong>. Verifique a ortografia ou tente usar
          termos mais genéricos.
        </p>
      </section>
      <button
        onClick={onCLick}
        className="bg-primary text-white flex items-center justify-center gap-4 py-[0.9rem] px-6 rounded-lg cursor-pointer transition-all duration-200 ease-in-out hover:bg-primary-light"
      >
        {<Delete color="#ffff" />} Limpar pesquisa
      </button>
    </div>
  );
}
