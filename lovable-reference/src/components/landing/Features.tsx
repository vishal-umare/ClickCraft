import { Wand2, Palette, Zap, Layers, RefreshCw, Download } from "lucide-react";
import { thumbnails } from "@/data/thumbnails";
import { Reveal, SectionLabel } from "./primitives";

const rows = [
  { icon: Zap, title: "Fast from text", body: "A sentence about your video is all it takes." },
  { icon: Layers, title: "Flexible styles", body: "Shift mood, colour and composition without starting over." },
  { icon: RefreshCw, title: "Easy iteration", body: "Regenerate and refine until it feels right." },
  { icon: Download, title: "Download-ready", body: "Sized at 1280 × 720, ready for upload." },
];

export function Features() {
  const strip = thumbnails.slice(0, 4);
  return (
    <section id="features" className="py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <Reveal className="text-center">
          <SectionLabel index="02">Features</SectionLabel>
          <h2 className="mx-auto mt-5 max-w-3xl font-display text-5xl font-bold leading-none md:text-6xl">
            Built for the frame that decides the click.
          </h2>
        </Reveal>

        <div className="mt-16 grid gap-6 lg:grid-cols-5">
          <Reveal className="relative overflow-hidden rounded-3xl bg-periwinkle p-8 lg:col-span-3">
            <Wand2 className="h-6 w-6 text-primary" />
            <h3 className="mt-6 text-2xl font-semibold tracking-tight">AI-powered creation</h3>
            <p className="mt-2 max-w-sm text-muted-foreground">
              Describe the story. Thumbly composes a subject, a focal point and a headline into one bold frame.
            </p>
            <div className="mt-10 grid grid-cols-4 gap-2">
              {strip.map((t, i) => (
                <img key={t.id} src={t.src} alt="" loading="lazy" width={1280} height={720}
                  className="aspect-video w-full rounded-sm object-cover ring-1 ring-border"
                  style={{ transform: `translateY(${i % 2 ? 12 : 0}px)` }} />
              ))}
            </div>
          </Reveal>

          <Reveal delay={0.1} className="flex flex-col justify-between rounded-3xl bg-mint p-8 text-accent-foreground lg:col-span-2">
            <Palette className="h-6 w-6 text-primary" />
            <div className="mt-12">
              <h3 className="font-display text-4xl font-bold leading-none">Multiple creative themes</h3>
              <div className="mt-6 flex flex-wrap gap-2">
                {["Cinematic", "Gaming", "Tech", "Minimal"].map((t) => (
                  <span key={t} className="rounded-full border border-accent-foreground/20 bg-card/60 px-3 py-1 text-sm">{t}</span>
                ))}
              </div>
            </div>
          </Reveal>
        </div>

        <div className="mt-5 divide-y divide-border border-y border-border">
          {rows.map((r, i) => (
            <Reveal key={r.title} delay={i * 0.05} className="grid grid-cols-[auto_1fr] items-center gap-6 py-6 md:grid-cols-[60px_1fr_1.4fr]">
              <r.icon className="h-5 w-5 text-accent" />
              <h3 className="text-lg font-semibold">{r.title}</h3>
              <p className="col-span-2 text-muted-foreground md:col-span-1">{r.body}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
