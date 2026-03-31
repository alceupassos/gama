'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion, type Variants } from 'framer-motion'
import {
  ArrowRight,
  BarChart3,
  Building2,
  CircleCheckBig,
  Clock3,
  ShieldCheck,
  Sparkles,
  UserRound,
  Wrench,
} from 'lucide-react'
import { ThemeToggle } from '@/components/ThemeToggle'
import { WhatsAppButton } from '@/components/shared/WhatsAppButton'

const reveal: Variants = {
  hidden: { opacity: 0, y: 22 },
  show: (index: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: index * 0.08, duration: 0.55, ease: [0.22, 1, 0.36, 1] },
  }),
}

export default function HomePage() {
  return (
    <div className="landing-shell relative min-h-screen">
      <div className="landing-grid-overlay pointer-events-none fixed inset-0 opacity-35" />

      <header className="sticky top-0 z-50 border-b border-[var(--landing-border)] backdrop-blur-xl bg-[color:var(--landing-glass)]">
        <div className="max-w-7xl mx-auto px-5 md:px-8 h-20 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-xl border border-[var(--landing-border)] bg-[color:var(--landing-glass)] grid place-items-center">
              <Sparkles className="w-5 h-5 text-[var(--landing-accent)]" />
            </div>
            <div>
              <p className="font-black tracking-tight leading-none">GAMA SERVICES</p>
              <p className="text-[10px] tracking-[0.2em] uppercase landing-muted mt-1">Industrial Excellence</p>
            </div>
          </div>

          <nav className="hidden lg:flex items-center gap-8 text-sm landing-muted">
            <a href="#solucoes" className="hover:text-[var(--landing-text)] transition-colors">Soluções</a>
            <a href="#monitoramento" className="hover:text-[var(--landing-text)] transition-colors">Monitoramento</a>
            <a href="#resultado" className="hover:text-[var(--landing-text)] transition-colors">Resultados</a>
            <a href="#contato" className="hover:text-[var(--landing-text)] transition-colors">Contato</a>
          </nav>

          <div className="flex items-center gap-2 md:gap-3">
            <ThemeToggle />
            <Link href="/dashboard/client" className="hidden md:inline-flex px-3 py-2 rounded-xl text-xs font-semibold border border-[var(--landing-border)] bg-[color:var(--landing-glass)] hover:border-[var(--landing-accent)] transition-colors">
              Portal do Cliente
            </Link>
            <Link href="/dashboard/admin" className="hidden md:inline-flex px-3 py-2 rounded-xl text-xs font-semibold border border-[var(--landing-border)] bg-[color:var(--landing-glass)] hover:border-[var(--landing-accent)] transition-colors">
              Acesso Admin
            </Link>
            <Link href="/orcamento" className="px-4 py-2.5 rounded-xl text-xs md:text-sm font-semibold border border-[var(--landing-border)] bg-[color:var(--landing-glass)] hover:border-[var(--landing-accent)] transition-colors">
              Solicitar Briefing
            </Link>
          </div>
        </div>
      </header>

      <main className="relative z-10">
        <section className="max-w-7xl mx-auto px-5 md:px-8 pt-16 md:pt-20 pb-14 md:pb-20">
          <div className="grid lg:grid-cols-2 gap-10 items-center">
            <div className="space-y-6">
              <motion.span className="landing-panel inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs" variants={reveal} initial="hidden" animate="show" custom={0}>
                <CircleCheckBig className="w-3.5 h-3.5 text-[var(--landing-accent)]" /> Engenharia e Facilities de alta precisão
              </motion.span>

              <motion.h1 className="text-5xl md:text-7xl font-black tracking-tight leading-[0.95]" variants={reveal} initial="hidden" animate="show" custom={1}>
                Operação
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-[var(--landing-accent)] to-[#75BEFF]">inteligente,</span>
                execução confiável.
              </motion.h1>

              <motion.p className="text-lg landing-muted max-w-xl" variants={reveal} initial="hidden" animate="show" custom={2}>
                Nova identidade visual, experiência fluida e acompanhamento em tempo real para manter edifícios, plantas e ativos críticos no máximo desempenho.
              </motion.p>

              <motion.div className="flex flex-wrap gap-3" variants={reveal} initial="hidden" animate="show" custom={3}>
                <Link href="/orcamento" className="landing-cta px-6 py-3 rounded-2xl font-bold transition-colors inline-flex items-center gap-2">
                  Falar com Consultor <ArrowRight className="w-4 h-4" />
                </Link>
                <Link href="/dashboard/admin" className="landing-panel px-6 py-3 rounded-2xl font-semibold hover:border-[var(--landing-accent)] transition-colors inline-flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-[var(--landing-accent)]" /> Entrar no Admin
                </Link>
                <Link href="/dashboard/client" className="landing-panel px-6 py-3 rounded-2xl font-semibold hover:border-[var(--landing-accent)] transition-colors inline-flex items-center gap-2">
                  <UserRound className="w-4 h-4 text-[var(--landing-accent)]" /> Portal do Cliente
                </Link>
              </motion.div>

              <motion.div className="grid grid-cols-3 gap-3 pt-2" variants={reveal} initial="hidden" animate="show" custom={4}>
                {[
                  { label: 'SLA médio', value: '99.2%' },
                  { label: 'OS/mês', value: '1.6k' },
                  { label: 'Filiais', value: '4' },
                ].map((item) => (
                  <div key={item.label} className="landing-panel rounded-2xl p-4">
                    <p className="text-2xl font-extrabold">{item.value}</p>
                    <p className="text-[11px] uppercase tracking-wider landing-muted mt-1">{item.label}</p>
                  </div>
                ))}
              </motion.div>
            </div>

            <motion.div className="relative" variants={reveal} initial="hidden" animate="show" custom={2}>
              <div className="absolute -inset-5 rounded-[2rem] bg-[radial-gradient(circle,rgba(39,216,255,0.2),transparent_70%)] blur-2xl" />
              <div className="landing-panel relative rounded-[2rem] overflow-hidden">
                <Image src="/images/landing/hero-industrial.svg" alt="Visão da operação GAMA" width={1200} height={900} className="w-full h-auto" priority />
                <div className="landing-panel absolute top-5 right-5 rounded-xl px-4 py-3">
                  <p className="text-[10px] uppercase tracking-[0.15em] landing-muted">Uptime ativo</p>
                  <p className="text-2xl font-black">99.9%</p>
                </div>
                <div className="landing-panel absolute left-5 bottom-5 rounded-xl px-4 py-3">
                  <p className="text-[10px] uppercase tracking-[0.15em] landing-muted">Pipeline diário</p>
                  <p className="text-xl font-black text-[var(--landing-accent)]">100+ OS</p>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        <section id="solucoes" className="max-w-7xl mx-auto px-5 md:px-8 pb-14 md:pb-20">
          <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-4">
            {[
              { title: 'HVAC & Climatização', icon: Wrench, text: 'Preventiva e corretiva com telemetria e checklist digital.' },
              { title: 'Elétrica Crítica', icon: ShieldCheck, text: 'Estabilidade energética para operações de alto impacto.' },
              { title: 'Infra e Predial', icon: Building2, text: 'Gestão integrada de manutenção civil, hidráulica e estrutura.' },
              { title: 'NOC Operacional', icon: BarChart3, text: 'Alertas em tempo real, BI executivo e resposta orientada por SLA.' },
            ].map((item, idx) => {
              const Icon = item.icon
              return (
                <motion.article key={item.title} className="landing-panel rounded-3xl p-6" variants={reveal} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }} custom={idx}>
                  <div className="w-10 h-10 rounded-xl bg-[color:var(--landing-glass)] border border-[var(--landing-border)] grid place-items-center mb-4">
                    <Icon className="w-5 h-5 text-[var(--landing-accent)]" />
                  </div>
                  <h3 className="font-bold text-lg">{item.title}</h3>
                  <p className="text-sm landing-muted mt-2">{item.text}</p>
                </motion.article>
              )
            })}
          </div>
        </section>

        <section id="monitoramento" className="max-w-7xl mx-auto px-5 md:px-8 pb-14 md:pb-20 grid lg:grid-cols-2 gap-6">
          <motion.div className="landing-panel rounded-[2rem] overflow-hidden" variants={reveal} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }} custom={0}>
            <Image src="/images/landing/ops-center.svg" alt="Centro de monitoramento" width={800} height={560} className="w-full h-auto" />
          </motion.div>

          <motion.div className="landing-panel rounded-[2rem] overflow-hidden" variants={reveal} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }} custom={1}>
            <Image src="/images/landing/team-field.svg" alt="Equipe em campo" width={800} height={560} className="w-full h-auto" />
          </motion.div>
        </section>

        <section id="resultado" className="max-w-7xl mx-auto px-5 md:px-8 pb-16 md:pb-24">
          <motion.div className="landing-panel rounded-[2rem] p-8 md:p-10" variants={reveal} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }} custom={0}>
            <p className="text-xs uppercase tracking-[0.2em] landing-muted">Resultado de Negócio</p>
            <h2 className="text-3xl md:text-4xl font-black mt-3 max-w-3xl">Menos imprevisibilidade, mais margem operacional e decisões melhores para o dono.</h2>
            <div className="grid md:grid-cols-3 gap-4 mt-7">
              {[
                { label: 'Redução de chamados reabertos', value: '-34%' },
                { label: 'Aumento de produtividade técnica', value: '+27%' },
                { label: 'Tempo médio de resposta', value: '23 min' },
              ].map((item) => (
                <div key={item.label} className="landing-panel rounded-2xl p-5">
                  <p className="text-3xl font-black text-[var(--landing-accent)]">{item.value}</p>
                  <p className="text-sm landing-muted mt-2">{item.label}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </section>

        <section id="contato" className="max-w-7xl mx-auto px-5 md:px-8 pb-20">
          <div className="landing-panel rounded-[2rem] p-6 md:p-8 flex flex-col md:flex-row md:items-center md:justify-between gap-5">
            <div>
              <p className="text-xs uppercase tracking-[0.2em] landing-muted">Pronto para escalar operação</p>
              <h3 className="text-2xl md:text-3xl font-black mt-2">Receba um plano técnico-comercial em até 24h.</h3>
            </div>
            <div className="flex gap-3">
              <a href="https://wa.me/5511999999999" className="landing-cta px-5 py-3 rounded-xl font-bold inline-flex items-center gap-2 transition-colors">
                WhatsApp <ArrowRight className="w-4 h-4" />
              </a>
              <Link href="/orcamento" className="landing-panel px-5 py-3 rounded-xl font-semibold hover:border-[var(--landing-accent)] transition-colors">
                Abrir orçamento
              </Link>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-[var(--landing-border)] py-8 text-center text-xs landing-muted">
        <div className="max-w-7xl mx-auto px-5 md:px-8 flex flex-col md:flex-row items-center justify-between gap-3">
          <p>GAMA Services © {new Date().getFullYear()} | Engenharia de performance</p>
          <p className="inline-flex items-center gap-2"><Clock3 className="w-3.5 h-3.5" /> Atendimento 24/7 para contratos ativos</p>
        </div>
      </footer>

      <WhatsAppButton />
    </div>
  )
}
