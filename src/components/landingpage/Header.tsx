'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { FaUser } from 'react-icons/fa';
import { cn } from '@/lib/utils';

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { href: '#demo', label: 'Demonstração' },
    { href: '#use-cases', label: 'Casos de Uso' },
    { href: '#features', label: 'Benefícios' },
    { href: '#cta', label: 'Contato' },
  ];

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        isScrolled ? 'bg-black/80 backdrop-blur-lg border-b border-gray-800' : 'bg-transparent'
      )}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
        <Link href="/" className="text-xl font-bold text-white">
          MILI
        </Link>
        <nav className="hidden md:flex items-center space-x-6">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-gray-300 hover:text-sky-500 transition-colors"
            >
              {link.label}
            </a>
          ))}
        </nav>
        <Link
          href="/sign-in"
          className="bg-sky-600 text-white px-4 py-2 rounded-lg shadow-lg flex items-center space-x-2 text-sm font-medium hover:bg-sky-700 transition-colors"
        >
          <FaUser size={16} />
          <span>Login</span>
        </Link>
      </div>
    </header>
  );
}