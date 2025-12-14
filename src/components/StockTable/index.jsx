import { useState } from "react";
import { Eye, Pencil, Trash2 } from "lucide-react";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import styles from "./index.module.css";
import Actions from "./Actions";
import { Link } from "react-router-dom";
import useDeleteItem from "../../hooks/useDeleteItem";
import ConfirmDeletion from "../ConfirmDeletion";

export default function StockTable({ items, setItems }) {
  const { confirmDelete, itemToDelete, setItemToDelete } = useDeleteItem({
    items,
    setItems,
  });

  // Paginação
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const totalPages = Math.ceil(items.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = items.slice(startIndex, endIndex);

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  function renderContent() {
    if (itemToDelete) {
      return (
        <ConfirmDeletion
          productName={itemToDelete.name}
          productSku={itemToDelete.sku}
          cancelAction={() => setItemToDelete(null)}
          confirmAction={confirmDelete}
        />
      );
    }
    return null;
  }

  return (
    <>
      <div className={styles.container}>
        {renderContent()}

        <table className={styles.table}>
          <thead>
            <tr>
              <th>Nome</th>
              <th>Quantidade</th>
              <th>Preço unitário</th>
              <th>Categoria</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {currentItems.map((item) => (
              <tr key={item.id}>
                <td>{item.name}</td>
                <td>{Number(item.quantity)}</td>
                <td>R${Number(item.price).toFixed(2)}</td>
                <td>{item.category}</td>
                <td>
                  <div className={styles.icons__container}>
                    <Link to={`/items/${item.id}`}>
                      <Actions
                        icon={<Eye />}
                        text="Visualizar"
                      />
                    </Link>

                    <Link to={`/update/${item.id}`}>
                      <Actions
                        icon={<Pencil />}
                        text="Editar"
                      />
                    </Link>

                    <Actions
                      icon={<Trash2 />}
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

        {/* Paginação com Material UI */}
        <Stack
          spacing={2}
          alignItems="center"
          className={styles.pagination}
        >
          <Pagination
            count={totalPages}
            page={currentPage}
            onChange={handlePageChange}
            shape="rounded"
            siblingCount={1}
            boundaryCount={2}
            showFirstButton
            showLastButton
          />
        </Stack>
      </div>
    </>
  );
}
