import { useState, useCallback } from "react";
import { motion } from "framer-motion";
import { UserCheck, BadgeCheck, FileCheck, ArrowRight } from "lucide-react";
import { DemoLayout } from "@/components/DemoLayout";
import { CertificationHero } from "@/components/certification/CertificationHero";
import { ServiceCard } from "@/components/certification/ServiceCard";
import { ProcessTimeline } from "@/components/certification/ProcessTimeline";
import { DocumentDropzone } from "@/components/certification/DocumentDropzone";
import { CertificationResult } from "@/components/certification/CertificationResult";
import { ElectricButton } from "@/components/deck/ElectricButton";
import { GlowCard } from "@/components/deck/GlowCard";
import selloEidas from "@/assets/sello_eidas.png";
import eadTrustLogo from "@/assets/ead-trust-logo.png";

const services = [
  {
    icon: UserCheck,
    title: "Verificación KYC",
    description:
      "Validación de identidad digital con reconocimiento facial y verificación de documento oficial en tiempo real.",
    badge: "eIDAS",
  },
  {
    icon: BadgeCheck,
    title: "Scoring Financiero",
    description:
      "Certificado de solvencia para operaciones inmobiliarias con análisis de capacidad de pago verificado.",
    badge: "ASNEF",
  },
  {
    icon: FileCheck,
    title: "Documentación Legal",
    description:
      "Nota simple registral, certificado catastral, CEE y cédula de habitabilidad con validez legal.",
    badge: "Registro",
  },
];

// Simulated hash generation
const generateHash = async (file: File): Promise<string> => {
  const buffer = await file.arrayBuffer();
  const hashBuffer = await crypto.subtle.digest("SHA-256", buffer);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
};

const CertificacionDocumentosDemo = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [certificationResult, setCertificationResult] = useState<{
    hash: string;
    timestamp: string;
  } | null>(null);

  const handleFileSelect = useCallback((file: File | null) => {
    setSelectedFile(file);
    setCertificationResult(null);
    setCurrentStep(file ? 2 : 1);
  }, []);

  const handleCertify = useCallback(async () => {
    if (!selectedFile) return;

    setIsProcessing(true);
    setCurrentStep(2);

    // Simulate certification process
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setCurrentStep(3);

    const hash = await generateHash(selectedFile);

    await new Promise((resolve) => setTimeout(resolve, 1000));
    setCurrentStep(4);

    await new Promise((resolve) => setTimeout(resolve, 1000));

    const now = new Date();
    const timestamp = now.toISOString().replace("T", " ").split(".")[0] + " UTC";

    setCertificationResult({ hash, timestamp });
    setIsProcessing(false);
  }, [selectedFile]);

  const resetDemo = useCallback(() => {
    setSelectedFile(null);
    setCertificationResult(null);
    setCurrentStep(1);
    setIsProcessing(false);
  }, []);

  return (
    <DemoLayout variant="dark" showHeader={false}>
      {/* Hero Section */}
      <CertificationHero
        title="Certificación de Documentación"
        subtitle="Verifica identidad, solvencia y documentos del inmueble de forma digital y segura con validez legal eIDAS"
      />

      {/* Services Grid */}
      <section className="mb-16">
        <motion.h2
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-xl font-heading font-semibold text-white mb-6 text-center"
        >
          Servicios de Certificación
        </motion.h2>
        <div className="grid md:grid-cols-3 gap-4">
          {services.map((service, index) => (
            <ServiceCard
              key={service.title}
              icon={service.icon}
              title={service.title}
              description={service.description}
              badge={service.badge}
              delay={index * 0.1}
            />
          ))}
        </div>
      </section>

      {/* Process Timeline */}
      <section className="mb-16">
        <GlowCard className="p-8">
          <h2 className="text-xl font-heading font-semibold text-white mb-2 text-center">
            Proceso de Certificación
          </h2>
          <p className="text-white/60 text-center mb-6">
            Cada documento recibe un sello de tiempo cualificado eIDAS
          </p>
          <ProcessTimeline currentStep={currentStep} />
        </GlowCard>
      </section>

      {/* Interactive Demo */}
      <section className="mb-16">
        <GlowCard className="p-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-xl font-heading font-semibold text-white">
                Demo Interactiva
              </h2>
              <p className="text-white/60 text-sm">
                Sube un documento para ver el proceso de certificación
              </p>
            </div>
            <div className="flex items-center gap-3">
              <img src={selloEidas} alt="eIDAS" className="h-10" />
              <img src={eadTrustLogo} alt="EAD Trust" className="h-8" />
            </div>
          </div>

          {!certificationResult ? (
            <div className="space-y-6">
              <DocumentDropzone
                selectedFile={selectedFile}
                onFileSelect={handleFileSelect}
                isProcessing={isProcessing}
              />

              {selectedFile && !isProcessing && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex justify-center"
                >
                  <ElectricButton onClick={handleCertify} size="lg" className="gap-2">
                    Certificar con eIDAS
                    <ArrowRight className="h-5 w-5" />
                  </ElectricButton>
                </motion.div>
              )}
            </div>
          ) : (
            <div className="space-y-6">
              <CertificationResult
                hash={certificationResult.hash}
                timestamp={certificationResult.timestamp}
                fileName={selectedFile?.name || "documento"}
              />

              <div className="flex justify-center">
                <ElectricButton variant="secondary" onClick={resetDemo}>
                  Certificar otro documento
                </ElectricButton>
              </div>
            </div>
          )}
        </GlowCard>
      </section>

      {/* Legal Info */}
      <section className="text-center">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gdigital-green/10 border border-gdigital-green/20"
        >
          <BadgeCheck className="h-4 w-4 text-gdigital-green" />
          <span className="text-sm text-white/80">
            Conforme al Reglamento eIDAS (UE 910/2014) y Ley 6/2020
          </span>
        </motion.div>
      </section>
    </DemoLayout>
  );
};

export default CertificacionDocumentosDemo;
