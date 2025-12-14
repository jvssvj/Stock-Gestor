import Dashboard from "../../components/Dashboard";
import styles from "./index.module.css";
import useGetItems from "../../hooks/useGetItems";
import AddItem from "../../components/AddItem";
import EmptyStock from "../../components/EmptyStock";

export default function Home() {
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
      dateISO: item.date, // mantém original
    }))
    .sort((a, b) => new Date(b.dateISO) - new Date(a.dateISO))
    .map((item) => ({
      ...item,
      date: formatDate(item.dateISO), // agora formata com segurança
    }))
    .slice(0, 10);

  // Ordena por data mais recente
  const recentItems = dbFormatted;
  const runningOut = items
    .filter((item) => item.quantity <= 10)
    .sort((a, b) => a.quantity - b.quantity);
  const differentItems = [...new Set(items.map((item) => item.category))];

  return (
    <>
      {items.length > 0 ? (
        <div className={styles.dashboard__container}>
          <section className={styles.dashboard__title__container}>
            <h2 className={styles.dashboard__title}>Dashboard</h2>
            <AddItem maxWidth={200} />
          </section>

          <Dashboard
            items={items}
            runningOut={runningOut}
            recentItems={recentItems}
            differentItems={differentItems}
          />
        </div>
      ) : (
        <EmptyStock />
      )}
    </>
  );
}
