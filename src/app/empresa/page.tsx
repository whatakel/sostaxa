"use client"

import { useState } from "react"
import {
  Search,
  MapPin,
  Phone,
  MessageCircle,
  Bookmark,
  ChevronLeft,
  ChevronRight,
  CheckCircle,
  Star,
  Calendar,
  CalendarDays,
  User,
  MessageCircleWarning,
  Building2,
  Briefcase,
  MapPinIcon,
  Timer,
  Zap,
  Info,
  ChevronDown,
  Check,

} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Calendar as CalendarComponent } from "@/components/ui/calendar"
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover"

import {
  Command,
  CommandGroup,
  CommandItem,
} from "@/components/ui/command"
const serviceAreas = ["Gastronomia", "Hotelaria", "Eventos", "Alimentação", "Varejo", "Limpeza", "Segurança"]


const companies = [
  {
    id: 1,
    name: "Restaurante Bella Vista",
    area: "Gastronomia",
    rating: 4.8,
    location: "Centro, São Paulo - SP",
    distance: "1.2 km",
    urgentToday: true,
    totalJobs: 45,
    responseTime: "< 2 horas",
    positions: [
      { role: "Chef de Cozinha", salary: "R$ 50-65/hora", shift: ["manhã", "tarde"], urgent: true },
      { role: "Garçom/Garçonete", salary: "R$ 25-35/hora", shift: ["noite"], urgent: false },
    ],
    description:
      "Restaurante tradicional no centro da cidade busca profissionais qualificados para reforçar nossa equipe.",
    benefits: ["Vale Refeição", "Transporte", "Comissão"],
    companyIcon: "🍽️",
    iconColor: "bg-gradient-to-br from-orange-400 to-red-500",
    userIconVariant: 1,
  },
  {
    id: 2,
    name: "Hotel Grand Plaza",
    area: "Hotelaria",
    rating: 4.6,
    location: "Jardins, São Paulo - SP",
    distance: "2.8 km",
    urgentToday: false,
    totalJobs: 78,
    responseTime: "< 1 hora",
    positions: [
      { role: "Recepcionista", salary: "R$ 30-40/hora", shift: ["manhã", "tarde", "noite"], urgent: false },
      { role: "Camareira", salary: "R$ 22-28/hora", shift: ["manhã"], urgent: false },
    ],
    description: "Hotel 5 estrelas oferece oportunidades para profissionais experientes em hotelaria.",
    benefits: ["Plano de Saúde", "Vale Refeição", "Uniforme"],
    companyIcon: "🏨",
    iconColor: "bg-gradient-to-br from-blue-400 to-indigo-500",
    userIconVariant: 2,
  },
  {
    id: 3,
    name: "Café & Cia",
    area: "Alimentação",
    rating: 4.9,
    location: "Vila Madalena, São Paulo - SP",
    distance: "0.8 km",
    urgentToday: true,
    totalJobs: 23,
    responseTime: "< 30 min",
    positions: [
      { role: "Barista", salary: "R$ 35-45/hora", shift: ["manhã", "tarde"], urgent: true },
      { role: "Atendente", salary: "R$ 20-28/hora", shift: ["manhã", "tarde"], urgent: true },
    ],
    description: "Cafeteria artesanal em expansão busca profissionais apaixonados por café de qualidade.",
    benefits: ["Vale Alimentação", "Gorjetas", "Treinamento"],
    companyIcon: "☕",
    iconColor: "bg-gradient-to-br from-amber-400 to-orange-500",
    userIconVariant: 3,
  },
  {
    id: 4,
    name: "Eventos Premium",
    area: "Eventos",
    rating: 4.7,
    location: "Itaim Bibi, São Paulo - SP",
    distance: "3.2 km",
    urgentToday: false,
    totalJobs: 156,
    responseTime: "< 4 horas",
    positions: [
      { role: "Garçom Especializado", salary: "R$ 40-55/hora", shift: ["noite"], urgent: false },
      { role: "Bartender", salary: "R$ 45-60/hora", shift: ["tarde", "noite"], urgent: false },
    ],
    description: "Empresa especializada em eventos corporativos e sociais de alto padrão.",
    benefits: ["Pagamento Imediato", "Gorjetas", "Networking"],
    companyIcon: "🎉",
    iconColor: "bg-gradient-to-br from-purple-400 to-pink-500",
    userIconVariant: 1,
  },
]


// Generate calendar days
const generateCalendarDays = () => {
  const days = []
  const today = new Date()

  for (let i = 0; i < 14; i++) {
    const date = new Date(today)
    date.setDate(today.getDate() + i)
    days.push({
      date: date.getDate(),
      month: date.getMonth(),
      year: date.getFullYear(),
      dayName: date.toLocaleDateString("pt-BR", { weekday: "short" }),
      isToday: i === 0,
      fullDate: date,
    })
  }
  return days
}

// User icon variants
const getUserIconVariant = (variant: number) => {
  const variants = {
    1: { bg: "bg-gradient-to-br from-blue-600 to-blue-800", text: "text-white" },
    2: { bg: "bg-gradient-to-br from-purple-600 to-purple-800", text: "text-white" },
    3: { bg: "bg-gradient-to-br from-emerald-600 to-emerald-800", text: "text-white" },
  }
  return variants[variant as keyof typeof variants] || variants[1]
}

export default function CompaniesPage() {
  const [step, setStep] = useState(1)
  const [dateSelectionMode, setDateSelectionMode] = useState<"day" | "period">("day")
  const [selectedDate, setSelectedDate] = useState(new Date())
  const [urgentOnly, setUrgentOnly] = useState(false)
  const [selectedDateRange, setSelectedDateRange] = useState<{ from: Date | undefined; to: Date | undefined }>({
    from: undefined,
    to: undefined,
  })
  const [searchLocation, setSearchLocation] = useState("")
  const [selectedCompany, setSelectedCompany] = useState<(typeof companies)[0] | null>(null)
  const [savedCompanies, setSavedCompanies] = useState<number[]>([])
  const [selectedAreas, setSelectedAreas] = useState<string[]>([])
  const [timeRange, setTimeRange] = useState({ start: "", end: "" })
  const [calendarStartIndex, setCalendarStartIndex] = useState(0)
  const [filtersOpen, setFiltersOpen] = useState(false)
  const [hasSearched, setHasSearched] = useState(false)
  const [period, setPeriod] = useState("")

  const calendarDays = generateCalendarDays()
  const visibleDays = calendarDays.slice(calendarStartIndex, calendarStartIndex + 7)
  const urgentCount = companies.filter((c) => c.urgentToday).length

  const toggleSaved = (id: number) => {
    setSavedCompanies((prev) => (prev.includes(id) ? prev.filter((saved) => saved !== id) : [...prev, id]))
  }

  const handleContact = (company: (typeof companies)[0]) => {
    alert(`Entrando em contato com ${company.name}...`)
  }

  const handleViewDetails = (company: (typeof companies)[0]) => {
    setSelectedCompany(company)
  }

  const handleSearch = () => {
    setHasSearched(true)
  }

  const filteredCompanies = companies.filter((company) => {
    if (selectedAreas.length > 0 && !selectedAreas.includes(company.area)) return false
    if (urgentOnly && !company.urgentToday) return false
    return true
  })

  const scrollCalendar = (direction: "left" | "right") => {
    if (direction === "left" && calendarStartIndex > 0) {
      setCalendarStartIndex(calendarStartIndex - 1)
    } else if (direction === "right" && calendarStartIndex < calendarDays.length - 7) {
      setCalendarStartIndex(calendarStartIndex + 1)
    }
  }

  const canScrollLeft = calendarStartIndex > 0
  const canScrollRight = calendarStartIndex < calendarDays.length - 7

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Header */}
      <div className="shadow-lg bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900">
        <div className="max-w-md px-4 py-6 mx-auto">
          <div className="flex items-center justify-between">
            {/* Logo composta */}
            <div className="flex flex-col space-y-1">
              <div className="inline-flex self-start shadow-lg">
                {/* Bloco SOS com gradiente e sombra simulando borda */}
                <div className="flex items-center px-4 py-1 skew-x-[-12deg] rounded-l-md bg-gradient-to-br from-emerald-500 to-teal-600 shadow-[0_0_0_1.5px_#059669] border-r-0">
                  <span className="text-white font-bold text-2xl skew-x-[12deg]">S</span>
                  <MessageCircleWarning className="w-6 h-6 text-white skew-x-[12deg]" strokeWidth={2.5} />
                  <span className="text-white font-bold text-2xl skew-x-[12deg]">S</span>
                </div>

                {/* Bloco taxas com fundo sólido e mesma sombra lateral */}
                <div className="flex items-center bg-gray-900 px-4 py-1 skew-x-[-12deg] rounded-r-md shadow-[0_0_0_1.5px_#059669] border-l-0">
                  <span className="text-white font-bold text-2xl skew-x-[12deg] leading-6">TAXAS</span>
                </div>
              </div>
              {/* Slogan abaixo */}
              <p className="ml-1 text-sm text-slate-300">Colaboração que vira solução.</p>
            </div>
            <div className="flex items-center justify-center w-10 h-10 border-2 rounded-full shadow-lg bg-gradient-to-br from-emerald-600 to-teal-700 border-white/20">
              <User className="w-5 h-5 text-white" />
            </div>
          </div>
        </div>
        {/* Clear separation line */}
        <div className="h-1 bg-gradient-to-r from-emerald-500 via-teal-500 to-emerald-500"></div>
      </div>

      {/* Main Container - Full Height */}
      <div className="flex items-center justify-center flex-1 min-h-0 px-4 py-10 bg-white">
        <div className="w-full max-w-md p-6 shadow-lg bg-slate-50 rounded-2xl">

          {/* Urgent Jobs Filter */}
          {step === 1 && (
            <>
              {/* Filtro de Urgência */}
              <div className="p-4 mb-6 border border-gray-200 rounded-lg">
                <div className="flex items-center space-x-3">
                  <Checkbox
                    id="urgent"
                    checked={urgentOnly}
                    onCheckedChange={(checked) => setUrgentOnly(!!checked)}
                    className="data-[state=checked]:bg-red-600 data-[state=checked]:border-red-600"
                  />
                  <label htmlFor="urgent" className="flex items-center space-x-2 text-sm font-medium cursor-pointer">
                    <Zap className="w-4 h-4 text-red-500" />
                    <span>Apenas vagas com urgência para hoje</span>
                  </label>
                </div>
              </div>

              {/* Filtro de Área de Atuação */}
              <div className="p-4 mb-3 border border-gray-200 rounded-lg">
                <h3 className="mb-3 text-sm font-semibold text-gray-700">Área de Atuação</h3>

                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      role="combobox"
                      className="justify-between w-full"
                    >
                      {selectedAreas.length > 0
                        ? `${selectedAreas.length} selecionada(s)`
                        : "Selecione as áreas"}
                      <ChevronDown className="w-4 h-4 ml-2 opacity-50 shrink-0" />
                    </Button>
                  </PopoverTrigger>

                  <PopoverContent className="w-[300px] p-0">
                    <Command>
                      <CommandGroup>
                        {serviceAreas.map((area) => {
                          const isChecked = selectedAreas.includes(area)

                          return (
                            <CommandItem
                              key={area}
                              onSelect={() => {
                                if (isChecked) {
                                  setSelectedAreas(selectedAreas.filter((a) => a !== area))
                                } else {
                                  setSelectedAreas([...selectedAreas, area])
                                }
                              }}
                              className="cursor-pointer"
                            >
                              <div className="flex items-center space-x-2">
                                <Checkbox checked={isChecked} />
                                <span className="text-sm">{area}</span>
                              </div>
                              {isChecked && (
                                <Check className="w-4 h-4 ml-auto text-emerald-600" />
                              )}
                            </CommandItem>
                          )
                        })}
                      </CommandGroup>
                    </Command>
                  </PopoverContent>
                </Popover>
              </div>

              {/* Location Search */}
              <div className="p-4 mb-3 border border-gray-200 rounded-lg">
                <h3 className="mb-3 text-sm font-semibold text-gray-700">Localização</h3>
                <div className="relative">
                  <Search className="absolute w-5 h-5 text-gray-400 transform -translate-y-1/2 left-3 top-1/2" />
                  <Input
                    placeholder="Digite cidade, estado ou CEP"
                    value={searchLocation}
                    onChange={(e) => setSearchLocation(e.target.value)}
                    className="h-12 pl-10 border-gray-200 focus:border-emerald-500 focus:ring-emerald-500"
                  />
                </div>
                <Button variant="outline" className="w-full h-10 mt-2 bg-transparent border-gray-200 hover:bg-gray-50">
                  <MapPin className="w-4 h-4 mr-2 text-emerald-600" />
                  Usar minha localização atual
                </Button>
              </div>

              <div className="flex justify-between w-full max-w-md gap-4 mx-auto mt-6">
                <Button onClick={() => setStep(2)} className="w-full cursor-pointer">
                  Avançar
                </Button>
              </div>

            </>
          )}

          {step === 2 && (
            <>
              {/* Date Selection Tabs */}
              <div className="p-4 mb-3 border border-gray-200 rounded-lg">
                <h3 className="mb-3 text-sm font-semibold text-gray-700">Selecione por dia ou período</h3>
                <Tabs value={dateSelectionMode} onValueChange={(value) => setDateSelectionMode(value as "day" | "period")}>
                  <TabsList className="grid w-full grid-cols-2 mb-4">
                    <TabsTrigger value="day" className="flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      Por dia
                    </TabsTrigger>
                    <TabsTrigger value="period" className="flex items-center gap-2">
                      <CalendarDays className="w-4 h-4" />
                      Por período
                    </TabsTrigger>
                  </TabsList>

                  <TabsContent value="day" className="mt-0">
                    <div className="relative w-full overflow-hidden rounded-md">
                      <div className="absolute inset-y-0 z-20 flex items-center pointer-events-none -left-2">
                        <div className="flex items-center justify-center w-8 h-full pointer-events-auto">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => scrollCalendar("left")}
                            disabled={!canScrollLeft}
                            className="w-8 h-full p-1 bg-transparent hover:bg-transparent focus-visible:ring-0 focus:outline-none"
                          >
                            <ChevronLeft className="w-4 h-4 text-gray-400" />
                          </Button>
                        </div>
                      </div>
                      <div className="absolute inset-y-0 z-20 flex items-center pointer-events-none -right-2">
                        <div className="flex items-center justify-center w-8 h-full pointer-events-auto">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => scrollCalendar("right")}
                            disabled={!canScrollRight}
                            className="w-8 h-full p-1 bg-transparent hover:bg-transparent focus-visible:ring-0 focus:outline-none"
                          >
                            <ChevronRight className="w-4 h-4 text-gray-400" />
                          </Button>
                        </div>
                      </div>
                      <div className="relative overflow-hidden">
                        <div className="flex w-full space-x-2">
                          {visibleDays.map((day) => (
                            <Button
                              key={`${day.date}-${day.month}`}
                              variant={
                                selectedDate.getDate() === day.date && selectedDate.getMonth() === day.month
                                  ? "default"
                                  : "outline"
                              }
                              onClick={() => setSelectedDate(day.fullDate)}
                              className={`flex-1 h-20 flex flex-col items-center justify-center space-y-0 ${selectedDate.getDate() === day.date && selectedDate.getMonth() === day.month
                                ? "bg-emerald-600 hover:bg-emerald-700 text-white"
                                : "border-gray-200 hover:bg-gray-50"
                                } ${day.isToday ? "border-emerald-300 border-2" : ""}`}
                            >
                              <span className="text-xs font-medium leading-none">{day.dayName}</span>
                              <span className="text-lg font-bold leading-tight">{day.date}</span>
                            </Button>
                          ))}
                        </div>
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="period" className="mt-0">
                    <div className="w-full p-4 border rounded-lg bg-gray-50">
                      <div className="flex justify-center w-full">
                        <CalendarComponent
                          mode="range"
                          selected={selectedDateRange}
                          className="w-full rounded-md max-w-none [&_table]:w-full [&_td]:p-1 [&_th]:p-1"
                          numberOfMonths={1}
                          classNames={{
                            months: "w-full",
                            month: "w-full",
                            table: "w-full",
                            head_row: "w-full",
                            row: "w-full",
                          }}
                        />
                      </div>
                      {selectedDateRange.from && selectedDateRange.to && (
                        <div className="p-2 mt-3 text-sm rounded bg-emerald-50 text-emerald-700">
                          Período selecionado: {selectedDateRange.from.toLocaleDateString("pt-BR")} até {selectedDateRange.to.toLocaleDateString("pt-BR")}
                        </div>
                      )}
                    </div>
                  </TabsContent>
                </Tabs>

                {/* Turno/Horário */}
                <Tabs defaultValue="hour" className="w-full mt-6">
                  <TabsList className="grid w-full grid-cols-2 mb-4">
                    <TabsTrigger value="hour">Horário</TabsTrigger>
                    <TabsTrigger value="period">Turno</TabsTrigger>
                  </TabsList>

                  <TabsContent value="hour">
                    <div className="w-full p-2 border border-gray-200 rounded-lg bg-gray-50">
                      <div className="grid grid-cols-2 gap-3">
                        <Select
                          value={timeRange.start}
                          onValueChange={(value) => setTimeRange({ ...timeRange, start: value })}
                        >
                          <SelectTrigger className="w-full h-10">
                            <SelectValue placeholder="Início" />
                          </SelectTrigger>
                          <SelectContent>
                            {["08:00", "09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00"].map((hour) => (
                              <SelectItem key={hour} value={hour}>{hour}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>

                        <Select
                          value={timeRange.end}
                          onValueChange={(value) => setTimeRange({ ...timeRange, end: value })}
                        >
                          <SelectTrigger className="w-full h-10">
                            <SelectValue placeholder="Fim" />
                          </SelectTrigger>
                          <SelectContent>
                            {["12:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00", "19:00", "20:00", "21:00", "22:00"].map((hour) => (
                              <SelectItem key={hour} value={hour}>{hour}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="period">
                    <div className="w-full p-2 border border-gray-200 rounded-lg bg-gray-50">
                      <Select value={period} onValueChange={setPeriod}>
                        <SelectTrigger className="w-full h-10">
                          <SelectValue placeholder="Selecione o turno" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="manha">Manhã</SelectItem>
                          <SelectItem value="tarde">Tarde</SelectItem>
                          <SelectItem value="noite">Noite</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </TabsContent>
                </Tabs>
              </div>

              {/* Navegação entre etapas */}
              <div className="flex items-center w-full max-w-md gap-3 mx-auto mt-6">
                <Button variant="outline" size="icon" onClick={() => setStep(1)} className="w-32 cursor-pointer">
                  <ChevronLeft className="w-4 h-4" />
                </Button>
                <Button onClick={() => handleSearch()} className="flex-1 text-lg font-semibold shadow-lg cursor-pointer bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700">
                  Buscar Empresas
                </Button>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Results Section */}
      {
        hasSearched && (
          <>
            {/* Results Header */}
            <div className="px-4 py-4 border-b shadow-sm bg-gray-50">
              <div className="max-w-md mx-auto">
                <div className="flex items-center justify-between mb-3">
                </div>

                {/* Urgent Jobs Indicator */}
                {urgentCount > 0 && (
                  <div className="p-4 mb-4 border-2 border-red-200 shadow-sm bg-gradient-to-r from-red-50 via-orange-50 to-red-50 rounded-xl">
                    <div className="flex items-center justify-center space-x-3">
                      <div className="flex items-center space-x-2">
                        <div className="w-4 h-4 bg-red-500 rounded-full shadow-lg animate-pulse"></div>
                        <Zap className="w-5 h-5 text-red-600" />
                        <span className="text-sm font-bold text-red-700">
                          {urgentCount} empresas com vagas urgentes hoje
                        </span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Companies List */}
            <div className="max-w-md px-4 py-4 mx-auto space-y-4">
              {filteredCompanies.map((company) => (
                <Card
                  key={company.id}
                  onClick={() => handleViewDetails(company)}
                  className={`group shadow-md hover:shadow-lg transition-all cursor-pointer relative overflow-hidden ${company.urgentToday
                    ? "border-red-300 hover:border-red-400 bg-red-50/30"
                    : "border-gray-300 hover:border-gray-500/50"
                    }`}
                >
                  <CardContent className="p-4">
                    <div className="flex items-stretch space-x-4">
                      <div className="relative flex flex-col items-center justify-center">
                        <div className="relative">
                          <div className="flex flex-col items-center">
                            {/* Company Avatar */}
                            <div
                              className={`h-16 w-16 bg-gray-100 rounded-full flex items-center justify-center border-2 ${company.urgentToday ? "border-red-300" : "border-gray-300"
                                }`}
                            >
                              <Building2
                                className={`h-8 w-8 ${company.urgentToday ? "text-red-500" : "text-gray-400"}`}
                              />
                            </div>


                            {/* Status Badge */}
                            <span className="mt-1 text-xs">Status:</span>
                            {company.urgentToday ? (
                              <div className="flex items-center px-2 mt-1 text-xs font-bold text-red-800 bg-red-100 border border-red-300 rounded-full shadow-sm">
                                <Zap className="w-3 h-3 mr-1 text-red-800" />
                                Urgente
                              </div>
                            ) : (
                              <div className="flex items-center px-2 mt-1 text-xs font-bold border rounded-full shadow-sm bg-emerald-100 text-emerald-800 border-emerald-300">
                                <CheckCircle className="w-3 h-3 mr-1 text-emerald-800" />
                                Ativo
                              </div>
                            )}
                          </div>
                        </div>
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex flex-col justify-between h-full">
                          <div className="flex justify-between">
                            <div>
                              <h3 className="text-lg font-bold leading-none text-gray-900 truncate">{company.name}</h3>
                              <div className="flex items-center gap-2 mt-0.5">
                                <Briefcase className="w-4 h-4 text-gray-500" />
                                <p className="text-sm font-semibold text-gray-600">{company.area}</p>
                              </div>
                              <div className="flex items-center gap-1 mt-1 text-xs text-gray-500">
                                <MapPinIcon className="w-3 h-3" />
                                <span>{company.distance}</span>
                              </div>

                              <div className="flex flex-wrap items-center gap-2 mt-2">
                                {/* Rating Badge */}
                                <div className="flex items-center gap-1 text-xs font-semibold text-gray-700 border border-gray-200 bg-gray-100 px-2 py-0.5 rounded-full shadow-sm">
                                  <Star className="w-3 h-3 text-yellow-500 fill-yellow-500" />
                                  <span>{company.rating}</span>
                                </div>

                                {/* Jobs Count */}
                                <div className="text-xs font-medium text-gray-700 border border-gray-200 bg-gray-100 px-2 py-0.5 rounded-full shadow-sm">
                                  {company.totalJobs} vagas
                                </div>
                              </div>
                            </div>

                            {/* Positions Count */}
                            <div className="text-right">
                              <span className="block text-base font-bold leading-tight text-emerald-600">
                                {company.positions.length}
                              </span>
                              <span className="text-sm font-light leading-none text-gray-500">
                                {company.positions.length === 1 ? "Vaga" : "Vagas"}
                              </span>
                            </div>
                          </div>

                          <Separator className="h-px my-2 bg-gray-200" />

                          {/* Positions Preview */}
                          <div className="mb-2 space-y-1">
                            {company.positions.slice(0, 2).map((position, index) => (
                              <div key={index} className="flex items-center justify-between text-xs">
                                <div className="flex items-center space-x-2">
                                  <span className="font-medium text-gray-700">{position.role}</span>
                                  {position.urgent && (
                                    <Badge variant="secondary" className="px-1 py-0 text-xs text-red-700 bg-red-100">
                                      Urgente
                                    </Badge>
                                  )}
                                </div>
                                <span className="font-semibold text-emerald-600">{position.salary}</span>
                              </div>
                            ))}
                            {company.positions.length > 2 && (
                              <div className="text-xs text-gray-500">+{company.positions.length - 2} outras vagas</div>
                            )}
                          </div>

                          <div className="flex items-center justify-between w-full">
                            <Button
                              variant="ghost"
                              size="sm"
                              className="w-full py-1 text-sm font-medium text-gray-600 transition-all duration-300 ease-in-out bg-gray-100 ring-1 ring-gray-500/10 ring-inset hover:bg-gray-600 hover:text-white hover:ring-gray-300/40 hover:shadow-sm group-hover:bg-gray-700 group-hover:text-white group-hover:ring-gray-300/40 group-hover:shadow-sm"
                            >
                              Ver Detalhes
                              <span className="relative z-10 pointer-events-none">
                                <Info className="w-4 h-4 ml-2" />
                              </span>
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </>
        )
      }

      {/* Company Details Modal */}
      <Dialog open={!!selectedCompany} onOpenChange={() => setSelectedCompany(null)}>
        <DialogContent className="max-w-md mx-auto max-h-[90vh] overflow-y-auto">
          {selectedCompany && (
            <>
              <DialogHeader>
                <DialogTitle className="flex items-center justify-between text-xl font-semibold tracking-tight text-gray-800">
                  <span className="truncate max-w-[85%]">{selectedCompany.name}</span>
                </DialogTitle>
              </DialogHeader>

              <div className="space-y-6">
                {/* Company Header */}
                <div className="flex items-start space-x-4">
                  <div className="relative">
                    <div
                      className={`h-16 w-16 ${getUserIconVariant(selectedCompany.userIconVariant).bg} rounded-full flex items-center justify-center border-2 border-gray-100`}
                    >
                      <Building2 className={`h-8 w-8 ${getUserIconVariant(selectedCompany.userIconVariant).text}`} />
                    </div>
                    <div
                      className={`absolute -bottom-1 -right-1 w-6 h-6 ${selectedCompany.iconColor} rounded-full flex items-center justify-center text-xs border-2 border-white shadow-lg`}
                    >
                      {selectedCompany.companyIcon}
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation()
                        toggleSaved(selectedCompany.id)
                      }}
                      className="absolute p-1 transition-shadow bg-white border-2 border-gray-100 rounded-full shadow-lg -top-1 -left-1 h-7 w-7 hover:shadow-xl"
                    >
                      <Bookmark
                        className={`h-4 w-4 ${savedCompanies.includes(selectedCompany.id)
                          ? "fill-emerald-500 text-emerald-500"
                          : "text-gray-400"
                          }`}
                      />
                    </Button>
                  </div>

                  <div className="flex-1">
                    <p className="font-medium text-emerald-600">{selectedCompany.area}</p>
                    <div className="flex items-center mt-2 space-x-4">
                      <div className="flex items-center">
                        <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                        <span className="ml-1 text-sm font-medium">{selectedCompany.rating}</span>
                      </div>
                      <div className="flex items-center text-sm text-gray-600">
                        <MapPin className="w-4 h-4 mr-1" />
                        {selectedCompany.distance}
                      </div>
                    </div>
                    <p className="mt-2 text-sm text-gray-600">{selectedCompany.location}</p>
                  </div>
                </div>

                {/* Company Stats */}
                <div className="relative p-6 overflow-hidden border border-gray-100 rounded-2xl bg-gradient-to-br from-slate-50 via-emerald-50 to-teal-50">
                  <div className="absolute top-0 right-0 w-32 h-32 translate-x-16 -translate-y-16 rounded-full bg-gradient-to-br from-emerald-200/20 to-teal-200/20"></div>
                  <div className="relative grid grid-cols-3 gap-6">
                    <div className="text-center">
                      <div className="flex items-center justify-center w-12 h-12 mx-auto mb-2 shadow-lg bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-xl">
                        <Briefcase className="w-6 h-6 text-white" />
                      </div>
                      <div className="mb-1 text-2xl font-bold text-slate-800">{selectedCompany.totalJobs}</div>
                      <div className="text-xs font-medium text-slate-600">Vagas</div>
                    </div>
                    <div className="text-center">
                      <div className="flex items-center justify-center w-12 h-12 mx-auto mb-2 shadow-lg bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl">
                        <Timer className="w-6 h-6 text-white" />
                      </div>
                      <div className="mb-1 text-2xl font-bold text-slate-800">{selectedCompany.responseTime}</div>
                      <div className="text-xs font-medium text-slate-600">Resposta</div>
                    </div>
                    <div className="text-center">
                      <div className="flex items-center justify-center w-12 h-12 mx-auto mb-2 shadow-lg bg-gradient-to-br from-amber-500 to-orange-500 rounded-xl">
                        <Star className="w-6 h-6 text-white" />
                      </div>
                      <div className="mb-1 text-2xl font-bold text-slate-800">{selectedCompany.rating}</div>
                      <div className="text-xs font-medium text-slate-600">Avaliação</div>
                    </div>
                  </div>
                </div>

                {/* Description */}
                <div>
                  <h4 className="mb-2 font-semibold">Sobre a empresa</h4>
                  <p className="text-sm text-gray-600">{selectedCompany.description}</p>
                </div>

                {/* Available Positions */}
                <div>
                  <h4 className="mb-3 font-semibold">Vagas disponíveis</h4>
                  <div className="space-y-3">
                    {selectedCompany.positions.map((position, index) => (
                      <Card key={index} className="border border-gray-200">
                        <CardContent className="p-4">
                          <div className="flex items-center justify-between mb-2">
                            <h5 className="font-medium text-gray-900">{position.role}</h5>
                            {position.urgent && (
                              <Badge variant="secondary" className="text-red-700 bg-red-100">
                                <Zap className="w-3 h-3 mr-1" />
                                Urgente
                              </Badge>
                            )}
                          </div>
                          <div className="flex items-center justify-between text-sm">
                            <span className="font-semibold text-emerald-600">{position.salary}</span>
                            <div className="flex space-x-1">
                              {position.shift.map((shift, i) => (
                                <Badge key={i} variant="outline" className="text-xs">
                                  {shift.charAt(0).toUpperCase() + shift.slice(1)}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>

                {/* Benefits */}
                <div>
                  <h4 className="mb-3 font-semibold">Benefícios</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedCompany.benefits.map((benefit, index) => (
                      <Badge
                        key={index}
                        variant="secondary"
                        className="border bg-emerald-50 text-emerald-700 border-emerald-200"
                      >
                        {benefit}
                      </Badge>
                    ))}
                  </div>
                </div>

                <Separator />

                {/* Action Buttons */}
                <div className="grid grid-cols-2 gap-3">
                  <Button
                    onClick={() => handleContact(selectedCompany)}
                    className="h-12 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700"
                  >
                    <Phone className="w-4 h-4 mr-2" />
                    Entrar em Contato
                  </Button>
                  <Button variant="outline" className="h-12 bg-transparent border-gray-200 hover:bg-gray-50">
                    <MessageCircle className="w-4 h-4 mr-2" />
                    Enviar Mensagem
                  </Button>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div >
  )
}
