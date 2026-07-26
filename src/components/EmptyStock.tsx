import emptyBoxIcon from "@/assets/images/empty-box.webp";
import { Plus } from "lucide-react";
import { Link } from "react-router-dom";

interface EmptyStockProps {
  url?: string
}

export default function EmptyStock(_props: EmptyStockProps) {
  return (
    <div className="grid place-items-center h-full w-full max-w-[400px]">
      <section className="grid place-items-center text-center">
        <img
          className="w-[150px] mb-4"
          src={emptyBoxIcon}
          alt=""
        />
        <h2 className="text-4xl font-bold text-text-main">Estoque vazio</h2>
        <p className="text-base text-muted mt-4 mb-8 w-full">
          Parece que você ainda não adicionou nenhum item. Comece agora para
          organizar seu inventário.
        </p>
        <Link
          to={"/app/create"}
          className="flex items-center gap-2 bg-primary text-white px-5 py-2.5 rounded-lg no-underline"
        >
          <Plus />  Adicionar item
        </Link>
      </section>
    </div>
  );
}
