import useGetItems from "@/hooks/useGetItems";
import { ClipboardCheck, Plus, Shapes, TriangleAlert } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Welcome from "@/components/Welcome";
import Spinner from "@/components/Spinner";
import EmptyStock from "@/components/EmptyStock";
import RecentItems from "@/components/RecentItems";
import LowStockItems from "@/components/LowStockItems";
import StatCard from "@/components/StatCard";

export default function Dashboard() {
  const { items, loading, error } = useGetItems()
  const location = useLocation()
  const navigate = useNavigate()

  if (loading) {
    return (
      <div className="min-h-[100dvh] grid items-center">
        < Spinner />
      </div>
    )
  }

  if (error) return <p>Erro ao carregar itens: {error}</p>

  function formatDate(dateString: string) {
    if (!dateString) return "";

    const [datePart, timePart] = dateString.split("T");
    const [year, month, day] = datePart.split("-")
    const [hour, minute] = timePart.split(":")

    return `${day}/${month}/${year} às ${hour}:${minute}`
  }

  const recentItems = [...(items?.data || [])]
    .sort((a, b) => new Date(b.updatedAt || b.createdAt || "").getTime() - new Date(a.updatedAt || a.createdAt || "").getTime())
    .slice(0, 10)
    .map(item => ({
      ...item,
      formattedDate: formatDate(item.updatedAt || item.createdAt || "")
    }))

  const runningOut = (items?.data || [])
    .filter((item) => item.quantity <= 10)
    .sort((a, b) => a.quantity - b.quantity)

  const uniqueCategories = [...new Set((items?.data || [])
    .map((item) => item.category?.name || item.category)
    .filter(Boolean)
  )]

  return (
    <>
      {location.state && (
        <Welcome firstName={location.state.firstName} onClick={() => navigate(location.pathname, { replace: true })} />
      )}
      {items.data.length > 0 ? (
        <div className="w-full max-w-container">
          <div className="flex flex-col gap-4 sm:flex-row sm:justify-between">
            <section>
              <h2 className="text-text-dark font-bold text-2xl">Dashboard</h2>
              <p className="text-muted">Acompanhe o desempenho do seu estoque em tempo real.</p>
            </section>

            <Link
              to={"/app/create"}
              className="flex items-center justify-center bg-primary text-white rounded-lg gap-2 py-[0.81rem] px-8 cursor-pointer transition-all duration-200 ease-in-out no-underline text-xs w-full whitespace-nowrap hover:bg-primary-light active:scale-[0.92] sm:max-w-[200px]"
            >
              <Plus />  Adicionar item
            </Link>
          </div>

          <hr className="my-10 border-t border-border" />

          <div className="w-full flex flex-col gap-5 md:flex-row justify-between">
            <StatCard
              iconElement={<ClipboardCheck />}
              title={"Total de produtos"}
              quantity={items.data.length}
              color={"primary"}
            />
            <StatCard
              iconElement={<Shapes />}
              title={"Total de itens diferentes"}
              quantity={uniqueCategories.length}
              color={"success"}
            />
            <StatCard
              iconElement={<TriangleAlert />}
              title={"Itens com baixo estoque"}
              quantity={runningOut.length}
              color={"danger"}
            />
          </div>

          <div className="">
            <div>
              <div className="flex items-center justify-between mt-8 mb-5">
                <section>
                  <h2 className="text-sm font-semibold">Movimentações recentes</h2>
                  <p className="text-xs text-muted">Últimas entradas e saídas</p>
                </section>
                <Link to="/app/items" className="text-primary text-sm hover:text-primary-light font-semibold">
                  Ver todos
                </Link>
              </div>
              <RecentItems data={recentItems} />
            </div>

            {runningOut.length >= 1 && (
              <div>
                <section className="flex items-center justify-between mt-8 mb-5">
                  <h3 className="font-semibold" >Itens com baixo estoque</h3>
                  <Link to={'#'} className="text-primary hover:text-primary-light font-semibold">Gerar relatório</Link>
                </section>

                <LowStockItems data={runningOut} />
              </div>
            )}
          </div>
        </div >
      ) : (
        <EmptyStock url={"/app/create"} />
      )
      }
    </>
  )
}
