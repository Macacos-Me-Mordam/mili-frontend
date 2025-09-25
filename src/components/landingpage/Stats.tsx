import AnimatedNumber from "@/components/landingpage/AnimatedNumber";

export function Stats() {
  const stats = [
    { label: "Imagens utilizadas no treinamento", value: "+10000" },
    { label: "Redução de descarte", value: "-35%" },
    { label: "Precisão da IA", value: "90.0%" },
  ];

  return (
    <section className="py-14 sm:py-20 bg-gradient-to-b from-black via-gray-900 to-black">
      <div className="container mx-auto px-4 sm:px-6">
        <div role="list" className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8 text-center">
          {stats.map((s, i) => (
            <div
              role="listitem"
              key={i}
              className={[
                "p-6 rounded-xl bg-white/5 ring-1 ring-white/10",
                "transition-transform duration-300 hover:scale-[1.02]",
                "motion-reduce:transition-none motion-reduce:transform-none",
                i > 0 ? "sm:border-l sm:border-white/10" : "",
              ].join(" ")}
            >
              <AnimatedNumber
                value={s.value}
                duration={5000} // mais lento
                threshold={0.4} // começa quando 40% do elemento está visível
                className="text-[clamp(2rem,7vw,3.5rem)] font-extrabold text-sky-500 drop-shadow-sm tracking-tight"
              />
              <div className="mt-2 text-[clamp(0.95rem,2.5vw,1.125rem)] text-gray-300">
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
