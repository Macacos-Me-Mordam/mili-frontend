import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "MILI",
  description: "Monitoramento Inteligente Sobre Lixo Improprio",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className="__variable_5cfdac __variable_9a8899 antialiased vsc-initialized"
        cz-shortcut-listen="true"
      >
        {children}
      </body>
    </html>
  );
}