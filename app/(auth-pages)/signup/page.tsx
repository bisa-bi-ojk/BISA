'use client';

import { ArrowLeft, ShieldCheck } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

import { SignupForm } from '@/components/auth/signup-form';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { register } from '@/lib/api/auth';

export default function SignUpPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const router = useRouter();

  const handleSignUp = async (formData: {
    fullName: string;
    email: string;
    phone: string;
    password: string;
    confirmPassword: string;
  }) => {
    try {
      setIsLoading(true);
      setError('');
      setSuccess('');

      const response = await register({
        ...formData,
        role: 'admin',
      });

      console.log('Registration successful:', response);
      setSuccess(response.message);

      // Redirect to login page after successful registration
      setTimeout(() => {
        router.push('/login');
      }, 3000);
    } catch (error) {
      console.error('Signup error:', error);
      setError(error instanceof Error ? error.message : 'Terjadi kesalahan saat mendaftar');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-white bg-[linear-gradient(270deg,rgba(62,158,219,1)_0%,rgba(36,100,159,1)_100%)] p-8 md:p-20">
      <div className="absolute left-6 top-6">
        <Link href="/">
          <Button variant="ghost" className="gap-2 text-white hover:bg-white/20">
            <ArrowLeft className="h-4 w-4" />
            Kembali ke Beranda
          </Button>
        </Link>
      </div>

      <Card className="w-full max-w-[480px] rounded-2xl shadow-[0px_8px_32px_#00000020]">
        <CardContent className="flex flex-col items-center gap-8 p-8 md:p-12">
          <div className="flex w-full max-w-[384px] flex-col items-center gap-6">
            <div className="inline-flex items-center gap-4">
              <Image width={48} height={48} className="h-12 w-12 object-cover" alt="Logo" src="/Logo.png" />
            </div>

            <div className="flex flex-col items-center gap-3 text-center">
              <h1 className="text-[28px] font-semibold leading-[33.6px] text-gray-900">
                Daftar Akun BISA
              </h1>
              <p className="max-w-[350px] text-sm text-gray-500">
                Buat akun resmi untuk mengakses platform bantuan sosial pemerintah
              </p>
            </div>
          </div>

          <div className="w-full max-w-[384px]">
            <SignupForm
              onSubmit={handleSignUp}
              isLoading={isLoading}
              error={error}
              success={success}
            />
          </div>

          <div className="flex w-full max-w-[384px] flex-col items-center gap-4">
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-500">Sudah punya akun?</span>
              <Link href="/login" className="text-sm font-medium text-[#3e9edb] hover:underline">
                Masuk sekarang
              </Link>
            </div>

            <div className="flex w-full flex-col items-center gap-2 rounded-lg bg-slate-50 p-4">
              <div className="flex items-center gap-2">
                <ShieldCheck className="h-4 w-4 text-[#76bf62]" />
                <span className="text-xs font-medium text-[#76bf62]">Data Terlindungi</span>
              </div>
              <p className="w-full max-w-[320px] text-center text-[11px] text-gray-500">
                Akun Anda akan diverifikasi sesuai standar keamanan pemerintah
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
