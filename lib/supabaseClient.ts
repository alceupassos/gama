import { createBrowserClient } from '@supabase/ssr'

export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )
}

export const supabase = createClient()

export type UserRole = 'admin' | 'employee' | 'client'
export type OSStatus = 'pendente' | 'em_andamento' | 'concluida' | 'cancelada'
export type OSPriority = 'baixa' | 'media' | 'alta' | 'urgente'
export type ServiceType = 'ar_condicionado' | 'eletrica' | 'hidraulica' | 'pintura' | 'construcao' | 'cabeamento' | 'reparos' | 'projetos'
export type Segment = 'condominio' | 'empresa' | 'escola' | 'shopping' | 'clinica'

export interface WorkOrder {
  id: string
  client_id: string
  assigned_employee_id?: string
  title: string
  description: string
  status: OSStatus
  priority: OSPriority
  service_type: ServiceType
  address: { street: string; number: string; neighborhood: string; city: string; state: string; zip: string }
  scheduled_at?: string
  completed_at?: string
  notes?: string
  photos_urls?: string[]
  created_at: string
}

export interface TimeRecord {
  id: string
  employee_id: string
  work_order_id?: string
  clock_in: string
  clock_out?: string
  clock_in_location?: string
  clock_out_location?: string
  synced_offline: boolean
  created_at: string
}

export interface QuoteRequest {
  company_name: string
  contact_name: string
  email: string
  phone: string
  service_type: string
  description: string
  segment: Segment
}
