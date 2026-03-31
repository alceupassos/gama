'use client'
import { Calendar, Award, Target, Sparkles, ShieldCheck, Zap } from 'lucide-react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'

export function About() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  })
  
  const yParallax = useTransform(scrollYProgress, [0, 1], [100, -100])

  return (
    <section id="sobre" ref={containerRef} className="py-32 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-24 items-center">
          
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-accent/10 border border-accent/20 text-accent text-sm font-black mb-8">
              <Sparkles className="w-4 h-4 animate-pulse" /> DNA de Excelência
            </div>
            <h2 className="text-5xl md:text-7xl font-black text-foreground mb-10 tracking-tighter leading-[1.1]">
              Fundada com Propósito, <br />
              <span className="text-accent underline decoration-accent/20 decoration-8 underline-offset-12">Crescendo com Engenharia.</span>
            </h2>
            
            <p className="text-2xl text-muted-foreground leading-relaxed mb-10 font-medium italic border-l-4 border-accent/40 pl-8 bg-accent/5 py-4 rounded-r-2xl">
              &quot;A Gama Services nasceu em 2019 com a visão de redefinir o que significa prestação de serviços industriais no Brasil.&quot; 
              <br />
              <span className="text-sm font-black uppercase tracking-[0.3em] text-accent mt-4 block">— Rodrigo Gomes de Lima, Fundador</span>
            </p>
            
            <p className="text-xl text-muted-foreground/80 leading-relaxed mb-12 font-bold">
              Não somos apenas prestadores de serviço. Somos parceiros estratégicos que utilizam tecnologia de ponta e rigor técnico ABNT para garantir a <span className="text-foreground">integridade operacional</span> do seu patrimônio.
            </p>
            
            <div className="grid grid-cols-3 gap-6">
              {[
                { icon: Calendar, label: 'Legado desde', value: '2019' },
                { icon: Award, label: 'Rigor Técnico', value: 'ABNT' },
                { icon: Target, label: 'Performance', value: '98.7%' },
              ].map((stat, idx) => {
                const Icon = stat.icon
                return (
                  <motion.div 
                    key={stat.label}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.1, duration: 0.5 }}
                    whileHover={{ y: -8, boxShadow: '0 25px 50px -12px rgba(245,158,11,0.2)' }}
                    className="bg-card/40 backdrop-blur-3xl border border-border/40 rounded-3xl p-6 text-center group hover:border-accent/40 transition-all duration-300 relative overflow-hidden"
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                    <div className="w-12 h-12 bg-accent/10 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:bg-accent transition-all duration-500 relative z-10">
                      <Icon className="w-6 h-6 text-accent group-hover:text-accent-foreground transition-colors" />
                    </div>
                    <div className="font-black text-3xl text-foreground mb-2 relative z-10">{stat.value}</div>
                    <div className="text-[10px] text-muted-foreground font-bold uppercase tracking-widest leading-tight relative z-10">{stat.label}</div>
                  </motion.div>
                )
              })}
            </div>
          </motion.div>

          <motion.div style={{ y: yParallax }} className="space-y-8 perspective-2000">
            {[
              { 
                title: 'Nossa Missão', 
                text: 'Orquestrar soluções integradas que maximizam a eficiência e reduzem a fricção operacional dos nossos parceiros corporativos.', 
                icon: Zap,
                glow: 'from-accent/15' 
              },
              { 
                title: 'Nossa Visão', 
                text: 'Ser o benchmark tecnológico em gestão de facilities, transformando infraestrutura física em ecossistemas digitais inteligentes.', 
                icon: ShieldCheck,
                glow: 'from-accent/10' 
              },
              { 
                title: 'Nossos Valores', 
                text: 'Transparência radical, excelência de engenharia, agilidade resolutiva e compromisso inegociável com a segurança.', 
                icon: Sparkles,
                glow: 'from-accent/5' 
              },
            ].map((item, idx) => (
              <motion.div 
                key={item.title} 
                initial={{ opacity: 0, x: 80 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.2, duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
                whileHover={{ rotateY: 8, rotateX: -4, scale: 1.05 }}
                className="group relative bg-card/40 backdrop-blur-3xl border border-border/40 rounded-[40px] p-10 hover:border-accent/40 transition-all duration-700 shadow-2xl overflow-hidden"
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${item.glow} to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 rounded-inherit`} />
                <div className="flex gap-8 relative z-10 items-start">
                   <div className="w-16 h-16 bg-accent/10 border border-accent/20 rounded-2xl flex items-center justify-center flex-shrink-0 group-hover:bg-accent transition-all duration-500 shadow-2xl">
                      <item.icon className="w-8 h-8 text-accent group-hover:text-accent-foreground" />
                   </div>
                   <div>
                    <h3 className="text-3xl font-black text-foreground mb-4 group-hover:text-accent transition-colors tracking-tighter">{item.title}</h3>
                    <p className="text-muted-foreground text-xl font-bold leading-relaxed group-hover:text-foreground transition-colors">{item.text}</p>
                   </div>
                </div>
                {/* Subtle light glint */}
                <div className="absolute top-0 right-0 w-32 h-64 bg-accent/10 rotate-45 translate-x-32 group-hover:-translate-x-64 transition-transform duration-1000 pointer-events-none blur-3xl opacity-0 group-hover:opacity-100" />
              </motion.div>
            ))}
          </motion.div>

        </div>
      </div>

      {/* Decorative Grid and Gloss (Parallax sensitive) */}
      <motion.div style={{ y: yParallax }} className="absolute inset-0 bg-[linear-gradient(to_right,rgba(128,128,128,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(128,128,128,0.02)_1px,transparent_1px)] bg-[size:120px_120px] pointer-events-none -z-10" />
      <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[100%] bg-accent/5 blur-[200px] pointer-events-none -z-10" />
    </section>
  )
}
