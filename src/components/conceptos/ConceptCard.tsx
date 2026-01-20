import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { ZoomIn } from "lucide-react";
import * as LucideIcons from "lucide-react";
import { Concepto } from "@/data/conceptosData";
import { useState } from "react";
import impactoLegalImage from "@/assets/impacto-legal-eidas.png";

interface ConceptCardProps {
  concepto: Concepto;
}

const categoriaLabels = {
  "marco-legal": "Marco Legal",
  "tecnologia": "Tecnología de Confianza",
  "clm": "CLM",
  "aplicaciones": "Aplicaciones Prácticas",
};

const categoriaColors = {
  "marco-legal": "bg-primary/10 text-primary border-primary/20",
  "tecnologia": "bg-accent/10 text-accent border-accent/20",
  "clm": "bg-secondary/10 text-secondary-foreground border-secondary/20",
  "aplicaciones": "bg-muted text-foreground border-muted-foreground/20",
};

export const ConceptCard = ({ concepto }: ConceptCardProps) => {
  const [isImageOpen, setIsImageOpen] = useState(false);
  
  const getImageSrc = (imageName: string | undefined) => {
    if (!imageName) return undefined;
    if (imageName === "impacto-legal-eidas") return impactoLegalImage;
    return imageName;
  };

  const IconComponent = concepto.icono
    ? (LucideIcons[concepto.icono as keyof typeof LucideIcons] as React.ComponentType<{ className?: string }>)
    : null;

  return (
    <Card className={`group hover:shadow-lg transition-all h-full flex flex-col ${concepto.destacado ? 'border-2 border-primary/30 hover:border-primary' : 'hover:border-primary/30'}`}>
      <CardHeader className="space-y-4">
        {/* Imagen destacada (si existe) - clickeable para ampliar */}
        {concepto.imagen && (
          <Dialog open={isImageOpen} onOpenChange={setIsImageOpen}>
            <DialogTrigger asChild>
              <div className="aspect-video rounded-lg overflow-hidden border-2 border-muted cursor-pointer relative group/image">
                <img 
                  src={getImageSrc(concepto.imagen)} 
                  alt={concepto.titulo} 
                  className="w-full h-full object-cover group-hover/image:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover/image:opacity-100 transition-opacity flex items-center justify-center">
                  <div className="bg-white/90 rounded-full p-3 shadow-lg">
                    <ZoomIn className="h-6 w-6 text-primary" />
                  </div>
                </div>
                <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded opacity-0 group-hover/image:opacity-100 transition-opacity">
                  Clic para ampliar
                </div>
              </div>
            </DialogTrigger>
            <DialogContent className="max-w-6xl w-[95vw] h-[90vh] p-2">
              <div className="relative w-full h-full flex items-center justify-center bg-background rounded-lg overflow-auto">
                <img 
                  src={getImageSrc(concepto.imagen)} 
                  alt={concepto.titulo}
                  className="max-w-full max-h-full object-contain"
                />
              </div>
            </DialogContent>
          </Dialog>
        )}

        {/* Icono + Título (si no hay imagen) */}
        {!concepto.imagen && (
          <div className="flex items-start gap-4">
            {IconComponent && (
              <div className="w-12 h-12 rounded-lg bg-primary/10 group-hover:bg-primary/20 flex items-center justify-center transition-all group-hover:scale-110 flex-shrink-0">
                <IconComponent className="h-6 w-6 text-primary" />
              </div>
            )}
            <div className="flex-1">
              <Badge className={`mb-2 ${categoriaColors[concepto.categoria]}`}>
                {categoriaLabels[concepto.categoria]}
              </Badge>
              <CardTitle className="text-xl leading-tight">{concepto.titulo}</CardTitle>
              <p className="text-sm text-muted-foreground mt-1">{concepto.subtitulo}</p>
            </div>
          </div>
        )}

        {/* Badge de categoría (para cards con imagen) */}
        {concepto.imagen && (
          <div>
            <Badge className={`mb-2 ${categoriaColors[concepto.categoria]}`}>
              {categoriaLabels[concepto.categoria]}
            </Badge>
            <CardTitle className="text-xl">{concepto.titulo}</CardTitle>
            <p className="text-sm text-muted-foreground mt-1">{concepto.subtitulo}</p>
          </div>
        )}
      </CardHeader>

      <CardContent className="flex-1 flex flex-col">
        <CardDescription className="text-base leading-relaxed mb-4">
          {concepto.descripcionCorta}
        </CardDescription>

        {/* Accordion para contenido expandible */}
        <Accordion type="single" collapsible className="mt-auto">
          <AccordionItem value="details" className="border-none">
            <AccordionTrigger className="text-sm font-medium text-primary hover:text-primary/80 py-2">
              Ver detalles completos
            </AccordionTrigger>
            <AccordionContent>
              <div className="space-y-4 pt-2">
                <p className="text-sm text-foreground/80 leading-relaxed">
                  {concepto.descripcionCompleta}
                </p>

                {/* Enlaces de referencia */}
                {concepto.enlaces && concepto.enlaces.length > 0 && (
                  <div className="space-y-2 pt-3 border-t">
                    <p className="text-xs font-semibold text-muted-foreground uppercase">
                      Referencias
                    </p>
                    {concepto.enlaces.map((enlace, idx) => (
                      <Button
                        key={idx}
                        variant="link"
                        size="sm"
                        className="h-auto p-0 text-xs text-accent hover:text-accent/80"
                        onClick={() => window.open(enlace.url, '_blank', 'noopener,noreferrer')}
                      >
                        {enlace.texto} →
                      </Button>
                    ))}
                  </div>
                )}
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </CardContent>
    </Card>
  );
};
