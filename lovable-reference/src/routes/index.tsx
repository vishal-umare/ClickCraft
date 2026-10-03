import { createFileRoute } from "@tanstack/react-router";
import { Nav } from "@/components/landing/Nav";
import { Hero } from "@/components/landing/Hero";
import { Gallery } from "@/components/landing/Gallery";
import { Features } from "@/components/landing/Features";
import { HowItWorks } from "@/components/landing/HowItWorks";
import { FinalCta, Footer } from "@/components/landing/Closing";

const title = "Thumbly AI — YouTube Thumbnails From a Single Idea";
const description = "Describe your video, choose a theme, and create eye-catching YouTube thumbnails with AI. No design skills required.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
       { property: "og:type", content: "website" },
       { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <div className="min-h-screen">
      <Nav />
      <main>
        <Hero />
        <Gallery />
        <Features />
        <HowItWorks />
        <FinalCta />
      </main>
      <Footer />
    </div>
  );
}
