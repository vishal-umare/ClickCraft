import { createContext, useContext, useState, useEffect, useCallback } from 'react'
import type { ReactNode } from 'react'
import { authApi } from '@/api/authApi'

// ── Types ──

export interface User {
  id: string
  email: string
  name: string
}

interface AuthContextValue {
  user: User | null
  isAuthenticated: boolean
  isLoading: boolean
  login: (email: string, password: string) => Promise<void>
  signup: (name: string, email: string, password: string) => Promise<void>
  logout: () => Promise<void>
}

// ── Context ──

const AuthContext = createContext<AuthContextValue | null>(null)

// ── Provider ──

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Check for existing session on mount
    const checkAuth = async () => {
      try {
        const apiUser = await authApi.verifyUser()
        setUser({ id: apiUser._id, name: apiUser.name, email: apiUser.email })
      } catch (error) {
        // Not authenticated or session expired (e.g., 401/404)
        setUser(null)
      } finally {
        setIsLoading(false)
      }
    }

    checkAuth()
  }, [])

  const login = useCallback(async (email: string, password: string) => {
    const apiUser = await authApi.login(email, password)
    setUser({ id: apiUser._id, name: apiUser.name, email: apiUser.email })
  }, [])

  const signup = useCallback(async (name: string, email: string, password: string) => {
    const apiUser = await authApi.signup(name, email, password)
    setUser({ id: apiUser._id, name: apiUser.name, email: apiUser.email })
  }, [])

  const logout = useCallback(async () => {
    try {
      await authApi.logout()
    } catch (error) {
      console.error('Logout failed:', error)
    } finally {
      setUser(null)
    }
  }, [])

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
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
