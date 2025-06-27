"use client"

import Link from "next/link"
import Marquee from "react-fast-marquee";
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
    User,
    Landmark,
} from "lucide-react"
const chamadas = [
    { texto: "Para emergências", bg: "bg-red-100 text-red-800" },
    { texto: "Oportunidades em tempo real", bg: "bg-yellow-100 text-yellow-800" },
    { texto: "Profissionais disponíveis por turno", bg: "bg-blue-100 text-blue-800" },
];
export default function landing() {

    return (
        <main className="relative flex flex-col h-[100dvh] w-[100vw] overflow-hidden text-white">
            {/* Bloco SOS com gradiente e sombra simulando borda */}
            <div className="flex justify-center w-full py-5 shadow-lg bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900">
                <div
                    className="flex items-center px-4 skew-x-[-12deg] rounded-l-md bg-gradient-to-br from-emerald-400 to-emerald-200 shadow-[0_0_0_1.5px_#34D399] border-r-0">
                    <span className="text-white font-bold text-[2rem] skew-x-[12deg]">S</span>
                    <MessageCircleWarning className="w-8 h-8 text-white skew-x-[12deg]" strokeWidth={2.5} />
                    <span className="text-white font-bold text-[2rem] skew-x-[12deg]">S</span>
                </div>

                {/* Bloco taxas com fundo sólido e mesma sombra lateral */}
                <div
                    className="flex items-center bg-gray-900 px-4 skew-x-[-12deg] rounded-r-md shadow-[0_0_0_1.5px_#34D399] border-l-0">
                    <span className="text-white font-bold text-2xl skew-x-[12deg] leading-6">TAXAS</span>
                </div>
            </div>
            <div className="absolute inset-0 z-10 pointer-events-none bg-black/10" />
            <div className="w-full h-1 bg-gradient-to-r from-emerald-500 via-emerald-400 to-emerald-500"></div>

            {/* Conteúdo central */}
            <div className="relative z-10 flex items-center justify-center w-full h-full px-4">
                <div className="relative z-10 flex items-center justify-center w-full px-4 ">
                    {/* Container principal */}
                    <div className="w-full max-w-md p-8 space-y-8 text-center text-gray-900 border shadow-xl backdrop-blur-xl bg-white/90 border-white/40 rounded-2xl">

                        {/* Chamada principal */}
                        <h1 className="flex flex-col mb-0 text-3xl font-extrabold leading-snug text-center text-gray-500 uppercase">
                            Conectando oportunidades
                        </h1>
                        <p className="font-bold uppercase text-md text-emerald-500">
                            no momento em que você mais precisa.
                        </p>
                        <div className="-mx-8 overflow-hidden border border-emerald-200 bg-emerald-100 ">

                            <Marquee speed={40} gradient={false} pauseOnHover className="py-2">
                                {chamadas.map((item, i) => (
                                    <div
                                        key={i}
                                        className={`inline-flex items-center px-4 py-1 mx-2 text-sm font-medium border rounded-full border-white shadow-sm animate-pulse ${item.bg}`}
                                    >
                                        <div className="w-2.5 h-2.5 mr-2 rounded-full bg-current shadow" />
                                        {item.texto}
                                    </div>
                                ))}
                            </Marquee>
                        </div>
                        <div className="grid max-w-4xl grid-cols-1 gap-4 mx-auto mt-6 md:grid-cols-2">
                            {/* Profissionais */}
                            <Link href="/profissionais" className="group cursor-pointer transition-transform hover:scale-[1.015]">
                                <div className="relative flex flex-col items-center justify-center w-full h-full p-4 space-y-3 overflow-hidden text-white transition-all duration-300 ease-in-out shadow-md rounded-xl bg-gradient-to-br from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 hover:shadow-xl hover:ring-2 hover:ring-white/30 hover:ring-offset-1">
                                    <div className="absolute left-[-50px] top-0 h-full opacity-20 pointer-events-none flex items-center">
                                        <User className="w-auto h-full text-white" />
                                    </div>
                                    <p className="text-sm font-medium leading-tight text-center text-white/80">
                                        Oportunidades<br />que combinam com você
                                    </p>
                                    <div className="relative z-10 flex flex-col items-center justify-center leading-tight text-center">
                                        <span className="text-2xl font-extrabold text-white/90">Profissionais</span>
                                        <span className="text-lg font-bold tracking-wide">Encontrar</span>
                                    </div>
                                </div>
                            </Link>

                            {/* Empresas */}
                            <Link href="/empresa" className="group cursor-pointer transition-transform hover:scale-[1.015]">
                                <div className="relative flex flex-col items-center justify-center w-full h-full p-4 space-y-3 overflow-hidden transition-all duration-300 ease-in-out bg-white border-2 shadow-md rounded-xl border-emerald-200 hover:border-emerald-300 hover:bg-emerald-50 text-emerald-700 hover:shadow-xl hover:ring-2 hover:ring-emerald-100 hover:ring-offset-1">
                                    <div className="absolute left-[-50px] top-0 h-full opacity-10 pointer-events-none flex items-center">
                                        <Landmark className="w-auto h-full text-emerald-700" />
                                    </div>
                                    <p className="text-sm font-medium leading-tight text-center text-emerald-700/80">
                                        Encontre talentos prontos<br />para sua necessidade
                                    </p>
                                    <div className="relative z-10 flex flex-col items-center justify-center leading-tight text-center">
                                        <span className="text-2xl font-extrabold text-emerald-700/90">Empresas</span>
                                        <span className="text-lg font-bold tracking-wide">Encontrar</span>
                                    </div>
                                </div>Freelancer 
                            </Link>
                        </div>

                    </div>
                </div>

            </div>
        </main>
    )
}
