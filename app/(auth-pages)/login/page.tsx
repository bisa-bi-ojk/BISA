'use client';

import { ArrowLeft, ShieldCheck } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

import { LoginForm } from '@/components/auth/login-form';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { useAuth } from '@/hooks/use-auth';
import { login } from '@/lib/api/auth';

export default function LoginPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();
  const { login: setAuthUser } = useAuth();

  const handleLogin = async (email: string, password: string) => {
    try {
      setIsLoading(true);
      setError('');

      const response = await login({ email, password });

      // Set user in context
      setAuthUser(response.user);

      console.log('Login successful:', response.user);

      // Redirect to dashboard or home page
      router.push('/dashboard'); // Change this to your desired redirect path
    } catch (error) {
      console.error('Login error:', error);
      setError(error instanceof Error ? error.message : 'Terjadi kesalahan saat login');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-[#3e9edb] to-[#24649f] p-4">
      <div className="absolute left-6 top-6">
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

            <h1 className="mb-2 text-2xl font-bold text-gray-900">Masuk ke Sistem BISA</h1>
            <p className="text-sm leading-relaxed text-gray-600">
              Silakan masuk dengan akun resmi Anda untuk mengakses
              <br />
              dashboard bantuan sosial
            </p>
          </div>

          <div className="mb-6">
            <LoginForm onSubmit={handleLogin} isLoading={isLoading} error={error} />
          </div>

          <div className="mb-6 text-center">
            <Link
              href="/forgot-password"
              className="text-sm font-medium text-[#3e9edb] transition-colors hover:text-[#24649f]">
              Lupa password?
            </Link>
          </div>

          <div className="mb-6 flex items-center">
            <Separator className="flex-1" />
            <span className="px-4 text-xs text-gray-400">atau</span>
            <Separator className="flex-1" />
          </div>

          <Button
            variant="outline"
            className="mb-6 h-12 w-full border-gray-200 transition-colors hover:bg-gray-50">
            <div className="mr-3 flex h-6 w-6 items-center justify-center rounded-lg bg-[#24649f]">
              <span className="text-xs font-semibold text-white">G</span>
            </div>
            <span className="font-medium text-gray-700">Masuk dengan Akun Pemerintah</span>
          </Button>

          <div className="mb-6 space-y-4 text-center">
            <div className="flex items-center justify-center gap-2 text-sm">
              <span className="text-gray-500">Belum punya akun?</span>
              <Link
                href="/signup"
                className="font-medium text-[#3e9edb] transition-colors hover:text-[#24649f]">
                Daftar sekarang
              </Link>
            </div>

            <div className="flex items-center justify-center gap-2 text-xs">
              <span className="text-gray-500">Butuh bantuan?</span>
              <button className="font-medium text-[#3e9edb] transition-colors hover:text-[#24649f]">
                Hubungi Admin
              </button>
            </div>
          </div>

          <div className="rounded-lg border border-green-200 bg-green-50 p-4">
            <div className="mb-2 flex items-center justify-center gap-2">
              <ShieldCheck className="h-4 w-4 text-green-600" />
              <span className="text-sm font-medium text-green-700">Keamanan Terjamin</span>
            </div>
            <p className="text-center text-xs leading-relaxed text-green-600">
              Data Anda dilindungi dengan enkripsi tingkat bank dan
              <br />
              standar keamanan pemerintah
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
