import AddItem from "../../components/AddItem";
import SearchInput from "../../components/Search";
import StockTable from "../../components/StockTable";
import styles from "./index.module.css";
import useGetItems from "../../hooks/useGetItems";
import EmptyStock from "../../components/EmptyStock";

export default function Stock() {
  const { items, loading, error } = useGetItems();

  if (loading) return <p>Carregando itens..</p>;
  if (error) return <p>Erro ao carregar itens: {error}</p>;

  return (
    <>
      {items.length > 0 ? (
        <section className={styles.container}>
          <header className={styles.header}>
            <SearchInput />
            <div className={styles.header__add__tem}>
              <AddItem />
            </div>
          </header>
          <hr className={styles.line} />
          <h2 className={styles.title}>Itens em estoque</h2>
          <StockTable data={items} />
        </section>
      ) : (
        <EmptyStock />
      )}
    </>
  );
}
