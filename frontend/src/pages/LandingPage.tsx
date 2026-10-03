import { Header } from '@/components/landing/Header'
import { Hero } from '@/components/landing/Hero'
import { Workflow } from '@/components/landing/Workflow'
import { Features } from '@/components/landing/Features'
import { Gallery } from '@/components/landing/Gallery'
import { Footer } from '@/components/landing/Closing'

export default function LandingPage() {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <Hero />
        <Workflow />
        <Features />
        <Gallery />
      </main>
      <Footer />
    </div>
  )
}
