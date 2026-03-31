import Link from 'next/link'
import { Box, ArrowUpRight, ShieldCheck, Zap } from 'lucide-react'

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="relative bg-slate-950 pt-32 pb-16 overflow-hidden border-t border-white/5">
      {/* Cinematic Background Elements */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[1px] bg-gradient-to-r from-transparent via-amber-500/50 to-transparent" />
      <div className="absolute -top-24 left-1/4 w-[500px] h-[500px] bg-amber-500/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-16 lg:gap-24 mb-24">
          
          {/* Brand & Manifesto */}
          <div className="md:col-span-12 lg:col-span-5 space-y-8">
            <Link href="/" className="flex items-center gap-4 group">
              <div className="relative w-12 h-12 bg-amber-500 rounded-2xl flex items-center justify-center transform group-hover:rotate-12 transition-all duration-500 shadow-[0_0_30px_rgba(245,158,11,0.2)]">
                <Box className="w-7 h-7 text-slate-950" />
              </div>
              <div className="flex flex-col">
                <span className="font-black text-2xl text-white tracking-tighter leading-none">
                  GAMA <span className="text-amber-500">SERVICES</span>
                </span>
                <span className="text-[10px] text-slate-500 font-bold tracking-[0.3em] uppercase mt-1">Industrial Excellence</span>
              </div>
            </Link>
            
            <p className="text-xl text-slate-400 font-medium leading-relaxed max-w-md">
              Engenharia de precisão e gestão de ativos críticos. Elevando o padrão de facilities através de tecnologia e conformidade técnica.
            </p>
          </div>

          {/* Rapid Navigation */}
          <div className="md:col-span-4 lg:col-span-2 space-y-8">
            <h4 className="text-white font-black text-xs uppercase tracking-[0.2em] flex items-center gap-2">
              <div className="w-1 h-3 bg-amber-500" /> Sistemas
            </h4>
            <ul className="space-y-4">
              {['Ar Condicionado', 'Engenharia Civil', 'Instalações Elétricas', 'Proteção Passiva', 'Sistemas Hidráulicos', 'Retrofit'].map(s => (
                <li key={s}>
                  <a href="#servicos" className="text-slate-500 hover:text-white transition-all font-bold text-sm flex items-center gap-2 group">
                    <ArrowUpRight className="w-3 h-3 text-amber-500 opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all" />
                    {s}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Strategic Links */}
          <div className="md:col-span-4 lg:col-span-2 space-y-8">
            <h4 className="text-white font-black text-xs uppercase tracking-[0.2em] flex items-center gap-2">
              <div className="w-1 h-3 bg-amber-500" /> Estratégia
            </h4>
            <ul className="space-y-4">
              {[
                { label: 'Legado / Sobre', href: '#sobre' },
                { label: 'Verticalidades', href: '#segmentos' },
                { label: 'Briefing / Contato', href: '#contato' },
                { label: 'Portal Cliente', href: '/login' },
              ].map(l => (
                <li key={l.label}>
                  <Link href={l.href} className="text-slate-500 hover:text-white transition-all font-bold text-sm flex items-center gap-2 group">
                    <ArrowUpRight className="w-3 h-3 text-amber-500 opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all" />
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Compliance & Trust */}
          <div className="md:col-span-4 lg:col-span-3 space-y-8">
             <div className="p-8 rounded-[32px] bg-white/5 border border-white/10 space-y-4 relative overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-br from-amber-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <ShieldCheck className="w-10 h-10 text-amber-500" />
                <h5 className="text-white font-black text-lg tracking-tighter">Selo de Qualidade ABNT</h5>
                <p className="text-sm text-slate-500 font-medium leading-relaxed">
                  Todos os nossos processos seguem as normas regulamentadoras nacionais de segurança e manutenção.
                </p>
             </div>
          </div>

        </div>

        {/* Legal & Final Signature */}
        <div className="pt-16 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <p className="text-xs text-slate-600 font-bold uppercase tracking-widest">
              © {currentYear} GAMA SERVICES TECHNOLOGY. CODED FOR PRECISION.
            </p>
            <div className="flex gap-8">
              <a href="#" className="text-[10px] text-slate-600 hover:text-amber-500 font-black uppercase tracking-widest transition-colors">Privacidade</a>
              <a href="#" className="text-[10px] text-slate-600 hover:text-amber-500 font-black uppercase tracking-widest transition-colors">Conformidade</a>
            </div>
          </div>
          
          <div className="flex items-center gap-2 text-slate-700 text-xs font-black italic">
            <Zap className="w-4 h-4" /> POWERED BY GAMA ENGINE
          </div>
        </div>
      </div>

      {/* Extreme Bottom Glow */}
      <div className="absolute bottom-0 left-0 right-0 h-[200px] bg-gradient-to-t from-amber-500/5 to-transparent pointer-events-none" />
    </footer>
  )
}
