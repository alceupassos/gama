'use client'
import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { Wind, Zap, Droplets, Paintbrush, Building2, ShieldCheck, ArrowRight, Sparkles } from 'lucide-react'

const services = [
  {
    title: 'Ar Condicionado',
    description: 'Instalação, manutenção preventiva (PMOC) e corretiva com técnicos especializados. GEMINI Engine de diagnóstico.',
    icon: Wind,
    image: 'https://images.unsplash.com/photo-1596753011022-503de2ba8cb0?auto=format&fit=crop&q=80&w=800',
  },
  {
    title: 'Elétrica Predial',
    description: 'Quadros de força, cabeamento estruturado, iluminação LED e laudos técnicos ABNT.',
    icon: Zap,
    image: 'https://images.unsplash.com/photo-1544724569-5f546fd6f2b5?auto=format&fit=crop&q=80&w=800',
  },
  {
    title: 'Hidráulica',
    description: 'Reparos de vazamentos, colunas de prédio, bombas e limpeza de reservatórios técnica.',
    icon: Droplets,
    image: 'https://images.unsplash.com/photo-1581093196277-9f608ebab48c?auto=format&fit=crop&q=80&w=800',
  },
  {
    title: 'Pintura & Fachada',
    description: 'Pintura interna/externa, restauração de fachadas e impermeabilização com NANO tecnologia.',
    icon: Paintbrush,
    image: 'https://images.unsplash.com/photo-1560179707-f14e90ef3623?auto=format&fit=crop&q=80&w=800',
  },
  {
    title: 'Facilities Geral',
    description: 'Gestão completa de manutenção, limpeza técnica e portaria especializada 24h.',
    icon: Building2,
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=800',
  },
  {
    title: 'Segurança & CFTV',
    description: 'Monitoramento inteligente, instalação de câmeras e controle de acesso biométrico.',
    icon: ShieldCheck,
    image: 'https://images.unsplash.com/photo-1557597774-9d2739f85a94?auto=format&fit=crop&q=80&w=800',
  }
]

export function Services() {
  return (
    <section id="servicos" className="py-32 relative overflow-hidden bg-background">
      {/* Background Decor - Subtle Grid Part 2 */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#0ea5e905_1px,transparent_1px),linear-gradient(to_bottom,#0ea5e905_1px,transparent_1px)] bg-[size:60px_60px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-left mb-24 max-w-4xl"
        >
          <div className="inline-flex items-center gap-2 px-6 py-2.5 rounded-2xl bg-primary/10 border border-primary/20 text-primary text-xs font-black uppercase tracking-widest mb-10 shadow-sm">
            <Sparkles className="w-4 h-4 animate-pulse" /> Engenharia em Alta Performance
          </div>
          <h2 className="text-6xl md:text-8xl font-black text-foreground mb-10 tracking-tightest leading-none">
            Especialidades <br />
            <span className="text-link italic">Full Stack.</span>
          </h2>
          <p className="text-xl sm:text-2xl text-muted-foreground leading-relaxed font-medium">
            Potencializamos a infraestrutura do seu negócio com as tecnologias <span className="text-primary font-bold italic">Gemini Pro</span> e <span className="text-accent font-black italic">Nano Bana</span>.
          </p>
        </motion.div>

        {/* Improved Service Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
          {services.map((service, idx) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1, duration: 0.6 }}
              className="group"
            >
              <Link 
                href="/orcamento"
                className="relative flex flex-col h-full bg-background border border-border/50 rounded-[48px] overflow-hidden hover:border-primary/50 transition-all duration-700 shadow-lg hover:shadow-2xl hover:shadow-primary/10"
              >
                {/* Image Section with Sharp Reveal */}
                <div className="relative h-64 overflow-hidden bg-slate-200">
                   <div className="absolute inset-0 bg-slate-800" />
                   <Image 
                      src={service.image} 
                      alt={service.title}
                      fill
                      className="absolute inset-0 object-cover transition-transform duration-1000 group-hover:scale-110 grayscale-[20%] group-hover:grayscale-0 opacity-60 group-hover:opacity-90"
                    />
                   <div className="absolute inset-0 bg-gradient-to-t from-background via-background/10 to-transparent" />
                   
                   {/* Floating Glass Icon - Elevated Design */}
                   <motion.div 
                    whileHover={{ scale: 1.15, rotate: 5 }}
                    className="absolute bottom-6 left-6 w-16 h-16 bg-white/20 backdrop-blur-3xl border border-white/40 rounded-3xl flex items-center justify-center shadow-2xl group-hover:bg-primary group-hover:border-primary/50 transition-all duration-500"
                   >
                      <service.icon className="w-8 h-8 text-foreground group-hover:text-primary-foreground transition-all duration-500" />
                   </motion.div>
                </div>

                {/* Content Section with High Contrast */}
                <div className="p-10 flex-1 flex flex-col relative">
                  <h3 className="text-3xl font-black text-foreground mb-5 tracking-tighter leading-tight group-hover:text-primary transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-muted-foreground text-lg leading-relaxed mb-10 flex-1 font-semibold group-hover:text-foreground transition-colors duration-500">
                    {service.description}
                  </p>
                  
                  <div className="flex items-center gap-4 text-primary font-black text-xs uppercase tracking-widest pt-6 border-t border-border/30 group-hover:border-primary/30 transition-colors">
                    Falar com Engenheiro 
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center border border-primary/20 group-hover:bg-primary group-hover:text-white transition-all duration-700">
                      <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </div>

                {/* Industrial Trace Effect */}
                <div className="absolute top-0 right-0 w-32 h-[1px] bg-gradient-to-l from-primary/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="absolute bottom-0 left-0 w-1 h-32 bg-gradient-to-t from-primary/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              </Link>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Decorative Blur Elements with Blue/Cyan Tone */}
      <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-primary/10 rounded-full blur-[100px] -z-10 animate-pulse" />
      <div className="absolute bottom-40 left-0 w-[600px] h-[600px] bg-sky-400/5 rounded-full blur-[150px] -z-10" />
    </section>
  )
}
