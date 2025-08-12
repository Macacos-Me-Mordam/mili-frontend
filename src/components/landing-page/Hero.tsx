export function Hero() {
  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      <video
        autoPlay
        muted
        loop
        className="absolute w-auto min-w-full min-h-full max-w-none object-cover opacity-20"
      >
        <source src="/videos/watermarked_preview.mp4" type="video/mp4" />
      </video>
      <div className="relative z-10 text-center px-6">
        <h1 className="text-4xl md:text-6xl font-bold mb-4 text-black drop-shadow-lg">
          Inteligência Artificial para um Mundo mais Limpo
        </h1>
        <p className="text-lg md:text-2xl mb-6 text-black-200 max-w-2xl mx-auto">
          Detectamos e registramos descartes irregulares em tempo real usando visão computacional e redes neurais.
        </p>
        <a
          href="#demo"
          className="inline-block px-6 py-3 text-lg font-medium bg-green-500 hover:bg-green-600 rounded shadow"
        >
          Ver em ação
        </a>
      </div>
    </section>
  )
}
