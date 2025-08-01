'use client';

import { Button } from '@/components/ui/button';
import { useAuth } from '@/hooks/use-auth';
import { logout as apiLogout } from '@/lib/api/auth';
import { navItems } from '@/lib/constants/landing_page/navItems';
import { AnimatePresence, motion } from 'framer-motion';
import { Menu, User, X } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

export function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { user, isLoggedIn, logout, isMounted, isLoading } = useAuth();

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

  const handleLogout = async () => {
    try {
      await apiLogout();
      logout();
    } catch (error) {
      console.error('Logout error:', error);
      logout();
    }
  };

  return (
    <header className="bg-background/95 supports-[backdrop-filter]:bg-background/80 dark:border-border sticky top-0 z-50 w-full border-b shadow-sm backdrop-blur-md">
      <div className="container mx-auto flex h-16 max-w-7xl items-center justify-between px-4 lg:px-6">
        <div className="flex items-center gap-3">
          <Link href="/">
            <Image
              width={40}
              height={40}
              src="/logo.png"
              alt="BISA Logo"
              className="h-10 w-auto dark:brightness-0 dark:invert dark:filter"
            />
          </Link>
          <div className="hidden sm:block">
            <h2 className="text-foreground text-xl font-bold">BISA</h2>
            <p className="text-muted-foreground text-xs">Bantuan Inklusif & Sasaran Akurat</p>
          </div>
        </div>{' '}
        <div className="flex items-center gap-6">
          <nav className="hidden items-center gap-6 md:flex lg:gap-8">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                onClick={(e) => handleSmoothScroll(e, item.href)}
                className="group text-foreground relative text-sm font-medium whitespace-nowrap transition-colors duration-200 hover:text-[#3E9EDB]">
                {item.name}
                <span className="absolute -bottom-1 left-0 h-0.5 w-0 bg-[#3E9EDB] transition-all duration-300 group-hover:w-full"></span>
              </Link>
            ))}
          </nav>

          {/* Desktop Auth Section */}
          <div className="hidden items-center gap-4 sm:flex">
            {!isMounted || isLoading ? (
              <div className="bg-muted h-10 w-20 animate-pulse rounded-lg"></div>
            ) : isLoggedIn ? (
              <div className="flex items-center gap-3">
                <div className="bg-muted flex items-center gap-2 rounded-lg px-3 py-2">
                  <User className="text-muted-foreground h-4 w-4" />
                  <span className="text-sm font-medium">{user?.fullName}</span>
                </div>
                <Button
                  onClick={handleLogout}
                  variant="outline"
                  className="rounded-lg border-[#3E9EDB] px-4 py-2 font-medium text-[#3E9EDB] transition-all duration-300 hover:bg-[#3E9EDB] hover:text-white">
                  Logout
                </Button>
              </div>
            ) : (
              <Link href="/login">
                <Button className="transform rounded-lg bg-[#3E9EDB] px-6 py-2 font-medium text-white shadow-md transition-all duration-300 hover:scale-105 hover:bg-[#2E7BC6] hover:shadow-lg">
                  Login
                </Button>
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="hover:bg-muted rounded-lg p-2 transition-colors md:hidden"
            aria-label="Toggle mobile menu">
            {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="border-border bg-background border-t shadow-lg md:hidden dark:shadow-none">
            <div className="container space-y-3 py-4">
              {navItems.map((item, index) => (
                <motion.div
                  key={item.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}>
                  <Link
                    href={item.href}
                    onClick={(e) => handleSmoothScroll(e, item.href)}
                    className="text-foreground hover:bg-muted block rounded-lg px-4 py-2 transition-colors hover:text-[#3E9EDB]">
                    {item.name}
                  </Link>
                </motion.div>
              ))}{' '}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: navItems.length * 0.1 }}
                className="border-border border-t pt-3">
                {!isMounted || isLoading ? (
                  <div className="bg-muted h-12 w-full animate-pulse rounded-lg"></div>
                ) : isLoggedIn ? (
                  <div className="space-y-3">
                    <div className="bg-muted flex items-center gap-2 rounded-lg px-4 py-2">
                      <User className="text-muted-foreground h-4 w-4" />
                      <span className="text-sm font-medium">{user?.fullName}</span>
                    </div>
                    <Button
                      onClick={() => {
                        handleLogout();
                        setIsMobileMenuOpen(false);
                      }}
                      variant="outline"
                      className="w-full rounded-lg border-[#3E9EDB] py-3 font-medium text-[#3E9EDB] transition-all duration-300 hover:bg-[#3E9EDB] hover:text-white">
                      Logout
                    </Button>
                  </div>
                ) : (
                  <Link href="/login" className="block">
                    <Button
                      className="w-full rounded-lg bg-[#3E9EDB] py-3 font-medium text-white shadow-md hover:bg-[#2E7BC6]"
                      onClick={() => setIsMobileMenuOpen(false)}>
                      Login
                    </Button>
                  </Link>
                )}
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
