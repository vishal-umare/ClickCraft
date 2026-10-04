import { createContext, useContext, useState, useEffect, useCallback } from 'react'
import type { ReactNode } from 'react'

// ── Types ──

export interface User {
  id: string
  email: string
  name: string
}

interface AuthContextValue {
  user: User | null
  isAuthenticated: boolean
  login: (email: string, password: string) => Promise<void>
  signup: (name: string, email: string, password: string) => Promise<void>
  logout: () => void
}

// ── Context ──

const AuthContext = createContext<AuthContextValue | null>(null)

// ── Storage helpers ──

const STORAGE_KEY = 'clickcraft-auth'

function loadUser(): User | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (raw) return JSON.parse(raw) as User
  } catch {}
  return null
}

function persistUser(user: User | null) {
  if (user) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(user))
  } else {
    localStorage.removeItem(STORAGE_KEY)
  }
}

function generateId(): string {
  return `user_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`
}

// ── Provider ──

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(loadUser)

  useEffect(() => {
    persistUser(user)
  }, [user])

  const login = useCallback(async (email: string, _password: string) => {
    // Simulated auth — replace with real API call later
    await new Promise((r) => setTimeout(r, 400))

    // Check if this user already exists in local accounts registry
    const accounts = JSON.parse(localStorage.getItem('clickcraft-accounts') || '{}')
    const existing = accounts[email]

    if (existing) {
      setUser(existing)
    } else {
      // For the frontend-only implementation, create an account on login too
      const newUser: User = {
        id: generateId(),
        email,
        name: email.split('@')[0],
      }
      accounts[email] = newUser
      localStorage.setItem('clickcraft-accounts', JSON.stringify(accounts))
      setUser(newUser)
    }
  }, [])

  const signup = useCallback(async (name: string, email: string, _password: string) => {
    // Simulated auth — replace with real API call later
    await new Promise((r) => setTimeout(r, 400))

    const newUser: User = {
      id: generateId(),
      email,
      name,
    }

    // Store in accounts registry
    const accounts = JSON.parse(localStorage.getItem('clickcraft-accounts') || '{}')
    accounts[email] = newUser
    localStorage.setItem('clickcraft-accounts', JSON.stringify(accounts))

    setUser(newUser)
  }, [])

  const logout = useCallback(() => {
    setUser(null)
  }, [])

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        login,
        signup,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

// ── Hook ──

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}
