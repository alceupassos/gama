import { NextResponse } from 'next/server'
import { createServerSupabaseClient } from '@/lib/supabaseServer'

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const {
      name,
      email,
      phone,
      company,
      category,
      serviceLabel,
      profile,
      urgency,
      recurrence,
      area,
      units,
      addons,
      description,
      address,
      estimateMin,
      estimateMax,
      estimateTotal,
      protocol,
    } = body

    if (!name || !phone || !category) {
      return NextResponse.json({ error: 'Campos obrigatórios ausentes' }, { status: 400 })
    }

    const fallbackId = protocol || `GMA-${Date.now()}`

    // Fallback para ambientes sem Supabase configurado.
    if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
      return NextResponse.json({ success: true, id: fallbackId, persisted: false })
    }

    try {
      const supabase = await createServerSupabaseClient()
      const payload = {
        name,
        email,
        phone,
        company,
        category,
        service_label: serviceLabel,
        profile,
        urgency,
        recurrence,
        area,
        units,
        addons,
        description,
        address,
        estimate_min: estimateMin,
        estimate_max: estimateMax,
        estimate_total: estimateTotal,
        protocol: fallbackId,
        status: 'new',
      }

      const { data, error } = await supabase.from('quotes').insert([payload]).select('id').maybeSingle()

      if (error) {
        console.error('Erro Supabase (lead fallback ativo):', error)
        return NextResponse.json({ success: true, id: fallbackId, persisted: false })
      }

      return NextResponse.json({ success: true, id: data?.id ?? fallbackId, persisted: true })
    } catch (err) {
      console.error('Falha ao persistir lead (fallback ativo):', err)
      return NextResponse.json({ success: true, id: fallbackId, persisted: false })
    }

  } catch (err) {
    console.error('Erro API Leads:', err)
    return NextResponse.json({ error: 'Falha interna' }, { status: 500 })
  }
}
