'use client';

import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

import { ForgotPasswordForm } from '@/components/auth/forgot-password-form';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { forgotPassword } from '@/lib/api/auth';

export default function ForgotPasswordPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleForgotPassword = async (email: string) => {
    try {
      setIsLoading(true);
      setError('');
      setSuccess('');

      const response = await forgotPassword({ email });

      console.log('Password reset request successful:', response);
      setSuccess(response.message);
    } catch (error) {
      console.error('Forgot password error:', error);
      setError(
        error instanceof Error ? error.message : 'Terjadi kesalahan saat mengirim email reset',
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-white bg-[linear-gradient(270deg,rgba(62,158,219,1)_0%,rgba(36,100,159,1)_100%)] p-8 md:p-20">
      <div className="absolute left-6 top-6">
        <Link href="/login">
          <Button variant="ghost" className="gap-2 text-white hover:bg-white/20">
            <ArrowLeft className="h-4 w-4" />
            Kembali ke Login
          </Button>
        </Link>
      </div>

      <Card className="w-full max-w-[480px] rounded-2xl shadow-[0px_8px_32px_#00000020]">
        <CardContent className="flex flex-col items-center gap-10 p-8 md:p-12">
          <div className="flex w-full max-w-[384px] flex-col items-center gap-6">
            <div className="inline-flex items-center gap-4">
              <img className="h-12 w-12 object-cover" alt="Logo" src="/Logo.png" />
            </div>

            <div className="flex flex-col items-center gap-3 text-center">
              <h1 className="text-[28px] font-semibold leading-[33.6px] text-gray-900 [font-family:'Inter-SemiBold',Helvetica]">
                Lupa Password?
              </h1>
              <p className="max-w-[350px] text-sm text-gray-500 [font-family:'Inter-Regular',Helvetica]">
                Jangan khawatir! Masukkan email Anda dan kami akan mengirimkan link untuk reset
                password
              </p>
            </div>
          </div>{' '}
          <div className="w-full max-w-[384px]">
            <ForgotPasswordForm
              onSubmit={handleForgotPassword}
              isLoading={isLoading}
              error={error}
              success={success}
            />
          </div>
          <div className="flex w-full max-w-[384px] flex-col items-center gap-4">
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-500 [font-family:'Inter-Regular',Helvetica]">
                Ingat password Anda?
              </span>
              <Link
                href="/login"
                className="text-sm font-medium text-[#3e9edb] [font-family:'Inter-Medium',Helvetica] hover:underline">
                Masuk sekarang
              </Link>
            </div>

            <div className="flex items-center gap-6">
              <span className="text-xs text-gray-500 [font-family:'Inter-Regular',Helvetica]">
                Butuh bantuan?
              </span>
              <button className="text-xs font-medium text-[#3e9edb] [font-family:'Inter-Medium',Helvetica] hover:underline">
                Hubungi Admin
              </button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
