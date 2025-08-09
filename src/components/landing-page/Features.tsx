export function Features() {
  const features = [
    { title: "Alta Precisão", desc: "Detecta com confiança ações suspeitas usando YOLOv8" },
    { title: "Tempo Real", desc: "Respostas imediatas com processamento otimizado" },
    { title: "Fácil Integração", desc: "Compatível com câmeras IP e sistemas existentes" },
  ]
  return (
    <section className="py-24 bg-black">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl font-bold text-center mb-16">Tecnologia e Benefícios</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {features.map((f, i) => (
            <div key={i} className="bg-gray-800 p-6 rounded-xl shadow hover:shadow-lg hover:scale-105 transition">
              <div className="text-green-400 text-xl font-bold mb-2">{f.title}</div>
              <p className="text-gray-300">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}