import { useEffect, useState } from 'react'
import { flushSync } from 'react-dom'

type Theme = 'dark' | 'light'

export function useTheme() {
  const [theme, setTheme] = useState<Theme>(() => {
    // Check localStorage
    const saved = localStorage.getItem('clickcraft-theme') as Theme | null
    if (saved) return saved
    // Check system preference
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return 'dark'
    }
    return 'light'
  })

  useEffect(() => {
    const root = window.document.documentElement
    if (theme === 'dark') {
      root.classList.add('dark')
    } else {
      root.classList.remove('dark')
    }
    localStorage.setItem('clickcraft-theme', theme)
  }, [theme])

  const toggleTheme = (e?: React.MouseEvent | MouseEvent) => {
    const nextTheme = theme === 'dark' ? 'light' : 'dark'

    // Fallback if View Transitions not supported or reduced motion enabled
    if (
      !document.startViewTransition ||
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    ) {
      setTheme(nextTheme)
      return
    }

    // Get click coordinates, fallback to center of screen
    const x = e && 'clientX' in e ? e.clientX : window.innerWidth / 2
    const y = e && 'clientY' in e ? e.clientY : window.innerHeight / 2

    // Get the maximum radius to cover the entire screen from the click point
    const endRadius = Math.hypot(
      Math.max(x, window.innerWidth - x),
      Math.max(y, window.innerHeight - y)
    )

    const transition = document.startViewTransition(() => {
      flushSync(() => {
        setTheme(nextTheme)
      })
    })

    transition.ready.then(() => {
      document.documentElement.animate(
        {
          clipPath: [
            `circle(0px at ${x}px ${y}px)`,
            `circle(${endRadius}px at ${x}px ${y}px)`,
          ],
        },
        {
          duration: 600,
          easing: 'cubic-bezier(0.4, 0.0, 0.2, 1)',
          pseudoElement: '::view-transition-new(root)',
        }
      )
    })
  }

  return { theme, toggleTheme }
}
