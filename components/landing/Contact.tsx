'use client'
import { useState } from 'react'
import { motion } from 'framer-motion'
import { Phone, Mail, MapPin, MessageCircle, Send, Sparkles, Orbit, Clock } from 'lucide-react'

export function Contact() {
  const [sent, setSent] = useState(false)
  const [loading, setLoading] = useState(false)
  const [form, setForm] = useState({ name: '', email: '', phone: '', service: '', message: '' })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    try {
      // Small delay for UX simulation since this is a high-end demo
      await new Promise(r => setTimeout(r, 1500))
      setSent(true)
    } finally {
      setLoading(false)
    }
  }

  return (
    <section id="contato" className="py-32 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-24"
        >
          <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-accent/10 border border-accent/20 text-accent text-sm font-black mb-8">
            <Orbit className="w-4 h-4 animate-spin-slow" /> Conecte-se Conosco
          </div>
          <h2 className="text-5xl md:text-7xl font-black text-foreground mb-10 tracking-tighter leading-[1.1]">
            Pronto para <span className="text-accent underline decoration-accent/30 underline-offset-8">Expandir?</span>
          </h2>
          <p className="text-2xl text-muted-foreground max-w-2xl mx-auto font-medium leading-relaxed">
            Nossa equipe de consultoria técnica está a postos para projetar sua próxima solução de infraestrutura.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-20 items-start">
          {/* Contact info */}
          <div className="space-y-8">
            {[
              { icon: Phone, label: 'Central de Atendimento', value: '(11) 3697-2127', href: 'tel:+551136972127' },
              { icon: Mail, label: 'E-mail Corporativo', value: 'contato@gamaservices.com.br', href: 'mailto:contato@gamaservices.com.br' },
              { icon: MapPin, label: 'HQ Estratégica', value: 'Av. Tenente Marques, 5.700 - Sala 17\nPortais - Cajamar / SP', href: '#' },
              { icon: Clock, label: 'SLA de Resposta', value: 'Protocolos de resposta em < 24h úteis', href: '#' },
            ].map((c, idx) => {
              const Icon = c.icon
              return (
                <motion.a 
                  key={c.label} 
                  href={c.href} 
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="flex items-center gap-6 group bg-card/40 backdrop-blur-3xl border border-border/50 hover:border-accent/40 rounded-[32px] p-8 transition-all duration-500 hover:translate-x-4 shadow-xl"
                >
                  <div className="w-16 h-16 bg-accent/10 border border-accent/20 rounded-2xl flex items-center justify-center flex-shrink-0 group-hover:bg-accent transition-all duration-500">
                    <Icon className="w-8 h-8 text-accent group-hover:text-accent-foreground transition-colors" />
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground font-black uppercase tracking-widest mb-1">{c.label}</div>
                    <div className="text-xl text-foreground font-black group-hover:text-accent transition-colors whitespace-pre-line">{c.value}</div>
                  </div>
                </motion.a>
              )
            })}
            
            <motion.a 
              href={`https://wa.me/5511936972127`} 
              target="_blank" 
              rel="noopener noreferrer"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="flex items-center justify-center gap-4 w-full bg-accent hover:bg-accent/90 text-accent-foreground text-xl font-black py-8 rounded-[32px] transition-all duration-500 shadow-[0_20px_50px_rgba(245,158,11,0.2)] hover:shadow-[0_20px_80px_rgba(245,158,11,0.4)] group"
            >
              <MessageCircle className="w-8 h-8 group-hover:scale-125 transition-transform" />
              CONTRATAR VIA WHATSAPP 24H
            </motion.a>
          </div>

          {/* Form */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative group perspective-2000"
          >
            <div className="absolute -inset-1 bg-gradient-to-r from-accent to-accent/60 rounded-[48px] blur opacity-20 group-hover:opacity-40 transition duration-1000 group-hover:duration-200" />
            
            <div className="relative bg-card/60 backdrop-blur-3xl border border-border rounded-[48px] p-12 shadow-2xl overflow-hidden">
              <div className="absolute top-0 right-0 p-8 opacity-5">
                <Send className="w-32 h-32 text-accent" />
              </div>
              
              {sent ? (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-20"
                >
                  <div className="w-24 h-24 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-8 border-4 border-accent/20">
                    <Send className="w-12 h-12 text-accent animate-bounce" />
                  </div>
                  <h3 className="text-4xl font-black text-foreground mb-4">Protocolo Ativado!</h3>
                  <p className="text-xl text-muted-foreground font-medium">Sua solicitação está em processamento prioritário.</p>
                  <button onClick={() => setSent(false)} className="mt-10 text-accent font-black hover:underline cursor-pointer uppercase tracking-widest text-sm">Enviar nova mensagem</button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="relative z-10 space-y-6">
                  <div className="flex items-center gap-3 mb-10">
                    <Sparkles className="text-accent w-6 h-6" />
                    <h3 className="text-2xl font-black text-foreground">Interface de Orçamento</h3>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-6">
                      {[
                        { name: 'name', placeholder: 'Identificação Nome', type: 'text' },
                        { name: 'email', placeholder: 'Diretório Digital / E-mail', type: 'email' },
                        { name: 'phone', placeholder: 'Canal de Voz / WhatsApp', type: 'tel' },
                      ].map(f => (
                        <div key={f.name} className="relative">
                           <input type={f.type} placeholder={f.placeholder} required
                            value={form[f.name as keyof typeof form]}
                            onChange={e => setForm(p => ({ ...p, [f.name]: e.target.value }))}
                            className="w-full bg-background/50 border border-border focus:border-accent text-foreground placeholder-muted-foreground/50 rounded-2xl px-6 py-5 text-lg outline-none transition-all duration-500 focus:bg-background shadow-inner" />
                        </div>
                      ))}
                    </div>

                    <div className="space-y-6">
                      <div className="relative">
                        <select 
                          required
                          value={form.service} 
                          onChange={e => setForm(p => ({ ...p, service: e.target.value }))}
                          className="w-full bg-background/50 border border-border focus:border-accent text-foreground rounded-2xl px-6 py-5 text-lg outline-none transition-all duration-500 focus:bg-background shadow-inner appearance-none relative z-10"
                        >
                          <option value="" disabled className="text-muted-foreground opacity-50">Selecione o Sistema</option>
                          <option value="hvac">Ar Condicionado (HVAC)</option>
                          <option value="civil">Engenharia Civil</option>
                          <option value="eletr">Instalações Elétricas</option>
                          <option value="passiva">Proteção Passiva</option>
                          <option value="hidro">Sistemas Hidráulicos</option>
                          <option value="retrofit">Retrofit Industrial</option>
                        </select>
                        <div className="absolute right-6 top-1/2 -translate-y-1/2 pointer-events-none z-20">
                          <Clock className="w-5 h-5 text-muted-foreground/30" />
                        </div>
                      </div>

                      <textarea 
                        placeholder="Descreva a amplitude operacional do projeto..." 
                        rows={5} 
                        value={form.message}
                        onChange={e => setForm(p => ({ ...p, message: e.target.value }))}
                        className="w-full bg-background/50 border border-border focus:border-accent text-foreground placeholder-muted-foreground/50 rounded-2xl px-6 py-5 text-lg outline-none transition-all duration-500 focus:bg-background shadow-inner resize-none" 
                      />
                    </div>
                  </div>

                  <motion.button 
                    type="submit" 
                    disabled={loading}
                    whileHover={{ y: -5, boxShadow: '0 20px 40px rgba(245,158,11,0.2)' }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full bg-accent hover:bg-accent/90 disabled:opacity-60 text-accent-foreground text-2xl font-black py-8 rounded-[32px] transition-all duration-500 flex items-center justify-center gap-4 group"
                  >
                    {loading ? (
                      <div className="w-8 h-8 border-4 border-accent-foreground/30 border-t-accent-foreground rounded-full animate-spin" />
                    ) : (
                      <>SOLICITAR CONSULTORIA <Send className="w-6 h-6 group-hover:translate-x-2 transition-transform" /></>
                    )}
                  </motion.button>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Extreme Background Glow */}
      <div className="absolute -bottom-1/2 left-1/2 -translate-x-1/2 w-[1000px] h-[1000px] bg-accent/5 blur-[180px] pointer-events-none -z-10" />
    </section>
  )
}
