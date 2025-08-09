export function Stats() {
  const stats = [
    { label: "Pontos monitorados", value: "+120" },
    { label: "Redução de descarte", value: "-35%" },
    { label: "Precisão da IA", value: "98.7%" }
  ]
  return (
    <section className="py-20 bg-gradient-to-b from-black via-gray-900 to-black">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-8 text-center">
          {stats.map((s, i) => (
            <div
              key={i}
              className="transition duration-300 transform hover:scale-105"
            >
              <div className="text-5xl font-extrabold text-green-500 drop-shadow-sm">{s.value}</div>
              <div className="mt-3 text-gray-300 text-lg">{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}