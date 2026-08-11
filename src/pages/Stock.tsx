import { useState, ChangeEvent } from "react";
import StockTable from "../components/StockTable";
import useGetItems from "@/hooks/useGetItems";
import { Link } from "react-router-dom";
import { Delete, Plus, Search } from "lucide-react";
import Spinner from "@/components/Spinner";
import EmptyStock from "@/components/EmptyStock";

export default function Stock() {
  // 1. Extraímos o setCurrentPage do hook para controlar a paginação
  const { items, loading, loadingPage, error, setCurrentPage } = useGetItems()

  const [searchedItem, setSearchedItem] = useState("")
  const [searching, setSearching] = useState(false)

  if (loading) {
    return (
      <div className="h-full flex items-center justify-center">
        <Spinner />
      </div>
    )
  }

  if (error) return <p>Erro ao carregar itens.</p>

  function handleSearchItem(ev: ChangeEvent<HTMLInputElement>) {
    const value = ev.target.value
    setSearchedItem(value)
    setSearching(value.trim() !== "")
  }

  function findItem() {
    const data = items?.data || []
    if (!searchedItem.trim()) return []
    return data.filter((i) =>
      i.name.toLowerCase().includes(searchedItem.toLowerCase())
    )
  }

  function renderContent() {
    const data = items?.data || []

    if (searching && findItem().length === 0) {
      return (
        <>
          <div className="bg-white py-10 px-4 rounded-2xl w-full max-w-[1920px] mt-8 grid place-items-center text-center border-2 border-dotted border-light-gray">
            <section>
              <h2 className="text-text-main font-bold text-2xl mb-5">Nenhum item encontrado</h2>
              <p className="text-text-muted max-w-[500px]">
                Nenhum resultado para {" "}<strong>"{searchedItem}"</strong>.
              </p>
              <p>Tente ajustar sua busca ou adicionar um novo produto.</p>
            </section>
            <button
              onClick={() => {
                setSearching(false)
                setSearchedItem("")
              }}
              className="bg-primary mt-5 text-white flex items-center justify-center gap-4 py-3 px-6 rounded-lg cursor-pointer transition-all duration-200 ease-in-out hover:bg-primary-light"
            >
              {<Delete color="#ffff" />} Limpar pesquisa
            </button>
          </div>

        </>
      )
    }

    if (searching) {
      return <StockTable items={{ data: findItem(), meta: { totalPages: 1 } }} allItems={data} />
    }

    return (
      <StockTable
        items={items} // Enviamos o objeto completo {data, meta}
        allItems={data}
        loadingPage={loadingPage}
        onPageChange={(page) => setCurrentPage(page)} // Função para o hook buscar nova página
      />
    )
  }

  if ((items?.meta?.totalItems ?? 0) <= 0) {
    return <EmptyStock url={"/app/create"} />
  }


  return (
    <>
      {(items?.meta?.totalItems ?? 0) <= 0 && (
        <EmptyStock url={"/app/create"} />
      )}

      <section className="w-full max-w-container">
        <header >
          <h2 className="text-text-main font-bold text-2xl">Estoque</h2>
          <p className="text-muted">Gerencie a disponibilidade e informações dos produtos.</p>
        </header>

        <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:justify-between">
          <div
            className="relative flex items-center w-full sm:max-w-[500px]"
          >
            <label
              className="absolute w-px h-px p-0 -m-px overflow-hidden clip-[rect(0,0,0,0)] whitespace-nowrap border-0"
              htmlFor="search-product"
            >
              Pesquisar produto
            </label>
            <Search className="absolute ml-4 text-text-muted w-[20px] pointer-events-none text-border" />
            <input
              value={searchedItem}
              className="w-full py-2 pl-12 rounded-lg border border-light-gray text-base focus:border-primary-light focus:outline-none bg-white"
              type="text"
              name="search-product"
              id="search-product"
              placeholder="Pesquisar item"
              onChange={handleSearchItem}
            />
          </div>

          <Link
            to={"/app/create"}
            className="flex items-center justify-center bg-primary text-white rounded-lg gap-2 px-4 py-2 cursor-pointer transition-all duration-200 ease-in-out no-underline text-xs w-full whitespace-nowrap hover:bg-primary-light active:scale-[0.92] sm:max-w-[150px]"
          >
            <Plus />  Adicionar item
          </Link>
        </div>
      </section >

      {renderContent()}
    </>
  )
}
