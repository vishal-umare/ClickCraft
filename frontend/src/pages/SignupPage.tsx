import { useState } from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Loader2, Mail, Lock, User } from 'lucide-react'
import { useAuth } from '@/contexts/AuthContext'
import { useTheme } from '@/hooks/use-theme'
import { Moon, Sun } from 'lucide-react'

const ease = [0.22, 1, 0.36, 1] as const

export default function SignupPage() {
  const { signup, isAuthenticated } = useAuth()
  const { theme, toggleTheme } = useTheme()
  const navigate = useNavigate()

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  if (isAuthenticated) {
    return <Navigate to="/generate" replace />
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    if (!name.trim() || !email.trim() || !password.trim()) {
      setError('Please fill in all fields.')
      return
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters.')
      return
    }

    setLoading(true)
    try {
      await signup(name.trim(), email.trim(), password)
      navigate('/generate', { replace: true })
    } catch (err: any) {
      setError(err.response?.data?.message || 'Signup failed. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-background px-4">
      {/* Ambient glow */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_40%,var(--periwinkle)/0.2,transparent)] dark:bg-[image:var(--dark-glow-ambient)] dark:opacity-60" />

      {/* Theme toggle */}
      <button
        onClick={toggleTheme}
        className="absolute right-5 top-5 rounded-lg p-2 text-muted-foreground transition-colors hover:bg-primary/10 hover:text-primary"
        aria-label="Toggle theme"
      >
        {theme === 'dark' ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
      </button>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease }}
        className="relative z-10 w-full max-w-[400px]"
      >
        {/* Logo */}
        <Link to="/" className="mb-8 flex items-center justify-center gap-2.5">
          <img src="/logo.png" alt="ClickCraft" className="h-9 w-9 object-contain" />
          <span className="font-display text-xl font-bold text-ink dark:text-foreground">
            Click<span className="text-primary">Craft</span>
          </span>
        </Link>

        {/* Card */}
        <div className="rounded-2xl border border-border/40 bg-card p-7 shadow-xl shadow-ink/[0.06] dark:shadow-black/20 md:p-8">
          <div className="mb-6 text-center">
            <h1 className="font-display text-2xl font-bold text-ink dark:text-foreground">
              Create your account
            </h1>
            <p className="mt-1.5 text-[14px] text-muted-foreground">
              Start generating professional thumbnails for free.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            {/* Name */}
            <div>
              <label htmlFor="name" className="mb-1.5 block text-[12px] font-semibold uppercase tracking-wider text-muted-foreground">
                Name
              </label>
              <div className="relative">
                <User className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground/40" />
                <input
                  id="name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Your name"
                  autoComplete="name"
                  className="w-full rounded-xl border border-input bg-background py-2.5 pl-10 pr-3.5 text-[14px] text-foreground outline-none transition-all placeholder:text-muted-foreground/40 focus:border-primary focus:shadow-[0_0_0_3px] focus:shadow-primary/10"
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label htmlFor="email" className="mb-1.5 block text-[12px] font-semibold uppercase tracking-wider text-muted-foreground">
                Email
              </label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground/40" />
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  autoComplete="email"
                  className="w-full rounded-xl border border-input bg-background py-2.5 pl-10 pr-3.5 text-[14px] text-foreground outline-none transition-all placeholder:text-muted-foreground/40 focus:border-primary focus:shadow-[0_0_0_3px] focus:shadow-primary/10"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label htmlFor="password" className="mb-1.5 block text-[12px] font-semibold uppercase tracking-wider text-muted-foreground">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground/40" />
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="At least 6 characters"
                  autoComplete="new-password"
                  className="w-full rounded-xl border border-input bg-background py-2.5 pl-10 pr-3.5 text-[14px] text-foreground outline-none transition-all placeholder:text-muted-foreground/40 focus:border-primary focus:shadow-[0_0_0_3px] focus:shadow-primary/10"
                />
              </div>
            </div>

            {/* Error */}
            {error && (
              <p className="rounded-lg bg-destructive/10 px-3 py-2 text-[13px] text-destructive">
                {error}
              </p>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="mt-1 inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-primary text-[14px] font-semibold text-primary-foreground shadow-md shadow-primary/15 transition-all hover:shadow-lg hover:shadow-primary/25 hover:brightness-110 disabled:pointer-events-none disabled:opacity-60"
            >
              {loading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Creating account…
                </>
              ) : (
                'Create account'
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="mt-6 text-center text-[13px] text-muted-foreground">
            Already have an account?{' '}
            <Link
              to="/login"
              className="font-semibold text-primary transition-colors hover:text-primary/80"
            >
              Log in
            </Link>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
