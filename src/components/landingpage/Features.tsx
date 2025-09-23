import { Zap, ShieldCheck, GitMerge } from 'lucide-react';

export function Features() {
  const features = [
    { 
      icon: <ShieldCheck className="h-10 w-10 text-sky-500" />,
      title: "Alta Precisão", 
      desc: "Nossa IA, baseada em um modelo treinado por nós, detecta com confiança ações suspeitas, minimizando falsos positivos." 
    },
    { 
      icon: <Zap className="h-10 w-10 text-sky-500" />,
      title: "Tempo Real", 
      desc: "Receba alertas instantâneos. O processamento otimizado permite respostas imediatas a incidentes." 
    },
    { 
      icon: <GitMerge className="h-10 w-10 text-sky-500" />,
      title: "Fácil Integração", 
      desc: "Compatível com a maioria das câmeras IP e sistemas de monitoramento existentes no mercado." 
    },
  ];

  return (
    <section className="py-16 sm:py-24 bg-black">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-white sm:text-4xl">
                Tecnologia de Ponta para Resultados Reais
            </h2>
            <p className="mt-4 text-lg text-gray-400">
                Estes são os pilares que tornam a nossa solução eficaz e confiável para os desafios do mundo real.
            </p>
        </div>

        <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((f, i) => (
            <div
              key={i}
              className="bg-gray-900/50 p-8 rounded-xl ring-1 ring-white/10 
                         transition-transform duration-300 hover:scale-105 hover:ring-sky-500 hover:shadow-2xl"
            >
              <div className="mb-6">{f.icon}</div>
              <h3 className="text-white font-bold text-xl mb-3">{f.title}</h3>
              <p className="text-gray-400">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}