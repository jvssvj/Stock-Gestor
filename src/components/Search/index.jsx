import styles from "./index.module.css";
import { Search } from "lucide-react";

export default function SearchInput({ value, event }) {
  return (
    <div className={styles.container}>
      <label
        className={styles.visually__hidden}
        htmlFor="search-product"
      >
        Pesquisar produto
      </label>
      <Search className={styles.search__icon} />
      <input
        value={value}
        className={styles.input}
        type="text"
        name="search-product"
        id="search-product"
        placeholder="Pesquisar item"
        onChange={event}
      />
    </div>
  );
}
