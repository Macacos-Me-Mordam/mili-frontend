export function Features() {
  const features = [
    { title: "Alta Precisão", desc: "Detecta com confiança ações suspeitas usando YOLOv8" },
    { title: "Tempo Real", desc: "Respostas imediatas com processamento otimizado" },
    { title: "Fácil Integração", desc: "Compatível com câmeras IP e sistemas existentes" },
  ]

  return (
    <section className="py-16 sm:py-24 bg-black">
      <div className="container mx-auto px-4 sm:px-6">
        <h2 className="text-center font-bold mb-12 sm:mb-16 text-[clamp(1.5rem,4vw,2rem)] text-white">
          Tecnologia e Benefícios
        </h2>

        <div className="grid gap-6 sm:gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((f, i) => (
            <div
              key={i}
              className="bg-gray-800 p-6 sm:p-8 rounded-xl shadow-lg ring-1 ring-white/10 
                         transition-transform duration-300 hover:scale-[1.03] hover:shadow-xl
                         focus-within:scale-[1.03] focus-within:shadow-xl"
            >
              <h3 className="text-sky-500 font-bold text-lg sm:text-xl mb-2">{f.title}</h3>
              <p className="text-gray-300 text-sm sm:text-base">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
