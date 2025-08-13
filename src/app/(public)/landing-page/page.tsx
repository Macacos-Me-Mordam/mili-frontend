import { Hero } from "@/components/landingpage/Hero"
import { Features } from "@/components/landingpage/Features"
import { Steps } from "@/components/landingpage/Steps"
import { Stats } from "@/components/landingpage/Stats"
import { CTA } from "@/components/landingpage/CTA"
import { Footer } from "@/components/landingpage/Footer"
import { VideoDemo } from "@/components/landingpage/VideoDemo"

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