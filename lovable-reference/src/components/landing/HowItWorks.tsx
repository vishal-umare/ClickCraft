import { Reveal, SectionLabel } from "./primitives";
import { thumbnails } from "@/data/thumbnails";

export function HowItWorks() {
  const steps = [
    {
      n: "01",
      title: "Describe your video",
      body: "Write what it's about in plain words.",
      ui: <div className="rounded-md border border-border bg-background p-3 font-mono text-xs text-muted-foreground">"My first 100 days of strength training…"<span className="ml-0.5 animate-pulse text-primary">|</span></div>,
    },
    {
      n: "02",
      title: "Choose your theme",
      body: "Pick the mood that fits your channel.",
      ui: <div className="flex flex-wrap gap-1.5">{["Cinematic", "Gaming", "Tech", "Minimal"].map((t, i) => <span key={t} className={`rounded-full border px-2.5 py-1 text-xs ${i === 1 ? "border-primary text-foreground" : "border-border text-muted-foreground"}`}>{t}</span>)}</div>,
    },
    {
      n: "03",
      title: "Generate your thumbnail",
      body: "Review, refine, and download.",
      ui: <img src={thumbnails[5]?.src} alt="" loading="lazy" width={1280} height={720} className="aspect-video w-full rounded-md object-cover ring-1 ring-border" />,
    },
  ];
  return (
    <section id="how" className="bg-muted py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <Reveal className="text-center">
          <SectionLabel index="03">How it works</SectionLabel>
          <h2 className="mt-5 font-display text-5xl font-bold leading-none md:text-6xl">Three steps. <span className="text-primary">That's it.</span></h2>
        </Reveal>
        <div className="mt-16 grid gap-12 md:grid-cols-3 md:gap-8">
          {steps.map((s, i) => (
            <Reveal key={s.n} delay={i * 0.1} className="rounded-3xl bg-card p-7 shadow-sm ring-1 ring-border">
              <span className="font-display text-6xl font-bold leading-none text-primary">{s.n}</span>
              <h3 className="mt-6 text-xl font-semibold">{s.title}</h3>
              <p className="mt-1 text-muted-foreground">{s.body}</p>
              <div className="mt-6">{s.ui}</div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
