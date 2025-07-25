'use client';

import { useState } from 'react';
import { LogOut } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { LogoutButtonProps } from '@/entity/logoutbutton';

export default function LogoutButton({
  className = '',
  onLogout,
  variant = 'default',
  size = 'md',
}: LogoutButtonProps) {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleLogout = async () => {
    try {
      setIsLoading(true);

      if (onLogout) {
        await onLogout();
      } else {
        localStorage.removeItem('authToken');
        sessionStorage.removeItem('authToken');

        console.log('User logged out');
      }

      router.push('/');
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const getVariantClasses = () => {
    switch (variant) {
      case 'outline':
        return 'border border-gray-300 text-gray-700 hover:bg-gray-50';
      case 'ghost':
        return 'text-gray-700 hover:bg-gray-100';
      default:
        return 'bg-red-600 text-white hover:bg-red-700';
    }
  };

  const getSizeClasses = () => {
    switch (size) {
      case 'sm':
        return 'px-3 py-1.5 text-sm';
      case 'lg':
        return 'px-6 py-3 text-lg';
      default:
        return 'px-4 py-2';
    }
  };

  return (
    <button
      onClick={handleLogout}
      disabled={isLoading}
      className={`inline-flex items-center gap-2 rounded-md font-medium transition-colors duration-200 disabled:cursor-not-allowed disabled:opacity-50 ${getVariantClasses()} ${getSizeClasses()} ${className} `}>
      <LogOut className={`${size === 'sm' ? 'h-4 w-4' : size === 'lg' ? 'h-6 w-6' : 'h-5 w-5'}`} />
      {isLoading ? 'Logging out...' : 'Logout'}
    </button>
  );
}
