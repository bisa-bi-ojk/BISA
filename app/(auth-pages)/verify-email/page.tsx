'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { verifyEmail } from '@/lib/api/auth';
import { AlertCircle, ArrowLeft, CheckCircle } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { Suspense, useEffect, useState } from 'react';

function VerifyEmailContent() {
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

        setTimeout(() => {
          router.push('/login');
        }, 3000);
      } catch (error) {
        console.error('Email verification error:', error);
        setError(
          error instanceof Error ? error.message : 'Terjadi kesalahan saat verifikasi email',
        );
      } finally {
        setIsLoading(false);
      }
    };

    handleVerification();
  }, [searchParams, router]);

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-[#3e9edb] to-[#24649f] p-4">
        <Card className="w-full max-w-md border-0 shadow-2xl">
          <CardContent className="p-8 text-center">
            <div className="mx-auto mb-4 h-16 w-16 animate-spin rounded-full border-b-2 border-[#3e9edb]"></div>
            <h1 className="mb-2 text-xl font-semibold text-gray-900">Memverifikasi Email</h1>
            <p className="text-gray-600">Mohon tunggu sebentar...</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-[#3e9edb] to-[#24649f] p-4">
      <div className="absolute top-6 left-6">
        <Link href="/">
          <Button variant="ghost" className="text-white transition-colors hover:bg-white/20">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Kembali ke Beranda
          </Button>
        </Link>
      </div>

      <Card className="w-full max-w-md border-0 shadow-2xl">
        <CardContent className="p-8">
          <div className="mb-8 text-center">
            <div className="mb-6 flex justify-center">
              <Image
                width={64}
                height={64}
                className="h-16 w-16 object-contain"
                alt="Logo"
                src="/logo-white.png"
              />
            </div>

            <div className="mb-6">
              {isSuccess ? (
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
                  <CheckCircle className="h-8 w-8 text-green-600" />
                </div>
              ) : (
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-red-100">
                  <AlertCircle className="h-8 w-8 text-red-600" />
                </div>
              )}
            </div>

            <h1 className="mb-2 text-2xl font-bold text-gray-900">
              {isSuccess ? 'Email Berhasil Diverifikasi!' : 'Verifikasi Gagal'}
            </h1>

            <p className="mb-6 text-sm leading-relaxed text-gray-600">
              {isSuccess
                ? 'Selamat! Email Anda telah berhasil diverifikasi. Anda sekarang dapat masuk ke sistem BISA dengan akun Anda.'
                : error ||
                  'Terjadi kesalahan saat memverifikasi email Anda. Link mungkin sudah kedaluwarsa atau tidak valid.'}
            </p>

            {isSuccess ? (
              <div className="space-y-3">
                <p className="text-sm text-gray-500">
                  Anda akan diarahkan ke halaman login dalam beberapa detik...
                </p>
                <Link href="/login">
                  <Button className="w-full rounded-lg bg-[#3e9edb] px-6 py-3 font-medium text-white shadow-md transition-all duration-300 hover:bg-[#2e7bc6] hover:shadow-lg">
                    Lanjut ke Login
                  </Button>
                </Link>
              </div>
            ) : (
              <div className="space-y-3">
                <Link href="/signup">
                  <Button className="w-full rounded-lg bg-[#3e9edb] px-6 py-3 font-medium text-white shadow-md transition-all duration-300 hover:bg-[#2e7bc6] hover:shadow-lg">
                    Daftar Ulang
                  </Button>
                </Link>
                <p className="text-xs text-gray-500">Atau hubungi admin jika masalah berlanjut</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function LoadingFallback() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-[#3e9edb] to-[#24649f] p-4">
      <Card className="w-full max-w-md border-0 shadow-2xl">
        <CardContent className="p-8 text-center">
          <div className="mx-auto mb-4 h-16 w-16 animate-spin rounded-full border-b-2 border-[#3e9edb]"></div>
          <h1 className="mb-2 text-xl font-semibold text-gray-900">Memuat...</h1>
          <p className="text-gray-600">Mohon tunggu sebentar...</p>
        </CardContent>
      </Card>
    </div>
  );
}

export default function VerifyEmailPage() {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <VerifyEmailContent />
    </Suspense>
  );
}
