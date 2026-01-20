import { Shield, ExternalLink } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import gocertiusHero from "@/assets/gocertius-hero.png";

export const EcosistemaSection = () => {
  const handleNavigateExternal = (url: string) => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const productosEcosistema = [
    {
      name: "GoCertius",
      sector: "Herramienta Universal",
      icon: Shield,
      url: "https://www.gocertius.io",
      description: "Aplicación móvil en producción para crear pruebas electrónicas y chats certificados. Certifica fotos, videos y archivos con sellos de tiempo cualificados eIDAS, generando evidencias con efectos legales reforzados para cualquier situación. Descargable y lista para usar en casos reales.",
      features: [
        "Pruebas Electrónicas Certificadas",
        "Chats Certificados",
        "Certificación Multimedia",
        "App Descargable y Funcional"
      ],
      color: "primary",
      borderHover: "hover:border-primary",
      bgButton: "bg-primary hover:bg-primary/90",
      bgIcon: "bg-primary/10 group-hover:bg-primary/20",
      textIcon: "text-primary",
      badge: "🔥 En Producción"
    }
  ];

  return (
    <section className="py-16 bg-background">
      <div className="container px-6 mx-auto max-w-6xl">
        {/* Encabezado de la sección */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-primary mb-4">
            Ecosistema g-digital: Más Allá del Sector Inmobiliario
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto mb-2">
            La misma infraestructura de certificación eIDAS que potencia InmoServTech,
            aplicada tanto a sectores específicos como a herramientas universales de certificación para transformar transacciones en operaciones legales certificadas.
          </p>
          <p className="text-sm font-medium text-accent">
            Un ecosistema tecnológico multi-sector con seguridad jurídica preventiva
          </p>
        </div>

        {/* Grid de productos del ecosistema */}
        <div className="flex justify-center">
          <div className="max-w-2xl w-full">
          {productosEcosistema.map((product) => (
            <Card
              key={product.name}
              className={`group hover:shadow-xl transition-all border-2 border-muted ${product.borderHover} shadow-lg overflow-hidden`}
            >
              {/* Imagen de GoCertius */}
              <div className="relative h-48 overflow-hidden">
                <img 
                  src={gocertiusHero} 
                  alt="GoCertius - Pruebas electrónicas certificadas" 
                  className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
              </div>
              <CardHeader className="p-8">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-5">
                    <div className={`w-20 h-20 rounded-xl ${product.bgIcon} flex items-center justify-center transition-all group-hover:scale-110`}>
                      <product.icon className={`h-10 w-10 ${product.textIcon}`} />
                    </div>
                    <div>
                      <div className="flex items-center gap-3 flex-wrap">
                        <CardTitle className="text-3xl">{product.name}</CardTitle>
                        {product.badge && (
                          <div className="inline-flex items-center gap-1 bg-primary/10 px-3 py-1.5 rounded-md">
                            <span className="text-sm font-semibold text-primary">{product.badge}</span>
                          </div>
                        )}
                      </div>
                      <p className="text-base text-muted-foreground mt-2">
                        {product.sector}
                      </p>
                    </div>
                  </div>
                  <ExternalLink className={`h-6 w-6 text-muted-foreground group-hover:${product.textIcon} transition-colors`} />
                </div>
              </CardHeader>
              <CardContent className="px-8 pb-8">
                <CardDescription className="text-lg mb-8 leading-relaxed">
                  {product.description}
                </CardDescription>

                {/* Features destacados */}
                <div className="grid grid-cols-2 gap-4 mb-8">
                  {product.features.map((feature) => (
                    <div key={feature} className="flex items-center gap-3 text-base">
                      <span className="h-2 w-2 bg-trust-green rounded-full" />
                      <span className="text-foreground/80">{feature}</span>
                    </div>
                  ))}
                </div>

                <Button
                  onClick={() => handleNavigateExternal(product.url)}
                  className={`w-full ${product.bgButton} text-white transition-all group-hover:scale-[1.02] py-6 text-lg`}
                >
                  Acceder a {product.name}
                  <ExternalLink className="ml-2 h-5 w-5" />
                </Button>
              </CardContent>
            </Card>
          ))}
          </div>
        </div>

        {/* Mensaje de coherencia tecnológica */}
        <div className="mt-8 text-center">
          <div className="inline-flex items-center gap-2 bg-primary/5 px-6 py-3 rounded-full border border-primary/20">
            <span className="text-sm font-medium text-primary">
              🔗 Misma Infraestructura CLM + eIDAS • Sectores Específicos y Herramientas Universales • Idéntica Seguridad Jurídica
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};
