import { Car, Shield, ExternalLink } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export const EcosistemaSection = () => {
  const handleNavigateExternal = (url: string) => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const productosEcosistema = [
    {
      name: "FaciliteaCoches",
      sector: "Sector Automoción",
      icon: Car,
      url: "https://certificados-entrega.lovable.app",
      description: "Certificación digital de entregas de vehículos con captura multimedia certificada, firmas electrónicas avanzadas y sellos de tiempo cualificado eIDAS. Documentación completa del estado del vehículo con validez legal plena para prevenir disputas post-entrega entre concesionarios, compradores y entidades financieras.",
      features: [
        "Actas de Entrega Certificadas",
        "Evidencia Multimedia",
        "Firmas Electrónicas",
        "Sellos de Tiempo eIDAS"
      ],
      color: "accent",
      borderHover: "hover:border-accent",
      bgButton: "bg-accent hover:bg-accent/90",
      bgIcon: "bg-accent/10 group-hover:bg-accent/20",
      textIcon: "text-accent",
      badge: "🚧 En Desarrollo"
    },
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
            Ecosistema Facilitea: Más Allá del Sector Inmobiliario
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto mb-2">
            La misma infraestructura de certificación eIDAS que potencia Facilitea Casa, 
            aplicada tanto a sectores específicos como a herramientas universales de certificación para transformar transacciones en operaciones legales certificadas.
          </p>
          <p className="text-sm font-medium text-accent">
            Un ecosistema tecnológico multi-sector con seguridad jurídica preventiva
          </p>
        </div>

        {/* Grid de productos del ecosistema */}
        <div className="grid md:grid-cols-2 gap-6">
          {productosEcosistema.map((product) => (
            <Card 
              key={product.name}
              className={`group hover:shadow-lg transition-all border-2 border-muted ${product.borderHover}`}
            >
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-4">
                    <div className={`w-16 h-16 rounded-xl ${product.bgIcon} flex items-center justify-center transition-all group-hover:scale-110`}>
                      <product.icon className={`h-8 w-8 ${product.textIcon}`} />
                    </div>
                    <div>
                      <div className="flex items-center gap-2 flex-wrap">
                        <CardTitle className="text-2xl">{product.name}</CardTitle>
                        {product.badge && (
                          <div className="inline-flex items-center gap-1 bg-primary/10 px-2 py-1 rounded-md">
                            <span className="text-xs font-semibold text-primary">{product.badge}</span>
                          </div>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">
                        {product.sector}
                      </p>
                    </div>
                  </div>
                  <ExternalLink className={`h-5 w-5 text-muted-foreground group-hover:${product.textIcon} transition-colors`} />
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base mb-6">
                  {product.description}
                </CardDescription>

                {/* Features destacados */}
                <div className="grid grid-cols-2 gap-3 mb-6">
                  {product.features.map((feature) => (
                    <div key={feature} className="flex items-center gap-2 text-sm">
                      <span className="h-1.5 w-1.5 bg-trust-green rounded-full" />
                      <span className="text-foreground/80">{feature}</span>
                    </div>
                  ))}
                </div>

                <Button 
                  onClick={() => handleNavigateExternal(product.url)}
                  className={`w-full ${product.bgButton} text-white transition-all group-hover:scale-[1.02]`}
                >
                  Acceder a {product.name}
                  <ExternalLink className="ml-2 h-4 w-4" />
                </Button>
              </CardContent>
            </Card>
          ))}
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
