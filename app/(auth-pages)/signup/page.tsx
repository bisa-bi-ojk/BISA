'use client';

import { ArrowLeft, ShieldCheck } from "lucide-react"
import { useState } from "react"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { SignupForm } from "@/components/auth/signup-form"

export default function SignUpPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")

  const handleSignUp = async (formData: {
    fullName: string
    email: string
    phone: string
    password: string
    confirmPassword: string
  }) => {
    try {
      setIsLoading(true)
      setError("")
      
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      if (formData.email === "test@exist.com") {
        throw new Error("Email sudah terdaftar")
      }
      
      console.log("Sign up attempt with:", formData)
      alert("Pendaftaran berhasil! Silakan check email untuk verifikasi.")
      
      
    } catch (error) {
      console.error("Signup error:", error)
      setError(error instanceof Error ? error.message : "Terjadi kesalahan saat mendaftar")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-8 md:p-20 bg-white bg-[linear-gradient(270deg,rgba(62,158,219,1)_0%,rgba(36,100,159,1)_100%)]">
      <div className="absolute top-6 left-6">
        <Link href="/">
          <Button variant="ghost" className="text-white hover:bg-white/20 gap-2">
            <ArrowLeft className="w-4 h-4" />
            Kembali ke Beranda
          </Button>
        </Link>
      </div>

      <Card className="w-full max-w-[480px] rounded-2xl shadow-[0px_8px_32px_#00000020]">
        <CardContent className="flex flex-col items-center gap-8 p-8 md:p-12">
          <div className="flex flex-col w-full max-w-[384px] items-center gap-6">
            <div className="inline-flex items-center gap-4">
              <img className="w-12 h-12 object-cover" alt="Logo" src="/Logo.png" />
            </div>

            <div className="flex flex-col items-center gap-3 text-center">
              <h1 className="font-semibold text-gray-900 text-[28px] leading-[33.6px]">
                Daftar Akun BISA
              </h1>
              <p className="text-sm text-gray-500 max-w-[350px]">
                Buat akun resmi untuk mengakses platform bantuan sosial pemerintah
              </p>
            </div>
          </div>

          <div className="w-full max-w-[384px]">
            <SignupForm 
              onSubmit={handleSignUp}
              isLoading={isLoading}
              error={error}
            />
          </div>

          <div className="flex flex-col w-full max-w-[384px] items-center gap-4">
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-500">
                Sudah punya akun?
              </span>
              <Link href="/login" className="font-medium text-sm text-[#3e9edb] hover:underline">
                Masuk sekarang
              </Link>
            </div>

            <div className="flex flex-col w-full p-4 bg-slate-50 rounded-lg items-center gap-2">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#76bf62]" />
                <span className="font-medium text-xs text-[#76bf62]">
                  Data Terlindungi
                </span>
              </div>
              <p className="w-full max-w-[320px] text-[11px] text-gray-500 text-center">
                Akun Anda akan diverifikasi sesuai standar keamanan pemerintah
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
