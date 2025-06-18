'use client';

import { ArrowLeft, ShieldCheck } from "lucide-react"
import { useState } from "react"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { LoginForm } from "@/components/auth/login-form"

export default function LoginPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")

  const handleLogin = async (email: string, password: string) => {
    try {
      setIsLoading(true)
      setError("")
      
      await new Promise(resolve => setTimeout(resolve, 1500))
      
      if (email === "test@error.com") {
        throw new Error("Email atau password salah")
      }
      
      console.log("Login attempt with:", { email, password })
      alert("Login berhasil! Redirecting to dashboard...")
      
    } catch (error) {
      console.error("Login error:", error)
      setError(error instanceof Error ? error.message : "Terjadi kesalahan saat login")
    } finally {
      setIsLoading(false)
    }
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
            
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              Masuk ke Sistem BISA
            </h1>
            <p className="text-gray-600 text-sm leading-relaxed">
              Silakan masuk dengan akun resmi Anda untuk mengakses<br />
              dashboard bantuan sosial
            </p>
          </div>

          <div className="mb-6">
            <LoginForm 
              onSubmit={handleLogin}
              isLoading={isLoading}
              error={error}
            />
          </div>

          <div className="text-center mb-6">
            <Link 
              href="/forgot-password" 
              className="text-sm text-[#3e9edb] hover:text-[#24649f] font-medium transition-colors"
            >
              Lupa password?
            </Link>
          </div>

          <div className="flex items-center mb-6">
            <Separator className="flex-1" />
            <span className="px-4 text-xs text-gray-400">atau</span>
            <Separator className="flex-1" />
          </div>

          <Button
            variant="outline"
            className="w-full h-12 mb-6 border-gray-200 hover:bg-gray-50 transition-colors"
          >
            <div className="flex items-center justify-center w-6 h-6 bg-[#24649f] rounded-lg mr-3">
              <span className="text-white text-xs font-semibold">G</span>
            </div>
            <span className="text-gray-700 font-medium">
              Masuk dengan Akun Pemerintah
            </span>
          </Button>

          <div className="text-center space-y-4 mb-6">
            <div className="flex items-center justify-center gap-2 text-sm">
              <span className="text-gray-500">Belum punya akun?</span>
              <Link 
                href="/signup" 
                className="text-[#3e9edb] hover:text-[#24649f] font-medium transition-colors"
              >
                Daftar sekarang
              </Link>
            </div>

            <div className="flex items-center justify-center gap-2 text-xs">
              <span className="text-gray-500">Butuh bantuan?</span>
              <button className="text-[#3e9edb] hover:text-[#24649f] font-medium transition-colors">
                Hubungi Admin
              </button>
            </div>
          </div>

          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <div className="flex items-center justify-center gap-2 mb-2">
              <ShieldCheck className="w-4 h-4 text-green-600" />
              <span className="text-green-700 font-medium text-sm">
                Keamanan Terjamin
              </span>
            </div>
            <p className="text-center text-xs text-green-600 leading-relaxed">
              Data Anda dilindungi dengan enkripsi tingkat bank dan<br />
              standar keamanan pemerintah
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}