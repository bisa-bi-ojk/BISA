'use client';

import { EyeOff, Lock, Eye, ArrowLeft, CheckCircle } from "lucide-react"
import { useState } from "react"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"

export default function ResetPasswordPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: ""
  })

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (formData.password !== formData.confirmPassword) {
      alert("Password tidak cocok!")
      return
    }
    
    if (formData.password.length < 8) {
      alert("Password harus minimal 8 karakter!")
      return
    }

    console.log("Password reset with:", formData.password)
    setIsSuccess(true)
    
    setTimeout(() => {
      window.location.href = "/login"
    }, 3000)
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
            </div>

            <div className="flex flex-col items-center gap-3 text-center">
              <h1 className="font-semibold text-gray-900 text-[28px] leading-[33.6px] [font-family:'Inter-SemiBold',Helvetica]">
                {isSuccess ? "Password Berhasil Direset!" : "Reset Password"}
              </h1>
              <p className="text-sm text-gray-500 max-w-[350px] [font-family:'Inter-Regular',Helvetica]">
                {isSuccess 
                  ? "Password Anda telah berhasil diubah. Anda akan diarahkan ke halaman login."
                  : "Masukkan password baru untuk akun Anda"
                }
              </p>
            </div>
          </div>

          {!isSuccess ? (
            <form onSubmit={handleSubmit} className="flex flex-col w-full max-w-[384px] gap-6">
              <div className="flex flex-col gap-2">
                <label
                  htmlFor="password"
                  className="font-medium text-sm text-gray-700 [font-family:'Inter-Medium',Helvetica]"
                >
                  Password Baru
                </label>
                <div className="relative">
                  <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
                    <Lock className="w-5 h-5 text-gray-400" />
                  </div>
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={formData.password}
                    onChange={(e) => handleInputChange("password", e.target.value)}
                    className="pl-12 pr-12 h-14 text-base [font-family:'Inter-Regular',Helvetica]"
                    placeholder="Minimal 8 karakter"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 cursor-pointer"
                  >
                    {showPassword ? (
                      <Eye className="w-5 h-5 text-gray-400" />
                    ) : (
                      <EyeOff className="w-5 h-5 text-gray-400" />
                    )}
                  </button>
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <label
                  htmlFor="confirmPassword"
                  className="font-medium text-sm text-gray-700 [font-family:'Inter-Medium',Helvetica]"
                >
                  Konfirmasi Password Baru
                </label>
                <div className="relative">
                  <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
                    <Lock className="w-5 h-5 text-gray-400" />
                  </div>
                  <Input
                    id="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    value={formData.confirmPassword}
                    onChange={(e) => handleInputChange("confirmPassword", e.target.value)}
                    className="pl-12 pr-12 h-14 text-base [font-family:'Inter-Regular',Helvetica]"
                    placeholder="Ulangi password baru"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 cursor-pointer"
                  >
                    {showConfirmPassword ? (
                      <Eye className="w-5 h-5 text-gray-400" />
                    ) : (
                      <EyeOff className="w-5 h-5 text-gray-400" />
                    )}
                  </button>
                </div>
              </div>

              <div className="flex flex-col gap-2 p-4 bg-gray-50 rounded-lg">
                <p className="text-sm font-medium text-gray-700 [font-family:'Inter-Medium',Helvetica]">
                  Password harus memenuhi:
                </p>
                <ul className="text-xs text-gray-500 space-y-1 [font-family:'Inter-Regular',Helvetica]">
                  <li className={formData.password.length >= 8 ? "text-green-600" : ""}>
                    • Minimal 8 karakter
                  </li>
                  <li className={/[A-Z]/.test(formData.password) ? "text-green-600" : ""}>
                    • Mengandung huruf besar
                  </li>
                  <li className={/[a-z]/.test(formData.password) ? "text-green-600" : ""}>
                    • Mengandung huruf kecil
                  </li>
                  <li className={/\d/.test(formData.password) ? "text-green-600" : ""}>
                    • Mengandung angka
                  </li>
                </ul>
              </div>

              <Button 
                type="submit"
                className="w-full h-14 bg-[#3e9edb] hover:bg-[#3589c2] text-white rounded-lg shadow-[0px_4px_12px_#3e9edb40] flex items-center justify-center gap-2"
              >
                <Lock className="w-5 h-5" />
                <span className="font-semibold text-base [font-family:'Inter-SemiBold',Helvetica]">
                  Reset Password
                </span>
              </Button>
            </form>
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
