import { useState } from "react";
import { Sparkles, Film, Gamepad2, Cpu, Minus } from "lucide-react";
import { toast } from "sonner";
import { thumbnails, themes, type Theme } from "@/data/thumbnails";
import { ThumbnailCard } from "./primitives";
import { cn } from "@/lib/utils";

const themeIcons: Record<Theme, typeof Film> = { Cinematic: Film, Gaming: Gamepad2, Tech: Cpu, Minimal: Minus };
const previewSet = thumbnails.slice(0, 4).concat(thumbnails.slice(4));

export function ProductPreview() {
  const [theme, setTheme] = useState<Theme>("Cinematic");
  const [prompt, setPrompt] = useState("A moody night walk through Tokyo in the rain — my last day of a 3-week trip.");
  const shown = [...previewSet.filter((t) => t.theme === theme), ...previewSet.filter((t) => t.theme !== theme)].slice(0, 4);

  return (
    <div className="overflow-hidden rounded-3xl border border-border bg-card p-3 shadow-soft">
      <div className="flex items-center justify-between rounded-t-2xl border-b border-border bg-muted/50 px-4 py-3">
        <div className="flex gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-muted-foreground/30" />
          <span className="h-2.5 w-2.5 rounded-full bg-muted-foreground/30" />
          <span className="h-2.5 w-2.5 rounded-full bg-muted-foreground/30" />
        </div>
        <span className="text-[11px] font-medium text-muted-foreground">thumbly.ai / new-thumbnail</span>
        <span className="rounded-full bg-accent px-2 py-1 text-[10px] font-bold uppercase tracking-widest text-accent-foreground">Preview</span>
      </div>

      <div className="grid lg:grid-cols-[380px_1fr]">
        <div className="flex flex-col gap-6 border-b border-border bg-soft-blue p-6 lg:border-b-0 lg:border-r">
          <label className="block">
             <span className="mb-2 block text-[11px] font-bold uppercase tracking-widest text-muted-foreground">Describe your video</span>
            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              rows={4}
               className="w-full resize-none rounded-xl border border-input bg-card p-3 text-sm leading-relaxed outline-none focus:border-primary"
            />
          </label>

          <div>
             <span className="mb-2 block text-[11px] font-bold uppercase tracking-widest text-muted-foreground">Theme</span>
            <div className="grid grid-cols-2 gap-2">
              {themes.map((t) => {
                const Icon = themeIcons[t];
                return (
                  <button
                    key={t}
                    onClick={() => setTheme(t)}
                    className={cn(
                       "flex items-center gap-2 rounded-xl border px-3 py-2.5 text-sm transition-colors",
                      theme === t ? "border-primary bg-primary/10 text-foreground" : "border-border text-muted-foreground hover:text-foreground",
                    )}
                  >
                    <Icon className="h-4 w-4" />
                    {t}
                  </button>
                );
              })}
            </div>
          </div>

          <button
            onClick={() => toast("Preview only — generation is coming soon.")}
             className="mt-auto inline-flex items-center justify-center gap-2 rounded-full bg-primary py-3 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/20 transition-transform hover:-translate-y-0.5"
          >
            <Sparkles className="h-4 w-4" />
            Generate thumbnail
          </button>
        </div>

        <div className="p-6">
          <div className="mb-4 flex items-center justify-between">
           <span className="text-[11px] font-bold uppercase tracking-widest text-muted-foreground">Results · {theme}</span>
             <span className="text-[11px] font-medium text-muted-foreground">1280 × 720</span>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {shown.map((t, i) => (
              <ThumbnailCard key={t.id} t={t} eager={i < 2} dim={t.theme !== theme} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
