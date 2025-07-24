import { Navbar } from '@/components/navbar';
import { Toaster } from '@/components/ui/sonner';
import { AuthProvider } from '@/hooks/use-auth';
import { cn } from '@/lib/utils';
import type { Metadata } from 'next';
import { Montserrat, Poppins } from 'next/font/google';
import './globals.css';

const fontSans = Poppins({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-sans',
});

const fontHeading = Montserrat({
  subsets: ['latin'],
  weight: ['600', '700', '800'],
  variable: '--font-heading',
});

export const metadata: Metadata = {
  title: 'BISA - Bantuan Inklusif & Sasaran Akurat | Platform AI Distribusi Bantuan',
  description:
    'BISA adalah platform AI untuk distribusi bantuan sosial yang adil, inklusif, dan tepat sasaran. Tingkatkan transparansi dan akurasi penyaluran bantuan pemerintah.',
  metadataBase: new URL('https://bisa.fly.dev'),
  applicationName: 'BISA',
  authors: [{ name: 'Tim BISA', url: 'https://bisa.fly.dev' }],
  keywords: [
    'bantuan sosial',
    'AI targeting',
    'inclusif',
    'tepat sasaran',
    'distribusi bantuan',
    'transparansi',
    'BISA platform',
  ],
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: ['/favicon-32x32.png', '/favicon-16x16.png'],
    apple: '/apple-touch-icon.png',
    shortcut: '/favicon-32x32.png',
    other: [{ rel: 'manifest', url: '/site.webmanifest' }],
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://bisa.fly.dev',
    title: 'BISA - Bantuan Inklusif & Sasaran Akurat',
    description:
      'Platform AI terdepan untuk distribusi bantuan sosial yang adil dan akurat. Ciptakan perubahan positif dengan BISA.',
    siteName: 'BISA',
    images: [
      {
        url: 'https://bisa.fly.dev/bisa-og.png',
        width: 1200,
        height: 630,
        alt: 'BISA - Bantuan Inklusif & Sasaran Akurat Open Graph Image',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'BISA - Bantuan Inklusif & Sasaran Akurat',
    description:
      'BISA adalah platform AI untuk distribusi bantuan sosial yang adil, inklusif, dan tepat sasaran.',
    site: '@BISA_official',
    creator: '@BISA_official',
    images: ['https://bisa.fly.dev/bisa-og.png'],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        suppressHydrationWarning
        className={cn(
          'min-h-screen bg-background font-sans antialiased',
          fontSans.variable,
          fontHeading.variable,
        )}>
        <AuthProvider>
          <Navbar />
          {children}
          <Toaster />
        </AuthProvider>
      </body>
    </html>
  );
}
