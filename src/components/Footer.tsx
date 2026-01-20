import { Link } from "react-router-dom";
import eadTrustLogo from "@/assets/ead-trust-logo.png";
import eidasLogo from "@/assets/eidas-logo.png";
export const Footer = () => {
  return <footer className="bg-primary text-primary-foreground py-12">
      <div className="container px-6 mx-auto max-w-6xl">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          {/* Columna 1: About */}
          <div>
            <h4 className="font-semibold mb-4 text-primary-foreground">Entorno demostrador para Facilitea Casa</h4>
            <p className="text-sm text-primary-foreground/80 leading-relaxed">
              Demostrador Plataforma CLM inmobiliaria integrando servicios eIDas. Transformamos transacciones en operaciones legales certificadas como mecanismo de seguridad jurídica preventiva.               
            </p>
          </div>

          {/* Columna 2: Recursos */}
          <div>
            <h4 className="font-semibold mb-4 text-primary-foreground">Recursos</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/conceptos" className="text-sm text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                  Fundamentos Legales
                </Link>
              </li>
              <li>
                <Link to="/verificacion/demo" className="text-sm text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                  Verificación de Documentos
                </Link>
              </li>
            </ul>
          </div>

          {/* Columna 3: Demostradores */}
          <div>
            <h4 className="font-semibold mb-4 text-primary-foreground">Demostradores</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/demo/estado-inmueble" className="text-sm text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                  Acta de Estado
                </Link>
              </li>
              <li>
                <Link to="/demo/canal-arrendamiento" className="text-sm text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                  Canal Arrendamiento
                </Link>
              </li>
              <li>
                <Link to="/demo/canal-arras" className="text-sm text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                  Canal Arras
                </Link>
              </li>
              <li>
                <Link to="/demo/canal-compraventa" className="text-sm text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                  Canal Compraventa
                </Link>
              </li>
              <li>
                <Link to="/demo/certificacion-documentos" className="text-sm text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                  Gestión Documentación
                </Link>
              </li>
              <li>
                <Link to="/demo/gestion-avanzada" className="text-sm text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                  El Q:CLM
                </Link>
              </li>
            </ul>
          </div>

          {/* Columna 4: Autoría y Certificación */}
          <div>
            <h4 className="font-semibold mb-4 text-primary-foreground">
              Créditos
            </h4>
            
            {/* Mensaje de autoría destacado */}
            <div className="bg-primary-foreground/10 rounded-lg p-3 mb-4">
              <p className="text-sm text-primary-foreground font-semibold mb-1">
                Presentación-Demostración
              </p>
              <p className="text-xs text-primary-foreground/80">
                Preparada por <strong>g-digital</strong> para <strong>Facilitea</strong>
              </p>
            </div>
            
            {/* Logos de certificación */}
            <div className="flex items-center gap-4">
              <img src={eadTrustLogo} alt="EAD Trust" className="h-8 opacity-90" />
              <img src={eidasLogo} alt="eIDAS" className="h-8 opacity-90" />
            </div>
            
            <p className="text-xs text-primary-foreground/70 mt-3">
              Infraestructura eIDAS certificada
            </p>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="border-t border-primary-foreground/20 pt-6">
          
        </div>
      </div>
    </footer>;
};