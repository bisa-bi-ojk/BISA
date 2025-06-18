'use client';

import { Mail, ArrowLeft, Send } from "lucide-react"
import { useState } from "react"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("")
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Password reset request for:", email)
    setIsSubmitted(true)
    setTimeout(() => {
      alert("Link reset password telah dikirim ke email Anda!")
    }, 1000)
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
                Lupa Password?
              </h1>
              <p className="text-sm text-gray-500 max-w-[350px] [font-family:'Inter-Regular',Helvetica]">
                Jangan khawatir! Masukkan email Anda dan kami akan mengirimkan link untuk reset password
              </p>
            </div>
          </div>

          {!isSubmitted ? (
            <form onSubmit={handleSubmit} className="flex flex-col w-full max-w-[384px] gap-6">
              <div className="flex flex-col gap-2">
                <label
                  htmlFor="email"
                  className="font-medium text-sm text-gray-700 [font-family:'Inter-Medium',Helvetica]"
                >
                  Email
                </label>
                <div className="relative">
                  <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
                    <Mail className="w-5 h-5 text-gray-400" />
                  </div>
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-12 h-14 text-base [font-family:'Inter-Regular',Helvetica]"
                    placeholder="Masukkan email terdaftar"
                    required
                  />
                </div>
              </div>

              <Button 
                type="submit"
                className="w-full h-14 bg-[#3e9edb] hover:bg-[#3589c2] text-white rounded-lg shadow-[0px_4px_12px_#3e9edb40] flex items-center justify-center gap-2"
              >
                <Send className="w-5 h-5" />
                <span className="font-semibold text-base [font-family:'Inter-SemiBold',Helvetica]">
                  Kirim Link Reset
                </span>
              </Button>
            </form>
          ) : (
            <div className="flex flex-col w-full max-w-[384px] items-center gap-6">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                <Send className="w-8 h-8 text-green-600" />
              </div>
              <div className="text-center">
                <h3 className="font-semibold text-lg text-gray-900 mb-2">Email Terkirim!</h3>
                <p className="text-sm text-gray-500 [font-family:'Inter-Regular',Helvetica]">
                  Kami telah mengirimkan link reset password ke <strong>{email}</strong>. 
                  Silakan cek inbox atau folder spam Anda.
                </p>
              </div>
              <Button 
                onClick={() => setIsSubmitted(false)}
                variant="outline"
                className="w-full h-12"
              >
                Kirim Ulang
              </Button>
            </div>
          )}

          <div className="flex flex-col w-full max-w-[384px] items-center gap-4">
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-500 [font-family:'Inter-Regular',Helvetica]">
                Ingat password Anda?
              </span>
              <Link href="/login" className="font-medium text-sm text-[#3e9edb] hover:underline [font-family:'Inter-Medium',Helvetica]">
                Masuk sekarang
              </Link>
            </div>

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
