'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion, type Variants } from 'framer-motion'
import {
  ArrowRight,
  Building2,
  CheckCircle2,
  ChevronRight,
  Clock3,
  Factory,
  Gauge,
  HardHat,
  Headset,
  Mail,
  Phone,
  ShieldCheck,
  Sparkles,
  UserRound,
  Wrench,
} from 'lucide-react'
import { ThemeToggle } from '@/components/ThemeToggle'
import { WhatsAppButton } from '@/components/shared/WhatsAppButton'

const reveal: Variants = {
  hidden: { opacity: 0, y: 26 },
  show: (index: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: index * 0.08, duration: 0.62, ease: [0.22, 1, 0.36, 1] },
  }),
}

const sections = [
  { id: 'quem-somos', label: 'Quem somos' },
  { id: 'segmentos', label: 'Segmentos' },
  { id: 'servicos', label: 'Servicos' },
  { id: 'orcamento-inteligente', label: 'Orcamento automatico' },
  { id: 'contato', label: 'Contato' },
]

export default function HomePage() {
  return (
    <div className="landing-shell relative min-h-screen overflow-x-hidden">
      <div className="landing-grid-overlay pointer-events-none fixed inset-0 opacity-35" />

      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -top-24 -left-24 h-72 w-72 rounded-full bg-cyan-300/20 blur-3xl" />
        <div className="absolute top-1/3 -right-20 h-72 w-72 rounded-full bg-sky-300/15 blur-3xl" />
        <div className="absolute bottom-6 left-1/3 h-60 w-60 rounded-full bg-amber-300/10 blur-3xl" />
      </div>

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

          <nav className="hidden xl:flex items-center gap-6 text-sm landing-muted">
            {sections.map((item) => (
              <a key={item.id} href={`#${item.id}`} className="hover:text-[var(--landing-text)] transition-colors">
                {item.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-2 md:gap-3">
            <ThemeToggle />
            <Link href="/dashboard/client" className="hidden md:inline-flex px-3 py-2 rounded-xl text-xs font-semibold border border-[var(--landing-border)] bg-[color:var(--landing-glass)] hover:border-[var(--landing-accent)] transition-colors">
              Portal do Cliente
            </Link>
            <Link href="/orcamento" className="px-4 py-2.5 rounded-xl text-xs md:text-sm font-semibold border border-[var(--landing-border)] bg-[color:var(--landing-glass)] hover:border-[var(--landing-accent)] transition-colors">
              Solicitar Orcamento
            </Link>
            <Link href="/dashboard/admin" className="hidden xl:inline-flex px-3 py-2 rounded-xl text-xs font-medium border border-transparent landing-muted hover:border-[var(--landing-border)] transition-colors">
              Area interna
            </Link>
          </div>
        </div>
      </header>

      <main className="relative z-10">
        <section id="inicio" className="max-w-7xl mx-auto px-5 md:px-8 pt-16 md:pt-20 pb-14 md:pb-20">
          <div className="grid lg:grid-cols-2 gap-10 items-center">
            <div className="space-y-6">
              <motion.div className="flex flex-wrap gap-2" variants={reveal} initial="hidden" animate="show" custom={0}>
                {['Ar Condicionado', 'Eletrica', 'Hidraulica', 'Facilities'].map((chip) => (
                  <span key={chip} className="landing-panel inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[var(--landing-accent)]" /> {chip}
                  </span>
                ))}
              </motion.div>

              <motion.h1 className="text-5xl md:text-7xl font-black tracking-tight leading-[0.94]" variants={reveal} initial="hidden" animate="show" custom={1}>
                Manutencao predial
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-[var(--landing-accent)] to-[#75BEFF]">com engenharia</span>
                de precisao e resposta real.
              </motion.h1>

              <motion.p className="text-lg landing-muted max-w-xl" variants={reveal} initial="hidden" animate="show" custom={2}>
                Reestruturamos a operacao da sua unidade com atendimento 24/7, padrao ABNT e acompanhamento em tempo real para o cliente.
              </motion.p>

              <motion.div className="flex flex-wrap gap-3" variants={reveal} initial="hidden" animate="show" custom={3}>
                <Link href="/orcamento" className="landing-cta px-6 py-3 rounded-2xl font-bold transition-colors inline-flex items-center gap-2">
                  Orcamento rapido <ArrowRight className="w-4 h-4" />
                </Link>
                <a href="https://wa.me/551136972127" className="landing-panel px-6 py-3 rounded-2xl font-semibold hover:border-[var(--landing-accent)] transition-colors inline-flex items-center gap-2">
                  <Phone className="w-4 h-4 text-[var(--landing-accent)]" /> (11) 3697-2127
                </a>
              </motion.div>

              <motion.div className="grid sm:grid-cols-4 gap-3 pt-2" variants={reveal} initial="hidden" animate="show" custom={4}>
                {[
                  { label: 'SLA medio', value: '99.2%' },
                  { label: 'Resposta', value: '23 min' },
                  { label: 'Cobertura', value: 'SP Capital' },
                  { label: 'Suporte', value: '24/7' },
                ].map((item) => (
                  <div key={item.label} className="landing-panel rounded-2xl p-4">
                    <p className="text-xl md:text-2xl font-extrabold">{item.value}</p>
                    <p className="text-[11px] uppercase tracking-wider landing-muted mt-1">{item.label}</p>
                  </div>
                ))}
              </motion.div>
            </div>

            <motion.div className="relative" variants={reveal} initial="hidden" animate="show" custom={2}>
              <div className="absolute -inset-6 rounded-[2rem] bg-[radial-gradient(circle,rgba(39,216,255,0.25),transparent_70%)] blur-3xl" />

              <div className="landing-panel relative rounded-[2rem] overflow-hidden mb-4 animate-float">
                <Image src="/images/generated/landing-hero-ai.jpg" alt="Equipe tecnica em manutencao predial" width={1536} height={1024} className="w-full h-auto" priority />
                <div className="landing-panel absolute top-5 right-5 rounded-xl px-4 py-3">
                  <p className="text-[10px] uppercase tracking-[0.15em] landing-muted">Chamado ativo</p>
                  <p className="text-xl font-black">Em andamento</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="landing-panel rounded-2xl overflow-hidden animate-float-delayed">
                  <Image src="/images/generated/about-team-ai.jpg" alt="Equipe de facilities em planejamento operacional" width={1344} height={768} className="w-full h-auto" />
                </div>
                <div className="landing-panel rounded-2xl overflow-hidden animate-float">
                  <Image src="/images/generated/quote-flow-ai.jpg" alt="Fluxo digital de orcamento automatico" width={1344} height={768} className="w-full h-auto" />
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        <section id="quem-somos" className="max-w-7xl mx-auto px-5 md:px-8 pb-14 md:pb-20">
          <div className="grid lg:grid-cols-2 gap-6 items-stretch">
            <motion.article className="landing-panel rounded-[2rem] p-7 md:p-9" variants={reveal} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }} custom={0}>
              <p className="text-xs uppercase tracking-[0.2em] landing-muted">Quem somos</p>
              <h2 className="text-3xl md:text-4xl font-black mt-3">Solucao integrada para manutencoes prediais e comerciais em Sao Paulo.</h2>
              <p className="landing-muted mt-4 leading-relaxed">
                A GAMA SERVICES e especializada em ar condicionado e facilities. Nossa equipe tecnica atua dentro de padroes ABNT e integra
                servicos complementares para entregar a operacao completa com eficiencia e qualidade.
              </p>
              <div className="grid sm:grid-cols-2 gap-3 mt-6">
                {[
                  'Manutencao preventiva e corretiva',
                  'Equipe tecnica capacitada',
                  'Padrao ABNT em execucao',
                  'Gestao central de fornecedores e chamados',
                ].map((item) => (
                  <div key={item} className="landing-panel rounded-xl px-3 py-2 text-sm inline-flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[var(--landing-accent)]" /> {item}
                  </div>
                ))}
              </div>
            </motion.article>

            <motion.div className="landing-panel rounded-[2rem] overflow-hidden" variants={reveal} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }} custom={1}>
              <Image src="/images/generated/about-team-ai.jpg" alt="Equipe acompanhando atendimento e suporte" width={1344} height={768} className="w-full h-full object-cover" />
            </motion.div>
          </div>
        </section>

        <section id="segmentos" className="max-w-7xl mx-auto px-5 md:px-8 pb-14 md:pb-20">
          <motion.div className="mb-6" variants={reveal} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }} custom={0}>
            <p className="text-xs uppercase tracking-[0.2em] landing-muted">Segmentos</p>
            <h2 className="text-3xl md:text-4xl font-black mt-2">Atendimento em multiplos perfis de operacao</h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-5">
            {[
              {
                title: 'Condominios comerciais e residenciais',
                text: 'Rotina de manutencao recorrente, controle de SLAs e atendimento rapido para demandas criticas.',
                image: '/images/generated/segment-condominios-ai.jpg',
                icon: Building2,
              },
              {
                title: 'Operacoes corporativas',
                text: 'Suporte para predios administrativos, lojas e unidades de atendimento com rastreabilidade completa.',
                image: '/images/generated/segment-corporativo-ai.jpg',
                icon: Gauge,
              },
              {
                title: 'Ambientes industriais',
                text: 'Padroes tecnicos para ativos criticos, continuidade operacional e seguranca de planta.',
                image: '/images/generated/segment-industrial-ai.jpg',
                icon: Factory,
              },
            ].map((item, idx) => {
              const Icon = item.icon
              return (
                <motion.article
                  key={item.title}
                  className="landing-panel rounded-3xl overflow-hidden"
                  variants={reveal}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true, amount: 0.15 }}
                  custom={idx}
                >
                  <Image src={item.image} alt={item.title} width={900} height={620} className="w-full h-auto" />
                  <div className="p-5">
                    <p className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.16em] landing-muted">
                      <Icon className="w-4 h-4 text-[var(--landing-accent)]" /> Segmento
                    </p>
                    <h3 className="font-black text-xl mt-2">{item.title}</h3>
                    <p className="landing-muted text-sm mt-2">{item.text}</p>
                  </div>
                </motion.article>
              )
            })}
          </div>
        </section>

        <section id="servicos" className="max-w-7xl mx-auto px-5 md:px-8 pb-14 md:pb-20">
          <motion.div className="mb-6" variants={reveal} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }} custom={0}>
            <p className="text-xs uppercase tracking-[0.2em] landing-muted">Servicos</p>
            <h2 className="text-3xl md:text-4xl font-black mt-2">Escopo completo que reintegra o conteudo principal do site oficial</h2>
          </motion.div>

          <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-4">
            {[
              {
                title: 'Ar Condicionado',
                text: 'Instalacao, manutencao preventiva e corretiva com foco em performance termica e economia.',
                icon: Wrench,
              },
              {
                title: 'Eletrica',
                text: 'Diagnostico, adequacoes e manutencao de quadros, circuitos, iluminacao e seguranca eletrica.',
                icon: ShieldCheck,
              },
              {
                title: 'Hidraulica',
                text: 'Correcao de vazamentos, bombas, pressao, esgoto e manutencao geral da infraestrutura hidraulica.',
                icon: HardHat,
              },
              {
                title: 'Civil e Pintura',
                text: 'Reparos civis, acabamento e pintura geral para preservacao da unidade e imagem do espaco.',
                icon: Building2,
              },
              {
                title: 'Gerenciamento de Facilities',
                text: 'Eletrica, hidraulica, civil e pintura sob uma unica orquestracao operacional.',
                icon: Headset,
              },
              {
                title: 'Edificacoes e Obras Rapidas',
                text: 'Intervencoes curtas com escopo definido, prazo enxuto e acompanhamento ativo por protocolo.',
                icon: Gauge,
              },
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

        <section id="orcamento-inteligente" className="max-w-7xl mx-auto px-5 md:px-8 pb-14 md:pb-20">
          <div className="grid lg:grid-cols-2 gap-6 items-stretch">
            <motion.article className="landing-panel rounded-[2rem] p-7 md:p-9" variants={reveal} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }} custom={0}>
              <p className="text-xs uppercase tracking-[0.2em] landing-muted">Orcamento rapido</p>
              <h2 className="text-3xl md:text-4xl font-black mt-2">Fluxo automatico para o cliente montar o escopo e receber estimativa.</h2>
              <div className="mt-6 space-y-3">
                {[
                  '1. Diagnostico inicial do tipo de servico',
                  '2. Escopo com area, urgencia e adicionais',
                  '3. Simulacao de faixa de valor em tempo real',
                  '4. Envio com protocolo e contato automatizado',
                ].map((step) => (
                  <div key={step} className="landing-panel rounded-xl px-4 py-3 text-sm inline-flex items-center gap-2 w-full">
                    <ChevronRight className="w-4 h-4 text-[var(--landing-accent)]" /> {step}
                  </div>
                ))}
              </div>

              <div className="flex flex-wrap gap-3 mt-7">
                <Link href="/orcamento" className="landing-cta px-5 py-3 rounded-xl font-bold inline-flex items-center gap-2 transition-colors">
                  Abrir orcamento automatico <ArrowRight className="w-4 h-4" />
                </Link>
                <Link href="/dashboard/client" className="landing-panel px-5 py-3 rounded-xl font-semibold hover:border-[var(--landing-accent)] transition-colors inline-flex items-center gap-2">
                  <UserRound className="w-4 h-4 text-[var(--landing-accent)]" /> Acompanhar meu chamado
                </Link>
              </div>
            </motion.article>

            <motion.div className="landing-panel rounded-[2rem] overflow-hidden" variants={reveal} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }} custom={1}>
              <Image src="/images/generated/quote-flow-ai.jpg" alt="Fluxo de orcamento em 4 etapas" width={1344} height={768} className="w-full h-full object-cover" />
            </motion.div>
          </div>
        </section>

        <section id="acompanhamento" className="max-w-7xl mx-auto px-5 md:px-8 pb-14 md:pb-20 grid lg:grid-cols-2 gap-6">
          <motion.div className="landing-panel rounded-[2rem] overflow-hidden" variants={reveal} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }} custom={0}>
            <Image src="/images/generated/segment-corporativo-ai.jpg" alt="Acompanhamento de suporte em tempo real" width={1344} height={768} className="w-full h-auto" />
          </motion.div>

          <motion.div className="landing-panel rounded-[2rem] overflow-hidden" variants={reveal} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }} custom={1}>
            <Image src="/images/generated/segment-industrial-ai.jpg" alt="Servico em execucao com equipe tecnica" width={1344} height={768} className="w-full h-auto" />
          </motion.div>
        </section>

        <section id="contato" className="max-w-7xl mx-auto px-5 md:px-8 pb-20">
          <motion.div className="landing-panel rounded-[2rem] p-6 md:p-8" variants={reveal} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }} custom={0}>
            <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
              <div>
                <p className="text-xs uppercase tracking-[0.2em] landing-muted">Contato oficial</p>
                <h3 className="text-2xl md:text-3xl font-black mt-2">Canal direto para solicitacoes, duvidas e propostas.</h3>
              </div>
              <div className="flex flex-wrap gap-3">
                <a href="https://wa.me/551136972127" className="landing-cta px-5 py-3 rounded-xl font-bold inline-flex items-center gap-2 transition-colors">
                  WhatsApp <ArrowRight className="w-4 h-4" />
                </a>
                <Link href="/orcamento" className="landing-panel px-5 py-3 rounded-xl font-semibold hover:border-[var(--landing-accent)] transition-colors">
                  Solicitar orcamento
                </Link>
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-4 mt-6">
              <div className="landing-panel rounded-xl p-4">
                <p className="text-xs uppercase tracking-[0.14em] landing-muted">Telefone e WhatsApp</p>
                <p className="text-xl font-black mt-1 inline-flex items-center gap-2"><Phone className="w-4 h-4 text-[var(--landing-accent)]" /> (11) 3697-2127</p>
              </div>
              <div className="landing-panel rounded-xl p-4">
                <p className="text-xs uppercase tracking-[0.14em] landing-muted">E-mail</p>
                <p className="text-xl font-black mt-1 inline-flex items-center gap-2"><Mail className="w-4 h-4 text-[var(--landing-accent)]" /> contato@gamaservices.com.br</p>
              </div>
              <div className="landing-panel rounded-xl p-4">
                <p className="text-xs uppercase tracking-[0.14em] landing-muted">Atendimento</p>
                <p className="text-xl font-black mt-1 inline-flex items-center gap-2"><Clock3 className="w-4 h-4 text-[var(--landing-accent)]" /> 24/7 para contratos ativos</p>
              </div>
            </div>
          </motion.div>
        </section>
      </main>

      <footer className="border-t border-[var(--landing-border)] py-8 text-center text-xs landing-muted">
        <div className="max-w-7xl mx-auto px-5 md:px-8 flex flex-col md:flex-row items-center justify-between gap-3">
          <p>GAMA Services © {new Date().getFullYear()} | Manutencao predial e comercial em Sao Paulo</p>
          <p className="inline-flex items-center gap-2"><Headset className="w-3.5 h-3.5" /> Conteudo reinserido e melhorado com foco em conversao</p>
        </div>
      </footer>

      <WhatsAppButton />
    </div>
  )
}
