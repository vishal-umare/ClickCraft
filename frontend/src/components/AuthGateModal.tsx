import { motion, AnimatePresence } from 'framer-motion'
import { Lock, ArrowRight, X } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

interface AuthGateModalProps {
  open: boolean
  onClose: () => void
}

export function AuthGateModal({ open, onClose }: AuthGateModalProps) {
  const navigate = useNavigate()

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            className="fixed inset-0 z-[100] bg-ink/60 dark:bg-black/70 backdrop-blur-sm"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-[101] flex items-center justify-center px-4"
          >
            <div className="relative w-full max-w-md overflow-hidden rounded-3xl border border-border/40 bg-card p-8 shadow-2xl shadow-ink/10 dark:shadow-black/30 md:p-10">
              {/* Close button */}
              <button
                onClick={onClose}
                className="absolute right-4 top-4 rounded-lg p-1.5 text-muted-foreground/50 transition-colors hover:bg-muted hover:text-foreground"
                aria-label="Close"
              >
                <X className="h-4 w-4" />
              </button>

              {/* Icon */}
              <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                <Lock className="h-6 w-6" />
              </div>

              {/* Content */}
              <div className="text-center">
                <h2 className="font-display text-xl font-bold text-ink dark:text-foreground">
                  Your free generation has been used
                </h2>
                <p className="mx-auto mt-2.5 max-w-xs text-[14px] leading-relaxed text-muted-foreground">
                  Create a free account to keep generating professional thumbnails with ClickCraft.
                </p>
              </div>

              {/* Actions */}
              <div className="mt-7 flex flex-col gap-3">
                <button
                  onClick={() => {
                    onClose()
                    navigate('/signup')
                  }}
                  className="group inline-flex h-12 items-center justify-center gap-2.5 rounded-xl bg-primary text-[14px] font-semibold text-primary-foreground shadow-md shadow-primary/15 transition-all hover:shadow-lg hover:shadow-primary/25 hover:brightness-110 active:scale-[0.98]"
                >
                  Create free account
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </button>

                <button
                  onClick={() => {
                    onClose()
                    navigate('/login')
                  }}
                  className="inline-flex h-11 items-center justify-center rounded-xl border border-border text-[14px] font-medium text-foreground transition-colors hover:bg-muted"
                >
                  Already have an account? Log in
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
