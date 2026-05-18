import { useParams, Link } from "react-router-dom";
import ConfirmDeletion from "../../components/ConfirmDeletion";
import { formatToCurrency } from "../../utils/currencyUtils";
import { Package, Pencil, Trash2, CalendarDays, RefreshCw, Tag, QrCode } from "lucide-react";
import { useEffect, useState } from "react";
import Spinner from "@/components/Spinner";
import { getItemService } from "@/services/appService";

function formatDateISO(dateStr) {
  if (!dateStr) return ""
  const [y, m, d] = dateStr.split("-")
  return `${d}/${m}/${y}`
}

const TABS = ["Visão Geral", "Movimentações", "Fornecedores"]

export default function Item() {
  const [activeTab, setActiveTab] = useState("Visão Geral")
  const { itemId } = useParams()
  const [item, setItem] = useState(null)
  const [loadingItem, setLoadingItem] = useState(true)
  const [errorItem, setErrorItem] = useState(null)

  useEffect(() => {
    async function fetchItem() {
      try {
        setLoadingItem(true)
        const response = await getItemService(itemId)
        setItem(response?.data ?? response)
      } catch (err) {
        setErrorItem("Erro ao carregar os detalhes do item.")
        console.error(err)
      } finally {
        setLoadingItem(false)
      }
    }

    if (itemId) fetchItem()
  }, [itemId])

  if (loadingItem) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <Spinner />
      </div>
    )
  }
  if (errorItem) return <p>{errorItem}</p>
  if (!item) return <p className="p-8 text-text-muted">Item não encontrado.</p>

  const price = (item.priceInCents / 100).toFixed(2)
  const totalPrice = (parseFloat(price) * item.quantity).toFixed(2)
  const [totalInt, totalDec] = formatToCurrency(totalPrice).toString().split(",")

  console.log(item.imageUrl)

  return (
    <>
      {/* {itemToDelete && (
        <ConfirmDeletion
          productName={itemToDelete.name}
          productSku={itemToDelete.sku}
          cancelAction={() => setItemToDelete(null)}
          confirmAction={confirmDelete}
        />
      )} */}

      <div className="w-full max-w-container">

        {/* ── Breadcrumb + Header ── */}
        <div className="mb-6">
          <nav className="flex items-center gap-1.5 text-sm text-text-muted mb-3">
            <Link to="/app/items" className="hover:text-text-main transition-colors no-underline text-text-muted">Itens</Link>
            <span>›</span>
            {item.category && <><span className="hover:text-text-main transition-colors cursor-default">{item.category}</span><span>›</span></>}
            <span className="text-text-main font-medium">Detalhes</span>
          </nav>

          <div className="flex items-center justify-between gap-4 flex-wrap">
            <div className="flex items-center gap-3 flex-wrap">
              <h1 className="text-4xl font-bold text-text-main">{item.name}</h1>
              {item.sku && (
                <span className="text-sm font-medium text-text-muted border border-border px-3 py-1 rounded-full bg-white">
                  {item.sku}
                </span>
              )}
            </div>

            <div className="flex items-center gap-3">
              <Link
                to={`/app/items/${item.id}/update`}
                className="no-underline flex items-center gap-2 px-4 py-2.5 rounded-lg border border-border bg-white text-text-main text-sm font-medium hover:bg-bg transition-colors"
              >
                <Pencil size={15} />
                Atualizar Item
              </Link>
              <button
                // onClick={() => setItemToDelete(item)}
                className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-danger text-white text-sm font-medium hover:opacity-90 transition-opacity cursor-pointer"
              >
                <Trash2 size={15} />
                Excluir Item
              </button>
            </div>
          </div>
        </div>

        {/* ── Layout ── */}
        <div className="flex flex-col items-start gap-6 md:flex-row">

          {/* ── Coluna esquerda ── */}
          <div className="flex flex-col gap-4 w-full md:max-w-[340px]">

            {/* Imagem */}
            <div className="w-full relative bg-white rounded-2xl border border-border overflow-hidden">
              {item.imageUrl ? (
                <img
                  className="w-full object-cover object-center"
                  src={item.imageUrl}
                  alt={item.name}
                />
              ) : (
                <div className="w-full aspect-square flex flex-col items-center justify-center gap-3 bg-off-white">
                  <Package size={52} className="text-primary opacity-30" />
                  <span className="text-sm text-text-muted">{item.name}</span>
                </div>
              )}
              <span className="absolute top-3 left-3 flex items-center gap-1.5 bg-success text-white text-xs font-semibold px-3 py-1.5 rounded-full">
                <span className="w-1.5 h-1.5 rounded-full bg-white inline-block"></span>
                Em Estoque
              </span>
            </div>

            {/* Histórico */}
            <div className="bg-white rounded-2xl border border-border p-5 w-full">
              <div className="flex items-center gap-2 mb-5">
                <RefreshCw size={16} className="text-text-muted" />
                <h3 className="text-sm font-bold text-text-main uppercase tracking-wide">Histórico</h3>
              </div>

              <div className="flex flex-col gap-4">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-primary-subtle flex items-center justify-center shrink-0">
                    <CalendarDays size={15} className="text-primary" />
                  </div>
                  <div>
                    <p className="text-xs text-text-muted mb-0.5">Data de Adição</p>
                    <p className="text-sm font-semibold text-text-main">{formatDateISO(item.createdAt)}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-warning-subtle flex items-center justify-center shrink-0">
                    <RefreshCw size={15} className="text-warning" />
                  </div>
                  <div>
                    <p className="text-xs text-text-muted mb-0.5">Última Modificação</p>
                    <p className="text-sm font-semibold text-text-main">{formatDateISO(item.updatedDate)}</p>
                  </div>
                </div>
              </div>
            </div>

          </div>

          {/* ── Coluna direita ── */}
          <div className="w-full flex flex-col gap-4 min-w-0">

            {/* Métricas */}
            <div className="flex flex-col items-center justify-between gap-4 xl:flex-row">
              <div className="bg-white rounded-2xl border border-border p-5 flex-1 w-full">
                <p className="text-xs text-text-muted mb-3">Preço Unitário</p>
                <p className="text-2xl font-bold text-text-main">{formatToCurrency(price)}</p>
              </div>

              <div className="bg-white rounded-2xl border border-border p-5 flex-1 w-full">
                <div className="flex items-center justify-between mb-3">
                  <p className="text-xs text-text-muted">Quantidade</p>
                </div>
                <p className="text-2xl font-bold text-text-main">{item.quantity}</p>
              </div>

              <div className="bg-white rounded-2xl border border-border p-5 flex-1 w-full">
                <p className="text-xs text-text-muted mb-3">Valor Total em Estoque</p>
                <p className="text-2xl font-bold text-success leading-tight">
                  {totalInt}<span className="text-base font-normal">,{totalDec ?? "00"}</span>
                </p>
              </div>
            </div>

            {/* Tabs + Conteúdo */}
            <div className="bg-white rounded-2xl border border-border overflow-hidden">

              {/* Tab bar */}
              <div className="flex border-b border-border px-6 overflow-scroll gap-5">
                {TABS.map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`whitespace-nowrap py-4 px-2 text-sm font-medium border-b-2 transition-colors cursor-pointer bg-transparent ${activeTab === tab
                      ? "border-primary text-primary"
                      : "border-transparent text-text-muted hover:text-text-main"
                      }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>

              {/* Tab content */}
              <div className="p-6">
                {activeTab === "Visão Geral" && (
                  <div className="flex flex-col gap-8">

                    {/* Categoria + SKU */}
                    <div className="flex items-center justify-between gap-5">
                      <div className="flex-1">
                        <p className="text-xs font-semibold text-text-muted uppercase tracking-widest mb-4">Categoria</p>
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-lg bg-primary-subtle flex items-center justify-center">
                            <Tag size={16} className="text-primary" />
                          </div>
                          <span className="text-base font-semibold text-text-main">{item.category || "..."}</span>
                        </div>
                      </div>

                      <div className="flex-1">
                        <p className="text-xs font-semibold text-text-muted uppercase tracking-widest mb-4">Código / SKU</p>
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-lg bg-bg flex items-center justify-center">
                            <QrCode size={16} className="text-text-muted" />
                          </div>
                          <span className="text-base font-semibold text-text-main font-mono">{item.sku || "—"}</span>
                        </div>
                      </div>
                    </div>

                    {/* Descrição */}
                    {item.description && (
                      <div>
                        <p className="text-xs font-semibold text-text-muted uppercase tracking-widest mb-4">Descrição do Item</p>
                        <div className="bg-off-white rounded-xl p-5 border border-border">
                          <p className="text-sm text-text-main leading-relaxed whitespace-pre-line">{item.description}</p>
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {activeTab === "Movimentações" && (
                  <p className="text-sm text-text-muted">Nenhuma movimentação registrada.</p>
                )}

                {activeTab === "Fornecedores" && (
                  <p className="text-sm text-text-muted">Nenhum fornecedor vinculado.</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}