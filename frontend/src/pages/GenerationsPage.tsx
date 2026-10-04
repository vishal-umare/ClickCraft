import { motion } from 'framer-motion'
import { Sparkles, Download, RefreshCw, Clock, ArrowRight } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { cn } from '@/lib/utils'
import { AppHeader } from '@/components/app/AppHeader'
import { useGenerations } from '@/contexts/GenerationContext'
import type { Generation } from '@/contexts/GenerationContext'
import { toast } from 'sonner'

function formatDate(iso: string): string {
  const d = new Date(iso)
  return d.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
  })
}

function formatLabel(format: string): string {
  return format === 'youtube' ? 'YouTube 16:9' : 'Shorts 9:16'
}

function styleLabel(style: string): string {
  return style
    .split('-')
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ')
}

// ── Generation Card ──

function GenerationCard({ gen }: { gen: Generation }) {
  const navigate = useNavigate()
  const isYoutube = gen.format === 'youtube'

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      className="group overflow-hidden rounded-2xl border border-border/40 bg-card shadow-sm transition-all duration-200 hover:shadow-md dark:hover:shadow-primary/5 dark:hover:ring-1 dark:hover:ring-primary/20"
    >
      {/* Thumbnail */}
      <div className={cn('relative overflow-hidden bg-muted', isYoutube ? 'aspect-video' : 'aspect-[9/16] max-h-[200px]')}>
        <img
          src={gen.imageUrl}
          alt={gen.title}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
        />
        {/* Format badge */}
        <div className="absolute left-2.5 top-2.5">
          <span className="rounded-md bg-black/70 px-2 py-0.5 text-[10px] font-semibold text-white backdrop-blur-sm">
            {formatLabel(gen.format)}
          </span>
        </div>
      </div>

      {/* Info */}
      <div className="p-4">
        <h3 className="line-clamp-1 text-[14px] font-semibold text-ink dark:text-foreground">
          {gen.title}
        </h3>

        <div className="mt-2 flex flex-wrap items-center gap-2">
          <span className="rounded-md bg-primary/8 px-2 py-0.5 text-[10px] font-semibold text-primary">
            {styleLabel(gen.style)}
          </span>
          <span className="flex items-center gap-1 text-[11px] text-muted-foreground">
            <Clock className="h-3 w-3" />
            {formatDate(gen.createdAt)}
          </span>
        </div>

        {/* Actions */}
        <div className="mt-3.5 flex items-center gap-2">
          <button
            onClick={() => toast.success('Download started')}
            className="inline-flex items-center gap-1.5 rounded-lg border border-border px-2.5 py-1.5 text-[11px] font-medium text-foreground transition-colors hover:bg-muted"
          >
            <Download className="h-3 w-3" />
            Download
          </button>
          <button
            onClick={() => navigate('/generate')}
            className="inline-flex items-center gap-1.5 rounded-lg border border-border px-2.5 py-1.5 text-[11px] font-medium text-foreground transition-colors hover:bg-muted"
          >
            <RefreshCw className="h-3 w-3" />
            Use Again
          </button>
        </div>
      </div>
    </motion.div>
  )
}

// ── Empty State ──

function EmptyState() {
  const navigate = useNavigate()

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="mx-auto flex max-w-3xl flex-col items-center justify-center rounded-[24px] border border-border bg-card px-6 py-16 text-center shadow-lg shadow-ink/5 dark:shadow-none sm:py-20"
    >
      <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 text-primary">
        <Sparkles className="h-7 w-7" />
      </div>
      <h2 className="font-display text-xl font-bold text-ink dark:text-foreground">
        No generations yet
      </h2>
      <p className="mx-auto mt-2 max-w-xs text-[14px] leading-relaxed text-muted-foreground">
        Create your first thumbnail and it will appear here.
      </p>
      <button
        onClick={() => navigate('/generate')}
        className="group mt-6 inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-2.5 text-[14px] font-semibold text-primary-foreground shadow-md shadow-primary/15 transition-all hover:shadow-lg hover:shadow-primary/25 hover:brightness-110 active:scale-[0.98]"
      >
        Generate a thumbnail
        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
      </button>
    </motion.div>
  )
}

// ── Page Component ──

export default function GenerationsPage() {
  const { generations } = useGenerations()

  return (
    <div className="min-h-screen bg-background">
      <AppHeader />

      <main className="relative overflow-hidden">
        {/* Ambient glow */}
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_40%_at_50%_20%,var(--periwinkle)/0.15,transparent)] dark:bg-[image:var(--dark-glow-ambient)] dark:opacity-40" />

        <div className="relative mx-auto max-w-6xl px-4 py-8 md:px-6 md:py-10">
          {/* Page heading */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-8"
          >
            <h1 className="font-display text-3xl font-bold text-ink dark:text-foreground md:text-4xl">
              My <span className="text-primary">Generations</span>
            </h1>
            <p className="mt-2 text-[15px] text-muted-foreground">
              {generations.length > 0
                ? `You have ${generations.length} generation${generations.length !== 1 ? 's' : ''}.`
                : 'Your generated thumbnails will appear here.'}
            </p>
          </motion.div>

          {/* Content */}
          {generations.length === 0 ? (
            <EmptyState />
          ) : (
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {generations.map((gen) => (
                <GenerationCard key={gen.id} gen={gen} />
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
