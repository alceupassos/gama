'use client'

import * as React from 'react'
import { Moon, Sun, Monitor } from 'lucide-react'
import { useTheme } from 'next-themes'

export function ThemeToggle() {
  const { setTheme, theme } = useTheme()
  const [mounted, setMounted] = React.useState(false)

  // Avoid hydration mismatch
  React.useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return <div className="p-2 w-10 h-10" />

  return (
    <div className="relative flex items-center p-1 rounded-full bg-secondary/50 border border-border backdrop-blur-sm">
      <button
        onClick={() => setTheme('light')}
        className={`p-2 rounded-full transition-all ${
          theme === 'light' ? 'bg-background shadow-lg scale-110' : 'hover:bg-muted'
        }`}
        title="Light Mode"
      >
        <Sun className={`w-5 h-5 ${theme === 'light' ? 'text-accent' : 'text-muted-foreground'}`} />
      </button>
      
      <button
        onClick={() => setTheme('dark')}
        className={`p-2 rounded-full transition-all ${
          theme === 'dark' ? 'bg-background shadow-lg scale-110' : 'hover:bg-muted'
        }`}
        title="Dark Mode"
      >
        <Moon className={`w-5 h-5 ${theme === 'dark' ? 'text-primary' : 'text-muted-foreground'}`} />
      </button>

      <button
        onClick={() => setTheme('system')}
        className={`p-2 rounded-full transition-all ${
          theme === 'system' ? 'bg-background shadow-lg scale-110' : 'hover:bg-muted'
        }`}
        title="System"
      >
        <Monitor className={`w-5 h-5 ${theme === 'system' ? 'text-foreground' : 'text-muted-foreground'}`} />
      </button>
    </div>
  )
}
