'use client'
import Link from 'next/link'
import { MonitorSmartphone, ShieldCheck, Clock3, FileBarChart2, MapPin, Users, Sparkles, Orbit } from 'lucide-react'

const items = [
  {
    icon: MonitorSmartphone,
    title: 'Portal do Cliente 4.0',
    description: 'Acompanhamento em tempo real de OS, geolocalização técnica e evidências fotográficas instantâneas.',
    color: 'text-amber-500',
    bg: 'bg-amber-500/10',
  },
  {
    icon: ShieldCheck,
    title: 'Engenharia de Precisão',
    description: 'Técnicos certificados e processos rigorosos sob normas ABNT, garantindo segurança total.',
    color: 'text-amber-500',
    bg: 'bg-amber-500/10',
  },
  {
    icon: Clock3,
    title: 'Resposta Ultra-Rápida',
    description: 'Orçamentos em até 24h e atendimento emergencial 24/7 com equipes estrategicamente posicionadas.',
    color: 'text-amber-500',
    bg: 'bg-amber-500/10',
  },
  {
    icon: FileBarChart2,
    title: 'Smart Reporting',
    description: 'Dashboards analíticos de performance, custos e manutenção preventiva com validação técnica digital.',
    color: 'text-amber-500',
    bg: 'bg-amber-500/10',
  },
  {
    icon: MapPin,
    title: 'Logística Inteligente',
    description: 'Ampla cobertura na Grande SP com centro de distribuição próprio e frotas monitoradas 24h.',
    color: 'text-amber-500',
    bg: 'bg-amber-500/10',
  },
  {
    icon: Users,
    title: 'Gestão de Capital Humano',
    description: 'Treinamento contínuo e controle biométrico de equipes para máxima produtividade no campo.',
    color: 'text-amber-500',
    bg: 'bg-amber-500/10',
  },
]

export function Differentials() {
  return (
    <section className="py-32 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="text-center mb-24 animate-fade-up">
          <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-500 text-sm font-black mb-8 leading-tight">
            <Orbit className="w-4 h-4 animate-spin-slow" /> Diferenciais Competitivos
          </div>
          <h2 className="text-5xl md:text-7xl font-black text-white mb-10 tracking-tighter leading-[1.1]">
            Tecnologia que Transforma <br />
            <span className="text-amber-500">Gestão em Resultados.</span>
          </h2>
          <p className="text-2xl text-slate-400 max-w-3xl mx-auto font-medium leading-relaxed">
            Eliminamos a opacidade da manutenção tradicional com <span className="text-white border-b-2 border-amber-500/40">transparência digital</span> e engenharia de elite.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 perspective-1000">
          {items.map((item, idx) => {
            const Icon = item.icon
            return (
              <Link 
                key={item.title} 
                href="/orcamento" 
                className="group relative bg-slate-900/40 backdrop-blur-3xl border border-white/5 rounded-[48px] p-10 hover:border-amber-500/40 transition-all duration-700 hover:-translate-y-4 hover:rotate-1 preserve-3d shadow-2xl"
                style={{ transitionDelay: `${idx * 100}ms` }}
              >
                {/* Glow Effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-amber-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 rounded-inherit" />
                <div className="glow-trace" />

                <div className="relative z-10">
                  <div className={`w-20 h-20 ${item.bg} rounded-[28px] border border-amber-500/20 flex items-center justify-center mb-10 group-hover:scale-110 group-hover:bg-amber-500 transition-all duration-500 shadow-2xl`}>
                    <Icon className={`w-10 h-10 ${item.color} group-hover:text-slate-950 transition-colors`} />
                  </div>
                  <h3 className="text-2xl font-black text-white mb-6 group-hover:text-amber-500 transition-colors">{item.title}</h3>
                  <p className="text-lg text-slate-400 leading-relaxed font-bold group-hover:text-white transition-colors">{item.description}</p>
                  
                  <div className="mt-8 flex items-center gap-2 text-amber-500/0 group-hover:text-amber-500 font-black text-sm transition-all duration-500">
                    Saber mais <Sparkles className="w-4 h-4" />
                  </div>
                </div>

                {/* Glass Highlight */}
                <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent" />
              </Link>
            )
          })}
        </div>
      </div>

      {/* Floating Particles/Elements */}
      <div className="absolute top-1/4 left-0 w-96 h-96 bg-amber-500/5 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-sky-500/5 blur-[120px] rounded-full pointer-events-none" />
    </section>
  )
}
