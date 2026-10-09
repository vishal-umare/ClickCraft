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
import { useNavigate } from 'react-router-dom'
import { useAuth } from '@/contexts/AuthContext'
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

interface ThumbnailVariation {
  src: string
  filter: string
  label: string
}

interface FormatAsset {
  src: string
  headline: string
  aspectRatio: string
  dimensions: string
  variations: ThumbnailVariation[]
}

// ── Data ──

const thumbnailStyles: {
  value: ThumbnailStyle
  label: string
  description: string
}[] = [
  {
    value: 'bold-graphic',
    label: 'Bold & Graphic',
    description: 'High contrast, bold typography, strong visual impact',
  },
  {
    value: 'minimalistic',
    label: 'Minimalistic',
    description: 'Clean composition with restrained visual elements',
  },
  {
    value: 'photorealistic',
    label: 'Photorealistic',
    description: 'Cinematic realism with detailed imagery and lighting',
  },
  {
    value: 'illustrated',
    label: 'Illustrated',
    description: 'Stylized illustrated and artistic visuals',
  },
  {
    value: 'tech-futuristic',
    label: 'Tech / Futuristic',
    description: 'Modern digital, futuristic and technological visuals',
  },
]

const colorSchemes: {
  value: ColorScheme
  label: string
  swatches: string[]
}[] = [
  { value: 'midnight', label: 'Midnight', swatches: ['#0f172a', '#1e3a5f', '#7dd3fc'] },
  { value: 'sunset', label: 'Sunset', swatches: ['#7c2d12', '#ea580c', '#fbbf24'] },
  { value: 'ocean', label: 'Ocean', swatches: ['#164e63', '#06b6d4', '#a5f3fc'] },
  { value: 'neon', label: 'Neon', swatches: ['#1a1a2e', '#e040fb', '#00e5ff'] },
  { value: 'forest', label: 'Forest', swatches: ['#14532d', '#22c55e', '#bbf7d0'] },
  { value: 'fire', label: 'Fire', swatches: ['#450a0a', '#dc2626', '#fbbf24'] },
  { value: 'monochrome', label: 'Monochrome', swatches: ['#18181b', '#71717a', '#e4e4e7'] },
  { value: 'vibrant', label: 'Vibrant', swatches: ['#7c3aed', '#ec4899', '#f59e0b'] },
]

// ── Initial Assets ──

const defaultYoutubeAsset: FormatAsset = {
  src: cinematic,
  headline: 'THE LAST NIGHT IN TOKYO',
  aspectRatio: '16:9',
  dimensions: '1280 × 720',
  variations: [
    { src: cinematic, filter: 'saturate-[1.25] contrast-[1.08] brightness-[1.02]', label: 'Warm' },
    { src: cinematic, filter: 'saturate-[0.7] contrast-[1.15] brightness-[0.92]', label: 'Dramatic' },
    { src: cinematic, filter: 'hue-rotate-[15deg] brightness-[1.08] contrast-[0.95]', label: 'Cool' },
  ],
}

const defaultShortsAssetTemplate: FormatAsset = {
  src: shortsCinematic,
  headline: 'THE LAST NIGHT IN TOKYO',
  aspectRatio: '9:16',
  dimensions: '1080 × 1920',
  variations: [
    { src: shortsCinematic, filter: 'saturate-[1.3] contrast-[1.1] brightness-[1.04]', label: 'Vibrant Neon' },
    { src: shortsCinematic, filter: 'saturate-[0.6] contrast-[1.2] brightness-[0.92]', label: 'Moody Noir' },
    { src: shortsCinematic, filter: 'hue-rotate-[-20deg] saturate-[1.25] brightness-[1.02]', label: 'Cyber Amber' },
  ],
}

const ease = [0.22, 1, 0.36, 1] as const
const MAX_TITLE_CHARS = 200
const MAX_PROMPT_CHARS = 300

// ── Custom Dropdown ──

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
                    opt.value === value
                      ? 'bg-primary/[0.05]'
                      : 'hover:bg-muted/50',
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

function SectionLabel({
  children,
  trailing,
}: {
  children: string
  trailing?: React.ReactNode
}) {
  return (
    <div className="mb-1.5 flex items-center gap-2">
      <span className="text-[11px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
        {children}
      </span>
      {trailing}
    </div>
  )
}

// ── Component ──

export function ProductPreview() {
  // Left panel state
  const [titleOrTopic, setTitleOrTopic] = useState(
    'A moody night walk through Tokyo in the rain — my last day of a 3-week trip.',
  )
  const [format, setFormat] = useState<Format>('youtube')
  const [thumbnailStyle, setThumbnailStyle] = useState<ThumbnailStyle>('bold-graphic')
  const [colorScheme, setColorScheme] = useState<ColorScheme>('midnight')
  const [additionalPrompt, setAdditionalPrompt] = useState('')

  const navigate = useNavigate()
  const { isAuthenticated } = useAuth()
  const { createGeneration } = useGenerations()

  // Generation state
  const [isGenerating, setIsGenerating] = useState(false)

  // Format-specific independent assets
  const [youtubeAsset, setYoutubeAsset] = useState<FormatAsset | null>(defaultYoutubeAsset)
  const [shortsAsset, setShortsAsset] = useState<FormatAsset | null>(null)

  // Format-specific selected variation indexes (-1 = main preview)
  const [selectedYoutubeVar, setSelectedYoutubeVar] = useState(-1)
  const [selectedShortsVar, setSelectedShortsVar] = useState(-1)

  const isYoutube = format === 'youtube'
  const currentAsset = isYoutube ? youtubeAsset : shortsAsset
  const selectedVar = isYoutube ? selectedYoutubeVar : selectedShortsVar
  const setSelectedVar = isYoutube ? setSelectedYoutubeVar : setSelectedShortsVar

  // Determine active displayed source and filter
  const activeSrc =
    currentAsset && selectedVar >= 0 && currentAsset.variations[selectedVar]
      ? currentAsset.variations[selectedVar].src
      : currentAsset?.src || ''

  const activeFilter =
    currentAsset && selectedVar >= 0 && currentAsset.variations[selectedVar]
      ? currentAsset.variations[selectedVar].filter
      : ''

  // Use title as headline for preview overlay
  const headline = titleOrTopic
    .split(/[—–\-.,!?]/)[0]
    .trim()
    .toUpperCase()
    .slice(0, 40)

  const handleGenerate = () => {
    if (!isAuthenticated) {
      navigate('/signup')
      return
    }

    setIsGenerating(true)
    createGeneration(titleOrTopic, format, thumbnailStyle, colorScheme, additionalPrompt)
      .then((newGen) => {
        setIsGenerating(false)
        if (isYoutube) {
          setSelectedYoutubeVar(-1)
          const newAsset = { 
            ...defaultYoutubeAsset, 
            headline, 
            src: newGen.imageUrl, 
            variations: defaultYoutubeAsset.variations.map(v => ({...v, src: newGen.imageUrl})) 
          }
          setYoutubeAsset(newAsset)
          toast.success('YouTube thumbnail generated (1280 × 720)')
        } else {
          setSelectedShortsVar(-1)
          const newAsset = { 
            ...defaultShortsAssetTemplate, 
            headline, 
            src: newGen.imageUrl,
            variations: defaultShortsAssetTemplate.variations.map(v => ({...v, src: newGen.imageUrl})) 
          }
          setShortsAsset(newAsset)
          toast.success('Shorts thumbnail generated (1080 × 1920)')
        }
      })
      .catch(() => {
        setIsGenerating(false)
        toast.error('Failed to generate thumbnail')
      })
  }

  const handleRegenerate = () => {
    handleGenerate()
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
    <div className="overflow-hidden rounded-[20px] border border-border/40 bg-card shadow-2xl shadow-ink/[0.07]">
      <div className="grid lg:grid-cols-[minmax(300px,0.38fr)_minmax(0,0.62fr)]">

        {/* ━━ LEFT: Configuration panel ━━ */}
        <div className="flex flex-col gap-3.5 border-b border-border/40 p-4 sm:p-5 lg:border-b-0 lg:border-r lg:p-6">

          {/* Panel header */}
          <h3 className="text-[13px] font-bold uppercase tracking-[0.08em] text-foreground">
            Create your thumbnail
          </h3>

          {/* 1 · Title or topic */}
          <div>
            <SectionLabel>Title or topic</SectionLabel>
            <textarea
              value={titleOrTopic}
              onChange={(e) =>
                setTitleOrTopic(e.target.value.slice(0, MAX_TITLE_CHARS))
              }
              rows={2}
              className="w-full resize-none rounded-xl border border-input bg-background px-3.5 py-2.5 text-[14px] leading-relaxed text-foreground outline-none transition-all placeholder:text-muted-foreground/50 focus:border-primary focus:shadow-[0_0_0_3px] focus:shadow-primary/10"
              placeholder="e.g. I spent 30 days learning AI"
            />
            <div className="mt-0.5 flex items-center justify-between">
              <span className="text-[10px] text-muted-foreground/40">
                Describe your video or enter a title.
              </span>
              <span className="text-[10px] tabular-nums text-muted-foreground/40">
                {titleOrTopic.length}/{MAX_TITLE_CHARS}
              </span>
            </div>
          </div>

          {/* 2 · Format */}
          <div>
            <SectionLabel>Format</SectionLabel>
            <div className="grid grid-cols-2 gap-1.5">
              {(
                [
                  { value: 'youtube' as Format, icon: MonitorPlay, label: 'YouTube', ratio: '16:9' },
                  { value: 'shorts' as Format, icon: Smartphone, label: 'Shorts', ratio: '9:16' },
                ] as const
              ).map((f) => {
                const Icon = f.icon
                const sel = format === f.value
                return (
                  <button
                    key={f.value}
                    type="button"
                    onClick={() => setFormat(f.value)}
                    className={cn(
                      'flex items-center justify-center gap-2 rounded-lg border py-2 text-[13px] font-medium transition-all duration-200',
                      sel
                        ? 'border-primary/60 bg-primary/[0.06] text-primary shadow-sm shadow-primary/5'
                        : 'border-border/60 bg-muted/30 text-muted-foreground hover:border-border hover:bg-muted/50 hover:text-foreground',
                    )}
                  >
                    <Icon className="h-3.5 w-3.5" />
                    {f.label}
                    <span
                      className={cn(
                        'text-[11px]',
                        sel ? 'text-primary/70' : 'text-muted-foreground/50',
                      )}
                    >
                      {f.ratio}
                    </span>
                  </button>
                )
              })}
            </div>
          </div>

          {/* 3 · Thumbnail style */}
          <div>
            <SectionLabel>Thumbnail style</SectionLabel>
            <Dropdown
              value={thumbnailStyle}
              onChange={setThumbnailStyle}
              options={thumbnailStyles}
              renderSelected={(opt) => opt.label}
              renderOption={(opt, selected) => (
                <div className="flex-1 min-w-0">
                  <div
                    className={cn(
                      'text-[13px] font-medium',
                      selected ? 'text-primary' : 'text-foreground',
                    )}
                  >
                    {opt.label}
                  </div>
                  <div className="mt-0.5 text-[11px] leading-snug text-muted-foreground">
                    {
                      thumbnailStyles.find((s) => s.value === opt.value)
                        ?.description
                    }
                  </div>
                </div>
              )}
            />
          </div>

          {/* 4 · Color scheme */}
          <div>
            <SectionLabel>Color scheme</SectionLabel>
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
                          <span
                            key={i}
                            className="inline-block h-[10px] w-[10px] rounded-full border border-black/10"
                            style={{ backgroundColor: c }}
                          />
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
                    <span
                      className={cn(
                        'text-[13px] font-medium',
                        selected ? 'text-primary' : 'text-foreground',
                      )}
                    >
                      {opt.label}
                    </span>
                    {scheme && (
                      <span className="flex items-center gap-[3px]">
                        {scheme.swatches.map((c, i) => (
                          <span
                            key={i}
                            className="inline-block h-[10px] w-[10px] rounded-full border border-black/10"
                            style={{ backgroundColor: c }}
                          />
                        ))}
                      </span>
                    )}
                  </span>
                )
              }}
            />
          </div>

          {/* 5 · Additional prompt */}
          <div>
            <SectionLabel trailing={
              <span className="text-[10px] font-normal normal-case tracking-normal text-muted-foreground/50">
                Optional
              </span>
            }>
              Additional prompt
            </SectionLabel>
            <textarea
              value={additionalPrompt}
              onChange={(e) =>
                setAdditionalPrompt(e.target.value.slice(0, MAX_PROMPT_CHARS))
              }
              rows={2}
              className="w-full resize-none rounded-lg border border-input bg-background px-3.5 py-2 text-[13px] leading-relaxed text-foreground outline-none transition-all placeholder:text-muted-foreground/40 focus:border-primary focus:shadow-[0_0_0_3px] focus:shadow-primary/10"
              placeholder="Add anything else you want the thumbnail to include..."
            />
          </div>

          {/* 6 · Generate button */}
          <button
            type="button"
            onClick={handleGenerate}
            disabled={isGenerating || titleOrTopic.trim().length === 0}
            className={cn(
              'mt-2 inline-flex h-[44px] sm:h-[48px] items-center justify-center gap-2.5 rounded-xl text-[14px] font-semibold transition-all duration-200',
              'bg-primary text-primary-foreground shadow-md shadow-primary/15',
              'hover:shadow-lg hover:shadow-primary/25 hover:brightness-110',
              'disabled:pointer-events-none disabled:opacity-60',
              !isGenerating && 'active:scale-[0.98]',
            )}
          >
            <AnimatePresence mode="wait">
              {isGenerating ? (
                <motion.span
                  key="loading"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="inline-flex items-center gap-2"
                >
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Generating Thumbnail…
                </motion.span>
              ) : (
                <motion.span
                  key="idle"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="inline-flex items-center gap-2"
                >
                  <Sparkles className="h-4 w-4" />
                  Generate Thumbnail
                </motion.span>
              )}
            </AnimatePresence>
          </button>
        </div>

        {/* ━━ RIGHT: Output panel (structurally fixed) ━━ */}
        <div className="flex flex-col gap-4 p-4 sm:p-5 lg:p-6 min-w-0">

          {/* Toolbar */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <span className="text-[11px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
                Generated thumbnail
              </span>
              <span className="rounded-md bg-primary/8 px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-primary">
                AI
              </span>
            </div>
            <div className="flex items-center gap-1">
              <span className="mr-2 hidden text-[11px] tabular-nums text-muted-foreground/60 sm:block">
                {isYoutube ? '1280 × 720' : '1080 × 1920'}
              </span>
              <button
                type="button"
                onClick={handleRegenerate}
                className="rounded-lg p-1.5 text-muted-foreground/50 transition-colors hover:bg-muted hover:text-muted-foreground"
                aria-label="Regenerate"
                title="Regenerate thumbnail"
              >
                <RefreshCw className="h-3.5 w-3.5" />
              </button>
              <button
                type="button"
                onClick={handleDownload}
                className="rounded-lg p-1.5 text-muted-foreground/50 transition-colors hover:bg-muted hover:text-muted-foreground"
                aria-label="Download"
                title="Download thumbnail"
              >
                <Download className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>

          {/* ━━ FIXED PREVIEW STAGE ━━ */}
          <div className="relative flex w-full items-center justify-center overflow-hidden rounded-[16px] sm:rounded-[18px] border border-border/40 bg-muted/20 p-2 sm:p-3 min-h-[200px] sm:min-h-[260px] lg:min-h-[320px]">
            <AnimatePresence mode="wait">
              {isGenerating ? (
                <motion.div
                  key="generating"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="flex flex-col items-center justify-center gap-3 p-6 text-center"
                >
                  <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                    <Loader2 className="h-5 w-5 animate-spin" />
                  </div>
                  <div className="space-y-0.5">
                    <p className="text-[13px] font-semibold text-foreground">
                      {isYoutube ? 'Composing 16:9 YouTube thumbnail…' : 'Composing 9:16 Shorts thumbnail…'}
                    </p>
                    <p className="text-[11px] text-muted-foreground">
                      {isYoutube
                        ? '1280 × 720 wide composition with rule-of-thirds headline'
                        : '1080 × 1920 vertical composition with mobile safe-zone spacing'}
                    </p>
                  </div>
                </motion.div>
              ) : currentAsset ? (
                <motion.div
                  key={`${format}-${selectedVar}`}
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.2 }}
                  className={cn(
                    'relative flex items-center justify-center',
                    isYoutube ? 'h-full w-full' : 'h-full aspect-[9/16] w-auto',
                  )}
                >
                  <div
                    className={cn(
                      'group relative overflow-hidden rounded-[14px] border bg-muted transition-all duration-200 cursor-pointer',
                      isYoutube
                        ? 'h-full w-full border-primary/30 shadow-md'
                        : 'h-full aspect-[9/16] w-auto border-primary/40 shadow-xl shadow-primary/5',
                    )}
                    onClick={() => setSelectedVar(-1)}
                  >
                    <img
                      src={activeSrc}
                      alt={isYoutube ? 'YouTube thumbnail preview' : 'Shorts thumbnail preview'}
                      className={cn(
                        'h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.015]',
                        activeFilter,
                      )}
                    />

                    {/* Format-aware headline placement */}
                    {headline.trim() &&
                      (isYoutube ? (
                        <div className="pointer-events-none absolute inset-0 flex flex-col justify-end p-4 sm:p-5">
                          <div className="max-w-[70%] sm:max-w-[60%]">
                            <span className="inline-block rounded-lg border border-white/15 bg-black/75 px-3 py-1.5 text-left text-[12px] font-black leading-tight tracking-tight text-white uppercase shadow-xl backdrop-blur-md sm:text-[14px]">
                              {headline}
                            </span>
                          </div>
                        </div>
                      ) : (
                        <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-start px-3 pt-12 sm:pt-14">
                          <div className="max-w-[88%] text-center">
                            <span className="inline-block rounded-lg border border-white/15 bg-black/80 px-2.5 py-1 text-center text-[10px] font-black leading-snug tracking-tight text-white uppercase shadow-xl backdrop-blur-md sm:text-[11px]">
                              {headline}
                            </span>
                          </div>
                        </div>
                      ))}
                  </div>
                </motion.div>
              ) : (
                /* Empty / Ready state for Shorts (Option B) */
                <motion.div
                  key="shorts-ready"
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.2 }}
                  className="flex flex-col items-center justify-center p-6 text-center"
                >
                  <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-2xl border border-primary/20 bg-primary/[0.08] text-primary">
                    <Smartphone className="h-5 w-5" />
                  </div>
                  <h4 className="text-[14px] font-semibold text-foreground">
                    Ready to generate Shorts thumbnail
                  </h4>
                  <p className="mt-1 max-w-[280px] text-[12px] leading-relaxed text-muted-foreground">
                    Composes a 1080 × 1920 vertical composition tailored for
                    mobile feeds and safe zones.
                  </p>
                  <button
                    type="button"
                    onClick={handleGenerate}
                    className="mt-3.5 inline-flex items-center gap-2 rounded-lg bg-primary px-3.5 py-1.5 text-[12px] font-semibold text-primary-foreground shadow-sm transition-all hover:brightness-110 active:scale-95"
                  >
                    <Sparkles className="h-3.5 w-3.5" />
                    Generate Shorts Thumbnail
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* ━━ VARIATIONS (Format-specific) ━━ */}
          <div>
            <div className="mb-2 flex items-center justify-between">
              <span className="text-[11px] font-semibold uppercase tracking-[0.14em] text-muted-foreground/60">
                Variations {isYoutube ? '(16:9)' : '(9:16)'}
              </span>
              <span className="text-[10px] text-muted-foreground/50">
                {currentAsset ? 'Click to select variation' : 'Generated on demand'}
              </span>
            </div>

            {isYoutube ? (
              /* YouTube 16:9 Variations */
              <div className="grid grid-cols-3 gap-2.5">
                {youtubeAsset?.variations.map((v, i) => (
                  <motion.div
                    key={v.label}
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.35, delay: i * 0.06, ease }}
                  >
                    <div
                      className={cn(
                        'group relative cursor-pointer overflow-hidden rounded-[10px] border bg-muted transition-all duration-200 aspect-video',
                        selectedVar === i
                          ? 'border-primary/50 shadow-md shadow-primary/10'
                          : 'border-border/40 hover:border-border/80',
                      )}
                      onClick={() => setSelectedVar(i)}
                    >
                      <img
                        src={v.src}
                        alt={`Variation: ${v.label}`}
                        className={cn(
                          'h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]',
                          v.filter,
                        )}
                      />
                      <div className="absolute inset-x-0 bottom-0 flex items-end justify-center bg-gradient-to-t from-black/60 to-transparent p-1.5 opacity-0 transition-opacity duration-200 group-hover:opacity-100">
                        <span className="text-[10px] font-semibold text-white/90">
                          {v.label}
                        </span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            ) : shortsAsset ? (
              /* Shorts 9:16 Variations (Centered & Proportional) */
              <div className="mx-auto grid max-w-[280px] grid-cols-3 gap-2.5">
                {shortsAsset.variations.map((v, i) => (
                  <motion.div
                    key={v.label}
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.35, delay: i * 0.06, ease }}
                  >
                    <div
                      className={cn(
                        'group relative cursor-pointer overflow-hidden rounded-[10px] border bg-muted transition-all duration-200 aspect-[9/16]',
                        selectedVar === i
                          ? 'border-primary/50 shadow-md shadow-primary/10'
                          : 'border-border/40 hover:border-border/80',
                      )}
                      onClick={() => setSelectedVar(i)}
                    >
                      <img
                        src={v.src}
                        alt={`Shorts variation: ${v.label}`}
                        className={cn(
                          'h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]',
                          v.filter,
                        )}
                      />
                      <div className="absolute inset-x-0 bottom-0 flex items-end justify-center bg-gradient-to-t from-black/60 to-transparent p-1.5 opacity-0 transition-opacity duration-200 group-hover:opacity-100">
                        <span className="text-center text-[9px] font-semibold leading-tight text-white/90">
                          {v.label}
                        </span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            ) : (
              /* Shorts Placeholder Variations Slots before generation */
              <div className="mx-auto grid max-w-[280px] grid-cols-3 gap-2.5">
                {[1, 2, 3].map((n) => (
                  <div
                    key={n}
                    className="flex aspect-[9/16] flex-col items-center justify-center rounded-[10px] border border-dashed border-border/50 bg-muted/15 p-2 text-center"
                  >
                    <span className="text-[10px] font-medium text-muted-foreground/40">
                      Slot #{n}
                    </span>
                    <span className="text-[9px] text-muted-foreground/30">
                      9:16
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
