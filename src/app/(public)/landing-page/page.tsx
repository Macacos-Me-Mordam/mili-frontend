import { Header } from "@/components/landingpage/Header";
import { Hero } from "@/components/landingpage/Hero";
import { Features } from "@/components/landingpage/Features";
import { Steps } from "@/components/landingpage/Steps";
import { Stats } from "@/components/landingpage/Stats";
import { CTA } from "@/components/landingpage/CTA";
import { Footer } from "@/components/landingpage/Footer";
import { VideoDemo } from "@/components/landingpage/VideoDemo";
import { UseCases } from "@/components/landingpage/UseCases";

export default function Home() {
  return (
    <div className="bg-black text-white">
      <Header />
      <main className="overflow-x-hidden">
        <article>
          <Hero />

          <div id="demo" className="animate__animated animate__fadeInUp animate__delay-1s">
            <VideoDemo />
          </div>

          <div className="animate__animated animate__fadeInUp">
            <Steps />
          </div>
          
          <div id="use-cases" className="animate__animated animate__fadeInUp">
            <UseCases />
          </div>
          
          <div id="features" className="animate__animated animate__fadeInUp">
            <Features />
          </div>

          <div className="animate__animated animate__fadeInUp">
            <Stats />
          </div>

          <div id="cta" className="animate__animated animate__fadeInUp">
            <CTA />
          </div>
        </article>
      </main>
      <Footer />
    </div>
  );
}