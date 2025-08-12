export function VideoDemo() {
  return (
    <section id="demo" className="py-24 bg-gray-900">
      <div className="container mx-auto px-6 text-center">
        <h2 className="text-3xl font-bold mb-8">Demonstração do Sistema</h2>
        <div className="relative w-full max-w-4xl mx-auto">
          <video
            src="/videos/testelending.mp4"
            controls
            className="rounded-lg shadow-xl border border-gray-700"
          />
        </div>
        <p className="mt-6 text-gray-400">
          Veja como o sistema detecta ações de descarte e gera registros automáticos.
        </p>
      </div>
    </section>
  )
}