'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Box, Sparkles, User, FileText } from 'lucide-react'
import { ThemeToggle } from '@/components/ThemeToggle'

const navLinks = [
  { href: '#inicio', label: 'Estratégia' },
  { href: '#servicos', label: 'Sistemas' },
  { href: '#segmentos', label: 'Verticalidades' },
  { href: '#sobre', label: 'Legado' },
  { href: '#contato', label: 'Conectar' },
]

export function Header() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-700 ${
        scrolled ? 'py-4' : 'py-8'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className={`relative flex items-center justify-between h-20 px-8 rounded-[32px] transition-all duration-700 border backdrop-blur-2xl ${
            scrolled 
              ? 'bg-background/80 shadow-[0_20px_50px_rgba(0,0,0,0.5)] border-border' 
              : 'bg-background/5 border-border/20'
          }`}
        >
          {/* Logo */}
          <Link href="/" className="flex items-center gap-4 group relative z-10">
            <motion.div 
              whileHover={{ rotate: 12, scale: 1.1 }}
              className="relative w-12 h-12 bg-accent rounded-2xl flex items-center justify-center transition-all duration-500 shadow-[0_0_30px_rgba(245,158,11,0.3)] group-hover:shadow-[0_0_50px_rgba(245,158,11,0.6)]"
            >
              <Box className="w-7 h-7 text-accent-foreground" />
              <div className="absolute inset-0 bg-white/20 rounded-inherit opacity-0 group-hover:opacity-100 transition-opacity" />
            </motion.div>
            <div className="flex flex-col">
              <span className="font-black text-2xl text-foreground tracking-tighter leading-none">
                GAMA <span className="text-accent">SERVICES</span>
              </span>
              <span className="text-[10px] text-muted-foreground font-bold tracking-[0.3em] uppercase mt-1">Industrial Excellence</span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((l, i) => (
              <motion.a 
                key={l.href} 
                href={l.href} 
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + i * 0.1 }}
                className="relative px-5 py-2 text-sm text-foreground/60 hover:text-foreground transition-all duration-300 font-black group"
              >
                <span className="relative z-10 uppercase tracking-widest">{l.label}</span>
                <span className="absolute inset-0 bg-foreground/5 rounded-full scale-0 group-hover:scale-100 transition-transform duration-300 -z-0" />
                <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-accent rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
              </motion.a>
            ))}
          </nav>

          {/* Actions */}
          <div className="hidden md:flex items-center gap-6 relative z-10">
            <ThemeToggle />
            <Link 
              href="/login" 
              className="flex items-center gap-2 text-xs text-foreground/60 hover:text-accent transition-all font-black uppercase tracking-widest group"
            >
              <User className="w-4 h-4 group-hover:scale-110 transition-transform" />
              Portal do Cliente
            </Link>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link 
                href="/orcamento" 
                className="relative overflow-hidden group bg-primary text-primary-foreground px-8 py-4 rounded-2xl font-black text-sm tracking-widest transition-all duration-500 hover:bg-accent shadow-[0_10px_30px_rgba(255,255,255,0.1)] flex items-center gap-2"
              >
                <FileText className="w-4 h-4" />
                SOLICITAR BRIEFING
              </Link>
            </motion.div>
          </div>

          {/* Mobile toggle */}
          <button 
            onClick={() => setOpen(!open)} 
            className="md:hidden relative w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center text-foreground hover:bg-foreground/10 transition-all border border-border/20 active:scale-90"
          >
            {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </motion.div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div 
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            className="md:hidden fixed inset-x-4 top-32 z-[90]"
          >
            <div className="bg-background/90 backdrop-blur-3xl border border-border rounded-[40px] p-8 space-y-6 shadow-[0_40px_80px_rgba(0,0,0,0.8)]">
              {navLinks.map((l, idx) => (
                <motion.a 
                  key={l.href} 
                  href={l.href} 
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  onClick={() => setOpen(false)} 
                  className="flex items-center justify-between text-2xl font-black text-foreground hover:text-accent transition-all group"
                >
                  <span className="uppercase tracking-tighter">{l.label}</span>
                  <Sparkles className="w-5 h-5 opacity-0 group-hover:opacity-100 text-accent transition-opacity" />
                </motion.a>
              ))}
              <div className="pt-8 border-t border-border space-y-4">
                <Link 
                  href="/orcamento" 
                  className="block w-full text-center bg-accent text-accent-foreground font-black py-6 rounded-[24px] text-xl transition-all active:scale-95 shadow-[0_20px_40px_rgba(245,158,11,0.3)]"
                >
                  SOLICITAR BRIEFING
                </Link>
                <Link 
                  href="/login" 
                  className="block w-full text-center text-muted-foreground text-sm font-black uppercase tracking-[0.3em] py-4"
                >
                  Acesso ao Portal
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
