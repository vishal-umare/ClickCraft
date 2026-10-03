import { motion } from 'framer-motion'
import type { ReactNode } from 'react'
import type { Thumbnail } from '@/data/thumbnails'
import { cn } from '@/lib/utils'

export function Logo({ inverse = false }: { inverse?: boolean }) {
  return (
    <a href="#top" className="flex items-center gap-2.5">
      <img
        src="/logo.png"
        alt="ClickCraft logo"
        width={36}
        height={36}
        className={cn(
          'h-9 w-9 object-contain',
          inverse ? 'mix-blend-screen' : 'mix-blend-multiply',
        )}
      />
      <span className={cn('font-display text-lg font-bold', inverse ? 'text-primary-foreground' : 'text-ink')}>
        Click<span className="text-primary">Craft</span>
      </span>
    </a>
  )
}



export function SectionLabel({ index, children }: { index: string; children: ReactNode }) {
  return (
    <div className="flex items-center justify-center gap-3 text-xs font-bold uppercase tracking-widest text-muted-foreground">
      <span className="text-primary">{index}</span>
      <span className="h-px w-8 bg-primary/30" />
      {children}
    </div>
  )
}

export function Reveal({ children, delay = 0, className }: { children: ReactNode; delay?: number; className?: string }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  )
}

export function ThumbnailCard({ t, eager, className, dim }: { t: Thumbnail; eager?: boolean; className?: string; dim?: boolean }) {
  return (
    <figure className={cn('group', className)}>
      <div className="relative aspect-video overflow-hidden rounded-xl bg-muted shadow-sm ring-1 ring-border">
        <img
          src={t.src}
          alt={`Example thumbnail: ${t.title}`}
          width={1280}
          height={720}
          loading={eager ? 'eager' : 'lazy'}
          className={cn(
            'h-full w-full object-cover transition-all duration-700 group-hover:scale-[1.04]',
            dim && 'opacity-35 grayscale',
          )}
        />
        <span className="absolute bottom-2 right-2 rounded-sm bg-background/85 px-1.5 py-0.5 font-mono text-[10px] text-foreground">
          12:04
        </span>
      </div>
    </figure>
  )
}

export function scrollToId(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
}
