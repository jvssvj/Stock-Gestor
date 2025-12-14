import { Plus } from "lucide-react";
import styles from "./index.module.css";
import { Link } from "react-router-dom";

export default function AddItem({ maxWidth }) {
  return (
    <Link
      to={"/create"}
      className={styles.add__item}
      style={{ maxWidth: `${maxWidth}px` }}
    >
      <Plus /> Adicionar produto
    </Link>
  );
}
