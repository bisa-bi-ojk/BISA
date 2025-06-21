'use client';

import { Mail, Send, AlertCircle } from "lucide-react"
import { useState } from "react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ForgotPasswordFormProps } from "@/entity/forgotpasswordprops"

export function ForgotPasswordForm({ onSubmit, isLoading = false, error, success }: ForgotPasswordFormProps) {
  const [email, setEmail] = useState("")
  const [emailError, setEmailError] = useState("")

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!email) {
      return "Email harus diisi"
    }
    if (!emailRegex.test(email)) {
      return "Format email tidak valid"
    }
    return ""
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    setEmailError("")
    
    const emailValidation = validateEmail(email)
    if (emailValidation) {
      setEmailError(emailValidation)
      return
    }
    
    if (onSubmit) {
      await onSubmit(email)
    }
  }
  return (
    <form onSubmit={handleSubmit} className="flex flex-col w-full gap-6">
      {error && (
        <div className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded-lg">
          <AlertCircle className="w-5 h-5 text-red-500" />
          <span className="text-sm text-red-700">{error}</span>
        </div>
      )}

      {success && (
        <div className="flex items-center gap-2 p-3 bg-green-50 border border-green-200 rounded-lg">
          <div className="w-5 h-5 text-green-500">
            <svg viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
          </div>
          <span className="text-sm text-green-700">{success}</span>
        </div>
      )}

      <div className="flex flex-col gap-2">
        <label
          htmlFor="email"
          className="font-medium text-sm text-gray-700"
        >
          Email
        </label>        <div className="relative">
          <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
            <Mail className={`w-5 h-5 ${emailError ? 'text-red-500' : 'text-gray-400'}`} />
          </div>
          <Input
            id="email"
            type="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value)
              if (emailError) setEmailError("")
            }}
            className={`pl-12 h-14 text-base ${emailError ? 'border-red-500 focus-visible:ring-red-500' : ''}`}
            placeholder="Masukkan email terdaftar"
            required
            disabled={isLoading}
          />
        </div>
        {emailError && (
          <span className="text-sm text-red-600">{emailError}</span>
        )}
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
