import Information from "../../../../../components/Information";
import styles from "./index.module.css";

export default function Informations({ item, price, totalPrice }) {
  return (
    <div className={styles.infomation__container}>
      <Information
        title={"Nome do item"}
        information={item.name}
      />
      <Information
        title={"Código/SKU"}
        information={item.sku}
      />
      <Information
        title={"Categoria"}
        information={item.category}
      />
      <Information
        title={"Em estoque"}
        information={`${item.quantity} unidades`}
      />
      <Information
        title={"Preço unitário"}
        information={`R$ ${price.toLocaleString("pt-BR")}`}
      />
      <Information
        title={"Valor total em estoque"}
        information={`R$ ${totalPrice.toLocaleString("pt-BR")}`}
        emphasis
      />
    </div>
  );
}
