'use client'
import { useOfflineSync } from '@/hooks/useOfflineSync'
import { Wifi, WifiOff, RefreshCw } from 'lucide-react'

export function NetworkStatus() {
  const { isOnline, pendingCount, isSyncing } = useOfflineSync()

  return (
    <div className={`flex items-center gap-2 text-xs font-medium px-3 py-1.5 rounded-full border transition-all ${
      isOnline
        ? 'text-green-400 bg-green-400/10 border-green-400/20'
        : 'text-amber-400 bg-amber-400/10 border-amber-400/20'
    }`}>
      {isSyncing ? (
        <RefreshCw className="w-3.5 h-3.5 animate-spin" />
      ) : isOnline ? (
        <Wifi className="w-3.5 h-3.5" />
      ) : (
        <WifiOff className="w-3.5 h-3.5" />
      )}
      <span>
        {isSyncing ? 'Sincronizando...' : isOnline ? 'Online' : `Offline${pendingCount > 0 ? ` (${pendingCount} pendentes)` : ''}`}
      </span>
    </div>
  )
}
