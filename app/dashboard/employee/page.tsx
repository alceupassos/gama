'use client'
import { useState, useEffect } from 'react'
import { Clock, CheckCircle, AlertCircle, TrendingUp, MapPin, Play, Square, FileText, Zap } from 'lucide-react'
import Image from 'next/image'
import { createClient } from '@/lib/supabaseClient'

type ClockState = 'off' | 'in' | 'break'
type WorkOrder = { id: string; client_name: string; address: string; service_type: string; status: string; priority: string; scheduled_date: string }

export default function EmployeeDashboard() {
  const [clockState, setClockState] = useState<ClockState>('off')
  const [, setClockTime] = useState(0) // seconds
  const [elapsed, setElapsed] = useState<string>('00:00:00')
  const [isOnline, setIsOnline] = useState(true)
  const [location, setLocation] = useState<{ lat: number; lng: number } | null>(null)
  const [workOrders, setWorkOrders] = useState<WorkOrder[]>([])
  const [userName, setUserName] = useState('Colaborador')
  const [todayHours] = useState('6h 45min')
  const [weekHours] = useState('32h 20min')
  const [pendingOS] = useState(3)

  // Online/offline detection
  useEffect(() => {
    const handleOnline = () => setIsOnline(true)
    const handleOffline = () => setIsOnline(false)
    window.addEventListener('online', handleOnline)
    window.addEventListener('offline', handleOffline)
    return () => { window.removeEventListener('online', handleOnline); window.removeEventListener('offline', handleOffline) }
  }, [])

  // Timer
  useEffect(() => {
    let interval: NodeJS.Timeout
    if (clockState === 'in') {
      interval = setInterval(() => {
        setClockTime(t => {
          const next = t + 1
          const h = Math.floor(next / 3600).toString().padStart(2, '0')
          const m = Math.floor((next % 3600) / 60).toString().padStart(2, '0')
          const s = (next % 60).toString().padStart(2, '0')
          setElapsed(`${h}:${m}:${s}`)
          return next
        })
      }, 1000)
    }
    return () => clearInterval(interval)
  }, [clockState])

  // Fetch user & work orders
  useEffect(() => {
    const supabase = createClient()
    supabase.auth.getUser().then(({ data }) => {
      if (data.user) {
        supabase.from('profiles').select('full_name').eq('id', data.user.id).single()
          .then(({ data: p }) => { if (p) setUserName(p.full_name) })
        supabase.from('work_orders').select('*').eq('employee_id', data.user.id).order('scheduled_date', { ascending: true }).limit(5)
          .then(({ data: os }) => { if (os) setWorkOrders(os) })
      }
    })
  }, [])

  const handleClock = () => {
    if (clockState === 'off') {
      navigator.geolocation?.getCurrentPosition(pos => setLocation({ lat: pos.coords.latitude, lng: pos.coords.longitude }))
      setClockState('in')
    } else {
      setClockState('off')
      setClockTime(0)
      setElapsed('00:00:00')
    }
  }

  const priorityColor = (p: string) => p === 'high' ? 'text-red-400 bg-red-500/10' : p === 'medium' ? 'text-yellow-400 bg-yellow-500/10' : 'text-green-400 bg-green-500/10'
  const statusLabel = (s: string) => s === 'pending' ? 'Pendente' : s === 'in_progress' ? 'Em Andamento' : s === 'done' ? 'Concluída' : s

  return (
    <div className="min-h-screen bg-transparent">
      {/* Header */}
      <header className="bg-slate-950/20 backdrop-blur-xl border-b border-white/5 px-6 py-4 flex items-center justify-between sticky top-0 z-50">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 bg-sky-500 rounded-xl flex items-center justify-center shadow-lg shadow-sky-500/20">
            <Zap className="w-6 h-6 text-white" />
          </div>
          <div>
            <div className="text-[10px] uppercase font-bold text-slate-500 tracking-widest">Colaborador</div>
            <div className="text-sm font-extrabold text-white tracking-tight">{userName}</div>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-wider border shadow-sm transition-all ${
            isOnline ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' : 'bg-red-500/10 text-red-400 border-red-500/20'
          }`}>
            <span className={`w-1.5 h-1.5 rounded-full ${isOnline ? 'bg-emerald-500 animate-pulse' : 'bg-red-500'}`} />
            {isOnline ? 'Sistema Online' : 'Sem Conexão'}
          </div>
          <div className="w-10 h-10 rounded-full border border-slate-700 overflow-hidden relative cursor-pointer hover:border-sky-500 transition-all">
             <Image 
               src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${userName}`} 
               alt="UserAvatar" 
               fill
               className="object-cover"
             />
          </div>
        </div>
      </header>

      <main className="max-w-2xl mx-auto px-4 py-6 space-y-6">
        {/* Ponto Eletrônico */}
        <div className="glass rounded-2xl p-6 text-center">
          <h2 className="text-sm font-medium text-slate-400 mb-1">Ponto Eletrônico</h2>
          <div className="text-4xl font-mono font-bold text-white my-4 tabular-nums">{elapsed}</div>
          {location && clockState === 'in' && (
            <div className="flex items-center justify-center gap-1.5 text-xs text-slate-500 mb-4">
              <MapPin className="w-3 h-3 text-sky-400" />
              {location.lat.toFixed(4)}, {location.lng.toFixed(4)}
            </div>
          )}
          <button onClick={handleClock}
            className={`w-full max-w-xs py-4 rounded-xl font-bold text-white transition-all duration-200 flex items-center justify-center gap-2 mx-auto ${
              clockState === 'off'
                ? 'bg-sky-500 hover:bg-sky-400 btn-glow'
                : 'bg-red-500 hover:bg-red-400 shadow-lg shadow-red-500/30'
            }`}>
            {clockState === 'off' ? <><Play className="w-5 h-5" /> Registrar Entrada</> : <><Square className="w-5 h-5" /> Registrar Saída</>}
          </button>
          <p className="text-xs text-slate-600 mt-3">
            {clockState === 'in' ? '✓ Ponto registrado com localização' : 'Toque para iniciar sua jornada'}
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4">
          {[
            { label: 'Hoje', value: todayHours, icon: Clock, color: 'text-sky-400', bg: 'bg-sky-500/10' },
            { label: 'Semana', value: weekHours, icon: TrendingUp, color: 'text-violet-400', bg: 'bg-violet-500/10' },
            { label: 'OS Abertas', value: pendingOS.toString(), icon: FileText, color: 'text-amber-400', bg: 'bg-amber-500/10' },
          ].map(s => {
            const Icon = s.icon
            return (
              <div key={s.label} className="glass rounded-2xl p-4 text-center border border-slate-800 shadow-xl group hover:border-sky-500/30 transition-all">
                <div className={`w-10 h-10 ${s.bg} rounded-xl flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform`}>
                  <Icon className={`w-5 h-5 ${s.color}`} />
                </div>
                <div className="text-lg font-extrabold text-white tracking-tight">{s.value}</div>
                <div className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mt-1">{s.label}</div>
              </div>
            )
          })}
        </div>

        {/* Work Orders */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-base font-bold text-white">Ordens de Serviço</h2>
            <span className="text-xs text-slate-500">{workOrders.length} encontradas</span>
          </div>

          {workOrders.length === 0 ? (
            /* Demo cards when no real data */
            <div className="space-y-3">
              {[
                { id: '1', client_name: 'Condomínio Sol Nascente', address: 'Av. Paulista, 1500 - São Paulo', service_type: 'Ar Condicionado', status: 'in_progress', priority: 'high', scheduled_date: '2026-03-30' },
                { id: '2', client_name: 'Escola Estadual Centro', address: 'Rua das Flores, 300 - Cajamar', service_type: 'Elétrica', status: 'pending', priority: 'medium', scheduled_date: '2026-03-31' },
                { id: '3', client_name: 'Shopping Norte', address: 'Rodovia Anhanguera, km 35', service_type: 'Hidráulica', status: 'pending', priority: 'low', scheduled_date: '2026-04-01' },
              ].map(os => (
                <OSCard key={os.id} os={os} priorityColor={priorityColor} statusLabel={statusLabel} />
              ))}
            </div>
          ) : (
            <div className="space-y-3">
              {workOrders.map(os => <OSCard key={os.id} os={os} priorityColor={priorityColor} statusLabel={statusLabel} />)}
            </div>
          )}
        </div>

        {/* Not synced warning */}
        {!isOnline && (
          <div className="flex items-center gap-3 bg-amber-500/10 border border-amber-500/20 text-amber-400 rounded-xl px-4 py-3 text-sm">
            <AlertCircle className="w-4 h-4 flex-shrink-0" />
            Você está offline. Os dados serão sincronizados quando a conexão for restabelecida.
          </div>
        )}
      </main>
    </div>
  )
}

function OSCard({ os, priorityColor, statusLabel }: { os: WorkOrder; priorityColor: (p: string) => string; statusLabel: (s: string) => string }) {
  const [expanded, setExpanded] = useState(false)
  return (
    <div className="glass rounded-xl p-4 border border-slate-700/50 hover:border-sky-500/30 transition-colors cursor-pointer" onClick={() => setExpanded(!expanded)}>
      <div className="flex items-start justify-between gap-2">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1 flex-wrap">
            <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${priorityColor(os.priority)}`}>
              {os.priority === 'high' ? 'Urgente' : os.priority === 'medium' ? 'Médio' : 'Baixo'}
            </span>
            <span className="text-xs text-slate-500">{os.scheduled_date}</span>
          </div>
          <h3 className="text-sm font-semibold text-white truncate">{os.client_name}</h3>
          <p className="text-xs text-slate-400 mt-0.5">{os.service_type}</p>
        </div>
        <div className="flex flex-col items-end gap-1">
          <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${os.status === 'done' ? 'bg-green-500/10 text-green-400' : os.status === 'in_progress' ? 'bg-sky-500/10 text-sky-400' : 'bg-slate-700 text-slate-400'}`}>
            {statusLabel(os.status)}
          </span>
        </div>
      </div>
      {expanded && (
        <div className="mt-3 pt-3 border-t border-slate-700/50 space-y-2">
          <div className="flex items-center gap-2 text-xs text-slate-400">
            <MapPin className="w-3 h-3 text-sky-400" />
            {os.address}
          </div>
          <div className="flex gap-2">
            <button className="flex-1 bg-sky-500 hover:bg-sky-400 text-white text-xs font-medium py-2 rounded-lg transition-colors flex items-center justify-center gap-1">
              <CheckCircle className="w-3 h-3" /> Iniciar OS
            </button>
            <a href={`https://maps.google.com/?q=${encodeURIComponent(os.address)}`} target="_blank" rel="noopener noreferrer"
              className="flex-1 bg-slate-700 hover:bg-slate-600 text-slate-200 text-xs font-medium py-2 rounded-lg transition-colors flex items-center justify-center gap-1">
              <MapPin className="w-3 h-3" /> Navegar
            </a>
          </div>
        </div>
      )}
    </div>
  )
}
