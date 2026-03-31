'use client'
import { useState, useMemo } from 'react'
import { 
  FileText, 
  CheckCircle, 
  TrendingUp, 
  Download, 
  MessageSquare, 
  ChevronRight, 
  Zap, 
  LogOut,
  MapPin,
  Calendar,
  Building2,
} from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import { 
  MOCK_USER_CLIENT, 
  MOCK_WORK_ORDERS, 
  MOCK_EMPLOYEES,
} from '@/lib/mockData'

type Tab = 'os' | 'orcamentos' | 'historico'

export default function ClientDashboard() {
  const [activeTab, setActiveTab] = useState<Tab>('os')

  const clientOS = useMemo(() => {
    return MOCK_WORK_ORDERS.filter(os => os.client_name === MOCK_USER_CLIENT.name)
  }, [])

  const stats = useMemo(() => {
    const open = clientOS.filter(os => os.status === 'in_progress' || os.status === 'scheduled').length
    const done = clientOS.filter(os => os.status === 'done').length
    return [
      { label: 'OS Abertas', value: open.toString(), icon: FileText, color: 'text-sky-400', bg: 'bg-sky-500/10' },
      { label: 'Concluídas', value: done.toString(), icon: CheckCircle, color: 'text-green-400', bg: 'bg-green-500/10' },
      { label: 'Orçamentos', value: '2', icon: TrendingUp, color: 'text-violet-400', bg: 'bg-violet-500/10' },
      { label: 'Contrato Ativo', value: 'PJ-42', icon: Zap, color: 'text-amber-400', bg: 'bg-amber-500/10' },
    ]
  }, [clientOS])

  const statusMap: Record<string, { label: string; color: string; border: string }> = {
    in_progress: { label: 'Em Andamento', color: 'bg-sky-500/10 text-sky-400', border: 'border-sky-500/20' },
    pending: { label: 'Aguardando', color: 'bg-amber-500/10 text-amber-400', border: 'border-amber-500/20' },
    done: { label: 'Concluído', color: 'bg-green-500/10 text-green-400', border: 'border-green-500/20' },
    scheduled: { label: 'Agendado', color: 'bg-violet-500/10 text-violet-400', border: 'border-violet-500/20' },
  }

  return (
    <div className="min-h-screen bg-transparent font-sans selection:bg-sky-500/30">
      {/* Header */}
      <header className="bg-slate-950/20 backdrop-blur-xl border-b border-white/5 px-4 py-5 sticky top-0 z-50">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4 group cursor-pointer">
            <div className="w-10 h-10 bg-gradient-to-br from-sky-500 to-sky-600 rounded-2xl flex items-center justify-center shadow-lg shadow-sky-500/20 group-hover:scale-110 transition-transform">
              <Zap className="w-6 h-6 text-white" />
            </div>
            <div>
              <div className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">Condomínio</div>
              <div className="text-base font-bold text-white group-hover:text-sky-400 transition-colors uppercase tracking-tight">{MOCK_USER_CLIENT.name}</div>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
             <button className="hidden md:flex items-center gap-2 px-4 py-2 bg-slate-900/50 border border-slate-800 rounded-xl text-xs font-bold text-slate-400 hover:text-white transition-all">
                <Building2 className="w-3.5 h-3.5" /> Suporte
             </button>
             <Link href="/login" className="w-10 h-10 flex items-center justify-center bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white transition-all rounded-xl border border-red-500/20 group">
               <LogOut className="w-5 h-5 group-hover:-translate-x-0.5 transition-transform" />
             </Link>
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 py-8 space-y-10">
        {/* Welcome Section */}
        <section className="relative overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-slate-900 to-slate-950 border border-slate-800 p-8 shadow-2xl">
          <div className="absolute top-0 right-0 -m-12 w-64 h-64 bg-sky-500/5 rounded-full blur-3xl" />
          <div className="relative flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="text-center md:text-left">
              <h1 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight leading-tight">
                Olá, <span className="text-sky-500">Sr. José</span> 👋
              </h1>
              <p className="text-slate-400 mt-2 text-sm font-medium">Sua manutenção preventiva está 85% concluída este mês.</p>
              <div className="mt-6 flex flex-wrap gap-3 justify-center md:justify-start">
                 <button className="px-5 py-2.5 bg-sky-500 hover:bg-sky-400 text-white text-xs font-bold rounded-xl transition-all shadow-lg shadow-sky-500/20">Nova Solicitação</button>
                 <button className="px-5 py-2.5 bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold rounded-xl transition-all border border-slate-700">Ver Agenda</button>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4 w-full md:w-auto">
               {stats.map(s => (
                 <div key={s.label} className="bg-slate-950/40 backdrop-blur-md border border-slate-800/80 rounded-3xl p-5 w-full md:w-40 text-center hover:border-sky-500/30 transition-all group">
                    <div className={`w-10 h-10 ${s.bg} rounded-2xl flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform`}>
                       <s.icon className={`w-5 h-5 ${s.color}`} />
                    </div>
                    <div className="text-2xl font-black text-white leading-none tracking-tighter">{s.value}</div>
                    <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mt-1.5">{s.label}</div>
                 </div>
               ))}
            </div>
          </div>
        </section>

        {/* Tabs and Content */}
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6 pb-2">
            <div className="flex p-1.5 bg-slate-900 border border-slate-800 rounded-2xl w-full sm:w-auto">
              {([
                { id: 'os', label: 'Ordens de Serviço' },
                { id: 'orcamentos', label: 'Orçamentos' },
                { id: 'historico', label: 'Histórico' },
              ] as { id: Tab; label: string }[]).map(tab => (
                <button 
                  key={tab.id} 
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex-1 sm:flex-none px-6 py-2.5 rounded-xl text-xs font-bold transition-all ${activeTab === tab.id ? 'bg-sky-500 text-white shadow-lg shadow-sky-500/10' : 'text-slate-500 hover:text-white'}`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
            <div className="flex items-center gap-4 w-full sm:w-auto">
               <button className="flex items-center gap-2 text-xs font-bold text-slate-400 hover:text-white">
                  <Download className="w-4 h-4" /> Relatório Mensal
               </button>
            </div>
          </div>

          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            {activeTab === 'os' && (
              <div className="grid gap-5">
                {clientOS.map(os => {
                  const tech = MOCK_EMPLOYEES.find(e => e.id === os.tech_id)
                  const progress = os.status === 'done' ? 100 : os.status === 'in_progress' ? 65 : 0
                  
                  return (
                    <div key={os.id} className="glass rounded-[2rem] p-6 border border-slate-800/60 hover:border-sky-500/30 transition-all group overflow-hidden relative">
                      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
                        <div className="grid gap-4 flex-1">
                          <div className="flex items-center gap-3">
                             <span className={`px-3 py-1 rounded-xl text-[10px] font-black uppercase tracking-widest ${statusMap[os.status].color} border ${statusMap[os.status].border}`}>
                                {statusMap[os.status].label}
                             </span>
                             <span className="text-xs font-mono text-slate-600 font-bold tracking-tighter">REF: {os.id}</span>
                          </div>
                          <div>
                            <h3 className="text-lg font-bold text-white group-hover:text-sky-400 transition-colors uppercase tracking-tight">{os.service_type}</h3>
                            <div className="flex items-center gap-4 mt-2">
                               <div className="flex items-center gap-1.5">
                                  <Calendar className="w-3.5 h-3.5 text-slate-600" />
                                  <span className="text-xs text-slate-400 font-medium">{os.scheduled_date}</span>
                               </div>
                               <div className="flex items-center gap-1.5 text-slate-400">
                                  <MapPin className="w-3.5 h-3.5 text-slate-600" />
                                  <span className="text-xs font-medium uppercase tracking-tight">Setor Principal</span>
                               </div>
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center gap-6 w-full lg:w-auto p-4 lg:p-0 bg-slate-900/30 lg:bg-transparent rounded-2xl border border-slate-800 lg:border-none">
                           <div className="hidden sm:block text-right">
                              <div className="text-[10px] font-black text-slate-600 uppercase mb-1 tracking-widest">Técnico Encarregado</div>
                              <div className="text-xs font-bold text-white uppercase">{tech?.full_name}</div>
                           </div>
                           <div className="relative w-12 h-12 rounded-2xl border-2 border-slate-800 shadow-xl group-hover:border-sky-500 transition-all">
                              <div className="w-full h-full rounded-[14px] overflow-hidden relative">
                                <Image 
                                  src={tech?.avatar_url || `https://api.dicebear.com/7.x/avataaars/svg?seed=${tech?.full_name}`} 
                                  alt={tech?.full_name || 'Technician'} 
                                  fill
                                  className="object-cover"
                                />
                              </div>
                              <div className="absolute -bottom-1 -right-1 w-3.5 h-3.5 bg-green-500 border-2 border-slate-950 rounded-full shadow-lg" />
                           </div>
                           <div className="flex flex-col gap-2">
                              <button className="p-2.5 bg-slate-800/80 hover:bg-sky-500 hover:text-white text-slate-400 rounded-xl transition-all border border-slate-700/50 shadow-inner">
                                <MessageSquare className="w-4 h-4" />
                              </button>
                           </div>
                        </div>

                        <div className="w-full lg:w-48 space-y-2.5">
                           <div className="flex justify-between text-[10px] font-black text-slate-500 uppercase tracking-widest">
                              <span>Execução</span>
                              <span className="text-sky-400 font-bold">{progress}%</span>
                           </div>
                           <div className="h-2 w-full bg-slate-900 border border-slate-800 rounded-full overflow-hidden p-[1px]">
                              <div className="h-full bg-gradient-to-r from-sky-600 to-sky-400 rounded-full shadow-[0_0_15px_rgba(14,165,233,0.3)] transition-all duration-1000" style={{ width: `${progress}%` }} />
                           </div>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            )}

            {activeTab === 'orcamentos' && (
              <div className="space-y-5">
                {[
                  { id: 'ORC-226', service: 'Modernização de Painéis Elétricos', val: 'R$ 8.420,00', status: 'pending', date: 'Há 2 dias' },
                  { id: 'ORC-224', service: 'Substituição Filtros Central AC', val: 'R$ 1.850,00', status: 'approved', date: '05 Mar 2026' }
                ].map((q) => (
                  <div key={q.id} className="glass rounded-[2rem] p-6 border border-slate-800/60 hover:border-violet-500/30 transition-all group relative overflow-hidden">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                      <div>
                        <div className="flex items-center gap-3 mb-2">
                          <span className={`text-[10px] font-black uppercase tracking-widest py-1 px-3 rounded-xl border ${q.status === 'approved' ? 'bg-green-500/10 text-green-400 border-green-500/20' : 'bg-amber-500/10 text-amber-400 border-amber-500/20'}`}>
                            {q.status === 'approved' ? 'Aprovado' : 'Aguardando Revisão'}
                          </span>
                          <span className="text-xs font-mono text-slate-600 font-bold">#{q.id}</span>
                        </div>
                        <h4 className="text-lg font-bold text-white group-hover:text-violet-400 transition-colors uppercase tracking-tight">{q.service}</h4>
                        <p className="text-xs text-slate-500 mt-1 uppercase tracking-tight font-bold">Solicitado em: {q.date}</p>
                      </div>
                      <div className="flex flex-col md:items-end gap-3">
                        <div className="text-3xl font-black text-white tracking-tighter">{q.val}</div>
                        <div className="flex gap-2">
                           <button className="flex items-center gap-2 text-xs font-bold text-slate-400 hover:text-white px-4 py-2 bg-slate-900 border border-slate-800 rounded-xl transition-all">
                             <Download className="w-3.5 h-3.5" /> PDF
                           </button>
                           {q.status === 'pending' && (
                             <button className="text-xs font-bold bg-violet-600 hover:bg-violet-500 text-white px-5 py-2 rounded-xl transition-all shadow-lg shadow-violet-500/20">Aprovar Agora</button>
                           )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'historico' && (
              <div className="glass rounded-[2.5rem] p-8 border border-slate-800/60 divide-y divide-slate-800/50">
                {[
                  { date: '28 Mar 2026', event: 'OS #998 concluída com sucesso', detail: 'Reparo hidráulico finalizado pelo técnico João Silva.', type: 'success' },
                  { date: '25 Mar 2026', event: 'Novo orçamento recebido: Ref: ORC-226', detail: 'Modernização de Painéis Elétricos aguarda sua aprovação.', type: 'info' },
                  { date: '20 Mar 2026', event: 'OS #995 reagendada para próxima terça', detail: 'Alteração solicitada via portal do cliente.', type: 'warning' },
                  { date: '15 Mar 2026', event: 'Visita técnica concluída: Bloco A', detail: 'Inspeção preventiva de rotina sem pendências.', type: 'success' },
                ].map((log, i) => (
                  <div key={i} className="py-6 first:pt-0 last:pb-0 group">
                    <div className="flex items-start gap-5">
                       <div className={`mt-2 w-2 h-2 rounded-full shadow-[0_0_10px_rgba(14,165,233,0.4)] flex-shrink-0 ${log.type === 'success' ? 'bg-green-400' : log.type === 'warning' ? 'bg-amber-400' : 'bg-sky-400'}`} />
                       <div className="flex-1">
                          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-1">
                             <h5 className="text-sm font-bold text-white group-hover:text-sky-400 transition-colors uppercase tracking-tight leading-tight">{log.event}</h5>
                             <span className="text-[10px] font-black text-slate-600 uppercase tracking-widest whitespace-nowrap">{log.date}</span>
                          </div>
                          <p className="text-xs text-slate-500 font-medium leading-relaxed">{log.detail}</p>
                       </div>
                       <button className="opacity-0 group-hover:opacity-100 p-2 text-slate-600 hover:text-white transition-all hidden sm:block">
                          <ChevronRight className="w-4 h-4" />
                       </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Floating Action Button - Mobile */}
      <div className="fixed bottom-8 right-8 md:hidden z-50">
          <button className="w-16 h-16 bg-sky-500 rounded-3xl flex items-center justify-center text-white shadow-2xl shadow-sky-500/40 transform active:scale-95 transition-all ring-4 ring-sky-500/10">
             <Plus />
          </button>
      </div>
    </div>
  )
}

function Plus() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
  )
}
