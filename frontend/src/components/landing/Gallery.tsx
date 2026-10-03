import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Download, ArrowRight } from 'lucide-react'
import { categories, thumbnails } from '@/data/thumbnails'
import { Reveal, SectionLabel, scrollToId } from './primitives'
import { cn } from '@/lib/utils'

export function Gallery() {
  const [cat, setCat] = useState<(typeof categories)[number]>('All')
  const items = cat === 'All' ? thumbnails : thumbnails.filter((t) => t.category === cat)

  return (
    <section id="gallery" className="border-t border-slate-200/60 dark:border-border/60 bg-slate-50 dark:bg-background py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <Reveal className="mb-16 text-center">
          <SectionLabel index="03">Explore the Collection</SectionLabel>
          <h2 className="mx-auto mt-5 max-w-2xl font-display text-4xl font-bold leading-[1.1] text-ink dark:text-foreground md:text-5xl">
            Find the look for your <span className="text-primary">next video.</span>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-[15px] leading-relaxed text-slate-600 dark:text-muted-foreground">
            Browse a growing collection of thumbnail styles designed for different content, audiences, and creative directions.
          </p>

          <div className="mt-10 flex flex-wrap justify-center gap-2">
            {categories.map((c) => (
              <button
                key={c}
                onClick={() => setCat(c)}
                className={cn(
                  'rounded-full border px-4 py-1.5 text-[13px] font-medium transition-colors',
                  cat === c 
                    ? 'border-primary bg-primary text-primary-foreground shadow-sm shadow-primary/20' 
                    : 'border-slate-200 dark:border-border bg-white dark:bg-card text-slate-600 dark:text-muted-foreground hover:border-slate-300 dark:hover:border-border/80 hover:text-ink dark:hover:text-foreground',
                )}
              >
                {c}
              </button>
            ))}
          </div>
        </Reveal>

        <motion.div layout className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          <AnimatePresence mode="popLayout">
            {items.map((t) => (
              <motion.div
                key={t.id}
                layout
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.4 }}
                className="group relative overflow-hidden rounded-xl border border-slate-200 dark:border-border bg-white dark:bg-card shadow-sm ring-1 ring-black/5 dark:ring-white/5"
              >
                <div className="relative aspect-video w-full overflow-hidden">
                  <img
                    src={t.src}
                    alt={t.title}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                    loading="lazy"
                  />
                  
                  {/* Hover Overlay */}
                  <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-ink/70 dark:bg-black/70 opacity-0 backdrop-blur-[2px] transition-opacity duration-300 group-hover:opacity-100">
                    <button 
                      onClick={() => scrollToId('preview')}
                      className="flex items-center gap-2 rounded-full bg-primary px-5 py-2 text-[13px] font-semibold text-primary-foreground shadow-lg transition-transform hover:scale-105"
                    >
                      Use this style
                    </button>
                    <a 
                      href={t.src}
                      download
                      className="flex items-center gap-1.5 rounded-full bg-white/20 px-4 py-1.5 text-[12px] font-medium text-white backdrop-blur-sm transition-colors hover:bg-white/30"
                    >
                      <Download className="h-3.5 w-3.5" />
                      Download
                    </a>
                  </div>
                </div>
                
                {/* Optional subtle metadata outside image */}
                <div className="flex items-center justify-between px-3 py-2">
                  <span className="text-[11px] font-medium text-slate-600 dark:text-foreground/90">{t.title}</span>
                  <span className="rounded bg-slate-100 dark:bg-popover px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wider text-slate-500 dark:text-muted-foreground">
                    {t.category}
                  </span>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  )
}
