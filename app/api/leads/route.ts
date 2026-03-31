import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabaseClient'

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { name, email, phone, category, description, address } = body

    if (!name || !email || !phone || !category) {
      return NextResponse.json({ error: 'Campos obrigatórios ausentes' }, { status: 400 })
    }

    const supabase = createClient()
    
    // Inserir no Supabase (tabela quotes que criamos no schema.sql)
    const { data, error } = await supabase
      .from('quotes')
      .insert([
        { 
          name, 
          email, 
          phone, 
          category, 
          description, 
          address,
          status: 'new'
        }
      ])
      .select()

    if (error) {
      console.error('Erro Supabase:', error)
      return NextResponse.json({ error: 'Erro ao salvar orçamento' }, { status: 500 })
    }

    // Opcional: Enviar alerta via e-mail ou Slack/Discord aqui se quiser
    // await sendSlackNotification(`Novo orçamento de ${name}: ${category}`)

    return NextResponse.json({ success: true, id: data?.[0]?.id })
  } catch (err) {
    console.error('Erro API Leads:', err)
    return NextResponse.json({ error: 'Falha interna' }, { status: 500 })
  }
}
