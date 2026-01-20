import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const AvisoLegal = () => {
  return (
    <div className="min-h-screen bg-background">
      <div className="container px-6 mx-auto max-w-4xl py-12">
        {/* Back link */}
        <Link 
          to="/" 
          className="inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          Volver al inicio
        </Link>

        <article className="prose prose-slate dark:prose-invert max-w-none">
          <h1 className="text-3xl font-light text-foreground mb-8">
            Aviso Legal y Política de Privacidad
          </h1>

          <section className="mb-8">
            <h2 className="text-xl font-medium text-foreground mb-4">Información general</h2>
            <p className="text-muted-foreground leading-relaxed">
              El presente sitio web es un demostrador de conceptos puesto a disposición de los usuarios de Internet por g-digital, división de negocio digital de J&A Garrigues, S.L.P. (en adelante, "Garrigues").
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Garrigues tiene su domicilio social en Plaza de Colón, 2, 28046 Madrid, España, y está identificada con C.I.F. número B-81709081. La sociedad se encuentra inscrita en el Registro Mercantil de Madrid, Tomo 17.456, Folio 186, Hoja M-190538, Inscripción 142.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-medium text-foreground mb-4">Datos de contacto</h2>
            <ul className="text-muted-foreground space-y-2 list-none pl-0">
              <li><strong>Teléfono:</strong> 91 514 52 00</li>
              <li><strong>Fax:</strong> 91 399 24 08</li>
              <li><strong>Correo electrónico:</strong> <a href="mailto:comunicaciones@garrigues.com" className="text-primary hover:underline">comunicaciones@garrigues.com</a></li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-medium text-foreground mb-4">Finalidad del sitio</h2>
            <p className="text-muted-foreground leading-relaxed">
              Este sitio web tiene una finalidad exclusivamente informativa y demostrativa. Su objetivo es presentar conceptos e ideas de forma visual e interactiva, sin constituir en ningún caso asesoramiento legal, fiscal o de cualquier otra naturaleza profesional.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-medium text-foreground mb-4">Tratamiento de datos personales</h2>
            <p className="text-muted-foreground leading-relaxed">
              Este sitio no recoge, almacena ni trata datos personales de los usuarios de forma activa. No se solicita registro, no se utilizan formularios de contacto y no se emplean cookies propias con fines analíticos o publicitarios.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              No obstante, el usuario debe tener en cuenta que el sitio se encuentra alojado en la plataforma Lovable, la cual, como cualquier servicio de hosting, puede procesar cierta información técnica de carácter automático (como direcciones IP o datos de navegación) conforme a sus propias políticas. Para más información sobre el tratamiento de datos por parte de la plataforma de alojamiento, se recomienda consultar la política de privacidad de Lovable.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-medium text-foreground mb-4">Propiedad intelectual e industrial</h2>
            <p className="text-muted-foreground leading-relaxed">
              Todos los contenidos de este sitio web, incluyendo textos, imágenes, gráficos, diseños y código, son propiedad de Garrigues o se utilizan con la debida autorización, y están protegidos por las leyes de propiedad intelectual e industrial aplicables. Queda prohibida su reproducción, distribución o transformación sin autorización expresa.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-medium text-foreground mb-4">Exclusión de responsabilidad</h2>
            <p className="text-muted-foreground leading-relaxed">
              Garrigues no garantiza la disponibilidad continua del sitio ni se responsabiliza de los posibles daños derivados de su uso. Al tratarse de un demostrador de conceptos, los contenidos pueden variar o ser eliminados en cualquier momento sin previo aviso.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-medium text-foreground mb-4">Legislación aplicable</h2>
            <p className="text-muted-foreground leading-relaxed">
              El presente aviso legal se rige por la legislación española. Para cualquier controversia que pudiera derivarse del acceso o uso de este sitio web, las partes se someten a la jurisdicción de los Juzgados y Tribunales de Madrid, con renuncia expresa a cualquier otro fuero que pudiera corresponderles.
            </p>
          </section>
        </article>
      </div>
    </div>
  );
};

export default AvisoLegal;
