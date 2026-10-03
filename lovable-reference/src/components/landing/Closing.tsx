import { ArrowUp } from "lucide-react";
import { Logo, Reveal, scrollToId } from "./primitives";
import { navLinks } from "./Nav";

export function FinalCta() {
  return (
    <section className="bg-ink py-28 text-primary-foreground md:py-36">
      <Reveal className="mx-auto max-w-5xl px-5 text-center md:px-8">
        <h2 className="font-display text-[clamp(2.75rem,7vw,6rem)] font-bold leading-[0.98]">
          Your next thumbnail starts with <span className="text-primary">an idea.</span>
        </h2>
        <button
          onClick={() => scrollToId("preview")}
          className="mt-12 inline-flex items-center gap-2 rounded-full bg-primary px-8 py-4 text-base font-semibold text-primary-foreground transition-transform hover:-translate-y-0.5"
        >
          Get Started
          <ArrowUp className="h-4 w-4" />
        </button>
      </Reveal>
    </section>
  );
}

export function Footer() {
  return (
    <footer className="border-t border-primary-foreground/10 bg-ink text-primary-foreground">
      <div className="mx-auto flex max-w-7xl flex-col gap-6 px-5 py-10 md:flex-row md:items-center md:justify-between md:px-8">
        <Logo inverse />
        <nav className="flex gap-6">
          {navLinks.map((l) => (
            <a key={l.id} href={`#${l.id}`} className="text-sm text-primary-foreground/60 hover:text-primary-foreground">{l.label}</a>
          ))}
        </nav>
        <p className="text-xs text-primary-foreground/60">© {new Date().getFullYear()} Thumbly AI</p>
      </div>
    </footer>
  );
}
