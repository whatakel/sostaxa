{/* Header - First Page */}
<div className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 shadow-lg">
  <div className="max-w-md mx-auto px-4 py-6">
    <div className="flex items-center justify-center">
      {/* Logo centralizada */}
      <div className="flex flex-col space-y-1 items-center">
        <div className="inline-flex shadow-lg py-[10px]">
          {/* bloco SOS */}
          <div
            className="flex items-center px-4 skew-x-[-12deg] rounded-l-md bg-gradient-to-br from-emerald-400 to-emerald-200 shadow-[0_0_0_1.5px_#34D399] border-r-0">
            <span className="text-white font-bold text-2xl skew-x-[12deg]">S</span>
            <MessageCircleWarning className="w-6 h-6 text-white skew-x-[12deg]" strokeWidth={2.5} />
            <span className="text-white font-bold text-2xl skew-x-[12deg]">S</span>
          </div>

          {/* bloco TAXAS */}
          <div
            className="flex items-center bg-gray-900 px-4 skew-x-[-12deg] rounded-r-md shadow-[0_0_0_1.5px_#34D399] border-l-0">
            <span className="text-white font-bold text-2xl skew-x-[12deg] leading-6">TAXAS</span>
          </div>
        </div>

        {/* Slogan centralizado */}
        <p className="text-sm text-slate-300 text-center">Colaboração que vira solução.</p>
      </div>
    </div>
  </div>

  {/* Linha separadora (se quiser manter em emerald) */}
  <div className="h-1 bg-gradient-to-r from-emerald-500 via-emerald-400 to-emerald-500"></div>
</div>