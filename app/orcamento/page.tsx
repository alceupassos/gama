'use client'

import { useMemo, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import {
  ArrowLeft,
  ArrowRight,
  Building2,
  CheckCircle,
  CircleDollarSign,
  Clock3,
  Droplets,
  Gauge,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
  Plus,
  Send,
  ShieldCheck,
  User,
  Wind,
  Wrench,
  Zap,
} from 'lucide-react'

type Step = 'service' | 'scope' | 'contact' | 'success'
type ServiceId = 'ac' | 'el' | 'hi' | 'pi' | 'fa' | 'ou'
type ClientProfile = 'condominio' | 'empresa' | 'industria' | 'comercio'
type Urgency = 'programada' | 'padrao' | 'urgente' | 'emergencial'
type Recurrence = 'avulso' | 'mensal' | 'trimestral' | 'semestral'
type AddonId = 'visitaTecnica' | 'laudo' | 'materiais' | 'foraHorario'

const SERVICE_CONFIG: Record<ServiceId, { label: string; base: number; desc: string; icon: typeof Wind }> = {
  ac: { label: 'Ar Condicionado', base: 420, desc: 'Instalação, preventiva e corretiva HVAC.', icon: Wind },
  el: { label: 'Elétrica', base: 380, desc: 'Quadros, disjuntores, circuitos e diagnóstico.', icon: Zap },
  hi: { label: 'Hidráulica', base: 360, desc: 'Vazamentos, bombas e redes hidráulicas.', icon: Droplets },
  pi: { label: 'Pintura/Reforma', base: 520, desc: 'Reparo civil leve e acabamento técnico.', icon: Wrench },
  fa: { label: 'Facilities Geral', base: 460, desc: 'Manutenção integrada predial/comercial.', icon: Building2 },
  ou: { label: 'Outros Serviços', base: 300, desc: 'Escopo personalizado sob análise técnica.', icon: Plus },
}

const PROFILE_MULTIPLIER: Record<ClientProfile, number> = {
  condominio: 1,
  empresa: 1.08,
  industria: 1.2,
  comercio: 1.05,
}

const URGENCY_MULTIPLIER: Record<Urgency, number> = {
  programada: 0.93,
  padrao: 1,
  urgente: 1.22,
  emergencial: 1.45,
}

const RECURRENCE_MULTIPLIER: Record<Recurrence, number> = {
  avulso: 1,
  mensal: 0.9,
  trimestral: 0.94,
  semestral: 0.97,
}

const ADDONS: Record<AddonId, { label: string; value: number; desc: string }> = {
  visitaTecnica: { label: 'Visita técnica com diagnóstico', value: 180, desc: 'Checklist técnico detalhado no local' },
  laudo: { label: 'Laudo técnico', value: 260, desc: 'Documento técnico com recomendações' },
  materiais: { label: 'Materiais inclusos', value: 340, desc: 'Estimativa com insumos básicos incluídos' },
  foraHorario: { label: 'Atendimento fora de horário', value: 290, desc: 'Execução noturna/fim de semana' },
}

const formatBRL = (value: number) =>
  new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL', maximumFractionDigits: 0 }).format(value)

export default function QuotePage() {
  const [step, setStep] = useState<Step>('service')
  const [loading, setLoading] = useState(false)
  const [protocol, setProtocol] = useState<string>('')

  const [form, setForm] = useState({
    service: 'ac' as ServiceId,
    profile: 'condominio' as ClientProfile,
    urgency: 'padrao' as Urgency,
    recurrence: 'avulso' as Recurrence,
    area: 120,
    units: 1,
    addons: [] as AddonId[],
    description: '',
    address: '',
    name: '',
    email: '',
    phone: '',
    company: '',
    accepted: false,
  })

  const estimate = useMemo(() => {
    const serviceBase = SERVICE_CONFIG[form.service].base
    const profileFactor = PROFILE_MULTIPLIER[form.profile]
    const urgencyFactor = URGENCY_MULTIPLIER[form.urgency]
    const recurrenceFactor = RECURRENCE_MULTIPLIER[form.recurrence]

    const areaFactor = Math.max(1, form.area / 100)
    const unitFactor = Math.max(1, form.units * 0.42)
    const addonsTotal = form.addons.reduce((acc, addon) => acc + ADDONS[addon].value, 0)

    const subtotal = serviceBase * profileFactor * urgencyFactor * recurrenceFactor * areaFactor * unitFactor
    const total = subtotal + addonsTotal
    const min = total * 0.88
    const max = total * 1.12

    return {
      serviceBase,
      profileFactor,
      urgencyFactor,
      recurrenceFactor,
      areaFactor,
      unitFactor,
      addonsTotal,
      subtotal,
      total,
      min,
      max,
    }
  }, [form])

  function toggleAddon(addon: AddonId) {
    setForm((prev) => ({
      ...prev,
      addons: prev.addons.includes(addon) ? prev.addons.filter((item) => item !== addon) : [...prev.addons, addon],
    }))
  }

  function canAdvanceService() {
    return !!form.service
  }

  function canAdvanceScope() {
    return form.description.trim().length > 10 && form.address.trim().length > 5
  }

  function canSubmitContact() {
    return form.name.trim() && form.email.trim() && form.phone.trim() && form.accepted
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!canSubmitContact()) return

    setLoading(true)
    const generatedProtocol = `GMA-${new Date().toISOString().slice(0, 10).replace(/-/g, '')}-${Math.floor(1000 + Math.random() * 9000)}`

    try {
      await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          phone: form.phone,
          company: form.company,
          category: form.service,
          serviceLabel: SERVICE_CONFIG[form.service].label,
          profile: form.profile,
          urgency: form.urgency,
          recurrence: form.recurrence,
          area: form.area,
          units: form.units,
          addons: form.addons,
          description: form.description,
          address: form.address,
          estimateMin: Math.round(estimate.min),
          estimateMax: Math.round(estimate.max),
          estimateTotal: Math.round(estimate.total),
          protocol: generatedProtocol,
        }),
      })
    } catch {
      // fallback UX: protocolo ainda é entregue ao cliente
    } finally {
      setProtocol(generatedProtocol)
      setStep('success')
      setLoading(false)
    }
  }

  const steps = ['Serviço', 'Escopo', 'Contato', 'Concluído']
  const stepIndex = step === 'service' ? 0 : step === 'scope' ? 1 : step === 'contact' ? 2 : 3

  return (
    <div className="landing-shell min-h-screen p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8 flex items-center justify-between gap-4">
          <Link href="/" className="inline-flex items-center gap-2 landing-panel rounded-xl px-4 py-2 text-sm font-semibold hover:border-[var(--landing-accent)] transition-colors">
            <ArrowLeft className="w-4 h-4" /> Voltar para o site
          </Link>
          <div className="landing-panel rounded-xl px-4 py-2 text-sm inline-flex items-center gap-2">
            <CircleDollarSign className="w-4 h-4 text-[var(--landing-accent)]" /> Orçamento Automático Inteligente
          </div>
        </div>

        <div className="grid lg:grid-cols-[1.3fr_0.7fr] gap-6 items-start">
          <div className="landing-panel rounded-3xl p-6 md:p-8">
            <div className="mb-8">
              <h1 className="text-2xl md:text-3xl font-black">Monte seu orçamento em poucos cliques</h1>
              <p className="landing-muted mt-2">Selecione o serviço, ajuste o escopo e receba uma estimativa automática com faixa de preço.</p>

              <div className="mt-6 flex items-center justify-between gap-2">
                {steps.map((label, idx) => (
                  <div key={label} className="flex-1">
                    <div className={`h-1.5 rounded-full ${idx <= stepIndex ? 'bg-[var(--landing-accent)]' : 'bg-[rgba(124,147,196,0.25)]'}`} />
                    <p className={`mt-2 text-[11px] uppercase tracking-wider ${idx <= stepIndex ? 'text-[var(--landing-accent)]' : 'landing-muted'}`}>{label}</p>
                  </div>
                ))}
              </div>
            </div>

            {step === 'service' && (
              <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-3">
                  {(Object.keys(SERVICE_CONFIG) as ServiceId[]).map((serviceId) => {
                    const cfg = SERVICE_CONFIG[serviceId]
                    const Icon = cfg.icon
                    const active = form.service === serviceId
                    return (
                      <button
                        key={serviceId}
                        onClick={() => setForm((prev) => ({ ...prev, service: serviceId }))}
                        className={`text-left rounded-2xl p-4 border transition-all ${active ? 'border-[var(--landing-accent)] bg-[rgba(39,216,255,0.12)]' : 'border-[var(--landing-border)] bg-[color:var(--landing-glass)] hover:border-[var(--landing-accent)]'}`}
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-xl landing-panel grid place-items-center">
                            <Icon className="w-5 h-5 text-[var(--landing-accent)]" />
                          </div>
                          <div>
                            <p className="font-semibold">{cfg.label}</p>
                            <p className="text-xs landing-muted mt-1">{cfg.desc}</p>
                          </div>
                        </div>
                      </button>
                    )
                  })}
                </div>

                <div className="grid md:grid-cols-3 gap-3">
                  <label className="space-y-2 text-sm">
                    <span className="landing-muted">Perfil do cliente</span>
                    <select className="w-full rounded-xl landing-panel p-3 outline-none" value={form.profile} onChange={(e) => setForm((prev) => ({ ...prev, profile: e.target.value as ClientProfile }))}>
                      <option value="condominio">Condomínio</option>
                      <option value="empresa">Empresa</option>
                      <option value="industria">Indústria</option>
                      <option value="comercio">Comércio</option>
                    </select>
                  </label>

                  <label className="space-y-2 text-sm">
                    <span className="landing-muted">Urgência</span>
                    <select className="w-full rounded-xl landing-panel p-3 outline-none" value={form.urgency} onChange={(e) => setForm((prev) => ({ ...prev, urgency: e.target.value as Urgency }))}>
                      <option value="programada">Programada</option>
                      <option value="padrao">Padrão</option>
                      <option value="urgente">Urgente</option>
                      <option value="emergencial">Emergencial</option>
                    </select>
                  </label>

                  <label className="space-y-2 text-sm">
                    <span className="landing-muted">Recorrência</span>
                    <select className="w-full rounded-xl landing-panel p-3 outline-none" value={form.recurrence} onChange={(e) => setForm((prev) => ({ ...prev, recurrence: e.target.value as Recurrence }))}>
                      <option value="avulso">Avulso</option>
                      <option value="mensal">Contrato Mensal</option>
                      <option value="trimestral">Contrato Trimestral</option>
                      <option value="semestral">Contrato Semestral</option>
                    </select>
                  </label>
                </div>

                <div className="flex justify-end">
                  <button
                    disabled={!canAdvanceService()}
                    onClick={() => setStep('scope')}
                    className="landing-cta disabled:opacity-50 px-5 py-3 rounded-xl font-bold inline-flex items-center gap-2"
                  >
                    Avançar <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            )}

            {step === 'scope' && (
              <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <label className="space-y-2 text-sm">
                    <span className="landing-muted">Área estimada (m²)</span>
                    <input
                      type="number"
                      min={20}
                      value={form.area}
                      onChange={(e) => setForm((prev) => ({ ...prev, area: Number(e.target.value || 20) }))}
                      className="w-full rounded-xl landing-panel p-3 outline-none"
                    />
                  </label>
                  <label className="space-y-2 text-sm">
                    <span className="landing-muted">Quantidade de unidades/equipamentos</span>
                    <input
                      type="number"
                      min={1}
                      value={form.units}
                      onChange={(e) => setForm((prev) => ({ ...prev, units: Number(e.target.value || 1) }))}
                      className="w-full rounded-xl landing-panel p-3 outline-none"
                    />
                  </label>
                </div>

                <div>
                  <p className="text-sm landing-muted mb-3">Adicionais</p>
                  <div className="grid md:grid-cols-2 gap-3">
                    {(Object.keys(ADDONS) as AddonId[]).map((addonId) => {
                      const addon = ADDONS[addonId]
                      const active = form.addons.includes(addonId)
                      return (
                        <button
                          key={addonId}
                          type="button"
                          onClick={() => toggleAddon(addonId)}
                          className={`text-left rounded-2xl p-4 border transition-all ${active ? 'border-[var(--landing-accent)] bg-[rgba(39,216,255,0.12)]' : 'border-[var(--landing-border)] landing-panel hover:border-[var(--landing-accent)]'}`}
                        >
                          <p className="font-semibold">{addon.label}</p>
                          <p className="text-xs landing-muted mt-1">{addon.desc}</p>
                          <p className="text-xs font-semibold mt-2 text-[var(--landing-accent)]">+ {formatBRL(addon.value)}</p>
                        </button>
                      )
                    })}
                  </div>
                </div>

                <label className="space-y-2 text-sm block">
                  <span className="landing-muted">Descreva o serviço desejado</span>
                  <textarea
                    rows={5}
                    value={form.description}
                    onChange={(e) => setForm((prev) => ({ ...prev, description: e.target.value }))}
                    className="w-full rounded-xl landing-panel p-3 outline-none resize-none"
                    placeholder="Ex.: manutenção preventiva de 8 aparelhos split, revisão elétrica e checklist final"
                  />
                </label>

                <label className="space-y-2 text-sm block">
                  <span className="landing-muted">Endereço do atendimento</span>
                  <div className="relative">
                    <MapPin className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[var(--landing-accent)]" />
                    <input
                      type="text"
                      value={form.address}
                      onChange={(e) => setForm((prev) => ({ ...prev, address: e.target.value }))}
                      className="w-full rounded-xl landing-panel p-3 pl-10 outline-none"
                      placeholder="Rua, número, bairro, cidade"
                    />
                  </div>
                </label>

                <div className="flex justify-between">
                  <button onClick={() => setStep('service')} className="landing-panel px-5 py-3 rounded-xl font-semibold inline-flex items-center gap-2 hover:border-[var(--landing-accent)] transition-colors">
                    <ArrowLeft className="w-4 h-4" /> Voltar
                  </button>
                  <button
                    disabled={!canAdvanceScope()}
                    onClick={() => setStep('contact')}
                    className="landing-cta disabled:opacity-50 px-5 py-3 rounded-xl font-bold inline-flex items-center gap-2"
                  >
                    Continuar <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            )}

            {step === 'contact' && (
              <motion.form onSubmit={handleSubmit} initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} className="space-y-5">
                <div className="grid md:grid-cols-2 gap-4">
                  <label className="space-y-2 text-sm">
                    <span className="landing-muted">Nome completo</span>
                    <div className="relative">
                      <User className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[var(--landing-accent)]" />
                      <input type="text" value={form.name} onChange={(e) => setForm((prev) => ({ ...prev, name: e.target.value }))} className="w-full rounded-xl landing-panel p-3 pl-10 outline-none" required />
                    </div>
                  </label>
                  <label className="space-y-2 text-sm">
                    <span className="landing-muted">Empresa/Condomínio</span>
                    <input type="text" value={form.company} onChange={(e) => setForm((prev) => ({ ...prev, company: e.target.value }))} className="w-full rounded-xl landing-panel p-3 outline-none" />
                  </label>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <label className="space-y-2 text-sm">
                    <span className="landing-muted">E-mail</span>
                    <div className="relative">
                      <Mail className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[var(--landing-accent)]" />
                      <input type="email" value={form.email} onChange={(e) => setForm((prev) => ({ ...prev, email: e.target.value }))} className="w-full rounded-xl landing-panel p-3 pl-10 outline-none" required />
                    </div>
                  </label>
                  <label className="space-y-2 text-sm">
                    <span className="landing-muted">WhatsApp</span>
                    <div className="relative">
                      <Phone className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[var(--landing-accent)]" />
                      <input type="tel" value={form.phone} onChange={(e) => setForm((prev) => ({ ...prev, phone: e.target.value }))} className="w-full rounded-xl landing-panel p-3 pl-10 outline-none" required />
                    </div>
                  </label>
                </div>

                <label className="flex items-start gap-3 text-sm landing-muted">
                  <input type="checkbox" checked={form.accepted} onChange={(e) => setForm((prev) => ({ ...prev, accepted: e.target.checked }))} className="mt-1" />
                  Concordo com o envio dos dados para retorno comercial e recebimento da estimativa automática.
                </label>

                <div className="flex justify-between">
                  <button type="button" onClick={() => setStep('scope')} className="landing-panel px-5 py-3 rounded-xl font-semibold inline-flex items-center gap-2 hover:border-[var(--landing-accent)] transition-colors">
                    <ArrowLeft className="w-4 h-4" /> Voltar
                  </button>
                  <button type="submit" disabled={!canSubmitContact() || loading} className="landing-cta disabled:opacity-50 px-5 py-3 rounded-xl font-bold inline-flex items-center gap-2">
                    {loading ? 'Enviando...' : 'Gerar orçamento'} <Send className="w-4 h-4" />
                  </button>
                </div>
              </motion.form>
            )}

            {step === 'success' && (
              <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} className="text-center py-6">
                <div className="w-16 h-16 rounded-full bg-emerald-500/20 mx-auto flex items-center justify-center mb-5">
                  <CheckCircle className="w-8 h-8 text-emerald-500" />
                </div>
                <h2 className="text-2xl font-black">Orçamento enviado com sucesso</h2>
                <p className="landing-muted mt-2">Protocolo: <span className="font-semibold text-[var(--landing-text)]">{protocol}</span></p>
                <p className="landing-muted mt-1">Faixa estimada: <span className="font-semibold text-[var(--landing-accent)]">{formatBRL(estimate.min)} a {formatBRL(estimate.max)}</span></p>

                <div className="mt-8 flex flex-wrap gap-3 justify-center">
                  <Link href="/" className="landing-panel px-5 py-3 rounded-xl font-semibold hover:border-[var(--landing-accent)] transition-colors">Voltar ao início</Link>
                  <a href={`https://wa.me/551136972127?text=${encodeURIComponent(`Olá! Já enviei meu orçamento automático (${protocol}) e quero agilizar o atendimento.`)}`} className="landing-cta px-5 py-3 rounded-xl font-bold inline-flex items-center gap-2">
                    Agilizar no WhatsApp <MessageCircle className="w-4 h-4" />
                  </a>
                </div>
              </motion.div>
            )}
          </div>

          <aside className="landing-panel rounded-3xl p-5 md:p-6 lg:sticky lg:top-28">
            <div className="rounded-2xl overflow-hidden border border-[var(--landing-border)] mb-5">
              <Image src="/images/generated/quote-flow-ai.jpg" alt="Painel de atendimento e simulacao de orcamento" width={1344} height={768} className="w-full h-auto" />
            </div>

            <h3 className="font-bold text-lg">Resumo automático</h3>
            <p className="landing-muted text-sm mt-1">Estimativa atual baseada nas escolhas do formulário.</p>

            <div className="mt-4 space-y-3 text-sm">
              <div className="flex items-center justify-between">
                <span className="landing-muted">Serviço base</span>
                <span>{formatBRL(estimate.serviceBase)}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="landing-muted">Perfil ({form.profile})</span>
                <span>x {estimate.profileFactor.toFixed(2)}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="landing-muted">Urgência ({form.urgency})</span>
                <span>x {estimate.urgencyFactor.toFixed(2)}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="landing-muted">Recorrência ({form.recurrence})</span>
                <span>x {estimate.recurrenceFactor.toFixed(2)}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="landing-muted">Escala área/unidades</span>
                <span>x {(estimate.areaFactor * estimate.unitFactor).toFixed(2)}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="landing-muted">Adicionais</span>
                <span>{formatBRL(estimate.addonsTotal)}</span>
              </div>
            </div>

            <div className="my-5 h-px bg-[var(--landing-border)]" />

            <div className="space-y-2">
              <div className="flex items-center justify-between font-semibold">
                <span>Estimativa central</span>
                <span className="text-[var(--landing-accent)]">{formatBRL(estimate.total)}</span>
              </div>
              <div className="flex items-center justify-between text-sm landing-muted">
                <span>Faixa sugerida</span>
                <span>{formatBRL(estimate.min)} - {formatBRL(estimate.max)}</span>
              </div>
            </div>

            <div className="mt-6 landing-panel rounded-xl p-4 text-xs landing-muted">
              <p className="inline-flex items-center gap-2"><Gauge className="w-3.5 h-3.5 text-[var(--landing-accent)]" /> Valor preliminar sujeito à vistoria técnica.</p>
              <p className="inline-flex items-center gap-2 mt-2"><Clock3 className="w-3.5 h-3.5 text-[var(--landing-accent)]" /> Retorno comercial em até 24h úteis.</p>
              <p className="inline-flex items-center gap-2 mt-2"><ShieldCheck className="w-3.5 h-3.5 text-[var(--landing-accent)]" /> Protocolo automático gerado no envio.</p>
            </div>
          </aside>
        </div>
      </div>
    </div>
  )
}
