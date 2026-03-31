'use client'
import { MessageCircle, Sparkles } from 'lucide-react'

export function WhatsAppButton() {
  const number = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? '5511936972127'
  const msg = encodeURIComponent('Olá! Gostaria de solicitar um orçamento para serviços da Gama Services.')
  
  return (
    <a
      href={`https://wa.me/${number}?text=${msg}`}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-8 right-8 z-50 flex items-center gap-3 bg-amber-500 hover:bg-amber-400 text-slate-950 font-black px-6 py-4 rounded-[24px] shadow-[0_20px_50px_rgba(245,158,11,0.3)] hover:shadow-[0_25px_60px_rgba(245,158,11,0.5)] transform hover:-translate-y-2 active:scale-95 transition-all duration-500 group overflow-hidden border border-white/20"
      aria-label="WhatsApp Gama Services"
    >
      {/* Background Glow Pulse */}
      <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-500" />
      
      {/* High-End Refinement */}
      <div className="relative flex items-center gap-3">
        <div className="relative">
          <MessageCircle className="w-6 h-6 group-hover:rotate-12 transition-transform duration-500" />
          < Sparkles className="absolute -top-1 -right-1 w-3 h-3 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-pulse" />
        </div>
        <span className="hidden sm:inline text-sm uppercase tracking-wider">Solicitar Briefing</span>
      </div>
      
      {/* Dynamic Animated Sheen */}
      <div className="absolute top-0 -left-[100%] w-[50%] h-full bg-gradient-to-r from-transparent via-white/40 to-transparent group-hover:left-[100%] transition-all duration-700 ease-in-out" />
    </a>
  )
}
