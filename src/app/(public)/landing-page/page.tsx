// src/app/(public)/landing-page/page.tsx

import { Hero } from "@/components/landingpage/Hero"
import { Features } from "@/components/landingpage/Features"
import { Steps } from "@/components/landingpage/Steps"
import { Stats } from "@/components/landingpage/Stats"
import { CTA } from "@/components/landingpage/CTA"
import { Footer } from "@/components/landingpage/Footer"
import { VideoDemo } from "@/components/landingpage/VideoDemo"
import { UseCases } from "@/components/landingpage/UseCases" // 1. Importar o novo componente

export default function Home() {
  return (
    // Adicionamos 'overflow-x-hidden' para evitar barras de scroll horizontais com as animações
    <main className="overflow-x-hidden">
      <Hero />
      
      {/* Adicionamos classes de animação a cada seção */}
      <div className="animate__animated animate__fadeInUp animate__delay-1s">
        <VideoDemo />
      </div>

      <div className="animate__animated animate__fadeInUp">
        <Steps />
      </div>

      {/* 2. Adicionar a nova seção "UseCases" aqui */}
      <div className="animate__animated animate__fadeInUp">
        <UseCases />
      </div>
      
      <div className="animate__animated animate__fadeInUp">
        <Features />
      </div>

      <div className="animate__animated animate__fadeInUp">
        <Stats />
      </div>

      <div className="animate__animated animate__fadeInUp">
        <CTA />
      </div>

      <Footer />
    </main>
  )
}