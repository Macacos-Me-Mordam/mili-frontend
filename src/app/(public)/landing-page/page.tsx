// app/page.tsx ou pages/index.tsx
import { Hero } from "@/components/landing-page/Hero"
import { Features } from "@/components/landing-page/Features"
import { Steps } from "@/components/landing-page/Steps"
import { Stats } from "@/components/landing-page/Stats"
import { CTA } from "@/components/landing-page/CTA"
import { Footer } from "@/components/landing-page/Footer"
import { VideoDemo } from "@/components/landing-page/VideoDemo"

export default function Home() {
  return (
    <main>
      <Hero />
      <VideoDemo />
      <Steps />
      <Features />
      <Stats />
      <CTA />
      <Footer />
    </main>
  )
}