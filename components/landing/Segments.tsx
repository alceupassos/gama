'use client'
import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { Building2, Factory, Home, Landmark, Plus, Sparkles, ArrowUpRight } from 'lucide-react'

const segments = [
  { 
    id: 'com', 
    label: 'Condomínios', 
    sub: 'Gestão Residencial Avançada', 
    icon: Home, 
    image: 'https://images.unsplash.com/photo-1545324418-f1d3ac1ef739?auto=format&fit=crop&q=80&w=800' 
  },
  { 
    id: 'ind', 
    label: 'Indústrias', 
    sub: 'Engenharia de Precisão', 
    icon: Factory, 
    image: 'https://images.unsplash.com/photo-1504917595217-d4dc5f582bb4?auto=format&fit=crop&q=80&w=800' 
  },
  { 
    id: 'cor', 
    label: 'Corporativo', 
    sub: 'Performance Empresarial', 
    icon: Building2, 
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=800' 
  },
  { 
    id: 'pub', 
    label: 'Instituições', 
    sub: 'Foresight Educacional', 
    icon: Landmark, 
    image: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&q=80&w=800' 
  },
]

export function Segments() {
  return (
    <section className="py-32 relative overflow-hidden bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="flex flex-col gap-8"
          >
            <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-primary/10 border border-primary/20 text-primary text-xs font-black uppercase tracking-widest mb-2 shadow-sm">
              <Sparkles className="w-4 h-4 animate-pulse" /> Ecossistema Industrial
            </div>
            <h2 className="text-6xl md:text-8xl font-black text-foreground tracking-tightest leading-none">
              Soluções Sob <br />
              <span className="text-primary italic">Medida</span> para Cada <br />
              <span className="text-foreground relative">
                Desafio.
                <span className="absolute -bottom-2 left-0 w-full h-2 bg-primary/20 -z-10" />
              </span>
            </h2>
            <p className="text-xl sm:text-2xl text-muted-foreground leading-relaxed font-semibold">
              Não entregamos apenas manutenção. Entregamos <span className="text-foreground">continuidade operacional</span> com engenharia de precisão e diagnóstico Gemini.
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-4">
               {['Plantão 24/7 Crítico', 'Gestão Digital BPM', 'Engenheiros On-Site', 'Capex/Opex Otimizados'].map((item, i) => (
                 <motion.div 
                    key={item} 
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4 + i * 0.1 }}
                    className="flex items-center gap-4 group cursor-default p-4 rounded-2xl border border-border/40 bg-card/10 hover:border-primary/30 transition-all duration-500"
                  >
                    <div className="w-4 h-4 rounded-full border-2 border-primary group-hover:bg-primary transition-all shadow-[0_0_15px_rgba(30,129,176,0.5)]" />
                    <span className="text-lg font-bold opacity-80 group-hover:opacity-100 transition-opacity">{item}</span>
                 </motion.div>
               ))}
            </div>

            <Link 
              href="/quem-somos" 
              className="mt-10 inline-flex items-center gap-4 text-foreground font-black text-xl hover:text-primary transition-colors group"
            >
              Conheça Nossa Metodologia <ArrowUpRight className="w-7 h-7 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </Link>
          </motion.div>

          {/* Isometric Card Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 lg:gap-10">
            {segments.map((item, idx) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1, duration: 0.8 }}
              >
                <Link 
                  href="/orcamento"
                  className="group relative h-[380px] rounded-[56px] overflow-hidden border border-border/50 hover:border-primary/50 transition-all duration-700 shadow-xl hover:shadow-2xl hover:shadow-primary/10 block lg:odd:-translate-y-12"
                >
                  <Image 
                    src={item.image} 
                    alt={item.label}
                    fill
                    className="absolute inset-0 object-cover transition-transform duration-1000 group-hover:scale-110 grayscale-[50%] group-hover:grayscale-0 opacity-80 group-hover:opacity-100"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent group-hover:from-background transition-all duration-700" />
                  
                  <div className="absolute inset-0 p-10 flex flex-col justify-end">
                     <motion.div 
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      className="w-16 h-16 bg-white/20 backdrop-blur-3xl border border-white/50 rounded-3xl flex items-center justify-center mb-6 group-hover:bg-primary group-hover:border-primary/50 transition-all duration-500 shadow-2xl"
                     >
                        <item.icon className="w-8 h-8 text-white transition-all duration-500" />
                     </motion.div>
                     <h3 className="text-3xl font-black text-white mb-2 group-hover:text-primary transition-colors">{item.label}</h3>
                     <p className="text-white/80 text-base font-black group-hover:text-white transition-colors">{item.sub}</p>
                  </div>

                  {/* Corner Plus - Nano Bana Style */}
                  <div className="absolute top-8 right-8 w-12 h-12 rounded-full bg-primary border-4 border-background flex items-center justify-center scale-0 group-hover:scale-100 transition-transform duration-500 shadow-xl shadow-primary/20">
                     <Plus className="w-6 h-6 text-primary-foreground" />
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>

        </div>
      </div>

      {/* Decorative Grid Part 3 */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#0ea5e905_1px,transparent_1px),linear-gradient(to_bottom,#0ea5e905_1px,transparent_1px)] bg-[size:60px_60px] pointer-events-none -z-10" />
    </section>
  )
}
