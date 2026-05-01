import useGetItems from "@/hooks/useGetItems";
import EmptyStock from "@/components/EmptyStock";
import Infos from "./components/Infos";
import RecentItems from "./components/RecentItems";
import LowStock from "./components/LowStock";
import { ClipboardCheck, Plus, Shapes, TriangleAlert } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Welcome from "@/components/Welcome";

export default function Dashboard() {
  const { items, loading, error } = useGetItems();
  const location = useLocation()
  const navigate = useNavigate()

  if (loading) return <p>Carregando itens..</p>;
  if (error) return <p>Erro ao carregar itens: {error}</p>;

  function formatDate(dateString) {
    if (!dateString) return "";
    const [year, month, day] = dateString.split("-");
    return `${day}/${month}/${year}`; // sem risco de timezone!
  }

  const dbFormatted = items
    .map((item) => ({
      ...item,
      dateISO: item.date,
    }))
    .sort((a, b) => new Date(b.dateISO) - new Date(a.dateISO))
    .map((item) => ({
      ...item,
      date: formatDate(item.dateISO),
    }))
    .slice(0, 10);

  const recentItems = dbFormatted;
  const runningOut = items
    .filter((item) => item.quantity <= 10)
    .sort((a, b) => a.quantity - b.quantity);
  // const differentItems = [...new Set(items.map((item) => item.category))];

  return (
    <>
      {location.state && (
        <Welcome name={location.state.name} onClick={() => navigate(location.pathname, { replace: true })} />
      )}
      {items.length > 0 ? (
        <div className="w-full max-w-container">
          <section className="flex items-end flex-col gap-4 sm:flex-row sm:justify-between">
            <h2 className="text-text-dark font-bold text-3xl">Dashboard</h2>

            <Link
              to={"/dashboard/create"}
              className="flex items-center justify-center bg-primary text-white rounded-lg gap-2 py-[0.81rem] px-8 cursor-pointer transition-all duration-200 ease-in-out no-underline text-xs w-full whitespace-nowrap hover:bg-primary-light active:scale-[0.92] sm:max-w-[200px]"
            >
              <Plus />  Adicionar item
            </Link>
          </section>

          <hr className="my-10 border-t border-border" />

          <div className="w-full flex flex-col gap-5 md:flex-row justify-between">
            <Infos
              iconElement={<Shapes />}
              title={"Total de itens diferentes"}
              quantity={items.length}
              color={"success"}
            />
            <Infos
              iconElement={<ClipboardCheck />}
              title={"Total de itens"}
              quantity={items.length.toLocaleString("pt-BR")}
              color={"primary"}
            />
            <Infos
              iconElement={<TriangleAlert />}
              title={"Itens com baixo estoque"}
              quantity={runningOut.length}
              color={"danger"}
            />
          </div>

          <div className="">
            <div>
              <section className="flex items-center justify-between mt-8 mb-5">
                <h3 className="font-semibold">Itens recentes</h3>
                <Link to="/dashboard/items" className="text-primary hover:text-primary-light font-semibold">
                  Ver todos
                </Link>
              </section>
              <RecentItems data={recentItems} />
            </div>

            {runningOut.length >= 1 && (
              <div>
                <section className="flex items-center justify-between mt-8 mb-5">
                  <h3 className="font-semibold" >Itens com baixo estoque</h3>
                  <Link to={'#'} className="text-primary hover:text-primary-light font-semibold">Gerar relatório</Link>
                </section>

                <LowStock data={runningOut} />
              </div>
            )}
          </div>
        </div >
      ) : (
        <EmptyStock url={"/dashboard/create"} />
      )
      }
    </>
  );
}
