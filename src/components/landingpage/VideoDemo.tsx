export function VideoDemo() {
  return (
    <section id="demo" className="py-16 sm:py-24 bg-gray-900">
      <div className="container mx-auto px-4 sm:px-6 text-center">
        <h2 className="text-[clamp(1.5rem,4.5vw,2rem)] font-bold mb-8 text-white">
          Demonstração do Sistema
        </h2>

        <div className="relative w-full max-w-4xl mx-auto">
          <div className="aspect-video overflow-hidden rounded-xl shadow-2xl ring-1 ring-white/10">
            <video
              className="h-full w-full object-cover"
              controls
              playsInline
              preload="metadata"
              poster="/videos/poster-demo.jpg"     
            >
              <source src="/videos/testelending.mp4" type="video/mp4" />
              Seu navegador não suporta vídeo HTML5.
            </video>
          </div>
        </div>

        <p className="mt-6 text-gray-300 text-[clamp(1rem,2.5vw,1.125rem)] max-w-2xl mx-auto">
          Veja como o sistema detecta ações de descarte e gera registros automáticos.
        </p>
      </div>
    </section>
  )
}
