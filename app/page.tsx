'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion, type Variants } from 'framer-motion'
import {
  ArrowRight,
  Building2,
  CircleCheckBig,
  Clock3,
  Headset,
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
              <p className="text-[10px] tracking-[0.2em] uppercase landing-muted mt-1">Atendimento para clientes</p>
            </div>
          </div>

          <nav className="hidden lg:flex items-center gap-8 text-sm landing-muted">
            <a href="#solucoes" className="hover:text-[var(--landing-text)] transition-colors">Serviços</a>
            <a href="#acompanhamento" className="hover:text-[var(--landing-text)] transition-colors">Acompanhamento</a>
            <a href="#resultado" className="hover:text-[var(--landing-text)] transition-colors">Benefícios</a>
            <a href="#contato" className="hover:text-[var(--landing-text)] transition-colors">Contato</a>
          </nav>

          <div className="flex items-center gap-2 md:gap-3">
            <ThemeToggle />
            <Link href="/dashboard/client" className="hidden md:inline-flex px-3 py-2 rounded-xl text-xs font-semibold border border-[var(--landing-border)] bg-[color:var(--landing-glass)] hover:border-[var(--landing-accent)] transition-colors">
              Portal do Cliente
            </Link>
            <Link href="/orcamento" className="px-4 py-2.5 rounded-xl text-xs md:text-sm font-semibold border border-[var(--landing-border)] bg-[color:var(--landing-glass)] hover:border-[var(--landing-accent)] transition-colors">
              Solicitar Orçamento
            </Link>
            <Link href="/dashboard/admin" className="hidden xl:inline-flex px-3 py-2 rounded-xl text-xs font-medium border border-transparent landing-muted hover:border-[var(--landing-border)] transition-colors">
              Área interna
            </Link>
          </div>
        </div>
      </header>

      <main className="relative z-10">
        <section className="max-w-7xl mx-auto px-5 md:px-8 pt-16 md:pt-20 pb-14 md:pb-20">
          <div className="grid lg:grid-cols-2 gap-10 items-center">
            <div className="space-y-6">
              <motion.span className="landing-panel inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs" variants={reveal} initial="hidden" animate="show" custom={0}>
                <CircleCheckBig className="w-3.5 h-3.5 text-[var(--landing-accent)]" /> Manutenção clara, rápida e sem dor de cabeça
              </motion.span>

              <motion.h1 className="text-5xl md:text-7xl font-black tracking-tight leading-[0.95]" variants={reveal} initial="hidden" animate="show" custom={1}>
                Seu prédio
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-[var(--landing-accent)] to-[#75BEFF]">funcionando,</span>
                com suporte de verdade.
              </motion.h1>

              <motion.p className="text-lg landing-muted max-w-xl" variants={reveal} initial="hidden" animate="show" custom={2}>
                Solicite serviços, acompanhe status, converse com a equipe e receba atualizações em tempo real no portal do cliente.
              </motion.p>

              <motion.div className="flex flex-wrap gap-3" variants={reveal} initial="hidden" animate="show" custom={3}>
                <Link href="/orcamento" className="landing-cta px-6 py-3 rounded-2xl font-bold transition-colors inline-flex items-center gap-2">
                  Solicitar orçamento <ArrowRight className="w-4 h-4" />
                </Link>
                <Link href="/dashboard/client" className="landing-panel px-6 py-3 rounded-2xl font-semibold hover:border-[var(--landing-accent)] transition-colors inline-flex items-center gap-2">
                  <UserRound className="w-4 h-4 text-[var(--landing-accent)]" /> Acompanhar meu chamado
                </Link>
              </motion.div>

              <motion.div className="grid grid-cols-3 gap-3 pt-2" variants={reveal} initial="hidden" animate="show" custom={4}>
                {[
                  { label: 'SLA de atendimento', value: '99.2%' },
                  { label: 'Resposta média', value: '23 min' },
                  { label: 'Suporte', value: '24/7' },
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
                <Image src="/images/landing/client-hero.svg" alt="Painel para clientes" width={1200} height={900} className="w-full h-auto" priority />
                <div className="landing-panel absolute top-5 right-5 rounded-xl px-4 py-3">
                  <p className="text-[10px] uppercase tracking-[0.15em] landing-muted">Chamado ativo</p>
                  <p className="text-xl font-black">Em andamento</p>
                </div>
                <div className="landing-panel absolute left-5 bottom-5 rounded-xl px-4 py-3">
                  <p className="text-[10px] uppercase tracking-[0.15em] landing-muted">Próxima visita</p>
                  <p className="text-xl font-black text-[var(--landing-accent)]">Hoje 14:30</p>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        <section id="solucoes" className="max-w-7xl mx-auto px-5 md:px-8 pb-14 md:pb-20">
          <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-4">
            {[
              { title: 'Ar Condicionado', icon: Wrench, text: 'Instalação, preventiva e corretiva para conforto e eficiência.' },
              { title: 'Elétrica', icon: ShieldCheck, text: 'Correções seguras e manutenção de quadros e circuitos.' },
              { title: 'Hidráulica e Predial', icon: Building2, text: 'Vazamentos, bombas, ajustes e manutenção geral do imóvel.' },
              { title: 'Suporte Humanizado', icon: Headset, text: 'Canal direto para acompanhar cada etapa do atendimento.' },
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

        <section id="acompanhamento" className="max-w-7xl mx-auto px-5 md:px-8 pb-14 md:pb-20 grid lg:grid-cols-2 gap-6">
          <motion.div className="landing-panel rounded-[2rem] overflow-hidden" variants={reveal} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }} custom={0}>
            <Image src="/images/landing/client-support.svg" alt="Acompanhamento de suporte" width={800} height={560} className="w-full h-auto" />
          </motion.div>

          <motion.div className="landing-panel rounded-[2rem] overflow-hidden" variants={reveal} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }} custom={1}>
            <Image src="/images/landing/client-service.svg" alt="Serviço em execução" width={800} height={560} className="w-full h-auto" />
          </motion.div>
        </section>

        <section id="resultado" className="max-w-7xl mx-auto px-5 md:px-8 pb-16 md:pb-24">
          <motion.div className="landing-panel rounded-[2rem] p-8 md:p-10" variants={reveal} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }} custom={0}>
            <p className="text-xs uppercase tracking-[0.2em] landing-muted">Vantagens para o cliente</p>
            <h2 className="text-3xl md:text-4xl font-black mt-3 max-w-3xl">Mais previsibilidade, menos estresse e atendimento transparente do início ao fim.</h2>
            <div className="grid md:grid-cols-3 gap-4 mt-7">
              {[
                { label: 'Atualizações em tempo real', value: '100%' },
                { label: 'Confiabilidade de agenda', value: '98%' },
                { label: 'Satisfação média', value: '4.9/5' },
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
              <p className="text-xs uppercase tracking-[0.2em] landing-muted">Precisa de atendimento?</p>
              <h3 className="text-2xl md:text-3xl font-black mt-2">Fale com a equipe e receba retorno rápido.</h3>
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
          <p>GAMA Services © {new Date().getFullYear()} | Atendimento de manutenção para clientes</p>
          <p className="inline-flex items-center gap-2"><Clock3 className="w-3.5 h-3.5" /> Atendimento 24/7 para contratos ativos</p>
        </div>
      </footer>

      <WhatsAppButton />
    </div>
  )
}
