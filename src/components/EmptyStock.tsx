import emptyBoxIcon from "@/assets/images/empty-box.png";
import { Plus } from "lucide-react";
import { Link } from "react-router-dom";

interface EmptyStockProps {
  url?: string
}

export default function EmptyStock(_props: EmptyStockProps) {
  return (
    <div className="grid place-items-center h-full w-full">
      <section className="grid place-items-center text-center">
        <img
          className="w-[150px] mb-4"
          src={emptyBoxIcon}
          alt=""
        />
        <h2 className="text-4xl font-bold text-text-main">Seu estoque está vazio</h2>
        <p className="text-base text-muted mt-4 mb-8 w-full max-w-[400px]">
          Parece que você ainda não adicionou nenhum item. Comece agora para
          organizar seu inventário.
        </p>
        <Link
          to={"/app/create"}
          className="flex items-center justify-center bg-primary text-white rounded-lg gap-2 py-[0.81rem] px-8 cursor-pointer transition-all duration-200 ease-in-out no-underline text-xs w-full whitespace-nowrap hover:bg-primary-light active:scale-[0.92] sm:max-w-[200px]"
        >
          <Plus />  Adicionar item
        </Link>
      </section>
    </div>
  );
}
