import { useState } from "react";
import StockTable from "./components/StockTable";
import EmptyStock from "../../components/EmptyStock";
import useGetItems from "../../hooks/useGetItems";
import SearchInput from "./components/Search";
import NoItemsFound from "./components/NoItemsFound";
import { Link } from "react-router-dom";
import { Plus } from "lucide-react";

export default function Stock() {
  const { items, loading, error } = useGetItems();

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

    if (searching) {
      return <StockTable items={findItem()} allItems={items} setItems={items} />;
    }

    if (items.length === 0) {
      return <EmptyStock url={"/dashboard/create"} />;
    }

    return <StockTable items={items} allItems={items} setItems={items} />;
  }

  return (
    <>
      <section className="w-full max-w-container">
        {items.length > 0 && (
          <>
            <header className="flex items-end justify-between">
              <h2 className="text-text-dark font-bold text-3xl">
                {searching ? "Resultados da pesquisa" : "Estoque"}
              </h2>

              <Link
                to={"/dashboard/create"}
                className="flex items-center justify-center bg-primary text-white rounded-lg gap-2 py-[0.81rem] px-8 cursor-pointer transition-all duration-200 ease-in-out no-underline text-xs w-full whitespace-nowrap hover:bg-primary-light active:scale-[0.92] sm:max-w-[200px]"
              >
                <Plus />  Adicionar item
              </Link>
            </header>

            <hr className="my-10 border-t border-border" />


            <SearchInput value={searchedItem} event={handleSearchItem} maxWidth={400} />

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
