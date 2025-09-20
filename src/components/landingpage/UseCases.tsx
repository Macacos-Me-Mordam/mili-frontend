// src/components/landingpage/UseCases.tsx
import { Landmark, Building, Recycle } from 'lucide-react'

const useCases = [
  {
    icon: <Landmark className="h-10 w-10 text-sky-500" />,
    title: "Prefeituras e Municípios",
    description: "Monitore pontos viciados de descarte, otimize rotas de coleta e aplique políticas públicas baseadas em dados reais."
  },
  {
    icon: <Building className="h-10 w-10 text-sky-500" />,
    title: "Empresas e Indústrias",
    description: "Garanta a conformidade ambiental, monitore o descarte de resíduos em suas instalações e promova a sustentabilidade."
  },
  {
    icon: <Recycle className="h-10 w-10 text-sky-500" />,
    title: "Gestão de Resíduos",
    description: "Identifique áreas de alta incidência de descarte irregular para alocar recursos de limpeza de forma mais eficiente."
  }
]

export function UseCases() {
  return (
    <section className="py-16 sm:py-24 bg-gray-900">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-white sm:text-4xl">
                Uma solução versátil para diversos setores
            </h2>
            <p className="mt-4 text-lg text-gray-300">
                Nossa tecnologia foi desenhada para atender às necessidades específicas de diferentes organizações que lutam por um ambiente mais limpo.
            </p>
        </div>

        <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {useCases.map((item, index) => (
            <div
              key={index}
              className="bg-gray-800 p-8 rounded-xl shadow-lg ring-1 ring-white/10 
                         transition-all duration-300 hover:ring-sky-500 hover:-translate-y-1"
            >
              <div className="mb-6">{item.icon}</div>
              <h3 className="text-xl font-bold text-white mb-2">{item.title}</h3>
              <p className="text-gray-400">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}