import { createContext, useContext, useState, useCallback, useEffect } from 'react'
import type { ReactNode } from 'react'
import { useAuth } from './AuthContext'
import { generationApi } from '@/api/generationApi'

// ── Types ──

export interface Generation {
  id: string
  userId: string | null
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
  loading: boolean
  fetchGenerations: () => Promise<void>
  createGeneration: (title: string, format: 'youtube' | 'shorts', style: string, colorScheme: string, prompt: string) => Promise<Generation>
  deleteGeneration: (id: string) => Promise<void>
}

// ── Context ──

const GenerationContext = createContext<GenerationContextValue | null>(null)

// ── Provider ──

export function GenerationProvider({ children }: { children: ReactNode }) {
  const { isAuthenticated } = useAuth()
  const [generations, setGenerations] = useState<Generation[]>([])
  const [loading, setLoading] = useState(false)

  const fetchGenerations = useCallback(async () => {
    if (!isAuthenticated) {
      setGenerations([])
      return
    }
    
    setLoading(true)
    try {
      const data = await generationApi.getGenerations()
      setGenerations(data)
    } catch (error) {
      console.error('Failed to fetch generations:', error)
      setGenerations([])
    } finally {
      setLoading(false)
    }
  }, [isAuthenticated])

  useEffect(() => {
    fetchGenerations()
  }, [fetchGenerations])

  const createGeneration = useCallback(async (
    title: string,
    format: 'youtube' | 'shorts',
    style: string,
    colorScheme: string,
    prompt: string
  ) => {
    const newGen = await generationApi.createGeneration(title, format, style, colorScheme, prompt)
    setGenerations(prev => [newGen, ...prev])
    return newGen
  }, [])

  const deleteGeneration = useCallback(async (id: string) => {
    await generationApi.deleteGeneration(id)
    setGenerations(prev => prev.filter(g => g.id !== id))
  }, [])

  return (
    <GenerationContext.Provider
      value={{
        generations,
        loading,
        fetchGenerations,
        createGeneration,
        deleteGeneration,
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
