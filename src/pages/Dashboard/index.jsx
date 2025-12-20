import styles from "./index.module.css";
import useGetItems from "../../hooks/useGetItems";
import AddItem from "../../components/AddItem";
import EmptyStock from "../../components/EmptyStock";
import Infos from "./components/Infos";
import RecentItems from "./components/RecentItems";
import { ClipboardCheck, Shapes, TriangleAlert } from "lucide-react";
import LowStock from "./components/LowStock";
import { Link } from "react-router-dom";

export default function Dashboard() {
  const { items, loading, error } = useGetItems();

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
      {items.length > 0 ? (
        <div className={styles.dashboard__container}>
          <section className={styles.dashboard__title__container}>
            <h2 className={styles.dashboard__title}>Dashboard</h2>
            <div className={styles.add__item}>
              <AddItem maxWidth={200} />
            </div>
          </section>

          <div className={styles.dashboard__infos}>
            <Infos
              iconElement={<Shapes />}
              title={"Total de itens diferentes"}
              quantity={items.length}
              iconClass={"component"}
            />
            <Infos
              iconElement={<ClipboardCheck />}
              title={"Total de itens"}
              quantity={items.length.toLocaleString("pt-BR")}
              iconClass={"clipboard--check"}
            />
            <Infos
              iconElement={<TriangleAlert />}
              title={"Itens com baixo estoque"}
              quantity={runningOut.length}
              iconClass={"triangle--alert"}
            />
          </div>

          <div className={styles.dashboard__tables__container}>
            <div className={styles.recent__items__container}>
              <section className={styles.title__table__container}>
                <h3>Itens adicionandos recentemente</h3>
                <Link to="/items">
                  <button className={styles.all__items}>
                    Ver todos os itens
                  </button>
                </Link>
              </section>
              <RecentItems data={recentItems} />
            </div>

            {runningOut.length >= 1 && (
              <div className={styles.running__out__items__container}>
                <section className={styles.title__table__container}>
                  <h3>{`Itens com baixo estoque (<= 10)`}</h3>
                  <button className={styles.report}>Gerar relatório</button>
                </section>

                <LowStock data={runningOut} />
              </div>
            )}
          </div>
        </div>
      ) : (
        <EmptyStock />
      )}
    </>
  );
}
