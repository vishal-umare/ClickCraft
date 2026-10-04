import { createContext, useContext, useState, useCallback, useEffect } from 'react'
import type { ReactNode } from 'react'
import { useAuth } from './AuthContext'

// ── Types ──

export interface Generation {
  id: string
  userId: string | null // null = guest
  title: string
  format: 'youtube' | 'shorts'
  style: string
  colorScheme: string
  prompt: string
  imageUrl: string
  createdAt: string // ISO string
}

interface GenerationContextValue {
  generations: Generation[]
  guestGenerationUsed: boolean
  canGenerate: () => boolean
  addGeneration: (gen: Omit<Generation, 'id' | 'userId' | 'createdAt'>) => void
}

// ── Context ──

const GenerationContext = createContext<GenerationContextValue | null>(null)

// ── Storage helpers ──

const GUEST_KEY = 'clickcraft-guest-generated'
const GENERATIONS_KEY = 'clickcraft-generations'

function loadGuestState(): boolean {
  return localStorage.getItem(GUEST_KEY) === 'true'
}

function loadGenerations(userId: string | null): Generation[] {
  try {
    const all: Generation[] = JSON.parse(localStorage.getItem(GENERATIONS_KEY) || '[]')
    if (!userId) return []
    return all.filter((g) => g.userId === userId)
  } catch {
    return []
  }
}

function persistGeneration(gen: Generation) {
  try {
    const all: Generation[] = JSON.parse(localStorage.getItem(GENERATIONS_KEY) || '[]')
    all.unshift(gen)
    localStorage.setItem(GENERATIONS_KEY, JSON.stringify(all))
  } catch {}
}

function generateId(): string {
  return `gen_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`
}

// ── Provider ──

export function GenerationProvider({ children }: { children: ReactNode }) {
  const { user, isAuthenticated } = useAuth()
  const [guestGenerationUsed, setGuestGenerationUsed] = useState(loadGuestState)
  const [generations, setGenerations] = useState<Generation[]>([])

  // Reload generations when user changes
  useEffect(() => {
    setGenerations(loadGenerations(user?.id ?? null))
  }, [user?.id])

  const canGenerate = useCallback(() => {
    if (isAuthenticated) return true
    return !guestGenerationUsed
  }, [isAuthenticated, guestGenerationUsed])

  const addGeneration = useCallback(
    (gen: Omit<Generation, 'id' | 'userId' | 'createdAt'>) => {
      const full: Generation = {
        ...gen,
        id: generateId(),
        userId: user?.id ?? null,
        createdAt: new Date().toISOString(),
      }

      if (!isAuthenticated) {
        // Mark guest generation as used
        setGuestGenerationUsed(true)
        localStorage.setItem(GUEST_KEY, 'true')
        // Don't persist guest generations to the history
        return
      }

      persistGeneration(full)
      setGenerations((prev) => [full, ...prev])
    },
    [user?.id, isAuthenticated],
  )

  return (
    <GenerationContext.Provider
      value={{
        generations,
        guestGenerationUsed,
        canGenerate,
        addGeneration,
      }}
    >
      {children}
    </GenerationContext.Provider>
  )
}

// ── Hook ──

export function useGenerations() {
  const ctx = useContext(GenerationContext)
  if (!ctx) throw new Error('useGenerations must be used within GenerationProvider')
  return ctx
}
