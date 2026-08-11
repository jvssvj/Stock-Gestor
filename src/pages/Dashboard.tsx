import useGetItems from "@/hooks/useGetItems";
import { CircleAlert, ClipboardCheck, Clock, LayoutDashboard, Plus, Shapes, TriangleAlert, TriangleAlertIcon } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Welcome from "@/components/Welcome";
import Spinner from "@/components/Spinner";
import EmptyStock from "@/components/EmptyStock";
import RecentItems from "@/components/RecentItems";
import LowStockItems from "@/components/LowStockItems";
import StatCard from "@/components/StatCard";
import { useDashboard } from "@/hooks/useDashboard";
import NeedAttention from "@/components/NeedAttention";
import TopMovementsChart from "@/components/TopMovementsChart";
import CategoryChart from "@/components/CategoryChart";

export default function Dashboard() {
  const { dashboard, loading, error } = useDashboard()
  const location = useLocation()
  const navigate = useNavigate()

  if (!dashboard) {
    return (
      <div className="min-h-[100dvh] grid items-center">
        < Spinner />
      </div>
    )
  }

  if (loading) {
    return (
      <div className="min-h-[100dvh] grid items-center">
        < Spinner />
      </div>
    )
  }

  if (error) return <p>Erro ao carregar itens: {error}</p>

  if (dashboard.totalDifferentItems <= 0) {
    return <EmptyStock url={"/app/create"} />
  }

  return (
    <>
      {location.state && (
        <Welcome firstName={location.state.firstName} onClick={() => navigate(location.pathname, { replace: true })} />
      )}

      <div className="w-full max-w-container">
        <div className="flex flex-col gap-4 sm:flex-row sm:justify-between">
          <section>
            <h2 className="text-text-dark font-bold text-2xl">Dashboard</h2>
            <p className="text-muted">Acompanhe o desempenho do seu estoque em tempo real.</p>
          </section>

          <Link
            to={"/app/create"}
            className="flex items-center justify-center bg-primary text-white rounded-lg gap-2 py-[0.81rem] px-8 cursor-pointer transition-all duration-200 ease-in-out no-underline text-xs w-full whitespace-nowrap hover:bg-primary-light active:scale-[0.92] sm:max-w-[200px] h-[45px]"
          >
            <Plus />  Adicionar item
          </Link>
        </div>

        <hr className="my-5 border-t border-light-gray" />

        <div className="w-full flex flex-col gap-5 md:flex-row justify-between">
          <StatCard
            iconElement={<ClipboardCheck />}
            title={"Total de produtos"}
            quantity={dashboard.totalQuantity}
            color={"blue"}
          />
          <StatCard
            iconElement={<Shapes />}
            title={"Total de itens diferentes"}
            quantity={dashboard.totalDifferentItems}
            color={"green"}
          />
          <StatCard
            iconElement={<TriangleAlert />}
            title={"Itens com baixo estoque"}
            quantity={dashboard.lowStockCount}
            color={"red"}
          />
        </div>

        <div className="flex flex-col xl:flex-row items-stretch gap-5 mt-8 mb-5">
          <section className="bg-white w-full xl:max-w-[1000px] rounded-xl border border-gray-200 p-6">
            <h2 className="text-base font-semibold text-text-main mb-4">
              Top 5 Itens Mais Movimentados
            </h2>
            <TopMovementsChart data={dashboard.topMovements} />
          </section>

          <section className="bg-white w-full flex flex-col xl:max-w-[440px] rounded-xl border border-gray-200 p-6">
            <h2 className="text-base font-semibold text-text-main mb-4">
              Categorias
            </h2>
            <CategoryChart data={dashboard.itemsByCategory} />
          </section>
        </div>

        <div>
          <section className="mb-2">
            <h2 className="flex items-center gap-2 text-base font-semibold">
              <TriangleAlertIcon className="text-danger-light" /> Itens que precisam de atenção
            </h2>
          </section>
          <NeedAttention data={dashboard.needsAttention} />
        </div>

        {/* <div className="w-full flex flex-col xl:flex-row items-start gap-5 mt-8">
          <div className="w-full">
            <div className="flex items-center justify-between mb-2">
              <section>
                <h2 className="flex items-center gap-2 text-base font-semibold">
                  <Clock className="text-primary" /> Movimentações recentes
                </h2>
              </section>
              <Link to="/app/items" className="text-primary text-sm hover:text-primary-light font-semibold">
                Ver todos
              </Link>
            </div>
            <RecentItems data={dashboard.recentItems} />
          </div>

          <div className="w-full">
            <section className="flex items-center justify-between mb-2">
              <h2 className="flex items-center gap-2 text-base font-semibold">
                <CircleAlert className="text-danger" /> Itens com baixo estoque
              </h2>
              <Link to={'#'} className="text-primary text-sm hover:text-primary-light font-semibold">Gerar relatório</Link>
            </section>

            <LowStockItems data={dashboard.lowStockItems} />
          </div>
        </div> */}

      </div >
    </>
  )
}
