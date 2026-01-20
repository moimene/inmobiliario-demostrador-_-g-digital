import { ChatMovilWrapper } from "./ChatMovil/ChatMovilWrapper";

export const DualMobileViewArras = () => {
  return (
    <div className="min-h-[700px] max-h-screen overflow-y-auto bg-gradient-to-b from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-950 p-8">
      <div className="relative grid grid-cols-2 gap-8 h-full max-w-7xl mx-auto">
        {/* Separador vertical central */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10 bg-slate-200 dark:bg-slate-700 rounded-full px-4 py-2 shadow-lg">
          <div className="flex items-center gap-2 text-xs font-semibold text-slate-600 dark:text-slate-300">
            <span className="text-lg">🔄</span>
            <span>Flujo Sincronizado</span>
          </div>
        </div>

        {/* Móvil Vendedor */}
        <div className="flex flex-col">
          <div className="text-center mb-4 bg-blue-50 dark:bg-blue-950/20 rounded-xl p-3 border border-blue-200 dark:border-blue-800">
            <h3 className="text-2xl font-bold text-blue-600 dark:text-blue-400 flex items-center justify-center gap-3">
              <span className="text-3xl">🏠</span>
              VENDEDOR
            </h3>
            <p className="text-xs text-blue-500 dark:text-blue-500 mt-1">(Rol Simulado)</p>
          </div>
          <div className="flex-1 bg-white dark:bg-slate-800 rounded-3xl shadow-2xl border-4 border-blue-600 dark:border-blue-500 shadow-[0_0_20px_rgba(37,99,235,0.2)] overflow-hidden">
            <ChatMovilWrapper rol="vendedor" />
          </div>
          <div className="text-center mt-3 text-xs text-blue-600 dark:text-blue-400 font-medium flex items-center justify-center gap-2">
            Vista Vendedor (Simulación Certificada)
            <img src="/src/assets/eidas-logo.png" alt="eIDAS" className="h-3 opacity-70" />
          </div>
        </div>

        {/* Móvil Comprador */}
        <div className="flex flex-col">
          <div className="text-center mb-4 bg-emerald-50 dark:bg-emerald-950/20 rounded-xl p-3 border border-emerald-200 dark:border-emerald-800">
            <h3 className="text-2xl font-bold text-emerald-600 dark:text-emerald-400 flex items-center justify-center gap-3">
              <span className="text-3xl">👤</span>
              COMPRADOR
            </h3>
            <p className="text-xs text-emerald-500 dark:text-emerald-500 mt-1">(Rol Simulado)</p>
          </div>
          <div className="flex-1 bg-white dark:bg-slate-800 rounded-3xl shadow-2xl border-4 border-emerald-600 dark:border-emerald-500 shadow-[0_0_20px_rgba(5,150,105,0.2)] overflow-hidden">
            <ChatMovilWrapper rol="comprador" />
          </div>
          <div className="text-center mt-3 text-xs text-emerald-600 dark:text-emerald-400 font-medium flex items-center justify-center gap-2">
            Vista Comprador (Simulación Certificada)
            <img src="/src/assets/eidas-logo.png" alt="eIDAS" className="h-3 opacity-70" />
          </div>
        </div>
      </div>
    </div>
  );
};
