export function Footer() {
  return (
    <footer className="py-6 sm:py-10 bg-black border-t border-gray-800 text-center">
      <p className="px-4 text-[clamp(0.875rem,2.5vw,1rem)] text-gray-400 leading-relaxed">
        &copy; {new Date().getFullYear()}{" "}
        <span className="whitespace-nowrap font-medium text-gray-300">
          Projeto YOLO Lixo Inteligente
        </span>
        . Todos os direitos reservados.
      </p>
    </footer>
  )
}
