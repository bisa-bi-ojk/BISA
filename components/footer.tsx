'use client';

import Link from 'next/link';

export function Footer() {
    return (        <footer className="bg-[#24649F] text-white py-12">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    <div className="col-span-1">
                        <div className="flex items-center gap-3 mb-4">
                            <img 
                                src="/Logo.png"
                                alt="BISA Logo"
                                className="h-10 w-auto filter brightness-0 invert"
                            />
                            <div>
                                <h3 className="text-xl font-bold">BISA</h3>
                                <p className="text-sm text-gray-300">Bantuan Inklusif & Sasaran Akurat</p>
                            </div>
                        </div>
                        <p className="text-gray-300 mb-4">
                            Platform AI untuk distribusi bantuan sosial yang tepat sasaran.
                        </p>
                    </div>                 
                    <div>
                        <h4 className="font-semibold mb-4">Platform</h4>
                        <ul className="space-y-2">
                            <li><Link href="#features" className="text-gray-300 hover:text-white">Fitur Utama</Link></li>
                            <li><Link href="/dashboard" className="text-gray-300 hover:text-white">Dashboard</Link></li>
                            <li><Link href="/about" className="text-gray-300 hover:text-white">Tentang Kami</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-semibold mb-4">Dukungan</h4>
                        <ul className="space-y-2">
                            <li><Link href="#faq" className="text-gray-300 hover:text-white">FAQ</Link></li>
                            <li><Link href="#guide" className="text-gray-300 hover:text-white">Panduan</Link></li>
                            <li><Link href="#support" className="text-gray-300 hover:text-white">Support</Link></li>
                        </ul>
                    </div>

                    {/* Contact */}
                    <div>
                        <h4 className="font-semibold mb-4">Kontak</h4>
                        <ul className="space-y-2 text-gray-300">
                            <li>info@bisa.go.id</li>
                            <li>+62 21 1234 5678</li>
                            <li>Jakarta, Indonesia</li>
                        </ul>
                    </div>
                </div>

                {/* Bottom Section */}
                <div className="border-t border-gray-700 mt-8 pt-8 text-center">
                    <p className="text-gray-400">
                        © 2025 BISA Platform. Dikembangkan untuk Pemerintah Indonesia.
                    </p>
                </div>
            </div>
        </footer>
    );
}


