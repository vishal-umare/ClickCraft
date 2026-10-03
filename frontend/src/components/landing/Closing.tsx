import { ArrowRight } from 'lucide-react'
import { Logo, Reveal, scrollToId } from './primitives'

export function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-slate-200/60 dark:border-border/40 bg-white dark:bg-popover pb-8 pt-24">
      <div className="relative z-10 mx-auto max-w-7xl px-5 md:px-8">
        
        {/* 1. LARGE BRANDED CTA CAPSULE */}
        <Reveal>
          <div className="relative">
            {/* Subtle atmospheric glow around CTA in dark mode */}
            <div className="pointer-events-none absolute -inset-12 hidden dark:block bg-[image:var(--dark-glow-soft)] opacity-80" />
            <div className="relative overflow-hidden rounded-[2.5rem] bg-primary p-12 text-center text-white shadow-xl shadow-primary/20 md:p-16">
            {/* Subtle light effect inside the capsule */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-white/10 via-transparent to-transparent mix-blend-overlay" />
            
            <div className="relative z-10">
              <h2 className="font-display text-3xl font-bold tracking-tight md:text-4xl">
                Ready to create your next thumbnail?
              </h2>
              <p className="mx-auto mt-4 max-w-lg text-[15px] text-white/80 md:text-base">
                Turn your video idea into a thumbnail people want to click.
              </p>
              <button
                onClick={() => scrollToId('preview')}
                className="mt-8 inline-flex items-center gap-2 rounded-full bg-white px-7 py-3.5 text-[14px] font-semibold text-primary shadow-sm transition-transform hover:scale-105"
              >
                Create a thumbnail <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>
          </div>
        </Reveal>

        {/* 2. MAIN FOOTER AREA (Navigation) */}
        <Reveal delay={0.1}>
          <div className="mt-20 flex flex-col justify-between gap-12 lg:flex-row lg:gap-8">
            <div className="max-w-xs">
              <Logo />
              <p className="mt-5 text-[14px] leading-relaxed text-slate-500 dark:text-muted-foreground">
                AI-powered YouTube thumbnails, created in seconds.
              </p>
            </div>
            
            <div className="grid grid-cols-2 gap-12 sm:grid-cols-3 sm:gap-16 lg:gap-24">
              <div>
                <h4 className="font-semibold text-ink dark:text-foreground">Product</h4>
                <ul className="mt-5 space-y-3 text-[14px] text-slate-500 dark:text-muted-foreground">
                  <li><a href="#features" className="hover:text-primary transition-colors">Features</a></li>
                  <li><a href="#how-it-works" className="hover:text-primary transition-colors">How It Works</a></li>
                  <li><a href="#gallery" className="hover:text-primary transition-colors">Explore Collection</a></li>
                </ul>
              </div>
              
              <div>
                <h4 className="font-semibold text-ink dark:text-foreground">Resources</h4>
                <ul className="mt-5 space-y-3 text-[14px] text-slate-500 dark:text-muted-foreground">
                  <li><a href="#examples" className="hover:text-primary transition-colors">Examples</a></li>
                  <li><a href="#" className="hover:text-primary transition-colors">Help / FAQ</a></li>
                </ul>
              </div>
              
              <div>
                <h4 className="font-semibold text-ink dark:text-foreground">Company</h4>
                <ul className="mt-5 space-y-3 text-[14px] text-slate-500 dark:text-muted-foreground">
                  <li><a href="#" className="hover:text-primary transition-colors">About</a></li>
                  <li><a href="#" className="hover:text-primary transition-colors">Contact</a></li>
                </ul>
              </div>
            </div>
          </div>
        </Reveal>

        {/* 3. BOTTOM BAR */}
        <Reveal delay={0.15}>
          <div className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-slate-200 dark:border-border pt-8 text-[13px] text-slate-400 dark:text-muted-foreground sm:flex-row">
            <p>© {new Date().getFullYear()} ClickCraft. All rights reserved.</p>
            <div className="flex gap-4">
              <a href="#" className="hover:text-slate-600 transition-colors">Privacy</a>
              <span>·</span>
              <a href="#" className="hover:text-slate-600 transition-colors">Terms</a>
            </div>
          </div>
        </Reveal>

      </div>
    </footer>
  )
}
