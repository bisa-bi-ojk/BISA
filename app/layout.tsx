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
  title: 'BISA - Platform AI Distribusi Bantuan Sosial Inklusif & Tepat Sasaran',
  description:
    'BISA memanfaatkan kecerdasan buatan untuk memastikan distribusi bantuan sosial yang adil, inklusif, dan tepat sasaran, sambil meningkatkan transparansi dan efektivitas penyaluran.',
  metadataBase: new URL('https://bisa.fly.dev'),
  applicationName: 'BISA',
  authors: [
    { name: 'Anthony Edbert Feriyanto', url: 'https://linkedin.com/in/anthony-edbert' },
    { name: 'Darren Aldrich', url: 'https://linkedin.com/in/dardrich' },
    { name: 'Kaindra Rizq Sachio', url: 'https://linkedin.com/in/kaindrars' },
    { name: 'Muhammad Fazil Tirtana', url: 'https://linkedin.com/in/faziltirtana' },
  ],
  keywords: [
    'bantuan sosial',
    'AI distribusi',
    'inklusif',
    'tepat sasaran',
    'transparansi',
    'efektivitas',
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
    locale: 'id_ID',
    url: 'https://bisa.fly.dev',
    title: 'BISA - Inklusif & Tepat Sasaran',
    description:
      'Platform AI terdepan untuk distribusi bantuan sosial yang adil, inklusif, dan efisien.',
    siteName: 'BISA',
    images: [
      {
        url: 'https://bisa.fly.dev/bisa-og.png',
        width: 1200,
        height: 630,
        alt: 'BISA - Bantuan Inklusif & Sasaran Akurat',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'BISA - Inklusif & Tepat Sasaran',
    description:
      'BISA memanfaatkan AI untuk distribusi bantuan sosial yang adil, inklusif, dan tepat sasaran.',
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
        className={cn(
          'bg-background min-h-screen font-sans antialiased',
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
