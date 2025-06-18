'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { navItems } from '@/lib/constants/navItems';

export function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);  
  
  const handleSmoothScroll = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith('#')) {
      e.preventDefault();
      const element = document.getElementById(href.substring(1));
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
      setIsMobileMenuOpen(false);
    }
  };

  return (    
  <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur-md supports-[backdrop-filter]:bg-background/80 shadow-sm dark:border-border">
      <div className="container mx-auto max-w-7xl flex h-16 items-center justify-between px-4 lg:px-6">
        <div className="flex items-center gap-3">
          <Link href="/">
          <img 
            src="/Logo.png"
            alt="BISA Logo"
            className="h-10 w-auto dark:filter dark:brightness-0 dark:invert"
          />
          </Link>
          <div className="hidden sm:block">
            <h2 className="text-xl font-bold text-foreground">BISA</h2>
            <p className="text-xs text-muted-foreground">Bantuan Inklusif & Sasaran Akurat</p>
          </div>
        </div>        
        <div className="flex items-center gap-6">

          <nav className="hidden md:flex items-center gap-6 lg:gap-8">
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              onClick={(e) => handleSmoothScroll(e, item.href)}
              className="text-sm font-medium text-foreground hover:text-[#3E9EDB] transition-colors duration-200 relative group whitespace-nowrap"
            >
              {item.name}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#3E9EDB] transition-all duration-300 group-hover:w-full"></span>
            </Link>
          ))}
        </nav>

          <Link href="/login" className="hidden sm:block">
            <Button 
              className="bg-[#3E9EDB] hover:bg-[#2E7BC6] text-white font-medium px-6 py-2 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105"
            >
              Login
            </Button>
          </Link>
          
        </div>
      </div>

      <AnimatePresence>
        {isMobileMenuOpen && (         
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-background border-t border-border shadow-lg dark:shadow-none"
          >
            <div className="container py-4 space-y-3">
              {navItems.map((item, index) => (
                <motion.div
                  key={item.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Link
                    href={item.href}
                    onClick={(e) => handleSmoothScroll(e, item.href)}
                    className="block py-2 px-4 text-foreground hover:text-[#3E9EDB] hover:bg-muted rounded-lg transition-colors"
                  >
                    {item.name}
                  </Link>
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: navItems.length * 0.1 }}
                className="pt-3 border-t border-border"
              >
                <Link href="/login" className="block">
                  <Button 
                    className="w-full bg-[#3E9EDB] hover:bg-[#2E7BC6] text-white font-medium py-3 rounded-lg shadow-md"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Login
                  </Button>
                </Link>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
