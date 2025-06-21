'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { CheckCircle, AlertCircle, ArrowLeft } from 'lucide-react';
import { verifyEmail } from '@/lib/api/auth';

export default function VerifyEmailPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const token = searchParams.get('token');
    
    if (!token) {
      setError('Token verifikasi tidak ditemukan');
      setIsLoading(false);
      return;
    }

    const handleVerification = async () => {
      try {
        const response = await verifyEmail(token);
        setIsSuccess(true);
        console.log('Email verification successful:', response);
        
        // Redirect to login after 3 seconds
        setTimeout(() => {
          router.push('/login');
        }, 3000);
        
      } catch (error) {
        console.error('Email verification error:', error);
        setError(error instanceof Error ? error.message : 'Terjadi kesalahan saat verifikasi email');
      } finally {
        setIsLoading(false);
      }
    };

    handleVerification();
  }, [searchParams, router]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#3e9edb] to-[#24649f] flex items-center justify-center p-4">
        <Card className="w-full max-w-md shadow-2xl border-0">
          <CardContent className="p-8 text-center">
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-[#3e9edb] mx-auto mb-4"></div>
            <h1 className="text-xl font-semibold text-gray-900 mb-2">Memverifikasi Email</h1>
            <p className="text-gray-600">Mohon tunggu sebentar...</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#3e9edb] to-[#24649f] flex items-center justify-center p-4">
      <div className="absolute top-6 left-6">
        <Link href="/">
          <Button variant="ghost" className="text-white hover:bg-white/20 transition-colors">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Kembali ke Beranda
          </Button>
        </Link>
      </div>

      <Card className="w-full max-w-md shadow-2xl border-0">
        <CardContent className="p-8">
          <div className="text-center mb-8">
            <div className="flex justify-center mb-6">
              <img 
                className="w-16 h-16 object-contain" 
                alt="BISA Logo" 
                src="/logo-bg-white.png" 
              />
            </div>
            
            <div className="mb-6">
              {isSuccess ? (
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="w-8 h-8 text-green-600" />
                </div>
              ) : (
                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <AlertCircle className="w-8 h-8 text-red-600" />
                </div>
              )}
            </div>

            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              {isSuccess ? 'Email Berhasil Diverifikasi!' : 'Verifikasi Gagal'}
            </h1>
            
            <p className="text-gray-600 text-sm leading-relaxed mb-6">
              {isSuccess 
                ? 'Selamat! Email Anda telah berhasil diverifikasi. Anda sekarang dapat masuk ke sistem BISA dengan akun Anda.'
                : error || 'Terjadi kesalahan saat memverifikasi email Anda. Link mungkin sudah kedaluwarsa atau tidak valid.'
              }
            </p>

            {isSuccess ? (
              <div className="space-y-3">
                <p className="text-sm text-gray-500">
                  Anda akan diarahkan ke halaman login dalam beberapa detik...
                </p>
                <Link href="/login">
                  <Button className="w-full bg-[#3e9edb] hover:bg-[#2e7bc6] text-white font-medium px-6 py-3 rounded-lg shadow-md hover:shadow-lg transition-all duration-300">
                    Lanjut ke Login
                  </Button>
                </Link>
              </div>
            ) : (
              <div className="space-y-3">
                <Link href="/signup">
                  <Button className="w-full bg-[#3e9edb] hover:bg-[#2e7bc6] text-white font-medium px-6 py-3 rounded-lg shadow-md hover:shadow-lg transition-all duration-300">
                    Daftar Ulang
                  </Button>
                </Link>
                <p className="text-xs text-gray-500">
                  Atau hubungi admin jika masalah berlanjut
                </p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
