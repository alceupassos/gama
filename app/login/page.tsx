'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { Eye, EyeOff, Zap, LogIn, AlertCircle } from 'lucide-react'
import { createClient } from '@/lib/supabaseClient'

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPass, setShowPass] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    // BYPASS FOR DEMO ACCOUNTS
    const demoAccounts: Record<string, string> = {
      'admin@gama.com': 'admin',
      'func@gama.com': 'employee',
      'cliente@gama.com': 'client'
    }

    if (demoAccounts[email.toLowerCase()] && password === 'gama2024') {
      const role = demoAccounts[email.toLowerCase()]
      if (role === 'admin') router.push('/dashboard/admin')
      else if (role === 'client') router.push('/dashboard/client')
      else router.push('/dashboard/employee')
      return
    }

    const supabase = createClient()
    const { data, error: authError } = await supabase.auth.signInWithPassword({ email, password })

    if (authError) {
      setError('E-mail ou senha incorretos. Verifique suas credenciais.')
      setLoading(false)
      return
    }

    // Fetch profile to determine role
    const { data: profile } = await supabase
      .from('profiles')
      .select('role')
      .eq('id', data.user?.id)
      .single()

    const role = profile?.role || 'employee'
    if (role === 'admin') router.push('/dashboard/admin')
    else if (role === 'client') router.push('/dashboard/client')
    else router.push('/dashboard/employee')
  }

  return (
    <div className="min-h-screen bg-transparent flex items-center justify-center px-4">
      {/* Background glow */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 bg-sky-500/10 rounded-full blur-3xl" />
      </div>

      <div className="w-full max-w-md relative z-10">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2 mb-6">
            <div className="w-10 h-10 bg-sky-500 rounded-xl flex items-center justify-center shadow-lg shadow-sky-500/30">
              <Zap className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-extrabold text-white">
              GAMA <span className="text-sky-400">SERVICES</span>
            </span>
          </Link>
          <h1 className="text-2xl font-bold text-white">Acesso Restrito</h1>
          <p className="text-slate-400 text-sm mt-2">Portal de colaboradores e clientes</p>
        </div>

        <div className="glass rounded-2xl p-2 mb-4 overflow-hidden">
          <Image
            src="/images/generated/login-portal-ai.jpg"
            alt="Portal digital de acesso para clientes e colaboradores"
            width={1344}
            height={768}
            className="w-full h-auto rounded-xl"
            priority
          />
        </div>

        {/* Card */}
        <div className="glass rounded-2xl p-8 space-y-6">
          {error && (
            <div className="flex items-center gap-3 bg-red-500/10 border border-red-500/20 text-red-400 rounded-xl px-4 py-3 text-sm">
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              {error}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-medium text-slate-400 mb-1.5">E-mail</label>
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="seu@email.com"
                required
                className="w-full bg-slate-900/50 border border-slate-700 focus:border-sky-500 text-white placeholder-slate-500 rounded-xl px-4 py-3 text-sm outline-none transition-colors"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-400 mb-1.5">Senha</label>
              <div className="relative">
                <input
                  type={showPass ? 'text' : 'password'}
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  className="w-full bg-slate-900/50 border border-slate-700 focus:border-sky-500 text-white placeholder-slate-500 rounded-xl px-4 py-3 pr-12 text-sm outline-none transition-colors"
                />
                <button type="button" onClick={() => setShowPass(!showPass)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 transition-colors">
                  {showPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <button type="submit" disabled={loading}
              className="btn-glow w-full bg-sky-500 hover:bg-sky-400 disabled:opacity-60 disabled:cursor-not-allowed text-white font-bold py-3.5 rounded-xl transition-all duration-200 flex items-center justify-center gap-2 text-sm">
              {loading ? (
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <><LogIn className="w-4 h-4" /> Entrar</>
              )}
            </button>
          </form>

          <div className="border-t border-slate-700 pt-4 text-center">
            <Link href="/" className="text-xs text-slate-500 hover:text-sky-400 transition-colors">
              ← Voltar para o site
            </Link>
          </div>
        </div>

        {/* Demo credentials hint */}
        <div className="mt-4 glass rounded-xl p-4">
          <p className="text-xs text-slate-500 text-center mb-2 font-medium">Credenciais de demonstração</p>
          <div className="grid grid-cols-3 gap-2 text-xs text-slate-500 text-center">
            <div>
              <div className="text-slate-400 font-medium">Admin</div>
              <div>admin@gama.com</div>
              <div>gama2024</div>
            </div>
            <div>
              <div className="text-slate-400 font-medium">Funcionário</div>
              <div>func@gama.com</div>
              <div>gama2024</div>
            </div>
            <div>
              <div className="text-slate-400 font-medium">Cliente</div>
              <div>cliente@gama.com</div>
              <div>gama2024</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
