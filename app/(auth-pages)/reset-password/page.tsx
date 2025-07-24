'use client';

import { ArrowLeft, CheckCircle } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { Suspense, useEffect, useState } from 'react';

import { ResetPasswordForm } from '@/components/auth/reset-password-form';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { resetPassword } from '@/lib/api/auth';

function ResetPasswordContent() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [token, setToken] = useState('');
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const urlToken = searchParams.get('token');
    if (urlToken) {
      setToken(urlToken);
    } else {
      setError('Token reset password tidak valid atau sudah kedaluwarsa');
    }
  }, [searchParams]);

  const handleResetPassword = async (newPassword: string, confirmPassword: string) => {
    try {
      setIsLoading(true);
      setError('');
      setSuccess('');

      const response = await resetPassword({
        token,
        newPassword,
        confirmPassword,
      });

      console.log('Password reset successful:', response);
      setSuccess(response.message);

      // Redirect to login page after successful reset
      setTimeout(() => {
        router.push('/login');
      }, 3000);
    } catch (error) {
      console.error('Reset password error:', error);
      setError(error instanceof Error ? error.message : 'Terjadi kesalahan saat reset password');
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
              <Image
                width={48}
                height={48}
                className="h-12 w-12 object-cover"
                alt="Logo"
                src="/logo.png"
              />
            </div>{' '}
            <div className="flex flex-col items-center gap-3 text-center">
              <h1 className="text-[28px] font-semibold leading-[33.6px] text-gray-900 [font-family:'Inter-SemiBold',Helvetica]">
                {success ? 'Password Berhasil Direset!' : 'Reset Password'}
              </h1>
              <p className="max-w-[350px] text-sm text-gray-500 [font-family:'Inter-Regular',Helvetica]">
                {success
                  ? 'Password Anda telah berhasil diubah. Anda akan diarahkan ke halaman login.'
                  : 'Masukkan password baru untuk akun Anda'}
              </p>
            </div>
          </div>{' '}
          {!success ? (
            <div className="w-full max-w-[384px]">
              <ResetPasswordForm
                onSubmit={handleResetPassword}
                isLoading={isLoading}
                error={error}
                success={success}
              />
            </div>
          ) : (
            <div className="flex w-full max-w-[384px] flex-col items-center gap-6">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
                <CheckCircle className="h-8 w-8 text-green-600" />
              </div>
              <div className="text-center">
                <p className="text-sm text-gray-500 [font-family:'Inter-Regular',Helvetica]">
                  Password Anda telah berhasil diubah. Silakan login dengan password baru Anda.
                </p>
              </div>
              <Link href="/login" className="w-full">
                <Button className="h-12 w-full bg-[#3e9edb] hover:bg-[#3589c2]">
                  Lanjut ke Login
                </Button>
              </Link>
            </div>
          )}
          <div className="flex w-full max-w-[384px] flex-col items-center gap-4">
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

function LoadingFallback() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-white bg-[linear-gradient(270deg,rgba(62,158,219,1)_0%,rgba(36,100,159,1)_100%)] p-8 md:p-20">
      <Card className="w-full max-w-[480px] rounded-2xl shadow-[0px_8px_32px_#00000020]">
        <CardContent className="flex flex-col items-center gap-10 p-8 md:p-12">
          <div className="mx-auto h-16 w-16 animate-spin rounded-full border-b-2 border-[#3e9edb]"></div>
          <h1 className="text-xl font-semibold text-gray-900">Memuat...</h1>
          <p className="text-gray-600">Mohon tunggu sebentar...</p>
        </CardContent>
      </Card>
    </div>
  );
}

export default function ResetPasswordPage() {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <ResetPasswordContent />
    </Suspense>
  );
}
