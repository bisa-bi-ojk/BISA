'use client';

import { ArrowLeft, CheckCircle } from "lucide-react"
import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ResetPasswordForm } from "@/components/auth/reset-password-form"
import { resetPassword } from "@/lib/api/auth"

export default function ResetPasswordPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")
  const [token, setToken] = useState("")
  const router = useRouter()
  const searchParams = useSearchParams()

  useEffect(() => {
    const urlToken = searchParams.get('token')
    if (urlToken) {
      setToken(urlToken)
    } else {
      setError("Token reset password tidak valid atau sudah kedaluwarsa")
    }
  }, [searchParams])

  const handleResetPassword = async (newPassword: string, confirmPassword: string) => {
    try {
      setIsLoading(true)
      setError("")
      setSuccess("")
      
      const response = await resetPassword({
        token,
        newPassword,
        confirmPassword
      })
      
      console.log("Password reset successful:", response)
      setSuccess(response.message)
      
      // Redirect to login page after successful reset
      setTimeout(() => {
        router.push('/login')
      }, 3000)
      
    } catch (error) {
      console.error("Reset password error:", error)
      setError(error instanceof Error ? error.message : "Terjadi kesalahan saat reset password")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-8 md:p-20 bg-white bg-[linear-gradient(270deg,rgba(62,158,219,1)_0%,rgba(36,100,159,1)_100%)]">
      <div className="absolute top-6 left-6">
        <Link href="/login">
          <Button variant="ghost" className="text-white hover:bg-white/20 gap-2">
            <ArrowLeft className="w-4 h-4" />
            Kembali ke Login
          </Button>
        </Link>
      </div>

      <Card className="w-full max-w-[480px] rounded-2xl shadow-[0px_8px_32px_#00000020]">
        <CardContent className="flex flex-col items-center gap-10 p-8 md:p-12">
          <div className="flex flex-col w-full max-w-[384px] items-center gap-6">
            <div className="inline-flex items-center gap-4">
              <img className="w-12 h-12 object-cover" alt="Logo" src="/Logo.png" />
            </div>            <div className="flex flex-col items-center gap-3 text-center">
              <h1 className="font-semibold text-gray-900 text-[28px] leading-[33.6px] [font-family:'Inter-SemiBold',Helvetica]">
                {success ? "Password Berhasil Direset!" : "Reset Password"}
              </h1>
              <p className="text-sm text-gray-500 max-w-[350px] [font-family:'Inter-Regular',Helvetica]">
                {success 
                  ? "Password Anda telah berhasil diubah. Anda akan diarahkan ke halaman login."
                  : "Masukkan password baru untuk akun Anda"
                }
              </p>
            </div>
          </div>          {!success ? (
            <div className="w-full max-w-[384px]">
              <ResetPasswordForm 
                onSubmit={handleResetPassword}
                isLoading={isLoading}
                error={error}
                success={success}
              />
            </div>
          ) : (
            <div className="flex flex-col w-full max-w-[384px] items-center gap-6">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                <CheckCircle className="w-8 h-8 text-green-600" />
              </div>
              <div className="text-center">
                <p className="text-sm text-gray-500 [font-family:'Inter-Regular',Helvetica]">
                  Password Anda telah berhasil diubah. Silakan login dengan password baru Anda.
                </p>
              </div>
              <Link href="/login" className="w-full">
                <Button className="w-full h-12 bg-[#3e9edb] hover:bg-[#3589c2]">
                  Lanjut ke Login
                </Button>
              </Link>
            </div>
          )}

          <div className="flex flex-col w-full max-w-[384px] items-center gap-4">
            <div className="flex items-center gap-6">
              <span className="text-xs text-gray-500 [font-family:'Inter-Regular',Helvetica]">Butuh bantuan?</span>
              <button className="font-medium text-xs text-[#3e9edb] hover:underline [font-family:'Inter-Medium',Helvetica]">
                Hubungi Admin
              </button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
