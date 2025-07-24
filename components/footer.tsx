'use client';

import { Github } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export function Footer() {
  return (
    <footer className="bg-[#24649F] py-12 text-white">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 gap-x-8 gap-y-8 sm:grid-cols-2 lg:grid-cols-4">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <Image
                width={40}
                height={40}
                src="/logo.png"
                alt="BISA Logo"
                className="h-10 w-10 rounded-lg bg-white/10 p-1"
              />
              <div>
                <h3 className="text-xl font-bold">BISA</h3>
                <p className="text-sm text-blue-200">Bantuan Inklusif & Sasaran Akurat</p>
              </div>
            </div>
            <p className="leading-relaxed text-blue-100">
              Platform AI untuk distribusi bantuan sosial yang tepat sasaran.
            </p>
          </div>

          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-white">Dukungan</h4>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/faq"
                  className="text-blue-200 transition-colors duration-200 hover:text-white hover:underline focus:text-white focus:underline focus:outline-none">
                  FAQ
                </Link>
              </li>
              <li>
                <Link
                  href="/guide"
                  className="text-blue-200 transition-colors duration-200 hover:text-white hover:underline focus:text-white focus:underline focus:outline-none">
                  Panduan
                </Link>
              </li>
              <li>
                <Link
                  href="/support"
                  className="text-blue-200 transition-colors duration-200 hover:text-white hover:underline focus:text-white focus:underline focus:outline-none">
                  Support
                </Link>
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-white">Kontak</h4>
            <ul className="space-y-3 text-blue-100">
              <li>
                <a
                  href="mailto:info@bisa.go.id"
                  className="transition-colors duration-200 hover:text-white focus:text-white focus:outline-none">
                  info@bisa.go.id
                </a>
              </li>
              <li>
                <a
                  href="tel:+622112345678"
                  className="transition-colors duration-200 hover:text-white focus:text-white focus:outline-none">
                  +62 21 1234 5678
                </a>
              </li>
              <li>Jakarta, Indonesia</li>
            </ul>
          </div>

          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-white">Source Code</h4>
            <div className="animate-fade-in-up">
              <Link
                href="https://github.com/bisa-bi-ojk/BISA"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-lg bg-white/10 px-4 py-3 text-sm text-blue-100 transition-all duration-200 hover:bg-white/20 hover:text-white focus:bg-white/20 focus:text-white focus:outline-none focus:ring-2 focus:ring-white/50"
                aria-label="View BISA source code on GitHub">
                <Github className="h-5 w-5" />
                <span>GitHub Repository</span>
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-12 border-t border-blue-400/30 pt-8 text-center">
          <p className="text-blue-200">
            © 2025 BISA Platform. Dikembangkan untuk Pemerintah Indonesia.
          </p>
        </div>
      </div>
    </footer>
  );
}
