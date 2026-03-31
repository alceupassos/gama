'use client'

import { motion } from 'framer-motion'
import React from 'react'

export const GridBackground = () => {
  return (
    <div className="fixed inset-0 z-[-1] overflow-hidden bg-slate-950">
      {/* Primary Gradient Mesh */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.3, 0.5, 0.3],
            x: [0, 50, 0],
            y: [0, 30, 0],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute top-[-10%] left-[-10%] w-[60%] h-[60%] rounded-full bg-sky-500/20 blur-[120px]"
        />
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.2, 0.4, 0.2],
            x: [0, -40, 0],
            y: [0, -60, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-blue-600/10 blur-[100px]"
        />
      </div>

      {/* 3D Perspective Grid */}
      <div 
        className="absolute inset-0"
        style={{
          perspective: '1000px',
          transformStyle: 'preserve-3d'
        }}
      >
        <motion.div
          initial={{ rotateX: 20, y: -100 }}
          animate={{ 
            y: [-100, -50, -100],
            rotateX: [20, 22, 20]
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute inset-0 w-full h-[200vh] origin-top"
          style={{
            backgroundImage: `
              linear-gradient(to right, rgba(14, 165, 233, 0.1) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(14, 165, 233, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: '60px 60px',
            maskImage: 'linear-gradient(to bottom, black, transparent 70%)',
          }}
        />
      </div>

      {/* Glowing Lines / Beams */}
      <div className="absolute inset-0">
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ top: '-10%', left: `${20 + i * 30}%`, opacity: 0 }}
            animate={{
              top: '110%',
              opacity: [0, 0.5, 0],
            }}
            transition={{
              duration: 8 + i * 2,
              repeat: Infinity,
              delay: i * 3,
              ease: "linear"
            }}
            className="absolute w-[2px] h-32 bg-gradient-to-b from-transparent via-sky-400 to-transparent blur-[1px]"
          />
        ))}
      </div>

      {/* Subtle Grain Overlay */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none mix-blend-overlay bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
    </div>
  )
}
