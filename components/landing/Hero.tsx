'use client'
import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { ArrowRight, CheckCircle2, MessageCircle, Sparkles, Cpu, Zap } from 'lucide-react'

const highlights = ['Técnicos Certificados ABNT', 'Orçamento em 24h', 'Gestão Digital 360°']

// Hardcoded "random-looking" positions to avoid hydration mismatch and lint errors
const staticParticles = [
  { top: '15%', left: '10%', size: 120 },
  { top: '65%', left: '85%', size: 180 },
  { top: '45%', left: '40%', size: 140 },
  { top: '10%', left: '70%', size: 160 },
  { top: '80%', left: '20%', size: 130 },
  { top: '35%', left: '90%', size: 150 },
]

export function Hero() {
  return (
    <section id="inicio" className="relative min-h-screen flex items-center justify-center overflow-hidden pt-32 pb-20 bg-background">
      {/* Background Decor - Subtle Grid System */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#0ea5e908_1px,transparent_1px),linear-gradient(to_bottom,#0ea5e908_1px,transparent_1px)] bg-[size:45px_45px] pointer-events-none" />
      
      {/* Floating Particles for Depth */}
      <div className="absolute inset-0 pointer-events-none">
        {staticParticles.map((p, i) => (
          <motion.div
            key={i}
            animate={{
              y: [0, -20, 0],
              opacity: [0.1, 0.25, 0.1],
              scale: [1, 1.1, 1]
            }}
            transition={{
              duration: 7 + i,
              repeat: Infinity,
              delay: i * 0.7
            }}
            className="absolute rounded-full bg-primary/10 blur-3xl"
            style={{
              width: `${p.size}px`,
              height: `${p.size}px`,
              top: p.top,
              left: p.left,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          
          {/* Left Column: Messaging */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="text-left"
          >
            {/* Badges and Social Proof */}
            <div className="flex flex-wrap items-center gap-4 mb-8">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-sky-500/10 border border-sky-500/20 text-xs font-bold text-sky-400">
                <Cpu className="w-4 h-4" /> Engenharia de Precisão
              </div>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-xs font-bold text-emerald-400">
                <Zap className="w-4 h-4" /> Atendimento 24/7
              </div>
            </div>

            <h1 className="text-6xl sm:text-7xl lg:text-9xl font-black text-foreground leading-[0.85] mb-12 tracking-tightest">
              Engenharia <br />
              <span className="text-primary italic">Precision.</span> <br />
              <span className="relative inline-block mt-4">
                Facilities
                <div className="absolute -bottom-4 left-0 w-full h-4 bg-primary/10 -rotate-1 -z-10 rounded-full" />
              </span>
            </h1>

            <p className="text-xl sm:text-2xl text-muted-foreground max-w-xl mb-14 leading-relaxed font-semibold">
              A <span className="text-foreground">GAMA</span> redefine a manutenção predial com inteligência digital e engenharia de alta performance.
            </p>

            <div className="flex flex-col sm:flex-row gap-6 mb-16">
              <Link
                href="/orcamento"
                className="group relative bg-primary hover:bg-primary/90 text-primary-foreground font-black px-12 py-6 rounded-3xl text-xl transition-all duration-500 flex items-center justify-center gap-4 shadow-[0_25px_50px_-12px_rgba(30,129,176,0.5)] overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                Falar com Consultor
                <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
              </Link>
              <a
                href={`https://wa.me/5511936972127`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-4 bg-background hover:bg-secondary text-foreground font-black px-12 py-6 rounded-3xl text-xl border-2 border-border hover:border-primary/50 transition-all duration-500 shadow-xl"
              >
                <MessageCircle className="w-7 h-7 text-green-500" />
                Suporte 24/7
              </a>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-5 gap-x-10">
              {highlights.map((h, i) => (
                <motion.div 
                  key={h} 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 + i * 0.1 }}
                  className="flex items-center gap-4 text-sm font-black text-foreground/90 uppercase tracking-wide"
                >
                  <div className="w-10 h-10 bg-primary/10 rounded-2xl flex items-center justify-center border border-primary/20 group-hover:bg-primary transition-all duration-500">
                    <CheckCircle2 className="w-5 h-5 text-primary" />
                  </div>
                  {h}
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right Column: Industrial Hero Image */}
          <div className="relative perspective-2000 hidden lg:block">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, rotateY: 10 }}
              animate={{ opacity: 1, scale: 1, rotateY: 0 }}
              transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
              className="relative p-6"
            >
              <div className="relative aspect-[4/5] rounded-[64px] overflow-hidden border border-white/10 shadow-[0_60px_120px_-30px_rgba(0,0,0,0.6)] bg-slate-900">
                <div className="absolute inset-0 bg-slate-900 -z-10" />
                <Image 
                  src="https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&q=80&w=1200" 
                  alt="Engenharia de Operações"
                  fill
                  priority
                  className="object-cover grayscale-[0.5] opacity-60 brightness-75 contrast-125"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent pointer-events-none" />
                
                {/* HUD Overlay Elements */}
                <motion.div 
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 4, repeat: Infinity }}
                  className="absolute top-16 right-16 bg-white/10 backdrop-blur-3xl border border-white/20 p-6 rounded-[32px] shadow-2xl"
                >
                  <div className="flex items-center gap-5">
                    <div className="w-14 h-14 bg-primary rounded-2xl flex items-center justify-center shadow-[0_0_30px_rgba(30,129,176,0.6)]">
                      <Sparkles className="text-white w-7 h-7" />
                    </div>
                    <div>
                      <p className="text-[10px] text-white/60 font-black tracking-widest uppercase">Processo Ativo</p>
                      <p className="text-2xl font-black text-white">UPTIME 99.9%</p>
                    </div>
                  </div>
                </motion.div>

                <motion.div 
                  animate={{ y: [0, 10, 0] }}
                  transition={{ duration: 5, repeat: Infinity, delay: 1 }}
                  className="absolute bottom-16 left-16 bg-black/40 backdrop-blur-3xl border border-white/10 p-8 rounded-[40px] w-[300px] shadow-2xl"
                >
                  <div className="flex justify-between items-end mb-5">
                    <div>
                      <p className="text-[10px] text-white/50 font-black tracking-widest uppercase mb-1">Métricas de Performance</p>
                      <p className="text-3xl font-black text-white">100% SLA</p>
                    </div>
                    <div className="flex -space-x-3">
                      {[1,2,3].map(i => (
                        <div key={i} className="w-10 h-10 rounded-full border-2 border-primary bg-slate-700 overflow-hidden relative">
                           <div className="absolute inset-0 bg-primary/20 animate-pulse" />
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      whileInView={{ width: "92%" }}
                      className="h-full bg-primary" 
                    />
                  </div>
                </motion.div>
              </div>

              {/* Glowing decorative orbs */}
              <div className="absolute top-0 right-0 w-80 h-80 bg-primary/30 rounded-full blur-[120px] -z-10" />
              <div className="absolute bottom-0 left-0 w-80 h-80 bg-accent/20 rounded-full blur-[120px] -z-10" />
            </motion.div>
          </div>

        </div>

        {/* Stats Row */}
        <div className="mt-32 pt-20 border-t border-border/50 flex flex-wrap justify-between gap-12">
          {[
            { value: '5+', label: 'Anos no Mercado', icon: '💎' },
            { value: '5k+', label: 'Horas Técnicas', icon: '⚡' },
            { value: '100%', label: 'Certificação NR', icon: '🛡️' },
            { value: 'ABCD', label: 'Foco Operacional', icon: '📍' },
          ].map((stat, i) => (
            <motion.div 
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="flex flex-col items-start"
            >
              <div className="flex items-center gap-4">
                <span className="text-3xl">{stat.icon}</span>
                <span className="text-5xl font-black text-foreground tracking-tightest">{stat.value}</span>
              </div>
              <span className="text-xs font-black uppercase tracking-widest text-muted-foreground ml-12 mt-2">
                {stat.label}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
