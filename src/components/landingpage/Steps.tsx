import { Video, Bot, AlertTriangle, Archive } from 'lucide-react';

export function Steps() {
  const steps = [
    {
      icon: <Video className="h-8 w-8 text-sky-400" />,
      title: "Captura Contínua",
      description: "As câmeras estrategicamente posicionadas monitorizam o ambiente em tempo real, 24/7."
    },
    {
      icon: <Bot className="h-8 w-8 text-sky-400" />,
      title: "Análise por IA",
      description: "O nosso modelo analisa o vídeo para identificar pessoas, objetos e ações suspeitas."
    },
    {
      icon: <AlertTriangle className="h-8 w-8 text-sky-400" />,
      title: "Deteção de Anomalias",
      description: "Uma ação de descarte irregular é detectada e classificada automaticamente pelo sistema."
    },
    {
      icon: <Archive className="h-8 w-8 text-sky-400" />,
      title: "Registo de Evidências",
      description: "A evidência é guardada de forma segura com data, hora e localização para análise posterior."
    }
  ];

  return (
    <section className="py-24 bg-gray-900/50">
      <div className="container mx-auto px-6 max-w-5xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-white sm:text-4xl">Como Funciona</h2>
          <p className="mt-4 text-lg text-gray-400">Um processo automatizado e eficiente em quatro etapas simples.</p>
        </div>
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, i) => (
            <div
              key={i}
              className="text-center p-6 rounded-xl transition transform hover:-translate-y-2"
            >
              <div className="flex items-center justify-center h-16 w-16 rounded-full bg-gray-800 border border-gray-700 mb-6 mx-auto">
                {step.icon}
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">{step.title}</h3>
              <p className="text-gray-400">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}