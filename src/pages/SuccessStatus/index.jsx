import { useLocation } from "react-router-dom";
import SucessStatusCard from "../../components/SucessStatusCard";
import styles from "./index.module.css";

export default function SuccessStatus() {
  const location = useLocation();
  const { itemId, itemName, itemQuantity, itemSku, mode } =
    location.state || {};

  return (
    <div className={styles.container}>
      <SucessStatusCard
        itemId={itemId}
        itemName={itemName}
        itemSku={itemSku}
        itemQuantity={itemQuantity}
        status={mode}
      />
    </div>
  );
}
