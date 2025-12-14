import { Plus } from "lucide-react";
import styles from "./index.module.css";
import { Link } from "react-router-dom";

export default function AddItem() {
  return (
    <Link
      to={"/register"}
      className={styles.add__item}
    >
      <Plus /> Adicionar produto
    </Link>
  );
}
