import { useState } from "react";
import AddItem from "../../components/AddItem";
import StockTable from "./components/StockTable";
import EmptyStock from "../../components/EmptyStock";
import styles from "./index.module.css";
import useGetItems from "../../hooks/useGetItems";
import SearchInput from "./components/Search";
import NoItemsFound from "./components/NoItemsFound";

export default function Stock() {
  // carrega do localStorage
  const { items, loading, error } = useGetItems();

  // busca
  const [searchedItem, setSearchedItem] = useState("");
  const [searching, setSearching] = useState(false);

  if (loading) return <p>Carregando itens...</p>;
  if (error) return <p>Erro ao carregar itens.</p>;

  function handleSearchItem(ev) {
    const value = ev.target.value;
    setSearchedItem(value);
    setSearching(value.trim() !== "");
  }

  function findItem() {
    if (!searchedItem.trim()) return [];
    return items.filter((i) =>
      i.name.toLowerCase().includes(searchedItem.toLowerCase())
    );
  }

  function renderContent() {
    // buscando e não achou nada
    if (searching && findItem().length === 0) {
      return (
        <NoItemsFound
          value={searchedItem}
          onCLick={() => {
            setSearching(false);
            setSearchedItem("");
          }}
        />
      );
    }

    // buscando e achou
    if (searching) {
      return (
        <StockTable
          items={findItem()}
          allItems={items}
          setItems={items}
        />
      );
    }

    //estoque vazio
    if (items.length === 0) {
      return <EmptyStock url={"/dashboard/create"} />;
    }

    // padrão;
    return (
      <StockTable
        items={items}
        allItems={items}
        setItems={items}
      />
    );
  }

  return (
    <>
      <section className={styles.container}>
        {items.length > 0 && (
          <>
            <h2 className={styles.title}>
              {searching ? "Resultados da pesquisa" : "Estoque"}
            </h2>

            <hr className={styles.line} />

            <header className={styles.header}>
              <SearchInput
                value={searchedItem}
                event={handleSearchItem}
                maxWidth={400}
              />
              <AddItem
                url={"/dashboard/create"}
                maxWidth={200}
              />
            </header>

            {searching && (
              <p style={{ marginTop: "1rem" }}>
                Exibindo {findItem().length} resultados para{" "}
                <strong>"{searchedItem}"</strong>
              </p>
            )}
          </>
        )}
      </section>

      {renderContent()}
    </>
  );
}
