import { ChatMovilWrapper } from "./ChatMovil/ChatMovilWrapper";

export const DualMobileView = () => {
  return (
    <div className="min-h-[700px] max-h-screen overflow-y-auto bg-slate-950 p-6">
      <h2 className="text-2xl font-bold text-white mb-6 text-center">
        Vista Dual - Canal de Compraventa Certificado
      </h2>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 max-w-7xl mx-auto">
        {/* Vendedor */}
        <div className="relative">
          <div className="absolute -top-8 left-1/2 -translate-x-1/2 z-10">
            <div className="bg-blue-600 text-white px-4 py-1 rounded-full text-sm font-semibold shadow-lg flex items-center gap-2">
              🏠 Vendedor (Rol Simulado)
            </div>
          </div>
          <div className="border-4 border-blue-600 rounded-3xl overflow-hidden shadow-2xl shadow-blue-900/50 bg-white h-[600px]">
            <ChatMovilWrapper rol="vendedor" />
          </div>
        </div>

        {/* Comprador */}
        <div className="relative">
          <div className="absolute -top-8 left-1/2 -translate-x-1/2 z-10">
            <div className="bg-emerald-600 text-white px-4 py-1 rounded-full text-sm font-semibold shadow-lg flex items-center gap-2">
              🔑 Comprador (Rol Simulado)
            </div>
          </div>
          <div className="border-4 border-emerald-600 rounded-3xl overflow-hidden shadow-2xl shadow-emerald-900/50 bg-white h-[600px]">
            <ChatMovilWrapper rol="comprador" />
          </div>
        </div>
      </div>
    </div>
  );
};
