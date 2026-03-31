'use client'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useMemo } from 'react'

export default function BackgroundAnimation() {
  const { scrollYProgress } = useScroll()
  
  const y1 = useTransform(scrollYProgress, [0, 1], [0, -300])
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -600])
  const rotateValue = useTransform(scrollYProgress, [0, 1], [0, 20])

  const particles = useMemo(() => {
    return [...Array(25)].map((_, i) => ({
      id: i,
      x: (Math.sin(i) * 50 + 50) + '%', // Deterministic-ish positions to avoid random during render errors
      y: (Math.cos(i) * 50 + 50) + '%',
      scale: (Math.sin(i * 2) * 0.25 + 0.75),
      opacity: (Math.cos(i * 3) * 0.15 + 0.15),
      duration: (Math.sin(i * 4) * 10 + 30),
      delay: (Math.cos(i * 5) * 10)
    }))
  }, [])

  return (
    <div className="fixed inset-0 z-[-1] overflow-hidden pointer-events-none bg-background">
      {/* High-fidelity Grain / Noise Overlay */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none z-[10] bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />

      {/* Dynamic Ambient Glows */}
      <motion.div 
        style={{ y: y1 }}
        className="absolute top-[-10%] left-[-10%] w-[120%] h-[120%] bg-[radial-gradient(circle_at_20%_30%,rgba(245,158,11,0.08)_0%,transparent_50%)]" 
      />
      
      <motion.div 
        style={{ y: y2, rotate: rotateValue }}
        className="absolute inset-0 opacity-40"
      >
        {/* Floating Particles Simulation */}
        {particles.map((p) => (
          <motion.div
            key={p.id}
            initial={{ 
              x: p.x, 
              y: p.y,
              scale: p.scale,
              opacity: p.opacity
            }}
            animate={{ 
              y: ['-10%', '110%'],
              opacity: [0, 0.4, 0]
            }}
            transition={{ 
              duration: p.duration, 
              repeat: Infinity, 
              ease: "linear",
              delay: p.delay
            }}
            className="absolute w-[2px] h-[2px] bg-accent rounded-full blur-[1px]"
          />
        ))}
      </motion.div>

      {/* Industrial Grid with Perspective */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(128,128,128,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(128,128,128,0.03)_1px,transparent_1px)] bg-[size:100px_100px] [mask-image:radial-gradient(ellipse_80%_60%_at_50%_40%,#000_60%,transparent_100%)]" />

      {/* Kinetic Light Streaks */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div 
          animate={{ x: ['-200%', '200%'], opacity: [0, 0.1, 0] }}
          transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
          className="absolute top-[15%] left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-accent/30 to-transparent rotate-[-12deg] blur-sm"
        />
        <motion.div 
          animate={{ x: ['200%', '-200%'], opacity: [0, 0.05, 0] }}
          transition={{ duration: 28, repeat: Infinity, ease: "linear" }}
          className="absolute bottom-[25%] left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-accent/20 to-transparent rotate-[8deg] blur-md"
        />
      </div>

      {/* Cinematic Vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.4)_100%)]" />
      
      {/* Footer / Context transition */}
      <div className="absolute inset-x-0 bottom-0 h-64 bg-gradient-to-t from-background to-transparent" />
    </div>
  )
}
