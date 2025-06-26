"use client"

import { useEffect } from "react"
import { Button } from "@/components/ui/button"
import {
    Briefcase,
    Users,
    MessageCircleWarning,
    Star,
    Search,
    Building2,
    Sparkles,
    Clock,
} from "lucide-react"



export default function landing() {

    return (
        <main className="relative h-[100dvh] w-[100vw] overflow-hidden text-white">
            {/* Camada branca translúcida SEM apagar o fundo */}
            <div className="absolute inset-0 z-10 bg-black/10 pointer-events-none" />

            {/* Conteúdo central */}
            <div className="relative z-10 h-full w-full flex items-center justify-center px-4">
                <div className="relative z-10 h-full w-full flex items-center justify-center px-4 py-12">
                    {/* Container principal */}
                    <div className="backdrop-blur-xl bg-white/90 border border-white/40 shadow-xl rounded-2xl p-8 max-w-md w-full text-center space-y-8 text-gray-900">
                        <div className="inline-flex self-start shadow-lg">
                            {/* Bloco SOS com gradiente e sombra simulando borda */}
                            <div
                                className="flex items-center px-4 skew-x-[-12deg] rounded-l-md bg-gradient-to-br from-emerald-400 to-emerald-200 shadow-[0_0_0_1.5px_#34D399] border-r-0">
                                <span className="text-white font-bold text-2xl skew-x-[12deg]">S</span>
                                <MessageCircleWarning className="w-6 h-6 text-white skew-x-[12deg]" strokeWidth={2.5} />
                                <span className="text-white font-bold text-2xl skew-x-[12deg]">S</span>
                            </div>

                            {/* Bloco taxas com fundo sólido e mesma sombra lateral */}
                            <div
                                className="flex items-center bg-gray-900 px-4 skew-x-[-12deg] rounded-r-md shadow-[0_0_0_1.5px_#34D399] border-l-0">
                                <span className="text-white font-bold text-2xl skew-x-[12deg] leading-6">TAXAS</span>
                            </div>
                        </div>
                        {/* Chamada principal */}
                        <p className="text-sm text-slate-700">
                            Conectamos empresas e profissionais qualificados para trabalhos por período ou turnos específicos
                        </p>

                        <h1 className="text-3xl font-extrabold">
                            Conectando <span className="text-emerald-500">empresas</span> &{" "}
                            <span className="text-emerald-500">profissionais</span>
                        </h1>

                        {/* Botões principais */}
                        <div className="space-y-4 my-6">
                            <p className="text-sm font-medium text-gray-700">Como você quer acessar a plataforma?</p>
                            <div className="grid grid-cols-2 gap-4">
                                <Button
                                    onClick={() => handleAccessPlatform("company")}
                                    className="h-16 bg-gradient-to-br from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 text-white shadow-lg hover:shadow-xl transition-all duration-300 flex flex-col items-center justify-center space-y-1 group"
                                >
                                    <div className="flex items-center space-x-2">
                                        <Search className="w-5 h-5 group-hover:scale-110 transition-transform" />
                                        <span className="font-semibold">Encontrar</span>
                                    </div>
                                    <span className="text-xs opacity-90">Profissionais</span>
                                </Button>

                                <Button
                                    onClick={() => handleAccessPlatform("professional")}
                                    variant="outline"
                                    className="h-16 border-2 border-emerald-200 text-emerald-700 hover:bg-emerald-50 hover:border-emerald-300 shadow-lg hover:shadow-xl transition-all duration-300 flex flex-col items-center justify-center space-y-1 group"
                                >
                                    <div className="flex items-center space-x-2">
                                        <Building2 className="w-5 h-5 group-hover:scale-110 transition-transform" />
                                        <span className="font-semibold">Encontrar</span>
                                    </div>
                                    <span className="text-xs opacity-75">Empresas</span>
                                </Button>
                            </div>
                        </div>

                        {/* Hero Section */}
                        <div className="space-y-4">
                            <div className="inline-flex items-center bg-emerald-100 text-emerald-800 px-4 py-2 rounded-full text-sm font-medium border border-emerald-200">
                                <Sparkles className="w-4 h-4 mr-2" />
                                Conecte-se agora mesmo
                            </div>

                            <h2 className="text-2xl font-bold text-gray-900 leading-tight">
                                Encontre o <span className="block text-emerald-600">profissional ideal</span>
                                para seu negócio
                            </h2>

                            <p className="text-sm text-gray-600 leading-relaxed max-w-sm mx-auto">
                                Conectamos empresas e profissionais qualificados para trabalhos por período ou turnos específicos
                            </p>
                        </div>

                        {/* Features */}
                        <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-emerald-100 shadow-lg mt-4">
                            <div className="grid grid-cols-3 gap-4 text-center">
                                <div className="space-y-2">
                                    <div className="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center mx-auto">
                                        <Clock className="w-5 h-5 text-emerald-600" />
                                    </div>
                                    <div className="text-xs font-medium text-gray-700">Trabalho por período</div>
                                </div>

                                <div className="space-y-2">
                                    <div className="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center mx-auto">
                                        <Star className="w-5 h-5 text-emerald-600" />
                                    </div>
                                    <div className="text-xs font-medium text-gray-700">Sistema de avaliação</div>
                                </div>

                                <div className="space-y-2">
                                    <div className="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center mx-auto">
                                        <Users className="w-10 h-10 text-emerald-600" />
                                    </div>
                                    <div className="text-xs font-medium text-gray-700">Conexão direta</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </main>
    )
}
