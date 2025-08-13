import { RotatingTextPill } from "@/components/landingpage/RotatingTextPill"

export function Hero() {
  return (
    <section className="relative min-h-[100svh] flex items-center overflow-hidden">
      <video
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        poster="/videos/poster.jpg"
        aria-hidden
        className="absolute inset-0 h-full w-full object-cover pointer-events-none opacity-70"
      >
        <source src="/videos/testelending.mp4" type="video/mp4" />
      </video>

      <div aria-hidden className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/60" />

      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="max-w-3xl">
          <h1 className="font-extrabold leading-tight text-white text-[clamp(1.75rem,6vw,3.5rem)]">
            Inteligência Artificial{" "}
            {/* grupo que NUNCA quebra entre 'para um' e o pill */}
            <span className="inline-flex flex-nowrap items-baseline whitespace-nowrap gap-2">
              para um
              <RotatingTextPill
                texts={["Mundo mais limpo", "Planeta sustentável", "Futuro verde"]}
                interval={2400}
                transitionMs={600}
                pillClassName="px-4 py-1 bg-sky-600/90 rounded-2xl shadow-inner"
                wordClassName="text-white"
              />
            </span>
          </h1>


          <p className="mt-4 text-white/90 text-[clamp(1rem,2.5vw,1.25rem)] max-w-xl">
            Detectamos e registramos descartes irregulares em tempo real usando visão
            computacional e redes neurais.
          </p>

          <div className="mt-8">
            <a
              href="#demo"
              className="inline-flex w-full sm:w-auto items-center justify-center px-6 py-3 text-base sm:text-lg font-medium bg-sky-600 hover:bg-sky-700 rounded-xl shadow focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-400 transition"
            >
              Ver em ação
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
