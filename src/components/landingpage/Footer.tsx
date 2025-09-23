export function Footer() {
  return (
    <footer className="py-8 bg-black border-t border-gray-900 text-center">
      <div className="container mx-auto px-4">
        <p className="text-gray-500">
          &copy; {new Date().getFullYear()} MILI - Monitoramento Inteligente. Todos os direitos reservados.
        </p>
      </div>
    </footer>
  );
}