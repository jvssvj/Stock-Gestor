import { Search } from "lucide-react";

export default function SearchInput({ value, event, maxWidth }) {
  return (
    <div
      style={{ maxWidth: `${maxWidth}px` }}
      className="relative flex items-center w-full"
    >
      <label
        className="absolute w-px h-px p-0 -m-px overflow-hidden clip-[rect(0,0,0,0)] whitespace-nowrap border-0"
        htmlFor="search-product"
      >
        Pesquisar produto
      </label>
      <Search className="absolute ml-4 text-text-muted w-[20px] pointer-events-none" />
      <input
        value={value}
        className="h-[50px] w-full pl-12 rounded-lg border border-border text-base focus:border-primary-light focus:outline-none"
        type="text"
        name="search-product"
        id="search-product"
        placeholder="Pesquisar item"
        onChange={event}
      />
    </div>
  );
}
