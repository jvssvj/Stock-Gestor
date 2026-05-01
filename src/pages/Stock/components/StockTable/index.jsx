import { useState } from "react";
import { Eye, Pencil, Trash2 } from "lucide-react";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import Actions from "./Actions";
import { Link } from "react-router-dom";
import useDeleteItem from "@/hooks/useDeleteItem";
import ConfirmDeletion from "@/components/ConfirmDeletion";

const formatCentsToBRL = (valueInCents) => {
  if (!valueInCents && valueInCents !== 0) return "R$ 0,00";
  const decimalValue = valueInCents / 100;

  return decimalValue.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
};

export default function StockTable({ items, allItems, setItems }) {
  const { confirmDelete, itemToDelete, setItemToDelete } = useDeleteItem({
    items: allItems,
    setItems,
  });

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const totalPages = Math.ceil(items.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = items.slice(startIndex, endIndex);

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  return (
    <>
      {/* 1. Container Principal com arredondamento e sombra sutil */}
      <div className="bg-white rounded-xl border border-border min-h-[565px] flex flex-col w-full max-w-container mt-8 overflow-hidden">

        {itemToDelete && (
          <ConfirmDeletion
            productName={itemToDelete.name}
            productSku={itemToDelete.sku}
            cancelAction={() => setItemToDelete(null)}
            confirmAction={confirmDelete}
          />
        )}

        {/* 2. Wrapper para Scroll Horizontal */}
        <div className="overflow-x-auto">
          <table className="w-full min-w-[818px] border-separate border-spacing-0 table-fixed">
            <thead>
              <tr>
                {/* bg-bg trocado para bg-border para combinar com o seu @theme */}
                <th className="text-start p-4 bg-border uppercase text-xs font-medium tracking-widest text-text-muted whitespace-nowrap overflow-hidden text-ellipsis">Nome</th>
                <th className="text-start p-4 bg-border uppercase text-xs font-medium tracking-widest text-text-muted whitespace-nowrap overflow-hidden text-ellipsis">Quantidade</th>
                <th className="text-start p-4 bg-border uppercase text-xs font-medium tracking-widest text-text-muted whitespace-nowrap overflow-hidden text-ellipsis">Preço unitário</th>
                <th className="text-start p-4 bg-border uppercase text-xs font-medium tracking-widest text-text-muted whitespace-nowrap overflow-hidden text-ellipsis">Categoria</th>
                <th className="text-start p-4 bg-border uppercase text-xs font-medium tracking-widest text-text-muted whitespace-nowrap overflow-hidden text-ellipsis">Ações</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-border">
              {currentItems.map((item) => (
                <tr key={item.id} className="group hover:bg-off-white transition-colors">
                  <td className="max-w-[384px] p-4 text-sm text-text-main whitespace-nowrap overflow-hidden text-ellipsis border-t border-border">
                    {item.name}
                  </td>
                  <td className="max-w-[384px] p-4 text-sm text-text-muted whitespace-nowrap overflow-hidden text-ellipsis border-t border-border">
                    {Number(item.quantity)}
                  </td>
                  <td className="max-w-[384px] p-4 text-sm text-text-muted whitespace-nowrap overflow-hidden text-ellipsis border-t border-border">
                    {formatCentsToBRL(item.priceInCents)}
                  </td>
                  <td className="max-w-[384px] p-4 text-sm text-text-muted whitespace-nowrap overflow-hidden text-ellipsis border-t border-border">
                    <span className="bg-bg px-2 py-1 rounded text-xs">
                      {item.category}
                    </span>
                  </td>
                  <td className="max-w-[384px] p-4 border-t border-border">
                    <div className="max-w-[150px] flex items-center justify-between gap-4">
                      <Link to={`/dashboard/items/${item.id}`}>
                        <Actions icon={<Eye size={18} />} text="Visualizar" />
                      </Link>

                      <Link to={`/dashboard/items/${item.id}/update`}>
                        <Actions icon={<Pencil size={18} />} text="Editar" />
                      </Link>

                      <Actions
                        icon={<Trash2 size={18} />}
                        text="Deletar"
                        isTrash
                        onClick={() => setItemToDelete(item)}
                      />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* 3. Paginação empurrada para o rodapé */}
        <div className="mt-auto pt-10 pb-8 flex justify-center border-t border-border bg-white">
          <Stack spacing={2} alignItems="center">
            <Pagination
              count={totalPages}
              page={currentPage}
              onChange={handlePageChange}
              shape="rounded"
              size="small"
              // Customizando o estilo para bater com seu roxo (primary)
              sx={{
                '& .Mui-selected': {
                  backgroundColor: 'var(--color-primary) !important',
                  color: 'white',
                }
              }}
            />
          </Stack>
        </div>
      </div>
    </>
  );
}
