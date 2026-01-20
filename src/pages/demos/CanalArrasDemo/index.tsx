import { ArrasProvider } from "@/contexts/ArrasContext";
import { CanalArrasDemoPage } from "./CanalArrasDemoPage";

const CanalArrasDemo = () => {
  return (
    <ArrasProvider>
      <CanalArrasDemoPage />
    </ArrasProvider>
  );
};

export default CanalArrasDemo;
