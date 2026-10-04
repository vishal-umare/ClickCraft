import React from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { cn } from '@/lib/utils'
import { useScroll } from '@/hooks/use-scroll'
import { useTheme } from '@/hooks/use-theme'
import { useAuth } from '@/contexts/AuthContext'
import { Button } from '@/components/ui/button'
import { Portal, PortalBackdrop } from '@/components/portal'
import { XIcon, MenuIcon, Sun, Moon, Home, Sparkles, Image, LogOut } from 'lucide-react'

const appNavLinks = [
  { label: 'Home', href: '/', icon: Home },
  { label: 'Generate', href: '/generate', icon: Sparkles },
  { label: 'My Generations', href: '/generations', icon: Image },
]

export function AppMobileNav() {
  const [open, setOpen] = React.useState(false)
  const { theme, toggleTheme } = useTheme()
  const { logout } = useAuth()
  const navigate = useNavigate()

  return (
    <div className="md:hidden">
      <Button
        aria-controls="app-mobile-menu"
        aria-expanded={open}
        aria-label="Toggle menu"
        className="md:hidden"
        onClick={() => setOpen(!open)}
        size="icon"
        variant="ghost"
      >
        {open ? <XIcon className="h-5 w-5" /> : <MenuIcon className="h-5 w-5" />}
      </Button>
      {open && (
        <Portal className="top-[60px]" id="app-mobile-menu">
          <PortalBackdrop />
          <div
            className={cn(
              'data-[slot=open]:zoom-in-97 ease-out data-[slot=open]:animate-in',
              'h-full w-full p-4'
            )}
            data-slot={open ? 'open' : 'closed'}
          >
            <div className="grid gap-y-2">
              {appNavLinks.map((link) => {
                const Icon = link.icon
                return (
                  <Button
                    key={link.label}
                    className="justify-start gap-2.5 text-base font-medium text-ink dark:text-foreground hover:bg-primary/10 hover:text-primary dark:hover:bg-primary/20 dark:hover:text-primary transition-colors duration-200"
                    variant="ghost"
                    onClick={() => {
                      setOpen(false)
                      navigate(link.href)
                    }}
                  >
                    <Icon className="h-4 w-4" />
                    {link.label}
                  </Button>
                )
              })}
            </div>
            <div className="mt-8 flex flex-col gap-3 border-t border-border pt-6">
              <Button
                className="w-full justify-between text-base hover:bg-primary/10 hover:text-primary dark:hover:bg-primary/20 dark:hover:text-primary transition-colors duration-200"
                variant="ghost"
                onClick={(e) => {
                  e.preventDefault()
                  toggleTheme(e)
                }}
              >
                Toggle Theme
                {theme === 'dark' ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
              </Button>
              <Button
                className="w-full justify-start gap-2.5 text-base text-destructive hover:bg-destructive/10 hover:text-destructive transition-colors duration-200"
                variant="ghost"
                onClick={() => {
                  logout()
                  setOpen(false)
                  navigate('/')
                }}
              >
                <LogOut className="h-4 w-4" />
                Log out
              </Button>
            </div>
          </div>
        </Portal>
      )}
    </div>
  )
}

export function AppHeader() {
  const scrolled = useScroll(10)
  const { theme, toggleTheme } = useTheme()
  const { logout } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()

  return (
    <header
      className={cn(
        'sticky top-0 z-50 mx-auto w-full max-w-5xl border-transparent border-b md:rounded-xl md:border md:transition-all md:duration-300 md:ease-out',
        {
          'border-border bg-background shadow-sm md:top-4 md:max-w-4xl md:shadow-md':
            scrolled,
        },
        !scrolled && 'bg-background md:border-transparent md:top-0'
      )}
    >
      <nav
        className={cn(
          'flex h-16 w-full items-center justify-between px-4 md:h-14 md:transition-all md:duration-300 md:ease-out',
          {
            'md:px-4': scrolled,
          }
        )}
      >
        {/* Left: Logo */}
        <Link
          to="/"
          className="flex items-center gap-2.5 rounded-lg px-2 py-1.5 transition-colors hover:bg-muted/60"
        >
          <img
            src="/logo.png"
            alt="ClickCraft logo"
            width={28}
            height={28}
            className="h-7 w-7 object-contain"
          />
          <span className="font-display text-[16px] font-bold leading-none text-ink dark:text-foreground">
            Click<span className="text-primary">Craft</span>
          </span>
        </Link>

        {/* Center: Nav links */}
        <div className="hidden items-center gap-1 md:flex absolute left-1/2 -translate-x-1/2">
          {appNavLinks.map((link) => {
            const active = location.pathname === link.href
            return (
              <Button
                key={link.label}
                size="sm"
                variant="ghost"
                className={cn(
                  'text-[13px] font-medium transition-colors duration-200',
                  active
                    ? 'bg-primary/10 text-primary dark:bg-primary/20'
                    : 'text-slate-600 dark:text-muted-foreground hover:bg-primary/10 hover:text-primary dark:hover:bg-primary/20 dark:hover:text-primary'
                )}
                onClick={() => navigate(link.href)}
              >
                {link.label}
              </Button>
            )
          })}
        </div>

        {/* Right: Actions */}
        <div className="hidden items-center gap-2 md:flex">
          <Button
            size="icon"
            variant="ghost"
            onClick={toggleTheme}
            aria-label="Toggle theme"
            className="text-slate-600 dark:text-muted-foreground hover:bg-primary/10 hover:text-primary dark:hover:bg-primary/20 dark:hover:text-primary transition-colors duration-200 mr-1"
          >
            {theme === 'dark' ? <Moon className="h-[1.1rem] w-[1.1rem]" /> : <Sun className="h-[1.1rem] w-[1.1rem]" />}
          </Button>
          <Button
            size="sm"
            variant="ghost"
            onClick={() => {
              logout()
              navigate('/')
            }}
            className="text-[13px] font-medium text-slate-600 dark:text-muted-foreground hover:bg-primary/10 hover:text-primary dark:hover:bg-primary/20 dark:hover:text-primary transition-colors duration-200"
          >
            <LogOut className="mr-1.5 h-3.5 w-3.5" />
            Log out
          </Button>
        </div>

        {/* Mobile Nav */}
        <AppMobileNav />
      </nav>
    </header>
  )
}
