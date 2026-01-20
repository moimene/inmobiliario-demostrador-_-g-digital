export const DemoBanner = () => {
  return (
    <div className="sticky top-0 z-50 bg-gradient-to-r from-primary/95 to-accent/95 backdrop-blur-sm border-b border-primary-foreground/10">
      <div className="container mx-auto px-6 py-3">
        <p className="text-center text-sm md:text-base text-primary-foreground font-medium">
          📋 <strong>Presentación-Demostración</strong> preparada por{" "}
          <span className="font-bold">g-digital</span> para{" "}
          <span className="font-bold">Facilitea</span>
          {" "}· Entorno de simulación con datos ficticios
        </p>
      </div>
    </div>
  );
};
