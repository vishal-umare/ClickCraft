import { useState } from "react";
import { Menu, X } from "lucide-react";
import { toast } from "sonner";
import { Logo, scrollToId } from "./primitives";

export const navLinks = [
  { id: "features", label: "Features" },
  { id: "how", label: "How It Works" },
  { id: "examples", label: "Examples" },
];

export function Nav() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-50 border-b border-border/70 bg-background/90 backdrop-blur-xl">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5 md:px-8">
        <Logo />
        <nav className="hidden items-center gap-8 md:flex">
          {navLinks.map((l) => (
            <a key={l.id} href={`#${l.id}`} className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary">
              {l.label}
            </a>
          ))}
        </nav>
        <div className="hidden items-center gap-5 md:flex">
          <button onClick={() => toast("Accounts are coming soon.")} className="text-sm font-medium text-muted-foreground hover:text-primary">
            Sign In
          </button>
          <button
            onClick={() => scrollToId("preview")}
            className="rounded-full bg-ink px-5 py-2.5 text-sm font-semibold text-primary-foreground transition-transform hover:-translate-y-0.5"
          >
            Get Started
          </button>
        </div>
        <button className="md:hidden" aria-label="Toggle menu" onClick={() => setOpen(!open)}>
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>
      {open && (
        <div className="border-t border-border px-5 py-4 md:hidden">
          {navLinks.map((l) => (
            <a key={l.id} href={`#${l.id}`} onClick={() => setOpen(false)} className="block py-2.5 text-base">
              {l.label}
            </a>
          ))}
          <button
            onClick={() => { setOpen(false); scrollToId("preview"); }}
            className="mt-3 w-full rounded-full bg-primary py-2.5 text-sm font-semibold text-primary-foreground"
          >
            Get Started
          </button>
        </div>
      )}
    </header>
  );
}
