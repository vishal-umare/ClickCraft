import { motion } from 'framer-motion'
import { ArrowRight, ArrowDown } from 'lucide-react'
import { scrollToId } from './primitives'
import { ProductPreview } from './ProductPreview'

const ease = [0.22, 1, 0.36, 1] as const

export function Hero() {
  return (
    <section
      id="top"
      className="relative overflow-hidden"
    >
      {/* Very subtle ambient gradient — not dominating */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_20%_60%,var(--periwinkle)/0.3,transparent),radial-gradient(ellipse_40%_40%_at_85%_45%,var(--mint)/0.2,transparent)] dark:opacity-100 dark:bg-[image:var(--dark-glow-hero)]" />

      {/* Hero copy */}
      <div className="relative mx-auto max-w-3xl px-5 pt-14 text-center md:px-8 md:pt-20">
        {/* Eyebrow */}
        <motion.p
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease }}
          className="mb-4 text-[11px] font-semibold uppercase tracking-[0.18em] text-primary"
        >
          AI YouTube Thumbnail Generator
        </motion.p>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.04, ease }}
          className="font-display text-[clamp(2rem,5.5vw,3.75rem)] font-extrabold leading-[1.08] text-ink dark:text-foreground"
        >
          Turn your video ideas into thumbnails
          <br className="hidden sm:block" />
          {' '}people <span className="text-primary">want to click.</span>
        </motion.h1>

        {/* Supporting text */}
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.12, ease }}
          className="mx-auto mt-4 max-w-lg text-[15px] leading-relaxed text-muted-foreground"
        >
          Describe your video, choose a visual style, and generate professional YouTube thumbnails in seconds.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2, ease }}
          className="mt-6 flex flex-wrap items-center justify-center gap-3"
        >
          <button
            onClick={() => scrollToId('preview')}
            className="group inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-2.5 text-sm font-semibold text-primary-foreground shadow-md shadow-primary/15 transition-all hover:-translate-y-0.5 hover:shadow-lg hover:shadow-primary/20"
          >
            Create a thumbnail
            <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
          </button>
          <button
            onClick={() => scrollToId('examples')}
            className="inline-flex items-center gap-2 rounded-lg border border-border px-6 py-2.5 text-sm font-semibold text-foreground transition-colors hover:bg-muted"
          >
            See examples
            <ArrowDown className="h-3.5 w-3.5" />
          </button>
        </motion.div>
      </div>

      {/* Generator — tight coupling with hero copy */}
      <div id="preview" className="relative mx-auto max-w-5xl scroll-mt-20 px-5 pb-24 pt-10 md:px-8 md:pb-32 md:pt-12">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.3, ease }}
        >
          <ProductPreview />
        </motion.div>
      </div>
    </section>
  )
}
