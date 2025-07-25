'use client';

import { AlertCircle, Eye, EyeOff, Lock } from 'lucide-react';
import { useState } from 'react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ResetPasswordFormProps } from '@/entity/resetpassword';

export function ResetPasswordForm({
  onSubmit,
  isLoading = false,
  error,
  success,
}: ResetPasswordFormProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    password: '',
    confirmPassword: '',
  });

  const [errors, setErrors] = useState({
    password: '',
    confirmPassword: '',
  });

  const validateForm = () => {
    const newErrors = {
      password: '',
      confirmPassword: '',
    };

    if (!formData.password) {
      newErrors.password = 'Password harus diisi';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password minimal 8 karakter';
    } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(formData.password)) {
      newErrors.password = 'Password harus mengandung huruf besar, kecil, dan angka';
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Konfirmasi password harus diisi';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Password tidak cocok';
    }

    setErrors(newErrors);
    return !Object.values(newErrors).some((error) => error !== '');
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));

    if (errors[field as keyof typeof errors]) {
      setErrors((prev) => ({ ...prev, [field]: '' }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (validateForm() && onSubmit) {
      await onSubmit(formData.password, formData.confirmPassword);
    }
  };
  return (
    <div className="flex w-full flex-col gap-6">
      {error && (
        <div className="flex items-center gap-2 rounded-lg border border-red-200 bg-red-50 p-3">
          <AlertCircle className="h-5 w-5 text-red-500" />
          <span className="text-sm text-red-700">{error}</span>
        </div>
      )}

      {success && (
        <div className="flex items-center gap-2 rounded-lg border border-green-200 bg-green-50 p-3">
          <div className="h-5 w-5 text-green-500">
            <svg viewBox="0 0 20 20" fill="currentColor">
              <path
                fillRule="evenodd"
                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <span className="text-sm text-green-700">{success}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="flex w-full flex-col gap-6">
        <div className="flex flex-col gap-2">
          <label htmlFor="password" className="text-sm font-medium text-gray-700">
            Password Baru
          </label>{' '}
          <div className="relative">
            <div className="absolute top-1/2 left-4 -translate-y-1/2 transform">
              <Lock className={`h-5 w-5 ${errors.password ? 'text-red-500' : 'text-gray-400'}`} />
            </div>
            <Input
              id="password"
              type={showPassword ? 'text' : 'password'}
              value={formData.password}
              onChange={(e) => handleInputChange('password', e.target.value)}
              className={`h-14 pr-12 pl-12 text-base ${errors.password ? 'border-red-500 focus-visible:ring-red-500' : ''}`}
              placeholder="Minimal 8 karakter"
              required
              disabled={isLoading}
            />
            {errors.password && (
              <span className="mt-1 text-sm text-red-600">{errors.password}</span>
            )}
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute top-1/2 right-4 -translate-y-1/2 transform cursor-pointer"
              disabled={isLoading}>
              {showPassword ? (
                <Eye className="h-5 w-5 text-gray-400" />
              ) : (
                <EyeOff className="h-5 w-5 text-gray-400" />
              )}
            </button>
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="confirmPassword" className="text-sm font-medium text-gray-700">
            Konfirmasi Password Baru
          </label>{' '}
          <div className="relative">
            <div className="absolute top-1/2 left-4 -translate-y-1/2 transform">
              <Lock
                className={`h-5 w-5 ${errors.confirmPassword ? 'text-red-500' : 'text-gray-400'}`}
              />
            </div>
            <Input
              id="confirmPassword"
              type={showConfirmPassword ? 'text' : 'password'}
              value={formData.confirmPassword}
              onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
              className={`h-14 pr-12 pl-12 text-base ${errors.confirmPassword ? 'border-red-500 focus-visible:ring-red-500' : ''}`}
              placeholder="Ulangi password baru"
              required
              disabled={isLoading}
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute top-1/2 right-4 -translate-y-1/2 transform cursor-pointer"
              disabled={isLoading}>
              {showConfirmPassword ? (
                <Eye className="h-5 w-5 text-gray-400" />
              ) : (
                <EyeOff className="h-5 w-5 text-gray-400" />
              )}
            </button>
          </div>
          {errors.confirmPassword && (
            <span className="mt-1 text-sm text-red-600">{errors.confirmPassword}</span>
          )}
        </div>

        <Button
          type="submit"
          className="flex h-14 w-full items-center justify-center gap-2 rounded-lg bg-[#3e9edb] text-white shadow-[0px_4px_12px_#3e9edb40] hover:bg-[#3589c2]"
          disabled={isLoading}>
          <Lock className="h-5 w-5" />
          <span className="text-base font-semibold">
            {isLoading ? 'Mereset...' : 'Reset Password'}
          </span>
        </Button>
      </form>

      <div className="flex flex-col gap-2 rounded-lg bg-gray-50 p-4">
        <p className="text-sm font-medium text-gray-700">Password harus memenuhi:</p>
        <ul className="space-y-1 text-xs text-gray-500">
          <li className={formData.password.length >= 8 ? 'text-green-600' : ''}>
            • Minimal 8 karakter
          </li>
          <li className={/[A-Z]/.test(formData.password) ? 'text-green-600' : ''}>
            • Mengandung huruf besar
          </li>
          <li className={/[a-z]/.test(formData.password) ? 'text-green-600' : ''}>
            • Mengandung huruf kecil
          </li>
          <li className={/\d/.test(formData.password) ? 'text-green-600' : ''}>
            • Mengandung angka
          </li>
        </ul>
      </div>
    </div>
  );
}
