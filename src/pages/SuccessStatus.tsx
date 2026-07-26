import { useLocation } from "react-router-dom";
import SuccessStatusCard from "../components/SuccessStatusCard";

export default function SuccessStatus() {
  const location = useLocation();
  const { status, resource, data } = location.state || {}
  return (
    <div className="h-full w-full flex items-center justify-center">
      <SuccessStatusCard
        status={status}
        resource={resource}
        data={data}
      />
    </div>
  );
}
