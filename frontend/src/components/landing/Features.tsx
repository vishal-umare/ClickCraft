import { Sparkles, Palette, MonitorPlay, Settings2, Loader2, Check } from 'lucide-react'
import { Reveal, SectionLabel } from './primitives'
import { cn } from '@/lib/utils'

export function Features() {
  return (
    <section id="features" className="relative overflow-hidden bg-background py-24 md:py-32">
      {/* Subtle atmospheric glow in dark mode */}
      <div className="pointer-events-none absolute inset-0 hidden dark:block bg-[image:var(--dark-glow-ambient)] opacity-50" />
      
      <div className="relative mx-auto max-w-5xl px-5 md:px-8">
        <Reveal className="text-center">
          <SectionLabel index="02">Features</SectionLabel>
          <h2 className="mx-auto mt-4 max-w-2xl font-display text-4xl font-bold leading-[1.1] text-ink md:text-5xl">
            Built for the frame that <span className="text-primary">decides the click.</span>
          </h2>
        </Reveal>

        <div className="mt-12 columns-1 gap-4 md:columns-2 md:gap-5">
          {/* 1. AI-Powered Creation */}
          <Reveal className="mb-4 flex w-full break-inside-avoid flex-col overflow-hidden rounded-3xl bg-white dark:bg-card p-6 shadow-sm ring-1 ring-border dark:ring-border/40 transition-all hover:shadow-md dark:hover:shadow-lg dark:hover:shadow-primary/10 dark:hover:ring-primary/20 dark:hover:-translate-y-1 md:mb-5 md:p-7">
            <div className="mb-6 flex items-center justify-center">
              <div className="w-full max-w-[240px] rounded-xl border border-primary-foreground/10 bg-slate-50 dark:bg-muted p-3 shadow-sm ring-1 ring-slate-900/5 dark:ring-white/5">
                <div className="mb-1.5 text-[9px] font-semibold uppercase tracking-wider text-slate-500 dark:text-muted-foreground">
                  Video Idea
                </div>
                <div className="mb-3 rounded-lg border border-slate-200 dark:border-border bg-white dark:bg-card p-2 text-xs text-slate-700 dark:text-foreground shadow-inner">
                  I Built a Startup in 30 Days
                  <span className="ml-[2px] inline-block h-3 w-px animate-pulse bg-primary align-middle" />
                </div>
                <button className="flex w-full items-center justify-center gap-1.5 rounded-lg bg-primary py-1.5 text-xs font-semibold text-primary-foreground opacity-90">
                  <Loader2 className="h-3 w-3 animate-spin" />
                  Generating...
                </button>
              </div>
            </div>
            <div>
              <div className="mb-2 inline-flex items-center justify-center rounded-lg bg-primary/10 p-1.5 text-primary">
                <Sparkles className="h-4 w-4" />
              </div>
              <h3 className="font-display text-lg font-bold text-ink">AI-powered creation</h3>
              <p className="mt-1.5 text-[13px] leading-relaxed text-muted-foreground">
                Describe your concept in plain text. Our engine understands context, composition, and subject matter natively.
              </p>
            </div>
          </Reveal>

          {/* 2. Creative Control */}
          <Reveal delay={0.05} className="mb-4 flex w-full break-inside-avoid flex-col overflow-hidden rounded-3xl bg-white dark:bg-card p-6 shadow-sm ring-1 ring-border dark:ring-border/40 transition-all hover:shadow-md dark:hover:shadow-lg dark:hover:shadow-primary/10 dark:hover:ring-primary/20 dark:hover:-translate-y-1 md:mb-5 md:p-7">
            <div className="mb-6 flex items-center justify-center">
              <div className="w-full max-w-[240px] space-y-1.5 rounded-xl border border-slate-200 dark:border-border bg-slate-50 dark:bg-muted p-3 shadow-sm">
                {[
                  { name: 'Bold & Graphic', active: true },
                  { name: 'Minimalistic', active: false },
                  { name: 'Photorealistic', active: false },
                  { name: 'Illustrated', active: false },
                  { name: 'Tech/Futuristic', active: false },
                ].map((style) => (
                  <div
                    key={style.name}
                    className={cn(
                      'flex items-center justify-between rounded-md border px-2 py-1.5 text-[11px] font-medium transition-colors',
                      style.active
                        ? 'border-primary/50 bg-primary/5 text-primary shadow-sm'
                        : 'border-transparent text-slate-500 dark:text-muted-foreground hover:bg-slate-100 dark:hover:bg-popover',
                    )}
                  >
                    {style.name}
                    {style.active && <Check className="h-3 w-3" />}
                  </div>
                ))}
              </div>
            </div>
            <div>
              <div className="mb-2 inline-flex items-center justify-center rounded-lg bg-indigo-50 p-1.5 text-indigo-600">
                <Settings2 className="h-4 w-4" />
              </div>
              <h3 className="font-display text-lg font-bold text-ink">Creative control</h3>
              <p className="mt-1.5 text-[13px] leading-relaxed text-muted-foreground">
                Don't rely on random outputs. Select from curated, high-performing visual themes optimized for click-through rates.
              </p>
            </div>
          </Reveal>

          {/* 3. Color Direction */}
          <Reveal delay={0.1} className="mb-4 flex w-full break-inside-avoid flex-col overflow-hidden rounded-3xl bg-white dark:bg-card p-6 shadow-sm ring-1 ring-border dark:ring-border/40 transition-all hover:shadow-md dark:hover:shadow-lg dark:hover:shadow-primary/10 dark:hover:ring-primary/20 dark:hover:-translate-y-1 md:mb-5 md:p-7">
            <div className="mb-6 flex items-center justify-center">
              <div className="grid w-full max-w-[240px] grid-cols-4 gap-2.5 rounded-xl border border-slate-200 dark:border-border bg-slate-50 dark:bg-muted p-4 shadow-sm">
                {[
                  { name: 'Electric Blue', colors: ['#3B82F6', '#2563EB', '#1D4ED8'] },
                  { name: 'Midnight', colors: ['#1E1B4B', '#312E81', '#4338CA'] },
                  { name: 'Sunset', colors: ['#F97316', '#EA580C', '#C2410C'] },
                  { name: 'Neon Green', colors: ['#22C55E', '#16A34A', '#15803D'] },
                  { name: 'Purple Dream', colors: ['#A855F7', '#9333EA', '#7E22CE'] },
                  { name: 'Ocean', colors: ['#06B6D4', '#0891B2', '#0E7490'] },
                  { name: 'Warm Earth', colors: ['#D97706', '#B45309', '#92400E'] },
                  { name: 'Cyber Neon', colors: ['#EC4899', '#DB2777', '#BE185D'] },
                ].map((palette, i) => (
                  <div
                    key={palette.name}
                    title={palette.name}
                    className={cn(
                      'group flex aspect-square cursor-pointer flex-col overflow-hidden rounded-full ring-2 transition-all hover:scale-105',
                      i === 1 ? 'scale-105 ring-primary shadow-sm shadow-primary/20' : 'ring-transparent hover:ring-slate-300 dark:hover:ring-border'
                    )}
                  >
                    <div className="h-1/3 w-full" style={{ backgroundColor: palette.colors[0] }} />
                    <div className="h-1/3 w-full" style={{ backgroundColor: palette.colors[1] }} />
                    <div className="h-1/3 w-full" style={{ backgroundColor: palette.colors[2] }} />
                  </div>
                ))}
              </div>
            </div>
            <div>
              <div className="mb-2 inline-flex items-center justify-center rounded-lg bg-pink-50 p-1.5 text-pink-600">
                <Palette className="h-4 w-4" />
              </div>
              <h3 className="font-display text-lg font-bold text-ink">Color direction</h3>
              <p className="mt-1.5 text-[13px] leading-relaxed text-muted-foreground">
                Match your channel's branding perfectly with strictly enforced, harmonious color palettes applied to the final render.
              </p>
            </div>
          </Reveal>

          {/* 4. Every Format */}
          <Reveal delay={0.15} className="mb-4 flex w-full break-inside-avoid flex-col overflow-hidden rounded-3xl bg-white dark:bg-card p-6 shadow-sm ring-1 ring-border dark:ring-border/40 transition-all hover:shadow-md dark:hover:shadow-lg dark:hover:shadow-primary/10 dark:hover:ring-primary/20 dark:hover:-translate-y-1 md:mb-5 md:p-7">
            <div className="mb-6 flex items-center justify-center gap-5 py-2">
              <div className="flex flex-col items-center gap-2.5">
                <div className="flex aspect-video w-28 items-center justify-center rounded-lg border-2 border-dashed border-slate-300 dark:border-border bg-slate-50 dark:bg-muted text-slate-400 dark:text-muted-foreground">
                  <MonitorPlay className="h-5 w-5 opacity-50" />
                </div>
                <span className="rounded-full bg-slate-100 dark:bg-popover px-2 py-0.5 text-[9px] font-bold text-slate-600 dark:text-foreground">
                  YouTube 16:9
                </span>
              </div>
              <div className="flex flex-col items-center gap-2.5">
                <div className="flex h-[98px] w-14 items-center justify-center rounded-lg border-2 border-dashed border-slate-300 dark:border-border bg-slate-50 dark:bg-muted text-slate-400 dark:text-muted-foreground">
                  <MonitorPlay className="h-4 w-4 opacity-50" />
                </div>
                <span className="rounded-full bg-slate-100 dark:bg-popover px-2 py-0.5 text-[9px] font-bold text-slate-600 dark:text-foreground">
                  Shorts 9:16
                </span>
              </div>
            </div>
            <div>
              <div className="mb-2 inline-flex items-center justify-center rounded-lg bg-teal-50 p-1.5 text-teal-600">
                <MonitorPlay className="h-4 w-4" />
              </div>
              <h3 className="font-display text-lg font-bold text-ink">Every format</h3>
              <p className="mt-1.5 text-[13px] leading-relaxed text-muted-foreground">
                Don't stretch or crop. Generate natively composed assets specifically tailored for both long-form videos and YouTube Shorts.
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
