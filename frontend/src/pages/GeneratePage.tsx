import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Sparkles,
  Download,
  RefreshCw,
  Loader2,
  MonitorPlay,
  Smartphone,
  ChevronDown,
} from 'lucide-react'
import { toast } from 'sonner'
import { cn } from '@/lib/utils'
import { AppHeader } from '@/components/app/AppHeader'
import { useGenerations } from '@/contexts/GenerationContext'

import cinematic from '@/assets/thumbs/cinematic.jpg'
import shortsCinematic from '@/assets/thumbs/shorts_cinematic.jpg'

// ── Types ──

type Format = 'youtube' | 'shorts'

type ThumbnailStyle =
  | 'bold-graphic'
  | 'minimalistic'
  | 'photorealistic'
  | 'illustrated'
  | 'tech-futuristic'

type ColorScheme =
  | 'midnight'
  | 'sunset'
  | 'ocean'
  | 'neon'
  | 'forest'
  | 'fire'
  | 'monochrome'
  | 'vibrant'

interface FormatAsset {
  src: string
  headline: string
  aspectRatio: string
  dimensions: string
  variations: { src: string; filter: string; label: string }[]
}

// ── Data ──

const thumbnailStyles: { value: ThumbnailStyle; label: string; description: string }[] = [
  { value: 'bold-graphic', label: 'Bold & Graphic', description: 'High contrast, bold typography, strong visual impact' },
  { value: 'minimalistic', label: 'Minimalistic', description: 'Clean composition with restrained visual elements' },
  { value: 'photorealistic', label: 'Photorealistic', description: 'Cinematic realism with detailed imagery and lighting' },
  { value: 'illustrated', label: 'Illustrated', description: 'Stylized illustrated and artistic visuals' },
  { value: 'tech-futuristic', label: 'Tech / Futuristic', description: 'Modern digital, futuristic and technological visuals' },
]

const colorSchemes: { value: ColorScheme; label: string; swatches: string[] }[] = [
  { value: 'midnight', label: 'Midnight', swatches: ['#0f172a', '#1e3a5f', '#7dd3fc'] },
  { value: 'sunset', label: 'Sunset', swatches: ['#7c2d12', '#ea580c', '#fbbf24'] },
  { value: 'ocean', label: 'Ocean', swatches: ['#164e63', '#06b6d4', '#a5f3fc'] },
  { value: 'neon', label: 'Neon', swatches: ['#1a1a2e', '#e040fb', '#00e5ff'] },
  { value: 'forest', label: 'Forest', swatches: ['#14532d', '#22c55e', '#bbf7d0'] },
  { value: 'fire', label: 'Fire', swatches: ['#450a0a', '#dc2626', '#fbbf24'] },
  { value: 'monochrome', label: 'Monochrome', swatches: ['#18181b', '#71717a', '#e4e4e7'] },
  { value: 'vibrant', label: 'Vibrant', swatches: ['#7c3aed', '#ec4899', '#f59e0b'] },
]

const defaultYoutubeAsset: FormatAsset = {
  src: cinematic,
  headline: 'YOUR THUMBNAIL',
  aspectRatio: '16:9',
  dimensions: '1280 × 720',
  variations: [
    { src: cinematic, filter: 'saturate-[1.25] contrast-[1.08] brightness-[1.02]', label: 'Warm' },
    { src: cinematic, filter: 'saturate-[0.7] contrast-[1.15] brightness-[0.92]', label: 'Dramatic' },
    { src: cinematic, filter: 'hue-rotate-[15deg] brightness-[1.08] contrast-[0.95]', label: 'Cool' },
  ],
}

const defaultShortsAsset: FormatAsset = {
  src: shortsCinematic,
  headline: 'YOUR THUMBNAIL',
  aspectRatio: '9:16',
  dimensions: '1080 × 1920',
  variations: [
    { src: shortsCinematic, filter: 'saturate-[1.3] contrast-[1.1] brightness-[1.04]', label: 'Vibrant Neon' },
    { src: shortsCinematic, filter: 'saturate-[0.6] contrast-[1.2] brightness-[0.92]', label: 'Moody Noir' },
    { src: shortsCinematic, filter: 'hue-rotate-[-20deg] saturate-[1.25] brightness-[1.02]', label: 'Cyber Amber' },
  ],
}

const MAX_TITLE_CHARS = 200
const MAX_PROMPT_CHARS = 300

// ── Dropdown (reused from ProductPreview) ──

function Dropdown<T extends string>({
  value,
  onChange,
  options,
  renderOption,
  renderSelected,
}: {
  value: T
  onChange: (v: T) => void
  options: { value: T; label: string }[]
  renderOption: (opt: { value: T; label: string }, selected: boolean) => React.ReactNode
  renderSelected: (opt: { value: T; label: string }) => React.ReactNode
}) {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [])

  const selected = options.find((o) => o.value === value) || options[0]

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className={cn(
          'flex w-full items-center justify-between rounded-lg border bg-background px-3.5 py-2.5 text-left text-[13px] font-medium text-foreground outline-none transition-all',
          open
            ? 'border-primary shadow-[0_0_0_3px] shadow-primary/10'
            : 'border-input hover:border-border',
        )}
      >
        <span className="flex-1 truncate">{renderSelected(selected)}</span>
        <ChevronDown
          className={cn(
            'ml-2 h-3.5 w-3.5 shrink-0 text-muted-foreground/60 transition-transform duration-200',
            open && 'rotate-180',
          )}
        />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.15 }}
            className="absolute left-0 right-0 top-[calc(100%+4px)] z-50 overflow-hidden rounded-xl border border-border/60 bg-card shadow-xl shadow-ink/[0.08]"
          >
            <div className="max-h-[240px] overflow-y-auto py-1">
              {options.map((opt) => (
                <button
                  key={opt.value}
                  type="button"
                  onClick={() => {
                    onChange(opt.value)
                    setOpen(false)
                  }}
                  className={cn(
                    'flex w-full items-start gap-2.5 px-3.5 py-2.5 text-left transition-colors',
                    opt.value === value ? 'bg-primary/[0.05]' : 'hover:bg-muted/50',
                  )}
                >
                  {renderOption(opt, opt.value === value)}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

function FieldLabel({ children, trailing }: { children: string; trailing?: React.ReactNode }) {
  return (
    <div className="mb-1.5 flex items-center gap-2">
      <span className="text-[11px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
        {children}
      </span>
      {trailing}
    </div>
  )
}

// ── Page Component ──

export default function GeneratePage() {
  const { addGeneration } = useGenerations()

  // Form state
  const [titleOrTopic, setTitleOrTopic] = useState('')
  const [format, setFormat] = useState<Format>('youtube')
  const [thumbnailStyle, setThumbnailStyle] = useState<ThumbnailStyle>('bold-graphic')
  const [colorScheme, setColorScheme] = useState<ColorScheme>('midnight')
  const [additionalPrompt, setAdditionalPrompt] = useState('')

  // Generation state
  const [isGenerating, setIsGenerating] = useState(false)
  const [currentAsset, setCurrentAsset] = useState<FormatAsset | null>(null)
  const [selectedVar, setSelectedVar] = useState(-1)

  const isYoutube = format === 'youtube'

  const headline = titleOrTopic
    .split(/[—–\-.,!?]/)[0]
    .trim()
    .toUpperCase()
    .slice(0, 40)

  const activeSrc =
    currentAsset && selectedVar >= 0 && currentAsset.variations[selectedVar]
      ? currentAsset.variations[selectedVar].src
      : currentAsset?.src || ''

  const activeFilter =
    currentAsset && selectedVar >= 0 && currentAsset.variations[selectedVar]
      ? currentAsset.variations[selectedVar].filter
      : ''

  const handleGenerate = () => {
    setIsGenerating(true)
    setTimeout(() => {
      setIsGenerating(false)
      setSelectedVar(-1)

      const asset = isYoutube
        ? { ...defaultYoutubeAsset, headline }
        : { ...defaultShortsAsset, headline }
      setCurrentAsset(asset)

      // Track generation
      addGeneration({
        title: titleOrTopic,
        format,
        style: thumbnailStyle,
        colorScheme,
        prompt: additionalPrompt,
        imageUrl: asset.src,
      })

      toast.success(
        isYoutube
          ? 'YouTube thumbnail generated (1280 × 720)'
          : 'Shorts thumbnail generated (1080 × 1920)',
      )
    }, 1400)
  }

  const handleDownload = () => {
    if (!currentAsset) {
      toast('Generate a thumbnail first to download.')
      return
    }
    toast.success(
      `Downloaded ${isYoutube ? 'YouTube' : 'Shorts'} thumbnail (${isYoutube ? '1280 × 720' : '1080 × 1920'})`,
    )
  }

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
              Generate a <span className="text-primary">thumbnail</span>
            </h1>
            <p className="mt-2 text-[15px] text-muted-foreground">
              Describe your video, choose a style, and let AI create your perfect thumbnail.
            </p>
          </motion.div>

          {/* Generator workspace */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="overflow-hidden rounded-[24px] border border-border/40 bg-card shadow-xl shadow-ink/[0.05] dark:shadow-black/20"
          >
            <div className="grid lg:grid-cols-[minmax(320px,350px)_minmax(0,1fr)]">
              {/* ━━ LEFT: Controls panel ━━ */}
              <div className="flex flex-col gap-4 border-b border-border/40 p-5 lg:border-b-0 lg:border-r lg:p-6">
                <h3 className="text-[13px] font-bold uppercase tracking-[0.08em] text-foreground">
                  Configure
                </h3>

                {/* Title */}
                <div>
                  <FieldLabel>Title or topic</FieldLabel>
                  <textarea
                    value={titleOrTopic}
                    onChange={(e) => setTitleOrTopic(e.target.value.slice(0, MAX_TITLE_CHARS))}
                    rows={3}
                    className="w-full resize-none rounded-xl border border-input bg-background px-3.5 py-2.5 text-[14px] leading-relaxed text-foreground outline-none transition-all placeholder:text-muted-foreground/50 focus:border-primary focus:shadow-[0_0_0_3px] focus:shadow-primary/10"
                    placeholder="e.g. I spent 30 days learning AI from scratch"
                  />
                  <div className="mt-0.5 flex items-center justify-between">
                    <span className="text-[10px] text-muted-foreground/40">Describe your video or enter a title.</span>
                    <span className="text-[10px] tabular-nums text-muted-foreground/40">{titleOrTopic.length}/{MAX_TITLE_CHARS}</span>
                  </div>
                </div>

                {/* Format */}
                <div>
                  <FieldLabel>Format</FieldLabel>
                  <div className="grid grid-cols-2 gap-1.5">
                    {([
                      { value: 'youtube' as Format, icon: MonitorPlay, label: 'YouTube', ratio: '16:9' },
                      { value: 'shorts' as Format, icon: Smartphone, label: 'Shorts', ratio: '9:16' },
                    ]).map((f) => {
                      const Icon = f.icon
                      const sel = format === f.value
                      return (
                        <button
                          key={f.value}
                          type="button"
                          onClick={() => setFormat(f.value)}
                          className={cn(
                            'flex items-center justify-center gap-2 rounded-lg border py-2.5 text-[13px] font-medium transition-all duration-200',
                            sel
                              ? 'border-primary/60 bg-primary/[0.06] text-primary shadow-sm shadow-primary/5'
                              : 'border-border/60 bg-muted/30 text-muted-foreground hover:border-border hover:bg-muted/50 hover:text-foreground',
                          )}
                        >
                          <Icon className="h-3.5 w-3.5" />
                          {f.label}
                          <span className={cn('text-[11px]', sel ? 'text-primary/70' : 'text-muted-foreground/50')}>{f.ratio}</span>
                        </button>
                      )
                    })}
                  </div>
                </div>

                {/* Style */}
                <div>
                  <FieldLabel>Thumbnail style</FieldLabel>
                  <Dropdown
                    value={thumbnailStyle}
                    onChange={setThumbnailStyle}
                    options={thumbnailStyles}
                    renderSelected={(opt) => opt.label}
                    renderOption={(opt, selected) => (
                      <div className="flex-1 min-w-0">
                        <div className={cn('text-[13px] font-medium', selected ? 'text-primary' : 'text-foreground')}>{opt.label}</div>
                        <div className="mt-0.5 text-[11px] leading-snug text-muted-foreground">
                          {thumbnailStyles.find((s) => s.value === opt.value)?.description}
                        </div>
                      </div>
                    )}
                  />
                </div>

                {/* Color scheme */}
                <div>
                  <FieldLabel>Color scheme</FieldLabel>
                  <Dropdown
                    value={colorScheme}
                    onChange={setColorScheme}
                    options={colorSchemes}
                    renderSelected={(opt) => {
                      const scheme = colorSchemes.find((s) => s.value === opt.value)
                      return (
                        <span className="flex items-center gap-2.5">
                          <span>{opt.label}</span>
                          {scheme && (
                            <span className="flex items-center gap-[3px]">
                              {scheme.swatches.map((c, i) => (
                                <span key={i} className="inline-block h-[10px] w-[10px] rounded-full border border-black/10" style={{ backgroundColor: c }} />
                              ))}
                            </span>
                          )}
                        </span>
                      )
                    }}
                    renderOption={(opt, selected) => {
                      const scheme = colorSchemes.find((s) => s.value === opt.value)
                      return (
                        <span className="flex flex-1 items-center gap-2.5">
                          <span className={cn('text-[13px] font-medium', selected ? 'text-primary' : 'text-foreground')}>{opt.label}</span>
                          {scheme && (
                            <span className="flex items-center gap-[3px]">
                              {scheme.swatches.map((c, i) => (
                                <span key={i} className="inline-block h-[10px] w-[10px] rounded-full border border-black/10" style={{ backgroundColor: c }} />
                              ))}
                            </span>
                          )}
                        </span>
                      )
                    }}
                  />
                </div>

                {/* Additional prompt */}
                <div>
                  <FieldLabel trailing={<span className="text-[10px] font-normal normal-case tracking-normal text-muted-foreground/50">Optional</span>}>
                    Additional prompt
                  </FieldLabel>
                  <textarea
                    value={additionalPrompt}
                    onChange={(e) => setAdditionalPrompt(e.target.value.slice(0, MAX_PROMPT_CHARS))}
                    rows={2}
                    className="w-full resize-none rounded-lg border border-input bg-background px-3.5 py-2 text-[13px] leading-relaxed text-foreground outline-none transition-all placeholder:text-muted-foreground/40 focus:border-primary focus:shadow-[0_0_0_3px] focus:shadow-primary/10"
                    placeholder="Add anything else you want the thumbnail to include..."
                  />
                </div>

                {/* Generate button */}
                <button
                  type="button"
                  onClick={handleGenerate}
                  disabled={isGenerating || titleOrTopic.trim().length === 0}
                  className={cn(
                    'mt-2 inline-flex h-[44px] items-center justify-center gap-2.5 rounded-xl text-[14px] font-semibold transition-all duration-200',
                    'bg-primary text-primary-foreground shadow-md shadow-primary/15',
                    'hover:shadow-lg hover:shadow-primary/25 hover:brightness-110',
                    'disabled:pointer-events-none disabled:opacity-60',
                    !isGenerating && 'active:scale-[0.98]',
                  )}
                >
                  <AnimatePresence mode="wait">
                    {isGenerating ? (
                      <motion.span key="loading" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="inline-flex items-center gap-2">
                        <Loader2 className="h-4 w-4 animate-spin" /> Generating Thumbnail…
                      </motion.span>
                    ) : (
                      <motion.span key="idle" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="inline-flex items-center gap-2">
                        <Sparkles className="h-4 w-4" /> Generate Thumbnail
                      </motion.span>
                    )}
                  </AnimatePresence>
                </button>
              </div>

              {/* ━━ RIGHT: Preview panel ━━ */}
              <div className="flex min-w-0 flex-col gap-5 p-5 lg:p-6">
                {/* Toolbar */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <span className="text-[11px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">Preview</span>
                    <span className="rounded-md bg-primary/8 px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-primary">AI</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="mr-2 hidden text-[11px] tabular-nums text-muted-foreground/60 sm:block">
                      {isYoutube ? '1280 × 720' : '1080 × 1920'}
                    </span>
                    <button type="button" onClick={handleGenerate} className="rounded-lg p-1.5 text-muted-foreground/50 transition-colors hover:bg-muted hover:text-muted-foreground" aria-label="Regenerate" title="Regenerate">
                      <RefreshCw className="h-3.5 w-3.5" />
                    </button>
                    <button type="button" onClick={handleDownload} className="rounded-lg p-1.5 text-muted-foreground/50 transition-colors hover:bg-muted hover:text-muted-foreground" aria-label="Download" title="Download">
                      <Download className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </div>

                {/* ━━ PREVIEW STAGE ━━ */}
                <div className="relative flex w-full items-center justify-center overflow-hidden rounded-[16px] border border-border/40 bg-muted/20 p-4 min-h-[300px] lg:min-h-[380px]">
                  <AnimatePresence mode="wait">
                    {isGenerating ? (
                      <motion.div
                        key="generating"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="flex flex-col items-center justify-center gap-3 p-6 text-center"
                      >
                        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                          <Loader2 className="h-6 w-6 animate-spin" />
                        </div>
                        <div className="space-y-1">
                          <p className="text-[14px] font-semibold text-foreground">
                            {isYoutube ? 'Composing 16:9 YouTube thumbnail…' : 'Composing 9:16 Shorts thumbnail…'}
                          </p>
                          <p className="text-[12px] text-muted-foreground">
                            {isYoutube ? '1280 × 720 wide composition' : '1080 × 1920 vertical composition'}
                          </p>
                        </div>
                      </motion.div>
                    ) : currentAsset ? (
                      <motion.div
                        key={`preview-${selectedVar}`}
                        initial={{ opacity: 0, scale: 0.98 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.98 }}
                        className="relative flex h-full w-full items-center justify-center"
                      >
                        <div
                          className={cn(
                            'group relative overflow-hidden rounded-[14px] border border-border/50 bg-background transition-all duration-300 cursor-pointer shadow-md',
                            isYoutube
                              ? 'aspect-video w-full max-h-[340px] lg:max-h-[420px]'
                              : 'aspect-[9/16] h-[340px] lg:h-[420px]',
                          )}
                          onClick={() => setSelectedVar(-1)}
                        >
                          <img
                            src={activeSrc}
                            alt={isYoutube ? 'YouTube thumbnail' : 'Shorts thumbnail'}
                            className={cn('absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.015]', activeFilter)}
                          />
                          {headline.trim() && isYoutube && (
                            <div className="pointer-events-none absolute inset-0 flex flex-col justify-end p-5 sm:p-6">
                              <div className="max-w-[60%]">
                                <span className="inline-block rounded-lg border border-white/15 bg-black/75 px-3 py-1.5 text-left text-[14px] font-black leading-tight tracking-tight text-white uppercase shadow-xl backdrop-blur-md sm:text-[16px]">
                                  {headline}
                                </span>
                              </div>
                            </div>
                          )}
                          {headline.trim() && !isYoutube && (
                            <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-start px-3 pt-14">
                              <div className="max-w-[88%] text-center">
                                <span className="inline-block rounded-lg border border-white/15 bg-black/80 px-2.5 py-1 text-center text-[11px] font-black leading-snug tracking-tight text-white uppercase shadow-xl backdrop-blur-md sm:text-[12px]">
                                  {headline}
                                </span>
                              </div>
                            </div>
                          )}
                        </div>
                      </motion.div>
                    ) : (
                      <motion.div
                        key="empty"
                        initial={{ opacity: 0, scale: 0.98 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="flex flex-col items-center justify-center p-8 text-center"
                      >
                        <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl border border-primary/20 bg-primary/[0.08] text-primary">
                          <Sparkles className="h-6 w-6" />
                        </div>
                        <h4 className="text-[15px] font-semibold text-foreground">Ready to generate</h4>
                        <p className="mt-1.5 max-w-[300px] text-[13px] leading-relaxed text-muted-foreground">
                          Enter a title, select your preferences, and click Generate to create your thumbnail.
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* ━━ VARIATIONS ━━ */}
                {currentAsset && (
                  <div>
                    <div className="mb-2.5 flex items-center justify-between">
                      <span className="text-[11px] font-semibold uppercase tracking-[0.14em] text-muted-foreground/60">
                        Variations {isYoutube ? '(16:9)' : '(9:16)'}
                      </span>
                      <span className="text-[10px] text-muted-foreground/50">Click to select</span>
                    </div>
                    <div className={cn('grid gap-3', isYoutube ? 'grid-cols-3' : 'mx-auto max-w-[320px] grid-cols-3')}>
                      {currentAsset.variations.map((v, i) => (
                        <motion.div
                          key={v.label}
                          initial={{ opacity: 0, y: 6 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.35, delay: i * 0.06 }}
                        >
                          <div
                            className={cn(
                              'group relative cursor-pointer overflow-hidden rounded-[10px] border bg-muted transition-all duration-200',
                              isYoutube ? 'aspect-video' : 'aspect-[9/16]',
                              selectedVar === i ? 'border-primary/50 shadow-md shadow-primary/10' : 'border-border/40 hover:border-border/80',
                            )}
                            onClick={() => setSelectedVar(i)}
                          >
                            <img src={v.src} alt={`Variation: ${v.label}`} className={cn('h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]', v.filter)} />
                            <div className="absolute inset-x-0 bottom-0 flex items-end justify-center bg-gradient-to-t from-black/60 to-transparent p-2 opacity-0 transition-opacity duration-200 group-hover:opacity-100">
                              <span className="text-[10px] font-semibold text-white/90">{v.label}</span>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      </main>
    </div>
  )
}
