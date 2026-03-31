import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatCurrency(value: number): string {
  return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value)
}

export function formatDate(date: string | Date): string {
  return new Intl.DateTimeFormat('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric' }).format(
    typeof date === 'string' ? new Date(date) : date
  )
}

export function formatDateTime(date: string | Date): string {
  return new Intl.DateTimeFormat('pt-BR', {
    day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit',
  }).format(typeof date === 'string' ? new Date(date) : date)
}

export function getStatusColor(status: string): string {
  const m: Record<string, string> = {
    pendente: 'text-amber-400 bg-amber-400/10 border-amber-400/20',
    em_andamento: 'text-sky-400 bg-sky-400/10 border-sky-400/20',
    concluida: 'text-green-400 bg-green-400/10 border-green-400/20',
    cancelada: 'text-red-400 bg-red-400/10 border-red-400/20',
    aprovado: 'text-green-400 bg-green-400/10 border-green-400/20',
    rejeitado: 'text-red-400 bg-red-400/10 border-red-400/20',
    expirado: 'text-gray-400 bg-gray-400/10 border-gray-400/20',
  }
  return m[status] ?? 'text-slate-400 bg-slate-400/10 border-slate-400/20'
}

export function getPriorityLabel(p: string) {
  return { baixa: 'Baixa', media: 'Média', alta: 'Alta', urgente: 'Urgente' }[p] ?? p
}

export function getServiceLabel(type: string): string {
  const l: Record<string, string> = {
    ar_condicionado: 'Ar Condicionado', eletrica: 'Elétrica', hidraulica: 'Hidráulica',
    pintura: 'Pintura', construcao: 'Construções', cabeamento: 'Cabeamento',
    reparos: 'Pequenos Reparos', projetos: 'Projetos',
  }
  return l[type] ?? type
}
