import AddItem from "../../components/AddItem";
import SearchInput from "../../components/Search";
import StockTable from "../../components/StockTable";
import styles from "./index.module.css";
import useGetItems from "../../hooks/useGetItems";
import EmptyStock from "../../components/EmptyStock";
import { useState } from "react";
import NoItemsFound from "../../components/NoItemsFound";

export default function Stock() {
  const { items, loading, error } = useGetItems();
  const [searchedItem, setSearchedItem] = useState("");
  const [searching, setSearching] = useState(false);

  if (loading) return <p>Carregando itens..</p>;
  if (error) return <p>Erro ao carregar itens: {error}</p>;

  function handleSearchItem(ev) {
    setSearchedItem(ev.target.value);
    setSearching(true);

    if (ev.target.value == "") setSearching(false);
  }

  function findItem() {
    if (!searchedItem.trim()) return null;
    const searchedItems = items.filter((i) =>
      i.name.toLowerCase().includes(searchedItem.toLowerCase())
    );

    return searchedItems;
  }

  function renderContent() {
    if (searching && searchedItem.trim() && findItem()?.length === 0) {
      return (
        <NoItemsFound
          value={searchedItem}
          onClear={() => setSearchedItem("")}
        />
      );
    }

    if (searching && searchedItem.trim()) {
      return <StockTable data={findItem()} />;
    }

    if (items.length === 0) {
      return <EmptyStock />;
    }

    return <StockTable data={items} />;
  }

  return (
    <>
      <section className={styles.container}>
        {items.length > 0 && (
          <>
            <header className={styles.header}>
              <SearchInput
                value={searchedItem}
                event={handleSearchItem}
              />
              <div className={styles.header__add__tem}>
                <AddItem />
              </div>
            </header>
            <hr className={styles.line} />
            <h2 className={styles.title}>{`${
              searchedItem == "" ? "Itens em estoque" : "Resultados da pesquisa"
            }`}</h2>
          </>
        )}

        {searching && searchedItem.trim() && (
          <p>
            Exibindo {findItem()?.length || 0} resultados para{" "}
            <strong>"{searchedItem}"</strong>
          </p>
        )}
      </section>
      {renderContent()}
    </>
  );
}
