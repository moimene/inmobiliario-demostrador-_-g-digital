import { conceptos } from "@/data/conceptosData";
import { ConceptCard } from "./ConceptCard";

export const ConceptGrid = () => {
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      {conceptos.map((concepto) => (
        <ConceptCard key={concepto.id} concepto={concepto} />
      ))}
    </div>
  );
};
