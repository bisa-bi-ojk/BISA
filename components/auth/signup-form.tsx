'use client';

import { AlertCircle, Eye, EyeOff, Lock, LogIn, Mail, Phone, User } from 'lucide-react';
import { useState } from 'react';

import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { SignupFormProps } from '@/entity/signupform';

export function SignupForm({ onSubmit, isLoading = false, error, success }: SignupFormProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
  });

  const [errors, setErrors] = useState({
    fullName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
  });

  const validateForm = () => {
    const newErrors = {
      fullName: '',
      email: '',
      phone: '',
      password: '',
      confirmPassword: '',
    };

    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Nama lengkap harus diisi';
    } else if (formData.fullName.trim().length < 2) {
      newErrors.fullName = 'Nama lengkap minimal 2 karakter';
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email) {
      newErrors.email = 'Email harus diisi';
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Format email tidak valid';
    }

    const phoneRegex = /^(\+62|62|0)[0-9]{9,13}$/;
    if (!formData.phone) {
      newErrors.phone = 'Nomor telepon harus diisi';
    } else if (!phoneRegex.test(formData.phone.replace(/\s/g, ''))) {
      newErrors.phone = 'Format nomor telepon tidak valid';
    }

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
      await onSubmit(formData);
    }
  };
  return (
    <form onSubmit={handleSubmit} className="flex w-full flex-col gap-5">
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

      <div className="flex flex-col gap-2">
        <label htmlFor="fullName" className="text-sm font-medium text-gray-700">
          Nama Lengkap
        </label>
        <div className="relative">
          <div className="absolute top-1/2 left-4 -translate-y-1/2 transform">
            <User className={`h-5 w-5 ${errors.fullName ? 'text-red-500' : 'text-gray-400'}`} />
          </div>
          <Input
            id="fullName"
            type="text"
            value={formData.fullName}
            onChange={(e) => handleInputChange('fullName', e.target.value)}
            className={`h-12 pl-12 text-base ${errors.fullName ? 'border-red-500 focus-visible:ring-red-500' : ''}`}
            placeholder="Masukkan nama lengkap"
            required
            disabled={isLoading}
          />
        </div>
        {errors.fullName && <span className="text-sm text-red-500">{errors.fullName}</span>}
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="email" className="text-sm font-medium text-gray-700">
          Email
        </label>
        <div className="relative">
          <div className="absolute top-1/2 left-4 -translate-y-1/2 transform">
            <Mail className={`h-5 w-5 ${errors.email ? 'text-red-500' : 'text-gray-400'}`} />
          </div>
          <Input
            id="email"
            type="email"
            value={formData.email}
            onChange={(e) => handleInputChange('email', e.target.value)}
            className={`h-12 pl-12 text-base ${errors.email ? 'border-red-500 focus-visible:ring-red-500' : ''}`}
            placeholder="Masukkan email resmi"
            required
            disabled={isLoading}
          />
        </div>
        {errors.email && <span className="text-sm text-red-500">{errors.email}</span>}
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="phone" className="text-sm font-medium text-gray-700">
          Nomor Telepon
        </label>
        <div className="relative">
          <div className="absolute top-1/2 left-4 -translate-y-1/2 transform">
            <Phone className={`h-5 w-5 ${errors.phone ? 'text-red-500' : 'text-gray-400'}`} />
          </div>
          <Input
            id="phone"
            type="tel"
            value={formData.phone}
            onChange={(e) => handleInputChange('phone', e.target.value)}
            className={`h-12 pl-12 text-base ${errors.phone ? 'border-red-500 focus-visible:ring-red-500' : ''}`}
            placeholder="08xxxxxxxxxx"
            required
            disabled={isLoading}
          />
        </div>
        {errors.phone && <span className="text-sm text-red-500">{errors.phone}</span>}
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="password" className="text-sm font-medium text-gray-700">
          Password
        </label>
        <div className="relative">
          <div className="absolute top-1/2 left-4 -translate-y-1/2 transform">
            <Lock className={`h-5 w-5 ${errors.password ? 'text-red-500' : 'text-gray-400'}`} />
          </div>
          <Input
            id="password"
            type={showPassword ? 'text' : 'password'}
            value={formData.password}
            onChange={(e) => handleInputChange('password', e.target.value)}
            className={`h-12 pr-12 pl-12 text-base ${errors.password ? 'border-red-500 focus-visible:ring-red-500' : ''}`}
            placeholder="Minimal 8 karakter"
            required
            disabled={isLoading}
          />
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
        {errors.password && <span className="text-sm text-red-500">{errors.password}</span>}
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="confirmPassword" className="text-sm font-medium text-gray-700">
          Konfirmasi Password
        </label>
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
            className={`h-12 pr-12 pl-12 text-base ${errors.confirmPassword ? 'border-red-500 focus-visible:ring-red-500' : ''}`}
            placeholder="Ulangi password"
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
          <span className="text-sm text-red-500">{errors.confirmPassword}</span>
        )}
      </div>

      <div className="flex items-start gap-3">
        <Checkbox
          id="terms"
          className="mt-1 h-4 w-4 border-gray-300"
          required
          disabled={isLoading}
        />
        <label htmlFor="terms" className="text-sm leading-relaxed text-gray-500">
          Saya setuju dengan{' '}
          <a href="/terms" className="text-[#3e9edb] hover:underline">
            Syarat & Ketentuan
          </a>{' '}
          dan{' '}
          <a href="/privacy" className="text-[#3e9edb] hover:underline">
            Kebijakan Privasi
          </a>
        </label>
      </div>

      <Button
        type="submit"
        className="mt-2 flex h-12 w-full items-center justify-center gap-2 rounded-lg bg-[#3e9edb] text-white shadow-[0px_4px_12px_#3e9edb40] hover:bg-[#3589c2]"
        disabled={isLoading}>
        <LogIn className="h-5 w-5" />
        <span className="text-base font-semibold">
          {isLoading ? 'Mendaftar...' : 'Daftar Akun'}
        </span>
      </Button>
    </form>
  );
}
