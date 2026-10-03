import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { categories, thumbnails } from "@/data/thumbnails";
import { Reveal, SectionLabel, ThumbnailCard } from "./primitives";
import { cn } from "@/lib/utils";

export function Gallery() {
  const [cat, setCat] = useState<(typeof categories)[number]>("All");
  const items = cat === "All" ? thumbnails : thumbnails.filter((t) => t.category === cat);

  return (
    <section id="examples" className="bg-ink py-24 text-primary-foreground md:py-32">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <Reveal className="mb-12 text-center">
          <div>
            <SectionLabel index="01">Examples</SectionLabel>
            <h2 className="mx-auto mt-5 max-w-2xl font-display text-5xl font-bold leading-none md:text-6xl">
              One idea, <span className="text-primary">many</span> looks.
            </h2>
          </div>
          <div className="mt-8 flex flex-wrap justify-center gap-2">
            {categories.map((c) => (
              <button
                key={c}
                onClick={() => setCat(c)}
                className={cn(
                  "rounded-full border px-4 py-1.5 text-sm transition-colors",
                  cat === c ? "border-primary bg-primary text-primary-foreground" : "border-primary-foreground/20 text-primary-foreground/65 hover:text-primary-foreground",
                )}
              >
                {c}
              </button>
            ))}
          </div>
        </Reveal>

        <motion.div layout className="grid gap-x-5 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {items.map((t, i) => (
              <motion.div
                key={t.id}
                layout
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.4 }}
                className={cn(cat === "All" && i === 0 && "lg:col-span-2 lg:row-span-2")}
              >
                <ThumbnailCard t={t} />
                <div className="mt-3 flex items-baseline justify-between gap-4">
                  <span className="text-sm font-medium">{t.title}</span>
                  <span className="text-[11px] font-semibold uppercase tracking-wider text-primary-foreground/55">{t.category}</span>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
        <p className="mt-10 text-center text-xs text-primary-foreground/55">Demo examples showing the intended style range.</p>
      </div>
    </section>
  );
}
