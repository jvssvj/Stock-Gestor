import { Link } from "react-router-dom";
import { Pencil, Trash2 } from "lucide-react";

export default function Actions({ item, setItemToDelete }) {
  return (
    <section>
      <h3 className="text-xl font-medium mb-6">Ações</h3>

      <div className="flex flex-col gap-4">
        <Link
          to={`/dashboard/items/${item.id}/update`}
          className="flex items-center justify-center gap-2 text-base text-white py-4 px-8 rounded-2xl w-full cursor-pointer transition-all duration-200 ease-in-out no-underline active:scale-[0.92] bg-primary hover:bg-primary-light max-[370px]:py-4 max-[370px]:px-4 max-[370px]:whitespace-nowrap max-[370px]:overflow-hidden max-[370px]:text-ellipsis"
        >
          <Pencil className="max-[370px]:hidden" /> Atualizar item
        </Link>

        <button
          onClick={setItemToDelete}
          className="flex items-center justify-center gap-2 text-base text-white py-4 px-8 rounded-2xl w-full cursor-pointer transition-all duration-200 ease-in-out active:scale-[0.92] bg-danger hover:bg-danger-light max-[370px]:py-4 max-[370px]:px-4 max-[370px]:whitespace-nowrap max-[370px]:overflow-hidden max-[370px]:text-ellipsis"
        >
          <Trash2 className="max-[370px]:hidden" /> Excluir item
        </button>
      </div>
    </section>
  );
}
