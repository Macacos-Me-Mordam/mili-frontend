export function Steps() {
  const steps = [
    "Câmeras captam o ambiente em tempo real",
    "YOLO identifica pessoas e objetos",
    "Ação irregular é detectada automaticamente",
    "Evidência é armazenada com timestamp e localização"
  ]
  return (
    <section className="py-24 bg-black">
      <div className="container mx-auto px-6 max-w-4xl">
        <h2 className="text-3xl font-bold text-center mb-12">Como Funciona</h2>
        <div className="grid gap-10 md:grid-cols-2">
          {steps.map((step, i) => (
            <div
              key={i}
              className="bg-gray-800 border border-gray-700 p-6 rounded-xl transition transform hover:scale-105 shadow-md"
            >
              <div className="text-green-400 text-2xl font-bold mb-2">Passo {i + 1}</div>
              <p className="text-gray-200">{step}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}