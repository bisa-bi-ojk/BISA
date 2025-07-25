'use client';

import { EyeOff, Lock, LogIn, Mail, Eye, AlertCircle } from 'lucide-react';
import { useState } from 'react';

import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { LoginFormProps } from '@/entity/loginformprops';

export function LoginForm({ onSubmit, isLoading = false, error }: LoginFormProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) {
      return 'Email harus diisi';
    }
    if (!emailRegex.test(email)) {
      return 'Format email tidak valid';
    }
    return '';
  };

  const validatePassword = (password: string) => {
    if (!password) {
      return 'Password harus diisi';
    }
    if (password.length < 6) {
      return 'Password minimal 6 karakter';
    }
    return '';
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setEmailError('');
    setPasswordError('');

    const emailValidation = validateEmail(email);
    const passwordValidation = validatePassword(password);

    if (emailValidation) {
      setEmailError(emailValidation);
    }
    if (passwordValidation) {
      setPasswordError(passwordValidation);
    }

    if (!emailValidation && !passwordValidation && onSubmit) {
      await onSubmit(email, password);
    }
  };
  return (
    <form onSubmit={handleSubmit} className="flex w-full flex-col gap-6">
      {error && (
        <div className="flex items-center gap-2 rounded-lg border border-red-200 bg-red-50 p-3">
          <AlertCircle className="h-5 w-5 text-red-500" />
          <span className="text-sm text-red-700">{error}</span>
        </div>
      )}

      <div className="flex flex-col gap-2">
        <label htmlFor="email" className="text-sm font-medium text-gray-700">
          Email
        </label>
        <div className="relative">
          <div className="absolute left-4 top-1/2 -translate-y-1/2 transform">
            <Mail className={`h-5 w-5 ${emailError ? 'text-red-500' : 'text-gray-400'}`} />
          </div>
          <Input
            id="email"
            type="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              if (emailError) setEmailError('');
            }}
            className={`h-14 pl-12 text-base ${emailError ? 'border-red-500 focus-visible:ring-red-500' : ''}`}
            placeholder="Masukkan email Anda"
            required
            disabled={isLoading}
          />
        </div>
        {emailError && <span className="text-sm text-red-500">{emailError}</span>}
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="password" className="text-sm font-medium text-gray-700">
          Password
        </label>
        <div className="relative">
          <div className="absolute left-4 top-1/2 -translate-y-1/2 transform">
            <Lock className={`h-5 w-5 ${passwordError ? 'text-red-500' : 'text-gray-400'}`} />
          </div>
          <Input
            id="password"
            type={showPassword ? 'text' : 'password'}
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              if (passwordError) setPasswordError('');
            }}
            className={`h-14 pl-12 pr-12 text-base ${passwordError ? 'border-red-500 focus-visible:ring-red-500' : ''}`}
            placeholder="Masukkan password Anda"
            required
            disabled={isLoading}
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-4 top-1/2 -translate-y-1/2 transform cursor-pointer"
            disabled={isLoading}>
            {showPassword ? (
              <Eye className="h-5 w-5 text-gray-400" />
            ) : (
              <EyeOff className="h-5 w-5 text-gray-400" />
            )}
          </button>
        </div>
        {passwordError && <span className="text-sm text-red-500">{passwordError}</span>}
      </div>

      <div className="flex items-center gap-2">
        <Checkbox id="remember" className="h-4 w-4 border-gray-300" disabled={isLoading} />
        <label htmlFor="remember" className="text-sm text-gray-500">
          Ingat saya
        </label>
      </div>

      <Button
        type="submit"
        className="flex h-14 w-full items-center justify-center gap-2 rounded-lg bg-[#3e9edb] text-white shadow-[0px_4px_12px_#3e9edb40] hover:bg-[#3589c2]"
        disabled={isLoading}>
        <LogIn className="h-5 w-5" />
        <span className="text-base font-semibold">
          {isLoading ? 'Masuk...' : 'Masuk ke Dashboard'}
        </span>
      </Button>
    </form>
  );
}
