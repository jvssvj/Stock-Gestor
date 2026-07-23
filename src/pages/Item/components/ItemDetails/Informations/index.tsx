import Information from "../../../../../components/Information";
import type { Item } from "@/types";

interface InformationsProps {
  item: Item
  price: string | number
  totalPrice: string | number
}

export default function Informations({ item, price, totalPrice }: InformationsProps) {
  return (
    <div className="grid grid-cols-2 grid-rows-3 gap-4 max-[830px]:flex max-[830px]:flex-col max-[830px]:gap-4">
      <Information title={"Nome do item"} information={item.name} />
      <Information title={"Código/SKU"} information={item.sku} />
      <Information
        title={"Categoria"}
        information={
          typeof item.category === "object"
            ? // if category is an object, try to show its name, otherwise fallback
            (item.category?.name as unknown as string) ?? "—"
            : (item.category as unknown as string) ?? "—"
        }
      />
      <Information title={"Em estoque"} information={`${item.quantity} unidades`} />
      <Information title={"Preço unitário"} information={price} />
      <Information title={"Valor total em estoque"} information={totalPrice} emphasis />
    </div>
  );
}
