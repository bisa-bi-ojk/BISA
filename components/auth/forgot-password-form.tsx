'use client';

import { Mail, Send } from "lucide-react"
import { useState } from "react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ForgotPasswordFormProps } from "@/entity/forgotpasswordprops"

export function ForgotPasswordForm({ onSubmit, isLoading = false }: ForgotPasswordFormProps) {
  const [email, setEmail] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (onSubmit) {
      onSubmit(email)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col w-full gap-6">
      <div className="flex flex-col gap-2">
        <label
          htmlFor="email"
          className="font-medium text-sm text-gray-700"
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
            className="pl-12 h-14 text-base"
            placeholder="Masukkan email terdaftar"
            required
            disabled={isLoading}
          />
        </div>
      </div>

      <Button 
        type="submit"
        className="w-full h-14 bg-[#3e9edb] hover:bg-[#3589c2] text-white rounded-lg shadow-[0px_4px_12px_#3e9edb40] flex items-center justify-center gap-2"
        disabled={isLoading}
      >
        <Send className="w-5 h-5" />
        <span className="font-semibold text-base">
          {isLoading ? "Mengirim..." : "Kirim Link Reset"}
        </span>
      </Button>
    </form>
  )
}
