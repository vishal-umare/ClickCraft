import { motion, useReducedMotion } from 'framer-motion'
import { Sparkles, ArrowRight } from 'lucide-react'
import { Reveal, SectionLabel } from './primitives'
import { cn } from '@/lib/utils'
import cinematic from '@/assets/thumbs/cinematic.jpg'

const ease = [0.22, 1, 0.36, 1] as const

// ── Components ──

function AnimatedTypingText({ text, delay = 0 }: { text: string; delay?: number }) {
  const shouldReduceMotion = useReducedMotion()

  if (shouldReduceMotion) {
    return <>{text}</>
  }

  const characters = text.split('')
  return (
    <>
      {characters.map((char, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0, delay: delay + i * 0.02 }}
        >
          {char}
        </motion.span>
      ))}
      <motion.span
        initial={{ opacity: 0 }}
        whileInView={{ opacity: [1, 0] }}
        viewport={{ once: true, margin: '-50px' }}
        transition={{
          delay: delay,
          duration: 0.6,
          repeat: 4, // Blink 4 times while typing, then disappear
          repeatType: 'loop',
        }}
        className="ml-[2px] inline-block h-3.5 w-[2px] bg-primary align-middle"
      />
    </>
  )
}

export function Workflow() {
  const shouldReduceMotion = useReducedMotion()

  const steps = [
    {
      n: '01',
      title: 'Describe your idea',
      body: 'Type your concept in plain English. ClickCraft understands context, mood, and subject matter.',
      ui: (
        <motion.div
          whileHover={shouldReduceMotion ? {} : { scale: 1.02, y: -4 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
          className="w-full max-w-[280px] cursor-default rounded-xl border border-primary-foreground/10 bg-white/5 p-4 shadow-lg backdrop-blur-sm transition-colors hover:border-primary-foreground/20"
        >
          <div className="mb-2.5 text-[10px] font-semibold uppercase tracking-wider text-primary-foreground/50">
            Title or Topic
          </div>
          <div className="min-h-[72px] rounded-lg border border-primary-foreground/10 bg-black/20 p-3 text-[13px] leading-relaxed text-primary-foreground/90 shadow-inner">
            <AnimatedTypingText
              text="A moody night walk through Tokyo in the rain — my last day of a 3-week trip."
              delay={0.6}
            />
          </div>
        </motion.div>
      ),
    },
    {
      n: '02',
      title: 'Choose your style',
      body: 'Select from curated, high-performing visual themes optimized for click-through rates.',
      ui: (
        <motion.div
          whileHover={shouldReduceMotion ? {} : { scale: 1.02, y: -4 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
          className="w-full max-w-[280px] cursor-default space-y-2.5 rounded-xl border border-primary-foreground/10 bg-white/5 p-4 shadow-lg backdrop-blur-sm transition-colors hover:border-primary-foreground/20"
        >
          {[
            { name: 'Cinematic', active: true, color: 'bg-primary' },
            { name: 'Bold & Graphic', active: false, color: 'bg-primary-foreground/20' },
            { name: 'Tech / Futuristic', active: false, color: 'bg-primary-foreground/20' },
          ].map((style, i) => (
            <motion.div
              key={style.name}
              initial={
                shouldReduceMotion
                  ? {}
                  : { opacity: 0, y: 10, scale: style.active ? 0.95 : 1 }
              }
              whileInView={
                shouldReduceMotion
                  ? {}
                  : { opacity: 1, y: 0, scale: 1 }
              }
              viewport={{ once: true, margin: '-50px' }}
              transition={{
                duration: 0.5,
                delay: style.active ? 2.0 : 1.2 + i * 0.1,
                ease,
              }}
              className={cn(
                'flex items-center gap-3 rounded-lg border p-3 transition-colors',
                style.active
                  ? 'border-primary/50 bg-primary/10 shadow-[0_0_15px_-3px_rgba(var(--primary),0.2)]'
                  : 'border-primary-foreground/10 bg-black/20',
              )}
            >
              <div
                className={cn(
                  'h-3.5 w-3.5 shrink-0 rounded-full border border-black/20',
                  style.color,
                )}
              />
              <span
                className={cn(
                  'text-[13px] font-medium',
                  style.active ? 'text-primary-foreground' : 'text-primary-foreground/60',
                )}
              >
                {style.name}
              </span>
            </motion.div>
          ))}
        </motion.div>
      ),
    },
    {
      n: '03',
      title: 'Generate your thumbnail',
      body: 'Get a polished, YouTube-ready asset in seconds. Ready to upload, ready to convert.',
      ui: (
        <motion.div
          whileHover={shouldReduceMotion ? {} : { scale: 1.02, y: -4 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
          className="w-full max-w-[320px] cursor-default rounded-xl transition-shadow duration-500 hover:shadow-[0_0_50px_-10px_rgba(var(--primary),0.5)]"
        >
          <motion.div
            initial={shouldReduceMotion ? {} : { clipPath: 'inset(0% 100% 0% 0%)' }}
            whileInView={shouldReduceMotion ? {} : { clipPath: 'inset(0% 0% 0% 0%)' }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.9, delay: 2.8, ease }}
            className="overflow-hidden rounded-xl border border-primary/40 bg-white/5 shadow-[0_0_40px_-15px_rgba(var(--primary),0.4)] relative"
          >
            {/* Subtle light sweep */}
            <motion.div
              initial={shouldReduceMotion ? {} : { left: '-100%' }}
              whileInView={shouldReduceMotion ? {} : { left: '200%' }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 1.5, delay: 3.2, ease: 'easeInOut' }}
              className="absolute inset-y-0 w-[200px] -skew-x-12 bg-gradient-to-r from-transparent via-white/10 to-transparent z-10"
            />
            
            <motion.img
              initial={shouldReduceMotion ? {} : { scale: 1.15, filter: 'blur(4px)' }}
              whileInView={shouldReduceMotion ? {} : { scale: 1, filter: 'blur(0px)' }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 1.2, delay: 2.8, ease }}
              src={cinematic}
              alt="Generated thumbnail"
              className="aspect-video w-full object-cover"
              loading="lazy"
              decoding="async"
            />
            <div className="flex items-center justify-between border-t border-primary-foreground/10 bg-black/40 px-4 py-3 backdrop-blur-md relative z-20">
              <div className="flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-primary" />
                <span className="text-xs font-semibold text-primary-foreground">Generated</span>
              </div>
              <span className="rounded bg-primary-foreground/10 px-2 py-0.5 text-[10px] font-medium tracking-wider text-primary-foreground/70">
                1280 × 720
              </span>
            </div>
          </motion.div>
        </motion.div>
      ),
    },
  ]

  return (
    <section id="how-it-works" className="relative bg-ink dark:bg-secondary dark:border-y dark:border-border/40 py-24 text-primary-foreground md:py-32 overflow-hidden">
      {/* Subtle atmospheric glow in dark mode */}
      <div className="pointer-events-none absolute inset-0 hidden dark:block bg-[image:var(--dark-glow-soft)] opacity-80" />
      
      <div className="relative mx-auto max-w-7xl px-5 md:px-8">
        <Reveal className="mb-16 text-center md:mb-24">
          <div>
            <h2 className="mx-auto mt-6 max-w-2xl font-display text-4xl font-bold leading-[1.1] md:text-5xl">
              From idea to thumbnail in <span className="text-primary">seconds.</span>
            </h2>
          </div>
        </Reveal>

        <div className="relative">
          {/* Desktop connecting line (animated drawing) */}
          <motion.div
            initial={shouldReduceMotion ? {} : { scaleX: 0 }}
            whileInView={shouldReduceMotion ? {} : { scaleX: 1 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 2.0, delay: 0.8, ease: 'easeInOut' }}
            className="absolute left-[16%] right-[16%] top-[120px] hidden h-[1px] origin-left bg-gradient-to-r from-transparent via-primary-foreground/15 to-transparent md:block"
          />

          <div className="grid gap-16 md:grid-cols-3 md:gap-8 lg:gap-12">
            {steps.map((s, i) => (
              <Reveal
                key={s.n}
                delay={i * 0.15}
                className="relative z-10 flex flex-col items-center text-center"
              >
                {/* Visual UI Preview */}
                <div className="mb-10 flex h-[220px] w-full items-center justify-center">
                  {s.ui}
                </div>

                {/* Step indicator */}
                <div className="mb-5 flex h-10 w-10 items-center justify-center rounded-full border border-primary-foreground/15 bg-ink dark:bg-secondary text-sm font-bold text-primary shadow-sm">
                  {s.n}
                </div>

                {/* Copy */}
                <h3 className="mb-3 text-xl font-bold tracking-tight">{s.title}</h3>
                <p className="max-w-[280px] text-[15px] leading-relaxed text-primary-foreground/60">
                  {s.body}
                </p>

                {/* Mobile connecting line/arrow */}
                {i < steps.length - 1 && (
                  <div className="mt-10 md:hidden">
                    <ArrowRight className="h-6 w-6 rotate-90 text-primary-foreground/20" />
                  </div>
                )}
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
