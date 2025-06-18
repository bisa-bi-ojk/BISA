'use client';

import { EyeOff, Lock, Eye } from "lucide-react"
import { useState } from "react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ResetPasswordFormProps } from "@/entity/resetpassword";

export function ResetPasswordForm({ onSubmit, isLoading = false }: ResetPasswordFormProps) {
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: ""
  })

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (onSubmit) {
      onSubmit(formData.password, formData.confirmPassword)
    }
  }

  return (
    <div className="flex flex-col w-full gap-6">
      <form onSubmit={handleSubmit} className="flex flex-col w-full gap-6">
        <div className="flex flex-col gap-2">
          <label
            htmlFor="password"
            className="font-medium text-sm text-gray-700"
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
              className="pl-12 pr-12 h-14 text-base"
              placeholder="Minimal 8 karakter"
              required
              disabled={isLoading}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 cursor-pointer"
              disabled={isLoading}
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
            className="font-medium text-sm text-gray-700"
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
              className="pl-12 pr-12 h-14 text-base"
              placeholder="Ulangi password baru"
              required
              disabled={isLoading}
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 cursor-pointer"
              disabled={isLoading}
            >
              {showConfirmPassword ? (
                <Eye className="w-5 h-5 text-gray-400" />
              ) : (
                <EyeOff className="w-5 h-5 text-gray-400" />
              )}
            </button>
          </div>
        </div>

        <Button 
          type="submit"
          className="w-full h-14 bg-[#3e9edb] hover:bg-[#3589c2] text-white rounded-lg shadow-[0px_4px_12px_#3e9edb40] flex items-center justify-center gap-2"
          disabled={isLoading}
        >
          <Lock className="w-5 h-5" />
          <span className="font-semibold text-base">
            {isLoading ? "Mereset..." : "Reset Password"}
          </span>
        </Button>
      </form>

      <div className="flex flex-col gap-2 p-4 bg-gray-50 rounded-lg">
        <p className="text-sm font-medium text-gray-700">
          Password harus memenuhi:
        </p>
        <ul className="text-xs text-gray-500 space-y-1">
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
    </div>
  )
}
