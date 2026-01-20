import { Button } from "@/components/ui/button";
import { ExternalLink, Globe } from "lucide-react";

export const GDigitalEmbed = () => {
    return (
        <section className="py-24 bg-background border-t">
            <div className="container px-6 mx-auto max-w-6xl">
                <div className="flex flex-col md:flex-row gap-12 items-center">

                    <div className="flex-1 space-y-6">
                        <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary/10 rounded-full text-primary text-sm font-medium">
                            <Globe className="w-4 h-4" />
                            <span>Universo g-digital</span>
                        </div>

                        <h2 className="text-3xl font-bold text-foreground">
                            Explora g-digital
                        </h2>

                        <p className="text-lg text-muted-foreground leading-relaxed">
                            Descubre la plataforma legaltech líder que combina excelencia jurídica y tecnología de vanguardia.
                            Accede a todos nuestros servicios, noticias y recursos exclusivos en el portal oficial.
                        </p>

                        <div className="flex gap-4 pt-4">
                            <Button
                                size="lg"
                                className="gap-2 shadow-lg hover:shadow-xl transition-all"
                                onClick={() => window.open('https://g-digital.garrigues.com/es_ES/nosotros', '_blank')}
                            >
                                Visitar Sitio Oficial
                                <ExternalLink className="w-4 h-4" />
                            </Button>
                        </div>
                    </div>

                    <div className="flex-1 w-full h-[400px] bg-muted rounded-2xl border shadow-2xl overflow-hidden relative group">
                        <iframe
                            src="https://g-digital.garrigues.com/es_ES/nosotros"
                            className="w-full h-full border-0"
                            title="g-digital website"
                            sandbox="allow-scripts allow-same-origin allow-popups"
                        />

                        {/* Overlay for interaction hint since iframes can be tricky with scrolling/etc inside this layout */}
                        <div className="absolute inset-0 bg-black/5 pointer-events-none group-hover:bg-transparent transition-colors" />
                    </div>

                </div>
            </div>
        </section>
    );
};
