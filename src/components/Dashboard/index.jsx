import styles from "./index.module.css";
import Infos from "./Infos";
import { Shapes, ClipboardCheck, TriangleAlert } from "lucide-react";
import LowStock from "./LowStock";
import RecentItems from "./RecentItems";

export default function DashboardInfos({ items, runningOut, recentItems }) {
  console.log(runningOut);
  return (
    <>
      <div className={styles.dashboard__infos}>
        <Infos
          iconElement={<Shapes />}
          title={"Total de itens diferentes"}
          quantity={items.length}
          iconClass={"component"}
        />
        <Infos
          iconElement={<ClipboardCheck />}
          title={"Total de itens"}
          quantity={items.length.toLocaleString("pt-BR")}
          iconClass={"clipboard--check"}
        />
        <Infos
          iconElement={<TriangleAlert />}
          title={"Itens com baixo estoque"}
          quantity={runningOut.length}
          iconClass={"triangle--alert"}
        />
      </div>

      <div className={styles.dashboard__tables__container}>
        <RecentItems data={recentItems} />
        {runningOut.length >= 1 && <LowStock data={runningOut} />}
      </div>
    </>
  );
}
