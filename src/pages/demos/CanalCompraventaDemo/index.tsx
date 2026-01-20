import { CompraventaProvider } from "@/contexts/CompraventaContext";
import { CanalCompraventaDemoPage } from "./CanalCompraventaDemoPage";

const CanalCompraventaDemo = () => {
  return (
    <CompraventaProvider>
      <CanalCompraventaDemoPage />
    </CompraventaProvider>
  );
};

export default CanalCompraventaDemo;
