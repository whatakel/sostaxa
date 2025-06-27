"use client"

import { useState } from "react"
import {
  Search,
  MapPin,
  Filter,
  Clock,
  Phone,
  MessageCircle,
  Bookmark,
  Users,
  ChevronLeft,
  ChevronRight,
  CheckCircle,
  Star,
  Calendar,
  CalendarDays,
  X,
  User,
  MessageCircleWarning,
  Eye,
  Sunrise,
  Sunset,
  Moon,
  Utensils,
  Wine,
  Headphones,
  SunMoon,
  MessageCircleReply,
  Hourglass,
  ChevronDown,
  Info,
  Zap,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Checkbox } from "@/components/ui/checkbox"
import { Slider } from "@/components/ui/slider"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Calendar as CalendarComponent } from "@/components/ui/calendar"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

const freelancers = [
  {
    id: 1,
    name: "Ana Silva",
    role: "Chef Especialista",
    rating: 4.9,
    image: "/placeholder.svg?height=60&width=60",
    online: true,
    price: "R$ 45",
    availability: "Disponível agora",
    completedJobs: 89,
    responseTime: "< 1 hora",
    skills: ["Culinária Brasileira", "Eventos Corporativos", "Confeitaria"],
    saved: false,
    profileIconComponent: "Utensils",
    iconColor: "bg-gradient-to-br from-orange-400 to-red-500",
    iconBg: "bg-orange-50",
    userIconVariant: 1,
    distance: "1.2 km",
    shift: ["manhã", "tarde"],
    lastLogin: "Ativo agora",
    urgent: true,
  },
  {
    id: 2,
    name: "Carlos Santos",
    role: "Bartender Profissional",
    rating: 4.7,
    image: "/placeholder.svg?height=60&width=60",
    online: false,
    price: "R$ 35",
    availability: "Disponível às 14:00",
    completedJobs: 67,
    responseTime: "< 2 horas",
    skills: ["Mixologia", "Eventos", "Atendimento VIP"],
    saved: true,
    profileIconComponent: "Wine",
    iconColor: "bg-gradient-to-br from-purple-400 to-indigo-500",
    iconBg: "bg-purple-50",
    userIconVariant: 2,
    distance: "2.1 km",
    shift: ["tarde", "noite"],
    lastLogin: "20min",
    urgent: false,
  },
  {
    id: 3,
    name: "Maria Oliveira",
    role: "Atendente Especializada",
    rating: 4.8,
    image: "/placeholder.svg?height=60&width=60",
    online: true,
    price: "R$ 25",
    availability: "Disponível agora",
    completedJobs: 124,
    responseTime: "< 30 min",
    skills: ["Atendimento ao Cliente", "Vendas", "Eventos"],
    saved: false,
    profileIconComponent: "Headphones",
    iconColor: "bg-gradient-to-br from-blue-400 to-cyan-500",
    iconBg: "bg-blue-50",
    userIconVariant: 3,
    distance: "0.5 km",
    shift: ["noite"],
    urgent: false,
  },
  {
    id: 4,
    name: "João Costa",
    role: "Chef Executivo",
    rating: 5.0,
    image: "/placeholder.svg?height=60&width=60",
    online: true,
    price: "R$ 60",
    availability: "Disponível agora",
    completedJobs: 156,
    responseTime: "< 15 min",
    skills: ["Alta Gastronomia", "Gestão de Cozinha", "Menu Executivo"],
    saved: false,
    profileIconComponent: "Utensils",
    iconColor: "bg-gradient-to-br from-emerald-400 to-teal-500",
    iconBg: "bg-emerald-50",
    userIconVariant: 1,
    distance: "3.6 km",
    shift: ["manhã", "tarde", "noite"],
    lastLogin: "8 dias",
    urgent: false,
  },
]

const serviceTypes = ["Chef", "Bartender", "Atendente", "Garçonete", "Auxiliar de Cozinha", "Sommelier"]

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

export default function FreelancerApp() {
  const [urgentOnly, setUrgentOnly] = useState(false)
  const [dateSelectionMode, setDateSelectionMode] = useState<"day" | "period">("day")
  const [selectedDate, setSelectedDate] = useState(new Date())
  const [selectedDateRange, setSelectedDateRange] = useState<{ from: Date | undefined; to: Date | undefined }>({
    from: undefined,
    to: undefined,
  })
  const [searchLocation, setSearchLocation] = useState("")
  const [selectedFreelancer, setSelectedFreelancer] = useState<(typeof freelancers)[0] | null>(null)
  const [savedFreelancers, setSavedFreelancers] = useState<number[]>([2])
  const [priceRange, setPriceRange] = useState([20, 80])
  const [selectedServices, setSelectedServices] = useState<string[]>([])
  const [timeRange, setTimeRange] = useState({ start: "", end: "" })
  const [calendarStartIndex, setCalendarStartIndex] = useState(0)
  const [filtersOpen, setFiltersOpen] = useState(false)
  const [hasSearched, setHasSearched] = useState(false)

  const calendarDays = generateCalendarDays()
  const visibleDays = calendarDays.slice(calendarStartIndex, calendarStartIndex + 7)
  const onlineCount = freelancers.filter((f) => f.online).length
  const [period, setPeriod] = useState("");

  const toggleSaved = (id: number) => {
    setSavedFreelancers((prev) => (prev.includes(id) ? prev.filter((saved) => saved !== id) : [...prev, id]))
  }

  const handleCall = (freelancer: (typeof freelancers)[0]) => {
    alert(`Iniciando chamada para ${freelancer.name}...`)
  }

  const handleChat = (freelancer: (typeof freelancers)[0]) => {
    alert(`Abrindo chat com ${freelancer.name}...`)
  }

  const handleSearch = () => {
    setHasSearched(true)
  }

  const filteredFreelancers = freelancers.filter((freelancer) => {
    if (selectedServices.length > 0 && !selectedServices.some((service) => freelancer.role.includes(service)))
      return false
    const price = Number.parseInt(freelancer.price.replace(/[^\d]/g, ""))
    if (price < priceRange[0] || price > priceRange[1]) return false
    return true
  })

  const scrollCalendar = (direction: "left" | "right") => {
    if (direction === "left" && calendarStartIndex > 0) {
      setCalendarStartIndex(calendarStartIndex - 1)
    } else if (direction === "right" && calendarStartIndex < calendarDays.length - 7) {
      setCalendarStartIndex(calendarStartIndex + 1)
    }
  }
  const iconMap: { [key: string]: React.ElementType } = {
    Utensils,
    Wine,
    Headphones,
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
              {/* Slogan abaixo */}
              <p className="ml-1 text-sm text-slate-300">Colaboração que vira solução.</p>
            </div>
            <div className="flex items-center justify-center w-10 h-10 border-2 rounded-full shadow-lg bg-gradient-to-br from-blue-600 to-blue-800 border-white/20">
              <User className="w-5 h-5 text-white" />
            </div>
          </div>
        </div>
        {/* Linha separadora (se quiser manter em emerald) */}

      </div>

      {/* Main Container - Full Height */}
      <div className="flex-1 bg-white min-h-0 leading-[1em]">
        <div className="flex flex-col h-full max-w-md px-4 py-6 mx-auto">
          {/* Urgent Jobs Filter */}
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
          {/* Location Search */}
          <div className="p-4 mb-3 border border-gray-200 rounded-lg">
            <h3 className="mb-3 text-sm font-semibold text-gray-700">Localização</h3>
            <div className="relative">
              <Search className="absolute w-5 h-5 text-gray-400 transform -translate-y-1/2 left-3 top-1/2" />
              <Input
                placeholder="Digite sua cidade ou região"
                value={searchLocation}
                onChange={(e) => setSearchLocation(e.target.value)}
                className="h-12 pl-10 border-gray-200 focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
            <Button variant="outline" className="w-full h-10 mt-2 border-gray-200 hover:bg-gray-50">
              <MapPin className="w-4 h-4 mr-2 text-blue-600" />
              Usar minha localização atual
            </Button>
          </div>


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
                  {/* Setas mais nas extremidades */}
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

                  {/* Gradientes laterais mais largos */}
                  {canScrollLeft && (
                    <div className="absolute top-0 bottom-0 left-0 z-10 w-6 pointer-events-none bg-gradient-to-r from-black/20 to-transparent rounded-l-md" />
                  )}
                  {canScrollRight && (
                    <div className="absolute top-0 bottom-0 right-0 z-10 w-6 pointer-events-none bg-gradient-to-l from-black/20 to-transparent rounded-r-md" />
                  )}

                  {/* Dias visíveis */}
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
                            ? "bg-blue-600 hover:bg-blue-700 text-white"
                            : "border-gray-200 hover:bg-gray-50"
                            } ${day.isToday ? "border-blue-300 border-2" : ""}`}
                        >
                          <span
                            className={`text-[12px] font-semibold leading-none ${selectedDate.getDate() === day.date && selectedDate.getMonth() === day.month
                              ? 'text-white'
                              : 'text-muted-foreground'
                              }`}
                          >
                            {new Intl.DateTimeFormat('pt-BR', { month: 'short' }).format(new Date(day.fullDate))}
                          </span>
                          <span className="text-[10px] text-muted-foreground font-semibold leading-none">
                          </span>
                          <span className="text-xs font-medium leading-none">{day.dayName}</span>
                          <span className="text-lg font-bold leading-tight">{day.date}</span>
                        </Button>
                      ))}
                    </div>
                  </div>
                </div>
              </TabsContent>

              {/* Time Range Selection */}
              <TabsContent value="period" className="mt-0">
                <div className="w-full p-4 border rounded-lg bg-gray-50">
                  <div className="flex justify-center w-full">
                    <CalendarComponent
                      mode="range"
                      selected={selectedDateRange}
                      onSelect={(range) => {
                        if (range) {
                          setSelectedDateRange({ from: range.from, to: range.to })
                        } else {
                          setSelectedDateRange({ from: undefined, to: undefined })
                        }
                      }}
                      className="w-full rounded-md max-w-none [&_table]:w-full"

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
                    <div className="p-2 mt-3 text-sm text-blue-700 rounded bg-blue-50">
                      Período selecionado: {selectedDateRange.from.toLocaleDateString("pt-BR")} até{" "}
                      {selectedDateRange.to.toLocaleDateString("pt-BR")}
                    </div>
                  )}
                </div>
              </TabsContent>
            </Tabs>
            <Tabs defaultValue="hour" className="w-full mt-6">
              <TabsList className="grid w-full grid-cols-2 mb-4">
                <TabsTrigger value="hour">Horário</TabsTrigger>
                <TabsTrigger value="period">Turno</TabsTrigger>
              </TabsList>

              {/* Aba: Horário */}
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
                        {["08:00", "09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00"].map(
                          (hour) => (
                            <SelectItem key={hour} value={hour}>
                              {hour}
                            </SelectItem>
                          )
                        )}
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
                        {["12:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00", "19:00", "20:00", "21:00", "22:00"].map(
                          (hour) => (
                            <SelectItem key={hour} value={hour}>
                              {hour}
                            </SelectItem>
                          )
                        )}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </TabsContent>

              {/* Aba: Período */}
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

          {/* btn buscar  */}
          <div className="mt-auto">
            <Button
              onClick={handleSearch}
              className="w-full text-lg font-semibold shadow-lg h-14 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700"
            >
              <Search className="w-6 h-6 mr-3" />
              Buscar Empresas
            </Button>
          </div>

          <span className="relative z-10 flex items-center justify-center mt-5">

            Sua solução a um clique dedistância
          </span>
        </div>
      </div>

      {/* Results Section - Only show after search */}
      {
        hasSearched && (
          <>
            {/* Filters and Results Header */}
            <div className="px-4 py-4 border-b shadow-sm bg-gray-50">
              <div className="max-w-md mx-auto">
                <div className="flex items-center justify-between mb-3">
                  <Dialog open={filtersOpen} onOpenChange={setFiltersOpen}>
                    <DialogTrigger asChild>
                      <Button
                        variant="outline"
                        size="sm"
                        className="transition-shadow bg-white border-gray-200 shadow-sm hover:shadow-md"
                      >
                        <Filter className="w-4 h-4 mr-2" />
                        Filtros Avançados
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-md mx-auto max-h-[90vh] overflow-y-auto">
                      <DialogHeader className="pb-4 border-b">
                        <DialogTitle className="flex items-center justify-between text-xl">
                          <div className="flex items-center space-x-2">
                            <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600">
                              <Filter className="w-4 h-4 text-white" />
                            </div>
                            <span>Filtros Avançados</span>
                          </div>
                        </DialogTitle>
                      </DialogHeader>

                      <div className="py-6 space-y-8">
                        {/* Service Type */}
                        <div className="space-y-4">
                          <div className="flex items-center space-x-2">
                            <div className="flex items-center justify-center w-6 h-6 rounded-md bg-gradient-to-br from-orange-400 to-red-500">
                              <span className="text-xs text-white">🏷️</span>
                            </div>
                            <h3 className="text-lg font-semibold">Tipo de Serviço</h3>
                          </div>
                          <div className="grid grid-cols-2 gap-3">
                            {serviceTypes.map((service) => (
                              <div
                                key={service}
                                className="flex items-center p-3 space-x-3 transition-colors rounded-lg hover:bg-gray-50"
                              >
                                <Checkbox
                                  id={service}
                                  checked={selectedServices.includes(service)}
                                  onCheckedChange={(checked) => {
                                    if (checked) {
                                      setSelectedServices([...selectedServices, service])
                                    } else {
                                      setSelectedServices(selectedServices.filter((s) => s !== service))
                                    }
                                  }}
                                  className="data-[state=checked]:bg-blue-600 data-[state=checked]:border-blue-600"
                                />
                                <label htmlFor={service} className="text-sm font-medium cursor-pointer">
                                  {service}
                                </label>
                              </div>
                            ))}
                          </div>
                        </div>

                        <Separator />

                        {/* Price Range */}
                        <div className="space-y-4">
                          <div className="flex items-center space-x-2">
                            <div className="flex items-center justify-center w-6 h-6 rounded-md bg-gradient-to-br from-green-400 to-emerald-500">
                              <span className="text-xs text-white">💰</span>
                            </div>
                            <h3 className="text-lg font-semibold">Faixa de Preço</h3>
                          </div>
                          <div className="px-4 py-6 rounded-lg bg-gradient-to-r from-blue-50 to-purple-50">
                            <Slider
                              value={priceRange}
                              onValueChange={setPriceRange}
                              max={100}
                              min={15}
                              step={5}
                              className="w-full"
                            />
                            <div className="flex justify-between mt-4 text-sm font-medium text-gray-700">
                              <span className="px-3 py-1 bg-white rounded-full shadow-sm">R$ {priceRange[0]}</span>
                              <span className="px-3 py-1 bg-white rounded-full shadow-sm">R$ {priceRange[1]}</span>
                            </div>
                          </div>
                        </div>

                        <div className="pt-4 border-t">
                          <Button
                            onClick={() => setFiltersOpen(false)}
                            className="w-full h-12 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                          >
                            Aplicar Filtros
                          </Button>
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>

                  <div className="text-sm font-medium text-gray-600">{filteredFreelancers.length} profissionais</div>
                </div>

                {/* Online Users Indicator */}
                {onlineCount > 0 && (
                  <div className="p-4 mb-4 border-2 border-green-200 shadow-sm bg-gradient-to-r from-green-50 via-emerald-50 to-green-50 rounded-xl">
                    <div className="flex items-center justify-center space-x-3">
                      <div className="flex items-center space-x-2">
                        <div className="w-4 h-4 bg-green-500 rounded-full shadow-lg animate-pulse"></div>
                        <Users className="w-5 h-5 text-green-600" />
                        <span className="text-sm font-bold text-green-700">{onlineCount} profissionais online agora</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Freelancers List */}
            <div className="max-w-md px-4 py-4 mx-auto space-y-4">
              {filteredFreelancers.map((freelancer) => {
                const userIconStyle = getUserIconVariant(freelancer.userIconVariant)
                const Icon = iconMap[freelancer.profileIconComponent]
                return (
                  <Card
                    key={freelancer.id}
                    onClick={() => setSelectedFreelancer(freelancer)}
                    className={`group shadow-md hover:shadow-lg transition-all cursor-pointer relative overflow-hidden
                      ${freelancer.lastLogin === "Ativo agora"
                        ? "border-emerald-400 hover:border-emerald-500 "
                        : "border-gray-300 hover:border-gray-500/50"
                      }`}>
                    {freelancer.urgent && (
                      <div className="absolute top-2 right-2 z-20 rounded-full bg-red-600 px-3 py-[6px] text-xs font-bold text-white shadow-lg flex items-center gap-1 animate-pulse">
                        <Zap className="w-4 h-4 text-white" />
                        URGENTE
                      </div>
                    )}
                    <CardContent className="p-4">
                      <div className="flex items-stretch space-x-4">
                        <div className="relative flex flex-col items-center justify-center">
                          <div className="relative">
                            <div className="flex flex-col items-center">
                              {/* Avatar com borda dinâmica */}
                              <div className={`h-16 w-16 bg-gray-100 rounded-full flex items-center justify-center border-2 ${freelancer.lastLogin === "Ativo agora"
                                ? "border-emerald-300"
                                : "border-gray-300"
                                }`}>
                                <User
                                  className={`h-8 w-8 ${freelancer.lastLogin === "Ativo agora"
                                    ? "text-emerald-400"
                                    : "text-gray-400"
                                    }`}
                                />
                              </div>

                              {/* Status Badge */}
                              <span className="text-xs">Último acesso:</span>
                              {freelancer.lastLogin === "Ativo agora" ? (
                                <div className="flex items-center px-2 mt-1 text-xs font-bold border rounded-full shadow-sm bg-emerald-100 text-emerald-800 border-emerald-300">
                                  <div className="w-2 h-2 mr-1 rounded-full bg-emerald-800 animate-pulse" />
                                  Online
                                </div>
                              ) : (
                                <div className="flex items-center px-2 mt-1 text-xs font-bold text-blue-600 bg-blue-100 border border-blue-100 rounded-full shadow-sm">
                                  <Hourglass className="w-3 h-3 mr-1 text-blue-600" />
                                  {freelancer.lastLogin}
                                </div>
                              )}
                            </div>
                          </div>

                        </div>

                        <div className="flex-1 min-w-0">
                          <div className="flex flex-col justify-between h-full">
                            <div className="flex justify-between">
                              <div>
                                <h3 className="text-lg font-bold leading-none text-gray-500 truncate">
                                  {freelancer.name}
                                </h3>
                                <div className="flex items-center gap-2 mt-0.5">
                                  <div className="text-muted-foreground">
                                    <Icon className="w-4 h-4 text-muted-foreground" />
                                  </div>
                                  <p className="text-sm font-semibold text-gray-600">
                                    {freelancer.role}
                                  </p>
                                </div>
                                <div className="flex flex-wrap items-center gap-2 mt-2">
                                  {/* Badge de avaliação */}
                                  <div className="flex items-center gap-1 text-xs font-semibold text-gray-700 border border-gray-200 bg-gray-100 px-2 py-0.5 rounded-full shadow-sm">
                                    <Star className="w-3 h-3 text-yellow-500 fill-yellow-500" />
                                    <span>{freelancer.rating}</span>
                                  </div>

                                  {/* Badge de turnos */}
                                  {freelancer.shift.length === 3 ? (
                                    <div className="text-xs font-medium text-gray-700 border border-gray-200 bg-gray-100 px-2 py-0.5 rounded-full shadow-sm">
                                      Todos os turnos
                                    </div>
                                  ) : (
                                    freelancer.shift.map((turno, index) => (
                                      <div
                                        key={index}
                                        className="text-xs font-medium text-gray-700 border border-gray-200 bg-gray-100 px-2 py-0.5 rounded-full shadow-sm"
                                      >
                                        {turno.charAt(0).toUpperCase() + turno.slice(1)}
                                      </div>
                                    ))
                                  )}

                                </div>

                              </div>
                              {/* Price at top */}
                              <span className="block text-base font-bold leading-tight text-right text-muted-foreground">
                                <span className="leading-none text-emerald-500">{freelancer.price}</span>
                                <br />
                                <span className="text-sm font-light leading-none text-muted-foreground">Hora</span>
                              </span>
                            </div>

                            <Separator className="h-px my-2 bg-gray-200" />
                            <div className="flex items-center justify-between w-full">

                              {/* Botão expandir perfil*/}
                              <Button
                                variant="ghost"
                                size="sm"
                                className="w-full py-1 text-sm font-medium text-gray-600 transition-all duration-300 ease-in-out bg-gray-100 ring-1 ring-gray-500/10 ring-inset hover:bg-gray-600 hover:text-white hover:ring-gray-300/40 hover:shadow-sm group-hover:bg-gray-700 group-hover:text-white group-hover:ring-gray-300/40 group-hover:shadow-sm">
                                Mais Detalhes

                                {/* Ícone central */}
                                <span className="relative z-10 pointer-events-none">
                                  <Info className="w-4 h-4" />
                                </span>
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </>
        )
      }

      {/* Profile Modal */}
      <Dialog open={!!selectedFreelancer} onOpenChange={() => setSelectedFreelancer(null)}>
        <DialogContent className="max-w-md mx-auto max-h-[90vh] overflow-y-auto">
          {selectedFreelancer && (
            <>
              <DialogHeader>
                <DialogTitle className="flex items-center justify-between text-xl font-semibold tracking-tight text-gray-800">
                  <span className="truncate max-w-[85%]">{selectedFreelancer.name}</span>
                </DialogTitle>
              </DialogHeader>

              <div className="space-y-6">
                {/* Profile Header */}
                <div className="flex items-start space-x-4">
                  <div className="relative">
                    <div
                      className={`h-16 w-16 ${getUserIconVariant(selectedFreelancer.userIconVariant).bg} rounded-full flex items-center justify-center border-2 border-gray-100`}
                    >
                      <User className={`h-8 w-8 ${getUserIconVariant(selectedFreelancer.userIconVariant).text}`} />
                    </div>
                    <div
                      className={`absolute -bottom-1 -right-1 w-6 h-6 ${selectedFreelancer.iconColor} rounded-full flex items-center justify-center text-xs border-2 border-white shadow-lg`}
                    >
                      {selectedFreelancer.profileIcon}
                    </div>
                    {selectedFreelancer.online && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation()
                          toggleSaved(selectedFreelancer.id)
                        }}
                        className="absolute p-1 transition-shadow bg-white border-2 border-gray-100 rounded-full shadow-lg -top-1 -left-1 h-7 w-7 hover:shadow-xl"
                      >
                        <Bookmark
                          className={`h-4 w-4 ${savedFreelancers.includes(selectedFreelancer.id)
                            ? "fill-blue-500 text-blue-500"
                            : "text-gray-400"
                            }`}
                        />
                      </Button>
                    )}
                  </div>

                  <div className="flex-1">
                    <p className="font-medium text-blue-600">{selectedFreelancer.role}</p>
                    <div className="flex items-center mt-2 space-x-4">
                      <div className="flex items-center">
                        <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                        <span className="ml-1 text-sm font-medium">{selectedFreelancer.rating}</span>
                      </div>
                      <span className="font-semibold text-blue-600">{selectedFreelancer.price}</span>
                    </div>
                    {selectedFreelancer.online ? (
                      <Badge variant="secondary" className="mt-2 text-xs text-green-800 bg-green-100">
                        Online
                      </Badge>
                    ) : (
                      <Badge variant="secondary" className="mt-2 text-xs text-gray-700 bg-gray-100">
                        <Clock className="w-3 h-3 mr-1" />
                        {selectedFreelancer.availability}
                      </Badge>
                    )}
                  </div>
                </div>

                {/* Stats */}
                <div className="relative p-6 overflow-hidden border border-gray-100 rounded-2xl bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50">
                  <div className="absolute top-0 right-0 w-32 h-32 translate-x-16 -translate-y-16 rounded-full bg-gradient-to-br from-blue-200/20 to-purple-200/20"></div>
                  <div className="relative grid grid-cols-3 gap-6">
                    <div className="text-center">
                      <div className="flex items-center justify-center w-12 h-12 mx-auto mb-2 shadow-lg bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl">
                        <CheckCircle className="w-6 h-6 text-white" />
                      </div>
                      <div className="mb-1 text-2xl font-bold text-slate-800">{selectedFreelancer.completedJobs}</div>
                      <div className="text-xs font-medium text-slate-600">Trabalhos</div>
                    </div>
                    <div className="text-center">
                      <div className="flex items-center justify-center w-12 h-12 mx-auto mb-2 shadow-lg bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-xl">
                        <Clock className="w-6 h-6 text-white" />
                      </div>
                      <div className="mb-1 text-2xl font-bold text-slate-800">{selectedFreelancer.responseTime}</div>
                      <div className="text-xs font-medium text-slate-600">Resposta</div>
                    </div>
                    <div className="text-center">
                      <div className="flex items-center justify-center w-12 h-12 mx-auto mb-2 shadow-lg bg-gradient-to-br from-amber-500 to-orange-500 rounded-xl">
                        <span className="text-lg text-white">☀️</span>
                      </div>
                      <div className="mb-1 text-2xl font-bold text-slate-800">Manhã</div>
                      <div className="text-xs font-medium text-slate-600">Turno ativo</div>
                    </div>
                  </div>
                </div>

                <Button
                  variant="outline"
                  className="w-full h-12 font-semibold text-blue-700 border-2 border-blue-200 hover:bg-blue-50 hover:border-blue-300"
                >
                  <User className="w-5 h-5 mr-2" />
                  Ver Perfil Completo
                </Button>

                <Separator />

                {/* Action Buttons */}
                <div className="grid grid-cols-2 gap-3">
                  <Button
                    onClick={() => handleCall(selectedFreelancer)}
                    className={`h-12 ${selectedFreelancer.online
                      ? "bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                      : "bg-gray-400 cursor-not-allowed"
                      }`}
                    disabled={!selectedFreelancer.online}
                  >
                    <div className="flex items-center">
                      {selectedFreelancer.online && <div className="w-2 h-2 mr-2 bg-green-400 rounded-full"></div>}
                      <Phone className="w-4 h-4 mr-2" />
                      Chamar agora
                    </div>
                  </Button>
                  <Button
                    onClick={() => handleChat(selectedFreelancer)}
                    variant="outline"
                    className="h-12 border-gray-200 hover:bg-gray-50"
                  >
                    <MessageCircle className="w-4 h-4 mr-2" />
                    Iniciar Chat
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
