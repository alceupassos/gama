'use client'

import { useMemo, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, type Variants } from 'framer-motion'
import {
  Activity,
  AlertTriangle,
  BriefcaseBusiness,
  Building2,
  Calendar,
  CheckCircle,
  ChevronDown,
  DollarSign,
  FileText,
  Filter,
  Layers,
  LogOut,
  MapPin,
  MoreVertical,
  Phone,
  Plus,
  Search,
  Star,
  TrendingUp,
  Users,
  Zap,
} from 'lucide-react'
import {
  MOCK_BRANCHES,
  MOCK_CLIENTS,
  MOCK_EMPLOYEES,
  MOCK_KPI_REPORTS,
  MOCK_QUOTES,
  MOCK_WORK_ORDERS,
  Employee,
  WorkOrder,
} from '@/lib/mockData'

type Tab = 'overview' | 'os' | 'employees' | 'clients' | 'quotes' | 'business'

const cardEnter: Variants = {
  hidden: { opacity: 0, y: 22, scale: 0.98 },
  show: (index: number = 0) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.5, delay: index * 0.07, ease: [0.22, 1, 0.36, 1] },
  }),
}

function AnimatedNumber({ value, prefix = '', suffix = '' }: { value: number; prefix?: string; suffix?: string }) {
  return <span className="kpi-value">{prefix}{value.toLocaleString('pt-BR')}{suffix}</span>
}

function SafeAvatar({ src, alt, size = 40 }: { src?: string; alt: string; size?: number }) {
  const [hasError, setHasError] = useState(false)
  const avatarSrc = src && !hasError ? src : '/images/avatars/placeholder-user.svg'

  return (
    <div
      className="relative overflow-hidden rounded-xl border border-[rgba(120,147,196,0.34)] bg-[rgba(9,14,25,0.9)]"
      style={{ width: size, height: size }}
    >
      <Image
        src={avatarSrc}
        alt={alt}
        fill
        className="object-cover"
        onError={() => setHasError(true)}
        sizes={`${size}px`}
      />
    </div>
  )
}

function RevenueAreaCard() {
  const bars = [38, 62, 54, 76, 68, 86, 74, 91]

  return (
    <div className="metal-card p-5 admin-enter" style={{ animationDelay: '0.1s' }}>
      <div className="metal-shine" />
      <div className="flex items-center justify-between mb-4">
        <div>
          <p className="kpi-label">Receita Mensal (30 dias)</p>
          <AnimatedNumber value={58420} prefix="R$ " />
        </div>
        <span className="text-xs text-[var(--admin-green)] font-semibold">+15.2%</span>
      </div>
      <div className="metal-card-plot h-36 p-4 flex items-end gap-2">
        {bars.map((bar, idx) => (
          <motion.div
            key={`${bar}-${idx}`}
            className="flex-1 rounded-md"
            style={{
              height: `${bar}%`,
              background: 'linear-gradient(180deg, rgba(39,216,255,0.88), rgba(22,86,148,0.7))',
              boxShadow: '0 8px 26px rgba(39,216,255,0.22)',
            }}
            initial={{ scaleY: 0.15, opacity: 0.4 }}
            animate={{ scaleY: 1, opacity: 1 }}
            transition={{ delay: 0.2 + idx * 0.04, duration: 0.5 }}
          />
        ))}
      </div>
    </div>
  )
}

function StatusRingCard({ workOrders }: { workOrders: WorkOrder[] }) {
  const total = workOrders.length || 1
  const done = workOrders.filter((os) => os.status === 'done').length
  const inProgress = workOrders.filter((os) => os.status === 'in_progress').length
  const pending = workOrders.filter((os) => os.status === 'pending' || os.status === 'scheduled').length

  const doneDeg = (done / total) * 360
  const progressDeg = (inProgress / total) * 360
  const pendingDeg = 360 - doneDeg - progressDeg

  return (
    <div className="metal-card p-5 admin-enter" style={{ animationDelay: '0.2s' }}>
      <p className="kpi-label mb-4">Distribuição de OS</p>
      <div className="flex items-center gap-5">
        <div className="relative w-28 h-28 rounded-full border border-[rgba(120,147,196,0.28)] grid place-items-center">
          <div
            className="absolute inset-2 rounded-full rotate-slow"
            style={{
              background: `conic-gradient(#3de7af 0deg ${doneDeg}deg, #27d8ff ${doneDeg}deg ${doneDeg + progressDeg}deg, #ffb347 ${doneDeg + progressDeg}deg ${doneDeg + progressDeg + pendingDeg}deg)`,
              filter: 'drop-shadow(0 0 16px rgba(39,216,255,0.22))',
            }}
          />
          <div className="absolute inset-5 rounded-full bg-[var(--admin-bg)] border border-[rgba(120,147,196,0.28)]" />
          <span className="relative text-lg font-bold">{workOrders.length}</span>
        </div>
        <div className="space-y-2 text-xs">
          <p className="flex items-center gap-2"><span className="metric-dot text-[var(--admin-green)]" />Concluídas: {done}</p>
          <p className="flex items-center gap-2"><span className="metric-dot text-[var(--admin-cyan)]" />Em curso: {inProgress}</p>
          <p className="flex items-center gap-2"><span className="metric-dot text-[var(--admin-amber)]" />Pendentes: {pending}</p>
        </div>
      </div>
    </div>
  )
}

function Branch3DCard({ employees }: { employees: Employee[] }) {
  const branches = MOCK_BRANCHES.map((branch) => {
    const count = employees.filter((emp) => emp.branch_id === branch.id).length
    return { branch, count, h: Math.max(22, count * 28) }
  })

  return (
    <div className="metal-card p-5 admin-enter" style={{ animationDelay: '0.3s' }}>
      <p className="kpi-label mb-4">Produtividade por Filial</p>
      <div className="metal-card-plot h-44 px-5 py-4 flex items-end justify-around">
        {branches.map((item, idx) => (
          <motion.div key={item.branch.id} className="flex flex-col items-center gap-2" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 + idx * 0.08 }}>
            <div className="bar-3d" style={{ ['--h' as string]: `${item.h}%` }} />
            <span className="text-[10px] text-[var(--admin-text-muted)]">{item.branch.city}</span>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

function SlaLineCard() {
  const points = [82, 75, 88, 78, 91, 85, 94]
  const width = 280
  const height = 110
  const step = width / (points.length - 1)
  const max = 100

  const linePath = points
    .map((point, idx) => {
      const x = idx * step
      const y = height - (point / max) * height
      return `${idx === 0 ? 'M' : 'L'} ${x},${y}`
    })
    .join(' ')

  return (
    <div className="metal-card p-5 admin-enter" style={{ animationDelay: '0.4s' }}>
      <div className="flex items-center justify-between mb-3">
        <p className="kpi-label">SLA de Atendimento</p>
        <span className="text-xs text-[var(--admin-blue)]">94%</span>
      </div>
      <div className="metal-card-plot h-36 p-3">
        <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-full">
          <defs>
            <linearGradient id="sla-stroke" x1="0" x2="1" y1="0" y2="0">
              <stop offset="0%" stopColor="#6fb8ff" />
              <stop offset="50%" stopColor="#27d8ff" />
              <stop offset="100%" stopColor="#3de7af" />
            </linearGradient>
          </defs>
          <path d={linePath} fill="none" stroke="url(#sla-stroke)" strokeWidth="4" strokeLinecap="round" />
          {points.map((point, idx) => {
            const x = idx * step
            const y = height - (point / max) * height
            return <circle key={`${point}-${idx}`} cx={x} cy={y} r="4" fill="#27d8ff" className="pulse-soft" />
          })}
        </svg>
      </div>
    </div>
  )
}

function PipelineLayerCard() {
  const layers = [92, 72, 51, 34]

  return (
    <div className="metal-card p-5 admin-enter" style={{ animationDelay: '0.5s' }}>
      <p className="kpi-label mb-4">Pipeline de Propostas</p>
      <div className="metal-card-plot h-36 p-4 flex flex-col justify-center gap-3">
        {layers.map((w, idx) => (
          <motion.div
            key={`${w}-${idx}`}
            className="h-5 rounded-md"
            initial={{ width: '12%', opacity: 0 }}
            animate={{ width: `${w}%`, opacity: 1 }}
            transition={{ delay: 0.18 + idx * 0.08, duration: 0.5 }}
            style={{
              background: idx === 0
                ? 'linear-gradient(90deg, rgba(39,216,255,0.95), rgba(111,184,255,0.9))'
                : idx === 1
                ? 'linear-gradient(90deg, rgba(111,184,255,0.9), rgba(61,231,175,0.8))'
                : idx === 2
                ? 'linear-gradient(90deg, rgba(255,179,71,0.9), rgba(255,140,80,0.8))'
                : 'linear-gradient(90deg, rgba(255,107,122,0.9), rgba(168,63,74,0.8))',
              boxShadow: '0 6px 16px rgba(0,0,0,0.35)',
            }}
          />
        ))}
      </div>
      <p className="text-xs mt-3 text-[var(--admin-text-muted)]">Conversão atual 37% | Ticket médio R$ 28.6k</p>
    </div>
  )
}

function HeatmapCard() {
  const matrix = [
    [2, 3, 4, 2, 1, 0, 1],
    [1, 4, 5, 4, 3, 2, 1],
    [0, 3, 4, 5, 4, 2, 1],
    [1, 2, 3, 4, 5, 3, 2],
  ]

  return (
    <div className="metal-card p-5 admin-enter" style={{ animationDelay: '0.6s' }}>
      <p className="kpi-label mb-4">Heatmap Operacional</p>
      <div className="metal-card-plot h-36 p-3 grid grid-cols-7 gap-1.5">
        {matrix.flat().map((value, idx) => {
          const alpha = 0.15 + value * 0.16
          return (
            <motion.div
              key={`${value}-${idx}`}
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: idx * 0.012 }}
              className="rounded-sm border border-[rgba(120,147,196,0.2)]"
              style={{ background: `rgba(39,216,255,${alpha})` }}
            />
          )
        })}
      </div>
      <p className="text-xs mt-3 text-[var(--admin-text-muted)]">Picos entre 10h e 14h nos últimos 7 dias</p>
    </div>
  )
}

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState<Tab>('overview')
  const [selectedBranchId, setSelectedBranchId] = useState<string>('all')
  const [isBranchMenuOpen, setIsBranchMenuOpen] = useState(false)

  const filteredEmployees = useMemo(() => {
    if (selectedBranchId === 'all') return MOCK_EMPLOYEES
    return MOCK_EMPLOYEES.filter((emp) => emp.branch_id === selectedBranchId)
  }, [selectedBranchId])

  const filteredOS = useMemo(() => {
    if (selectedBranchId === 'all') return MOCK_WORK_ORDERS
    return MOCK_WORK_ORDERS.filter((os) => os.branch_id === selectedBranchId)
  }, [selectedBranchId])

  const currentBranchName = useMemo(() => {
    if (selectedBranchId === 'all') return 'Todas as Filiais'
    return MOCK_BRANCHES.find((branch) => branch.id === selectedBranchId)?.name || 'Filial Desconhecida'
  }, [selectedBranchId])

  return (
    <div className="admin-shell">
      <div className="admin-grid-bg" />
      <div className="admin-content min-h-screen flex flex-col md:flex-row">
        <aside className="hidden md:flex w-72 metal-panel border-r border-[rgba(120,147,196,0.28)] flex-col sticky top-0 h-screen">
          <div className="p-6 border-b border-[rgba(120,147,196,0.24)] flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[var(--admin-cyan-soft)] border border-[rgba(39,216,255,0.45)] grid place-items-center">
              <Zap className="w-5 h-5 text-[var(--admin-cyan)]" />
            </div>
            <div>
              <p className="text-sm font-semibold tracking-wide">GAMA SERVICES</p>
              <p className="text-[11px] text-[var(--admin-text-muted)] uppercase">Admin Command Center</p>
            </div>
          </div>

          <nav className="flex-1 p-4 space-y-2">
            {[
              { id: 'overview', label: 'Dashboard', icon: TrendingUp },
              { id: 'business', label: 'Gestão do negócio', icon: BriefcaseBusiness },
              { id: 'os', label: 'Ordens de Serviço', icon: FileText },
              { id: 'employees', label: 'Equipe', icon: Users },
              { id: 'clients', label: 'Clientes', icon: Building2 },
              { id: 'quotes', label: 'Orçamentos', icon: DollarSign },
            ].map((item) => {
              const Icon = item.icon
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id as Tab)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all border ${
                    activeTab === item.id
                      ? 'border-[rgba(39,216,255,0.45)] bg-[rgba(39,216,255,0.12)] text-white shadow-[0_0_18px_rgba(39,216,255,0.2)]'
                      : 'border-transparent text-[var(--admin-text-muted)] hover:text-white hover:bg-[rgba(18,28,48,0.85)]'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span className="text-sm font-medium">{item.label}</span>
                </button>
              )
            })}
          </nav>

          <div className="p-4 border-t border-[rgba(120,147,196,0.24)]">
            <Link href="/login" className="flex items-center gap-3 px-4 py-3 rounded-xl text-[var(--admin-text-muted)] hover:text-[var(--admin-red)] hover:bg-[rgba(255,107,122,0.08)] transition-colors">
              <LogOut className="w-4 h-4" />
              <span className="text-sm">Sair</span>
            </Link>
          </div>
        </aside>

        <main className="flex-1 flex flex-col overflow-y-auto">
          <header className="metal-panel border-b border-[rgba(120,147,196,0.24)] px-5 md:px-8 py-4 sticky top-0 z-40 flex items-center justify-between">
            <div className="flex items-center gap-4 md:gap-6">
              <h1 className="text-lg md:text-2xl font-bold">
                {activeTab === 'overview'
                  ? 'Dashboard Executivo'
                  : activeTab === 'business'
                  ? 'Gestão do Negócio'
                  : activeTab === 'os'
                  ? 'Ordens de Serviço'
                  : activeTab === 'employees'
                  ? 'Gestão de Equipes'
                  : activeTab === 'clients'
                  ? 'Carteira de Clientes'
                  : 'Propostas Comerciais'}
              </h1>

              <div className="relative">
                <button
                  onClick={() => setIsBranchMenuOpen((prev) => !prev)}
                  className="flex items-center gap-2 px-3 py-2 text-xs rounded-lg border border-[rgba(120,147,196,0.36)] bg-[rgba(11,18,32,0.8)] hover:border-[rgba(39,216,255,0.55)] transition-colors"
                >
                  <Building2 className="w-3.5 h-3.5 text-[var(--admin-cyan)]" />
                  <span>{currentBranchName}</span>
                  <ChevronDown className={`w-3.5 h-3.5 transition-transform ${isBranchMenuOpen ? 'rotate-180' : ''}`} />
                </button>

                {isBranchMenuOpen && (
                  <div className="absolute top-full left-0 mt-2 w-56 rounded-xl overflow-hidden metal-panel border border-[rgba(120,147,196,0.3)] z-50">
                    <button
                      onClick={() => {
                        setSelectedBranchId('all')
                        setIsBranchMenuOpen(false)
                      }}
                      className={`w-full text-left px-4 py-2.5 text-xs ${selectedBranchId === 'all' ? 'bg-[rgba(39,216,255,0.18)]' : 'hover:bg-[rgba(18,28,48,0.85)]'}`}
                    >
                      Todas as Filiais
                    </button>
                    {MOCK_BRANCHES.map((branch) => (
                      <button
                        key={branch.id}
                        onClick={() => {
                          setSelectedBranchId(branch.id)
                          setIsBranchMenuOpen(false)
                        }}
                        className={`w-full text-left px-4 py-2.5 text-xs ${selectedBranchId === branch.id ? 'bg-[rgba(39,216,255,0.18)]' : 'hover:bg-[rgba(18,28,48,0.85)]'}`}
                      >
                        {branch.name}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button className="relative p-2 rounded-lg border border-[rgba(120,147,196,0.35)] text-[var(--admin-text-muted)] hover:text-white">
                <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-[var(--admin-cyan)] pulse-soft" />
                <Calendar className="w-4 h-4" />
              </button>
              <SafeAvatar src="https://api.dicebear.com/7.x/avataaars/svg?seed=Admin" alt="Admin" size={42} />
            </div>
          </header>

          <div className="p-5 md:p-8 max-w-[1280px] w-full mx-auto space-y-8">
            {activeTab === 'overview' && <OverviewTab employees={filteredEmployees} workOrders={filteredOS} />}
            {activeTab === 'business' && <BusinessManagementTab workOrders={filteredOS} employees={filteredEmployees} />}
            {activeTab === 'os' && <OSTab workOrders={filteredOS} />}
            {activeTab === 'employees' && <EmployeesTab employees={filteredEmployees} />}
            {activeTab === 'clients' && <ClientsTab branchId={selectedBranchId} />}
            {activeTab === 'quotes' && <QuotesTab />}
          </div>
        </main>
      </div>
    </div>
  )
}

function OverviewTab({ employees, workOrders }: { employees: Employee[]; workOrders: WorkOrder[] }) {
  const activeOS = workOrders.filter((os) => os.status === 'in_progress').length
  const completedOS = workOrders.filter((os) => os.status === 'done').length
  const pendingOS = workOrders.filter((os) => os.status === 'pending' || os.status === 'scheduled').length

  return (
    <div className="space-y-7">
      <section className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {[
          { label: 'Faturamento Mês', value: 58420, icon: DollarSign, tone: 'var(--admin-green)', chip: MOCK_KPI_REPORTS.revenue_trend, prefix: 'R$ ' },
          { label: 'OS em Curso', value: activeOS, icon: Activity, tone: 'var(--admin-cyan)', chip: 'Ativas' },
          { label: 'OS Concluídas', value: completedOS, icon: CheckCircle, tone: 'var(--admin-blue)', chip: '+8%' },
          { label: 'Pendências', value: pendingOS, icon: AlertTriangle, tone: 'var(--admin-amber)', chip: 'Atenção' },
        ].map((kpi, idx) => (
          <motion.div key={kpi.label} className="metal-card p-5" variants={cardEnter} initial="hidden" animate="show" custom={idx}>
            <div className="metal-shine" />
            <div className="flex items-center justify-between mb-4">
              <div className="w-11 h-11 rounded-xl border border-[rgba(120,147,196,0.36)] grid place-items-center" style={{ background: 'rgba(10,19,35,0.9)' }}>
                <kpi.icon className="w-5 h-5" style={{ color: kpi.tone }} />
              </div>
              <span className="text-[10px] uppercase tracking-wider px-2 py-1 rounded-full" style={{ background: 'rgba(39,216,255,0.12)', color: 'var(--admin-cyan)' }}>{kpi.chip}</span>
            </div>
            <AnimatedNumber value={kpi.value} prefix={kpi.prefix} />
            <p className="kpi-label mt-2">{kpi.label}</p>
          </motion.div>
        ))}
      </section>

      <section className="grid xl:grid-cols-3 gap-4">
        <div className="xl:col-span-2 grid sm:grid-cols-2 gap-4">
          <RevenueAreaCard />
          <StatusRingCard workOrders={workOrders} />
          <Branch3DCard employees={employees} />
          <SlaLineCard />
          <PipelineLayerCard />
          <HeatmapCard />
        </div>

        <div className="metal-card p-5 h-fit">
          <p className="kpi-label mb-4 flex items-center gap-2"><MapPin className="w-4 h-4 text-[var(--admin-cyan)]" /> Status ao Vivo da Equipe</p>
          <div className="space-y-4">
            {employees.slice(0, 5).map((tech) => (
              <div key={tech.id} className="flex items-start gap-3 pb-3 border-b border-[rgba(120,147,196,0.16)] last:border-b-0 last:pb-0">
                <div className="relative">
                  <SafeAvatar src={tech.avatar_url} alt={tech.full_name} size={46} />
                  <span
                    className={`absolute -bottom-1 -right-1 w-3.5 h-3.5 border-2 border-[var(--admin-panel)] rounded-full ${
                      tech.status === 'online'
                        ? 'bg-[var(--admin-green)]'
                        : tech.status === 'busy'
                        ? 'bg-[var(--admin-red)]'
                        : tech.status === 'on_break'
                        ? 'bg-[var(--admin-amber)]'
                        : 'bg-slate-500'
                    }`}
                  />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-semibold truncate">{tech.full_name}</p>
                  <p className="text-[11px] text-[var(--admin-text-muted)] truncate">{tech.last_location || 'Localização indisponível'}</p>
                  <p className="text-[11px] mt-1 text-[var(--admin-cyan)]">{tech.current_os ? `Ativo em ${tech.current_os}` : 'Disponível para despacho'}</p>
                </div>
              </div>
            ))}
          </div>
          <button className="w-full mt-5 text-sm font-semibold py-3 rounded-xl bg-[rgba(39,216,255,0.16)] border border-[rgba(39,216,255,0.45)] hover:bg-[rgba(39,216,255,0.24)] transition-colors">
            Abrir Monitoramento Completo
          </button>
        </div>
      </section>
    </div>
  )
}

function OSTab({ workOrders }: { workOrders: WorkOrder[] }) {
  return (
    <div className="space-y-5">
      <div className="flex flex-col md:flex-row md:items-center gap-3 md:justify-between">
        <div className="relative w-full md:max-w-md">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[var(--admin-text-muted)]" />
          <input
            type="text"
            placeholder="Pesquisar por cliente, ID ou serviço"
            className="w-full pl-10 pr-4 py-3 rounded-xl metal-panel border border-[rgba(120,147,196,0.32)] text-sm outline-none focus:border-[rgba(39,216,255,0.55)]"
          />
        </div>
        <div className="flex gap-3">
          <button className="px-4 py-3 text-sm rounded-xl metal-panel border border-[rgba(120,147,196,0.3)] flex items-center gap-2"><Filter className="w-4 h-4" />Filtros</button>
          <button className="px-4 py-3 text-sm rounded-xl bg-[rgba(39,216,255,0.18)] border border-[rgba(39,216,255,0.5)] flex items-center gap-2"><Plus className="w-4 h-4" />Nova OS</button>
        </div>
      </div>

      <div className="grid gap-3">
        {workOrders.map((os) => {
          const tech = MOCK_EMPLOYEES.find((employee) => employee.id === os.tech_id)
          return (
            <div key={os.id} className="metal-card p-4 md:p-5">
              <div className="flex flex-wrap items-center gap-4 justify-between">
                <div>
                  <p className="text-xs text-[var(--admin-text-muted)]">#{os.id}</p>
                  <p className="font-semibold">{os.service_type}</p>
                  <p className="text-xs text-[var(--admin-text-muted)]">{os.client_name}</p>
                </div>
                <div className="flex items-center gap-3">
                  <div className="hidden md:block text-right">
                    <p className="text-[11px] text-[var(--admin-text-muted)]">Responsável</p>
                    <p className="text-sm">{tech?.full_name || 'Sem técnico'}</p>
                  </div>
                  <SafeAvatar src={tech?.avatar_url} alt={tech?.full_name || 'Tecnico'} size={34} />
                  <span className="text-[10px] uppercase px-2 py-1 rounded-full border border-[rgba(120,147,196,0.3)] bg-[rgba(11,18,32,0.85)]">
                    {os.status.replace('_', ' ')}
                  </span>
                  <button className="p-2 rounded-lg text-[var(--admin-text-muted)] hover:text-white"><MoreVertical className="w-4 h-4" /></button>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

function EmployeesTab({ employees }: { employees: Employee[] }) {
  return (
    <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-4">
      {employees.map((emp, idx) => (
        <motion.div key={emp.id} className="metal-card p-5" variants={cardEnter} initial="hidden" animate="show" custom={idx}>
          <div className="flex items-start gap-3 mb-4">
            <SafeAvatar src={emp.avatar_url} alt={emp.full_name} size={56} />
            <div>
              <p className="font-semibold leading-tight">{emp.full_name}</p>
              <p className="text-xs text-[var(--admin-cyan)]">{emp.role}</p>
              <a href={`tel:${emp.phone}`} className="text-xs text-[var(--admin-text-muted)] inline-flex gap-1 items-center mt-1"><Phone className="w-3 h-3" />{emp.phone}</a>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2 mb-4 text-xs">
            <div className="metal-panel rounded-xl p-2 border border-[rgba(120,147,196,0.2)]">
              <p className="text-[var(--admin-text-muted)]">Qualidade</p>
              <p className="font-semibold flex items-center gap-1"><Star className="w-3 h-3 text-[var(--admin-amber)]" />{emp.kpis.client_rating}</p>
            </div>
            <div className="metal-panel rounded-xl p-2 border border-[rgba(120,147,196,0.2)]">
              <p className="text-[var(--admin-text-muted)]">Entregas</p>
              <p className="font-semibold">{emp.kpis.os_completed} OS</p>
            </div>
          </div>

          <p className="text-[11px] text-[var(--admin-text-muted)] mb-1">Pontualidade {emp.kpis.punctuality}%</p>
          <div className="h-2 rounded-full bg-[rgba(120,147,196,0.2)] overflow-hidden">
            <div className="h-full rounded-full" style={{ width: `${emp.kpis.punctuality}%`, background: 'linear-gradient(90deg, #27d8ff, #6fb8ff)' }} />
          </div>
        </motion.div>
      ))}
    </div>
  )
}

function ClientsTab({ branchId }: { branchId: string }) {
  const filteredClients = useMemo(() => {
    if (branchId === 'all') return MOCK_CLIENTS
    return MOCK_CLIENTS.filter((client) => client.branch_id === branchId)
  }, [branchId])

  return (
    <div className="grid gap-3">
      {filteredClients.map((client) => (
        <div key={client.id} className="metal-card p-4 md:p-5">
          <div className="flex flex-wrap justify-between items-center gap-3">
            <div>
              <p className="font-semibold text-lg">{client.name}</p>
              <p className="text-xs text-[var(--admin-text-muted)]">{client.segment} | {client.contact_person}</p>
            </div>
            <div className="text-right">
              <p className="text-xs text-[var(--admin-text-muted)]">Contrato</p>
              <p className="text-sm text-[var(--admin-green)] font-semibold">{client.contract_value}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

function BusinessManagementTab({ workOrders, employees }: { workOrders: WorkOrder[]; employees: Employee[] }) {
  const osDone = workOrders.filter((order) => order.status === 'done').length
  const osInProgress = workOrders.filter((order) => order.status === 'in_progress').length
  const highPriority = workOrders.filter((order) => order.priority === 'high').length
  const occupancy = Math.min(96, Math.round((osInProgress / Math.max(1, employees.length)) * 100))
  const retention = 91
  const nps = 78
  const margin = 34
  const cash = 67

  const financeBars = [44, 51, 56, 70, 63, 78, 82, 90]
  const clientRadar = [72, 88, 76, 69, 84]
  const segments = [38, 27, 21, 14]
  const riskMatrix = [5, 2, 1, 3, 4, 6, 2, 0, 3, 7, 5, 1, 2, 3, 6, 8]

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {[
          { label: 'Margem Operacional', value: `${margin}%`, tone: 'var(--admin-green)' },
          { label: 'Saúde de Caixa', value: `${cash}%`, tone: 'var(--admin-cyan)' },
          { label: 'Retenção de Clientes', value: `${retention}%`, tone: 'var(--admin-blue)' },
          { label: 'Risco Crítico', value: `${highPriority}`, tone: 'var(--admin-red)' },
        ].map((item, idx) => (
          <motion.div key={item.label} className="metal-card p-5" variants={cardEnter} initial="hidden" animate="show" custom={idx}>
            <div className="metal-shine" />
            <p className="kpi-label">{item.label}</p>
            <p className="kpi-value mt-2" style={{ color: item.tone }}>{item.value}</p>
          </motion.div>
        ))}
      </div>

      <div className="grid xl:grid-cols-3 gap-4">
        <div className="metal-card p-5">
          <p className="kpi-label mb-4">Financeiro 3D (Receita x Custo)</p>
          <div className="metal-card-plot h-44 p-4 flex items-end gap-2">
            {financeBars.map((bar, idx) => (
              <motion.div
                key={`${bar}-${idx}`}
                className="relative flex-1 rounded-md"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: idx * 0.05 }}
                style={{
                  height: `${bar}%`,
                  background: 'linear-gradient(180deg, rgba(61,231,175,0.85), rgba(20,87,73,0.9))',
                  boxShadow: '8px 0 0 rgba(4,28,24,0.55), 0 8px 20px rgba(61,231,175,0.2)',
                }}
              />
            ))}
          </div>
        </div>

        <div className="metal-card p-5">
          <p className="kpi-label mb-4">Comercial (Funil em Camadas 3D)</p>
          <div className="metal-card-plot h-44 p-4 flex flex-col justify-center gap-3">
            {segments.map((segment, idx) => (
              <motion.div
                key={`${segment}-${idx}`}
                className="h-6 rounded-md"
                initial={{ width: '15%', opacity: 0 }}
                animate={{ width: `${segment + 45}%`, opacity: 1 }}
                transition={{ delay: idx * 0.08 }}
                style={{
                  background: idx === 0
                    ? 'linear-gradient(90deg, rgba(39,216,255,0.9), rgba(111,184,255,0.9))'
                    : idx === 1
                    ? 'linear-gradient(90deg, rgba(111,184,255,0.9), rgba(61,231,175,0.85))'
                    : idx === 2
                    ? 'linear-gradient(90deg, rgba(255,179,71,0.9), rgba(255,130,73,0.88))'
                    : 'linear-gradient(90deg, rgba(255,107,122,0.9), rgba(167,62,73,0.92))',
                  boxShadow: '0 8px 18px rgba(0,0,0,0.35)',
                }}
              />
            ))}
          </div>
        </div>

        <div className="metal-card p-5">
          <p className="kpi-label mb-4">Operação (Capacidade x Demanda)</p>
          <div className="metal-card-plot h-44 p-4 flex items-center justify-center">
            <div className="relative w-36 h-36">
              <div
                className="absolute inset-0 rounded-full rotate-slow"
                style={{ background: `conic-gradient(#27d8ff 0deg ${occupancy * 3.6}deg, rgba(120,147,196,0.2) ${occupancy * 3.6}deg 360deg)` }}
              />
              <div className="absolute inset-4 rounded-full bg-[var(--admin-bg)] border border-[rgba(120,147,196,0.3)] grid place-items-center">
                <div className="text-center">
                  <p className="kpi-value leading-none">{occupancy}%</p>
                  <p className="text-[10px] text-[var(--admin-text-muted)] uppercase">Ocupação</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid xl:grid-cols-3 gap-4">
        <div className="metal-card p-5">
          <p className="kpi-label mb-4">Clientes (Radar 3D)</p>
          <div className="metal-card-plot h-44 p-3 flex items-center justify-center">
            <svg viewBox="0 0 220 160" className="w-full h-full">
              <polygon points="110,16 190,58 160,142 60,142 30,58" fill="rgba(39,216,255,0.08)" stroke="rgba(120,147,196,0.25)" />
              <polygon points="110,30 177,65 152,132 68,132 43,65" fill="rgba(39,216,255,0.05)" stroke="rgba(120,147,196,0.2)" />
              <motion.polygon
                points={`${110},${160 - clientRadar[0]} ${110 + clientRadar[1] * 0.75},${80 - clientRadar[1] * 0.25} ${110 + clientRadar[2] * 0.5},${80 + clientRadar[2] * 0.6} ${110 - clientRadar[3] * 0.5},${80 + clientRadar[3] * 0.6} ${110 - clientRadar[4] * 0.75},${80 - clientRadar[4] * 0.25}`}
                fill="rgba(61,231,175,0.25)"
                stroke="#3de7af"
                strokeWidth="2"
                initial={{ opacity: 0.2, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6 }}
              />
            </svg>
          </div>
        </div>

        <div className="metal-card p-5">
          <p className="kpi-label mb-4">Pessoas (Desempenho por Time)</p>
          <div className="metal-card-plot h-44 p-4 grid grid-cols-5 items-end gap-3">
            {[62, 88, 54, 73, 91].map((value, idx) => (
              <div key={`${value}-${idx}`} className="flex flex-col items-center gap-2">
                <motion.div
                  className="w-8 rounded-t-lg"
                  initial={{ height: 8 }}
                  animate={{ height: `${value}%` }}
                  transition={{ delay: idx * 0.08, duration: 0.5 }}
                  style={{
                    background: 'linear-gradient(180deg, rgba(255,179,71,0.95), rgba(140,78,20,0.95))',
                    boxShadow: '7px 0 0 rgba(64,33,7,0.55)',
                  }}
                />
                <span className="text-[10px] text-[var(--admin-text-muted)]">{`T${idx + 1}`}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="metal-card p-5">
          <p className="kpi-label mb-4">Risco & Compliance (Matriz)</p>
          <div className="metal-card-plot h-44 p-3 grid grid-cols-4 gap-2">
            {riskMatrix.map((risk, idx) => (
              <motion.div
                key={`${risk}-${idx}`}
                className="rounded-md border border-[rgba(120,147,196,0.2)]"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: idx * 0.015 }}
                style={{
                  background: risk > 6
                    ? 'rgba(255,107,122,0.65)'
                    : risk > 3
                    ? 'rgba(255,179,71,0.6)'
                    : 'rgba(39,216,255,0.35)',
                }}
              />
            ))}
          </div>
        </div>
      </div>

      <div className="metal-card p-5">
        <p className="kpi-label mb-4">Resumo Executivo 360°</p>
        <div className="grid md:grid-cols-4 gap-3 text-sm">
          <div className="metal-panel p-3 rounded-xl border border-[rgba(120,147,196,0.2)]">
            <p className="text-[var(--admin-text-muted)] text-xs">Financeiro</p>
            <p className="font-semibold text-[var(--admin-green)]">Saudável, tendência de alta</p>
          </div>
          <div className="metal-panel p-3 rounded-xl border border-[rgba(120,147,196,0.2)]">
            <p className="text-[var(--admin-text-muted)] text-xs">Operação</p>
            <p className="font-semibold text-[var(--admin-cyan)]">{osInProgress} OS em andamento</p>
          </div>
          <div className="metal-panel p-3 rounded-xl border border-[rgba(120,147,196,0.2)]">
            <p className="text-[var(--admin-text-muted)] text-xs">Clientes</p>
            <p className="font-semibold text-[var(--admin-blue)]">NPS {nps} e retenção alta</p>
          </div>
          <div className="metal-panel p-3 rounded-xl border border-[rgba(120,147,196,0.2)]">
            <p className="text-[var(--admin-text-muted)] text-xs">Risco</p>
            <p className="font-semibold text-[var(--admin-red)]">{highPriority} alertas críticos ativos</p>
          </div>
        </div>
      </div>

      <div className="text-xs text-[var(--admin-text-muted)]">
        Dono do negócio: painel unificado com visão financeira, comercial, operacional, clientes, pessoas e risco em visual 3D gradeado.
        Concluídas: {osDone} | Em andamento: {osInProgress} | Equipes analisadas: {employees.length}
      </div>
    </div>
  )
}

function QuotesTab() {
  return (
    <div className="metal-card overflow-hidden">
      <div className="p-4 border-b border-[rgba(120,147,196,0.2)] flex items-center justify-between">
        <h3 className="text-sm font-semibold flex items-center gap-2"><Layers className="w-4 h-4 text-[var(--admin-cyan)]" />Pipeline Comercial</h3>
        <button className="px-3 py-2 rounded-lg text-xs bg-[rgba(39,216,255,0.16)] border border-[rgba(39,216,255,0.44)]">Nova Proposta</button>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead className="text-[10px] uppercase tracking-widest text-[var(--admin-text-muted)] border-b border-[rgba(120,147,196,0.2)]">
            <tr>
              <th className="px-4 py-3">ID</th>
              <th className="px-4 py-3">Cliente</th>
              <th className="px-4 py-3">Serviço</th>
              <th className="px-4 py-3">Valor</th>
              <th className="px-4 py-3">Status</th>
            </tr>
          </thead>
          <tbody>
            {MOCK_QUOTES.map((quote) => (
              <tr key={quote.id} className="border-b border-[rgba(120,147,196,0.15)] last:border-b-0 hover:bg-[rgba(39,216,255,0.06)]">
                <td className="px-4 py-3 text-xs text-[var(--admin-cyan)] font-semibold">{quote.id}</td>
                <td className="px-4 py-3">{quote.client_name}</td>
                <td className="px-4 py-3 text-[var(--admin-text-muted)]">{quote.service_type}</td>
                <td className="px-4 py-3">{quote.value}</td>
                <td className="px-4 py-3"><span className="text-[10px] uppercase px-2 py-1 rounded-full border border-[rgba(120,147,196,0.3)]">{quote.status}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
