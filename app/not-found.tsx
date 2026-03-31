'use client'
import Link from 'next/link'
import { Zap, Home, Search, AlertCircle } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center p-4 text-center">
      <div className="relative mb-8">
        <div className="absolute inset-0 bg-sky-500/20 blur-3xl rounded-full scale-150 animate-pulse" />
        <div className="w-24 h-24 bg-slate-900 border border-slate-800 rounded-3xl flex items-center justify-center relative z-10">
          <Zap className="w-12 h-12 text-sky-500" />
        </div>
        <div className="absolute -top-2 -right-2 bg-red-500 text-white p-2 rounded-xl shadow-lg border-4 border-slate-950">
          <AlertCircle className="w-5 h-5 font-bold" />
        </div>
      </div>

      <h1 className="text-8xl font-black text-white mb-2 tracking-tighter">404</h1>
      <h2 className="text-2xl font-bold text-slate-300 mb-6">Oops! Serviço Não Localizado.</h2>
      <p className="text-slate-500 max-w-sm mb-10 mx-auto">
        Parece que esta página não existe em nossa rede de manutenção. Vamos te guiar de volta para a base.
      </p>

      <div className="flex flex-col sm:flex-row gap-4 w-full max-w-xs mx-auto">
        <Link href="/" className="flex-1 bg-sky-500 hover:bg-sky-400 text-white font-bold py-4 rounded-2xl transition-all shadow-xl shadow-sky-500/20 flex items-center justify-center gap-2">
          <Home className="w-4 h-4" /> Início
        </Link>
        <button onClick={() => window.history.back()} className="flex-1 bg-slate-900 hover:bg-slate-800 text-slate-400 font-bold py-4 rounded-2xl transition-all border border-slate-800 flex items-center justify-center gap-2">
          <Search className="w-4 h-4" /> Voltar
        </button>
      </div>

      <p className="mt-20 text-[10px] text-slate-700 uppercase tracking-[0.2em]">
        Gama Services — Facilities em Alta Performance
      </p>
    </div>
  )
}
