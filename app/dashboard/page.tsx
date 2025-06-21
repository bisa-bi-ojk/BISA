'use client';

import { useAuth } from '@/hooks/use-auth';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { User, LogOut } from 'lucide-react';

export default function DashboardPage() {
  const { user, isLoggedIn, logout, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !isLoggedIn) {
      router.push('/login');
    }
  }, [isLoggedIn, isLoading, router]);

  const handleLogout = async () => {
    try {
      await logout();
      router.push('/');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-[#3E9EDB] mx-auto"></div>
          <p className="mt-4 text-gray-600">Memuat...</p>
        </div>
      </div>
    );
  }

  if (!isLoggedIn) {
    return null; // Will redirect to login
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Dashboard BISA</h1>
          <p className="text-gray-600">Selamat datang di sistem bantuan sosial</p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Profil Pengguna</CardTitle>
              <User className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div>
                  <p className="text-sm text-gray-600">Nama Lengkap</p>
                  <p className="font-medium">{user?.fullName}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Email</p>
                  <p className="font-medium">{user?.email}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">No. Telepon</p>
                  <p className="font-medium">{user?.phone}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Role</p>
                  <p className="font-medium capitalize">{user?.role}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Status Email</p>
                  <p className={`font-medium ${user?.isEmailVerified ? 'text-green-600' : 'text-red-600'}`}>
                    {user?.isEmailVerified ? 'Terverifikasi' : 'Belum Terverifikasi'}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-sm font-medium">Aksi Cepat</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button className="w-full justify-start" variant="outline">
                Lihat Bantuan Tersedia
              </Button>
              <Button className="w-full justify-start" variant="outline">
                Ajukan Bantuan Baru
              </Button>
              <Button className="w-full justify-start" variant="outline">
                Riwayat Pengajuan
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-sm font-medium">Pengaturan</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button className="w-full justify-start" variant="outline">
                Edit Profil
              </Button>
              <Button className="w-full justify-start" variant="outline">
                Ubah Password
              </Button>
              <Button 
                onClick={handleLogout}
                className="w-full justify-start" 
                variant="destructive"
              >
                <LogOut className="mr-2 h-4 w-4" />
                Logout
              </Button>
            </CardContent>
          </Card>
        </div>

        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Informasi Sistem</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <h3 className="font-semibold mb-2">Tentang BISA</h3>
                <p className="text-sm text-gray-600">
                  Sistem Bantuan Inklusif & Sasaran Akurat (BISA) adalah platform digital 
                  yang membantu masyarakat mengakses berbagai program bantuan sosial pemerintah 
                  dengan mudah dan transparan.
                </p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Fitur Utama</h3>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Pendaftaran bantuan sosial online</li>
                  <li>• Verifikasi data otomatis</li>
                  <li>• Tracking status pengajuan</li>
                  <li>• Notifikasi real-time</li>
                  <li>• Dashboard monitoring</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
