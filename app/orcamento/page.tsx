'use client'
import { useState } from 'react'
import { 
  Zap, 
  ArrowLeft, 
  ArrowRight, 
  CheckCircle, 
  Building, 
  MapPin, 
  Phone, 
  User, 
  Mail,
  Send,
  MessageCircle,
  Droplets,
  Paintbrush,
  Plus
} from 'lucide-react'
import Link from 'next/link'

type Step = 'category' | 'details' | 'contact' | 'success'

export default function QuotePage() {
  const [step, setStep] = useState<Step>('category')
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    category: '',
    description: '',
    address: '',
    name: '',
    email: '',
    phone: '',
  })

  const categories = [
    { id: 'ac', label: 'Ar Condicionado', icon: Zap },
    { id: 'el', label: 'Elétrica', icon: Zap },
    { id: 'hi', label: 'Hidráulica', icon: Droplets },
    { id: 'pi', label: 'Pintura/Reforma', icon: Paintbrush },
    { id: 'fa', label: 'Facilities Geral', icon: Building },
    { id: 'ou', label: 'Outros', icon: Plus },
  ]

  const handleNext = () => {
    if (step === 'category') setStep('details')
    else if (step === 'details') setStep('contact')
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    // Simulate API call
    setTimeout(() => {
      setLoading(false)
      setStep('success')
    }, 2000)
  }

  return (
    <div className="min-h-screen bg-transparent flex flex-col items-center justify-center p-4">
      {/* Background Decor */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-sky-500/10 rounded-full blur-3xl opacity-50" />
        <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-sky-500/10 rounded-full blur-3xl opacity-50" />
      </div>

      <div className="w-full max-w-2xl relative z-10">
        {/* Header */}
        <div className="text-center mb-10">
          <Link href="/" className="inline-flex items-center gap-2 mb-6">
            <div className="w-10 h-10 bg-sky-500 rounded-xl flex items-center justify-center shadow-lg shadow-sky-500/30 transition-transform hover:scale-110">
              <Zap className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-extrabold text-white">GAMA <span className="text-sky-400">SERVICES</span></span>
          </Link>
          <h1 className="text-3xl font-bold text-white tracking-tight">Solicite um Orçamento</h1>
          <p className="text-slate-400 mt-2">Resposta rápida e detalhada em até 24 horas.</p>
        </div>

        {/* Progress Tracker */}
        <div className="flex items-center justify-between px-10 mb-8 relative">
           <div className="absolute left-10 right-10 top-1/2 -translate-y-1/2 h-0.5 bg-slate-800" />
           <div className={`absolute left-10 top-1/2 -translate-y-1/2 h-0.5 bg-sky-500 transition-all duration-500 ${
             step === 'category' ? 'w-0' : step === 'details' ? 'w-[45%]' : step === 'contact' ? 'w-[90%]' : 'w-full'
           }`} />
           
           {['Categoria', 'Detalhes', 'Contato'].map((label, idx) => (
             <div key={label} className="relative z-10 flex flex-col items-center gap-2">
               <div className={`w-10 h-10 rounded-full border-2 flex items-center justify-center bg-slate-950 transition-all duration-300 ${
                 (idx === 0) || (idx === 1 && (step === 'details' || step === 'contact' || step === 'success')) || (idx === 2 && (step === 'contact' || step === 'success'))
                   ? 'border-sky-500 text-sky-500 shadow-lg shadow-sky-500/20' 
                   : 'border-slate-800 text-slate-600'
               }`}>
                 {idx === 0 && (step !== 'category' ? <CheckCircle className="w-5 h-5" /> : '1')}
                 {idx === 1 && (step === 'contact' || step === 'success' ? <CheckCircle className="w-5 h-5" /> : '2')}
                 {idx === 2 && (step === 'success' ? <CheckCircle className="w-5 h-5" /> : '3')}
               </div>
               <span className={`text-xs font-bold uppercase tracking-widest ${
                 (idx === 0 && step === 'category') || (idx === 1 && step === 'details') || (idx === 2 && step === 'contact') ? 'text-sky-400' : 'text-slate-600'
               }`}>{label}</span>
             </div>
           ))}
        </div>

        {/* Content Card */}
        <div className="bg-slate-900/80 backdrop-blur-xl rounded-3xl p-8 border border-white/10 shadow-2xl overflow-hidden min-h-[400px] flex flex-col relative">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-sky-500 to-blue-600" />
          
          {step === 'category' && (
            <div className="space-y-6 animate-fade-up">
              <h2 className="text-xl font-bold text-white text-center">O que você precisa hoje?</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {categories.map(cat => {
                   const Icon = cat.icon
                   return (
                     <button 
                       key={cat.id}
                       onClick={() => {
                         setFormData({...formData, category: cat.id})
                         handleNext()
                       }}
                       className={`p-6 rounded-2xl flex flex-col items-center gap-3 border transition-all hover:scale-105 active:scale-95 ${
                         formData.category === cat.id 
                           ? 'border-sky-500 bg-sky-500/10 text-white shadow-lg shadow-sky-500/10' 
                           : 'border-slate-800/50 bg-slate-900/40 text-slate-400 hover:border-slate-700'
                       }`}
                     >
                       <Icon className={`w-8 h-8 ${formData.category === cat.id ? 'text-sky-400' : 'text-slate-500'}`} />
                       <span className="text-xs font-bold">{cat.label}</span>
                     </button>
                   )
                })}
              </div>
            </div>
          )}

          {step === 'details' && (
            <div className="space-y-6 animate-fade-up flex-1 flex flex-col text-center">
              <h2 className="text-xl font-bold text-white">Conte-nos mais sobre o serviço</h2>
              <div className="space-y-4 flex-1">
                 <div className="relative">
                    <textarea 
                      placeholder="Descreva o que precisa ser feito..."
                      value={formData.description}
                      onChange={e => setFormData({...formData, description: e.target.value})}
                      className="w-full bg-slate-950/80 border border-slate-800 focus:border-sky-500 rounded-2xl p-4 text-sm text-white min-h-[150px] outline-none transition-colors placeholder:text-slate-500 resize-none shadow-inner"
                    />
                 </div>
                 <div className="relative group">
                    <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-sky-400 transition-colors" />
                    <input 
                      type="text" 
                      placeholder="Endereço aproximado (ex: Centro, Cajamar)"
                      value={formData.address}
                      onChange={e => setFormData({...formData, address: e.target.value})}
                      className="w-full bg-slate-950/80 border border-slate-800 focus:border-sky-500 rounded-2xl pl-12 pr-4 py-4 text-sm text-white outline-none transition-colors placeholder:text-slate-500 shadow-inner"
                    />
                 </div>
              </div>
              <div className="flex gap-4">
                 <button onClick={() => setStep('category')} className="px-6 py-4 rounded-2xl border border-slate-800 text-slate-400 hover:bg-slate-900 transition-all">
                    <ArrowLeft className="w-5 h-5" />
                 </button>
                 <button onClick={handleNext} disabled={!formData.description || !formData.address}
                    className="flex-1 bg-sky-500 hover:bg-sky-400 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold rounded-2xl py-4 flex items-center justify-center gap-2 transition-all btn-glow">
                    Próximo Passo <ArrowRight className="w-5 h-5" />
                 </button>
              </div>
            </div>
          )}

          {step === 'contact' && (
            <form onSubmit={handleSubmit} className="space-y-6 animate-fade-up flex-1 flex flex-col text-center">
               <h2 className="text-xl font-bold text-white">Como podemos te contatar?</h2>
               <div className="space-y-4 flex-1">
                  <div className="relative group">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-sky-400 transition-colors" />
                    <input 
                      type="text" 
                      placeholder="Seu nome completo"
                      required
                      value={formData.name}
                      onChange={e => setFormData({...formData, name: e.target.value})}
                      className="w-full bg-slate-950/80 border border-slate-800 focus:border-sky-500 rounded-2xl pl-12 pr-4 py-4 text-sm text-white outline-none transition-colors placeholder:text-slate-500 shadow-inner"
                    />
                  </div>
                  <div className="relative group">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-sky-400 transition-colors" />
                    <input 
                      type="email" 
                      placeholder="Seu melhor e-mail"
                      required
                      value={formData.email}
                      onChange={e => setFormData({...formData, email: e.target.value})}
                      className="w-full bg-slate-950/80 border border-slate-800 focus:border-sky-500 rounded-2xl pl-12 pr-4 py-4 text-sm text-white outline-none transition-colors placeholder:text-slate-500 shadow-inner"
                    />
                  </div>
                  <div className="relative group">
                    <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-sky-400 transition-colors" />
                    <input 
                      type="tel" 
                      placeholder="WhatsApp (com DDD)"
                      required
                      value={formData.phone}
                      onChange={e => setFormData({...formData, phone: e.target.value})}
                      className="w-full bg-slate-950/80 border border-slate-800 focus:border-sky-500 rounded-2xl pl-12 pr-4 py-4 text-sm text-white outline-none transition-colors placeholder:text-slate-500 shadow-inner"
                    />
                  </div>
               </div>
               <div className="flex gap-4">
                  <button type="button" onClick={() => setStep('details')} className="px-6 py-4 rounded-2xl border border-slate-800 text-slate-400 hover:bg-slate-900 transition-all">
                    <ArrowLeft className="w-5 h-5" />
                  </button>
                  <button type="submit" disabled={loading}
                    className="flex-1 bg-sky-500 hover:bg-sky-400 text-white font-bold rounded-2xl py-4 flex items-center justify-center gap-2 transition-all btn-glow shadow-xl shadow-sky-500/20">
                    {loading ? (
                       <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    ) : (
                       <><Send className="w-4 h-4" /> Solicitar Orçamento Grátis</>
                    )}
                  </button>
               </div>
            </form>
          )}

          {step === 'success' && (
             <div className="flex-1 flex flex-col items-center justify-center text-center animate-fade-up">
                <div className="w-20 h-20 bg-green-500/10 border border-green-500/20 rounded-full flex items-center justify-center mb-6">
                   <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center shadow-lg shadow-green-500/40">
                      <CheckCircle className="w-8 h-8 text-white" />
                   </div>
                </div>
                <h2 className="text-2xl font-bold text-white mb-2">Solicitação Enviada!</h2>
                <p className="text-slate-400 max-w-sm mb-8">Recebemos seu pedido com sucesso. Nossa equipe entrará em contato em breve via WhatsApp ou E-mail.</p>
                <div className="flex flex-col w-full gap-3">
                   <Link href="/" className="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold py-4 rounded-2xl transition-all border border-slate-800">
                      Voltar para o Início
                   </Link>
                   <a href="https://wa.me/551199999999" target="_blank" rel="noopener noreferrer" 
                      className="w-full bg-green-500 hover:bg-green-400 text-white font-bold py-4 rounded-2xl transition-all flex items-center justify-center gap-2">
                     <MessageCircle className="w-5 h-5" /> Agilizar via WhatsApp
                   </a>
                </div>
             </div>
          )}

        </div>
        
        <p className="mt-8 text-center text-xs text-slate-600">
           © 2026 Gama Services — Cajamar, SP. Atendimento Premium 24/7.
        </p>
      </div>
    </div>
  )
}
