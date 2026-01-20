import { ArrendamientoProvider } from "@/contexts/ArrendamientoContext";
import { CanalArrendamientoDemoPage } from "./CanalArrendamientoDemoPage";

const CanalArrendamientoDemo = () => {
  return (
    <ArrendamientoProvider>
      <CanalArrendamientoDemoPage />
    </ArrendamientoProvider>
  );
};

export default CanalArrendamientoDemo;
