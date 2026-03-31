'use client'
import { useEffect, useState, useCallback } from 'react'
import { openDB, type IDBPDatabase } from 'idb'
import { createClient } from '@/lib/supabaseClient'

const DB_NAME = 'gamasaas-offline'
const DB_VERSION = 1

interface PendingRecord {
  id: string
  table: 'time_records' | 'work_orders'
  data: Record<string, unknown>
  timestamp: number
}

async function getDB(): Promise<IDBPDatabase> {
  return openDB(DB_NAME, DB_VERSION, {
    upgrade(db) {
      if (!db.objectStoreNames.contains('pending')) {
        db.createObjectStore('pending', { keyPath: 'id' })
      }
    },
  })
}

export function useOfflineSync() {
  const [isOnline, setIsOnline] = useState(true)
  const [pendingCount, setPendingCount] = useState(0)
  const [isSyncing, setIsSyncing] = useState(false)
  const supabase = createClient()

  useEffect(() => {
    if (typeof window === 'undefined') return
    setIsOnline(navigator.onLine)
    const onOnline = () => setIsOnline(true)
    const onOffline = () => setIsOnline(false)
    window.addEventListener('online', onOnline)
    window.addEventListener('offline', onOffline)
    return () => { window.removeEventListener('online', onOnline); window.removeEventListener('offline', onOffline) }
  }, [])

  const refreshPendingCount = useCallback(async () => {
    try {
      const db = await getDB()
      const all = await db.getAll('pending')
      setPendingCount(all.length)
    } catch {}
  }, [])

  useEffect(() => { refreshPendingCount() }, [refreshPendingCount])

  // Save record to IndexedDB when offline
  const saveOffline = useCallback(async (table: PendingRecord['table'], data: Record<string, unknown>) => {
    const record: PendingRecord = {
      id: `${table}_${Date.now()}_${Math.random().toString(36).slice(2)}`,
      table,
      data: { ...data, offline_created_at: new Date().toISOString() },
      timestamp: Date.now(),
    }
    const db = await getDB()
    await db.put('pending', record)
    await refreshPendingCount()
    return record.id
  }, [refreshPendingCount])

  // Write to Supabase (online) or queue offline
  const writeRecord = useCallback(async (table: PendingRecord['table'], data: Record<string, unknown>) => {
    if (!navigator.onLine) {
      return saveOffline(table, data)
    }
    const { error } = await supabase.from(table).insert(data)
    if (error) return saveOffline(table, data)
    return null
  }, [supabase, saveOffline])

  // Sync all pending records when back online
  const syncPending = useCallback(async () => {
    if (isSyncing) return
    setIsSyncing(true)
    try {
      const db = await getDB()
      const pending: PendingRecord[] = await db.getAll('pending')
      for (const record of pending) {
        const { error } = await supabase.from(record.table).upsert(record.data)
        if (!error) await db.delete('pending', record.id)
      }
      await refreshPendingCount()
    } catch (err) { console.error('Sync error:', err) }
    finally { setIsSyncing(false) }
  }, [isSyncing, supabase, refreshPendingCount])

  useEffect(() => {
    if (isOnline && pendingCount > 0) syncPending()
  }, [isOnline, pendingCount, syncPending])

  return { isOnline, pendingCount, isSyncing, writeRecord, saveOffline, syncPending }
}
