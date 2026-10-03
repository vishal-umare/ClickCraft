import { motion } from "framer-motion";
import { ArrowRight, ArrowDown } from "lucide-react";
import { scrollToId } from "./primitives";
import { ProductPreview } from "./ProductPreview";

const ease = [0.22, 1, 0.36, 1] as const;

export function Hero() {
  return (
    <section id="top" className="relative overflow-hidden bg-[radial-gradient(circle_at_20%_65%,var(--periwinkle),transparent_30%),radial-gradient(circle_at_82%_62%,var(--mint),transparent_28%)]">
      <div className="mx-auto max-w-7xl px-5 pb-12 pt-16 text-center md:px-8 md:pt-24">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease }}
          className="mb-8 inline-flex items-center gap-2 rounded-full border border-border bg-card/85 px-4 py-1.5 text-xs font-semibold text-muted-foreground shadow-sm"
        >
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-primary" />
          AI thumbnail studio · In development
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.05, ease }}
          className="mx-auto max-w-5xl font-display text-[clamp(3rem,7vw,6.5rem)] font-bold leading-[1.02] text-ink"
        >
          Turn your ideas into thumbnails that <span className="text-primary">get noticed.</span>
        </motion.h1>

        <div className="mx-auto mt-8 flex max-w-2xl flex-col items-center gap-8">
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease }}
            className="max-w-2xl text-lg leading-relaxed text-muted-foreground"
          >
            Create eye-catching YouTube thumbnails with AI. Describe your video, choose your style, and bring your next big idea to life.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease }}
            className="flex flex-col items-center gap-4"
          >
            <div className="flex flex-wrap gap-3">
              <button
                onClick={() => scrollToId("preview")}
                className="group inline-flex items-center gap-2 rounded-full bg-primary px-7 py-3.5 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/20 transition-transform hover:-translate-y-0.5"
              >
                Start Creating
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </button>
              <button
                onClick={() => scrollToId("examples")}
                className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-7 py-3.5 text-sm font-semibold transition-colors hover:bg-secondary"
              >
                Explore Examples
                <ArrowDown className="h-4 w-4" />
              </button>
            </div>
            <p className="text-xs font-medium text-muted-foreground">Made for creators. No design skills required.</p>
          </motion.div>
        </div>
      </div>

      <div id="preview" className="mx-auto max-w-6xl scroll-mt-24 px-5 pb-24 pt-8 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4, ease }}
        >
          <ProductPreview />
        </motion.div>
      </div>
    </section>
  );
}
