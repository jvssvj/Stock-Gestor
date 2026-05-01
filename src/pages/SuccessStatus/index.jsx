import { useLocation } from "react-router-dom";
import SucessStatusCard from "./components/SuccessStatusCard";

export default function SuccessStatus() {
  const location = useLocation();
  const { itemId, itemName, itemQuantity, itemSku, mode } =
    location.state || {};

  return (
    <div className="h-full w-full flex items-center justify-center">
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
