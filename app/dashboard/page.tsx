'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/hooks/use-auth';
import { dashboardStats } from '@/lib/constants/dashboard/dashboardData';
import {
  AlertTriangle,
  BarChart3,
  Bell,
  Bot,
  ChevronRight,
  FileText,
  Home,
  LogOut,
  MapPin,
  Settings,
  Smartphone,
  TrendingUp,
  User,
  Users,
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

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

  const navigateToProfile = () => {
    router.push('/dashboard/profile');
  };

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <div className="mx-auto h-32 w-32 animate-spin rounded-full border-b-2 border-[#3E9EDB]"></div>
          <p className="mt-4 text-gray-600">Memuat...</p>
        </div>
      </div>
    );
  }

  if (!isLoggedIn) {
    return null;
  }

  const dashboardFeatures = [
    {
      id: 'map-rumah',
      title: 'Peta Interaktif Per Rumah',
      description:
        'Visualisasi data keluarga dan individu per rumah tangga dengan detail klasifikasi bansos',
      icon: <Home className="h-6 w-6" />,
      color: 'bg-blue-50 border-blue-200 hover:bg-blue-100',
      route: '/dashboard/map-rumah',
      features: [
        'Metadata keluarga & individu',
        'Klasifikasi kelayakan per program',
        'Data real-time per rumah',
      ],
    },
    {
      id: 'map-kelurahan',
      title: 'Peta Interaktif Per Kelurahan',
      description:
        'Analisis wilayah dengan metadata kelurahan, indeks vegetasi, dan statistik bansos',
      icon: <MapPin className="h-6 w-6" />,
      color: 'bg-green-50 border-green-200 hover:bg-green-100',
      route: '/dashboard/map-kelurahan',
      features: ['Indeks vegetasi', 'Riwayat bencana', 'Statistik outcome bansos'],
    },
    {
      id: 'statistik',
      title: 'Dashboard Statistik',
      description: 'Analisis data time-series dan perbandingan dengan fitur sort dan filter',
      icon: <BarChart3 className="h-6 w-6" />,
      color: 'bg-purple-50 border-purple-200 hover:bg-purple-100',
      route: '/dashboard/statistik',
      features: ['Line plot time-series', 'Bar chart perbandingan', 'Filter dan sort data'],
    },
    {
      id: 'chatbot-predictive',
      title: 'AI Predictive Assistant',
      description: 'Sistem prediksi dan proyeksi untuk perencanaan strategis menggunakan AI',
      icon: <Bot className="h-6 w-6" />,
      color: 'bg-orange-50 border-orange-200 hover:bg-orange-100',
      route: '/dashboard/chatbot-predictive',
      features: ['Constrained predictive modeling', 'Forecast proyeksi', 'Analisis prediktif'],
    },
    {
      id: 'deteksi-anomali',
      title: 'Deteksi Anomali Penerima',
      description: 'Identifikasi penerima dengan pola tidak normal dan scoring risiko',
      icon: <AlertTriangle className="h-6 w-6" />,
      color: 'bg-red-50 border-red-200 hover:bg-red-100',
      route: '/dashboard/deteksi-anomali',
      features: [
        'Deteksi registrasi ganda',
        'Analisis nominal berlebih',
        'Scoring risiko otomatis',
      ],
    },
    {
      id: 'digitalisasi-bansos',
      title: 'Digitalisasi Bansos',
      description: 'Statistik penerima terdigitalisasi dengan filter berdasarkan penyedia wallet',
      icon: <Smartphone className="h-6 w-6" />,
      color: 'bg-indigo-50 border-indigo-200 hover:bg-indigo-100',
      route: '/dashboard/digitalisasi-bansos',
      features: ['Statistik per wallet', 'Filter multi-level', 'Tren digitalisasi'],
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="border-b bg-white shadow-sm">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between py-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Dashboard BISA</h1>
              <p className="text-gray-600">Sistem Bantuan Inklusif & Sasaran Akurat</p>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="outline" size="sm">
                <Bell className="mr-2 h-4 w-4" />
                Notifikasi
              </Button>
              <Button onClick={navigateToProfile} variant="outline" size="sm">
                <User className="mr-2 h-4 w-4" />
                Profil
              </Button>
              <Button onClick={handleLogout} variant="destructive" className="text-white" size="sm">
                <LogOut className="mr-2 h-4 w-4" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl space-y-8 px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Penerima</CardTitle>
              <Users className="text-muted-foreground h-4 w-4" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {dashboardStats.totalRecipients.value.toLocaleString()}
              </div>
              <p className="text-muted-foreground text-xs">
                +{dashboardStats.totalRecipients.change}% dari{' '}
                {dashboardStats.totalRecipients.period}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Dana Tersalurkan</CardTitle>
              <TrendingUp className="text-muted-foreground h-4 w-4" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                Rp {dashboardStats.fundsDistributed.value}
                {dashboardStats.fundsDistributed.currency}
              </div>
              <p className="text-muted-foreground text-xs">
                +{dashboardStats.fundsDistributed.change}% dari{' '}
                {dashboardStats.fundsDistributed.period}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Wilayah Tercakup</CardTitle>
              <MapPin className="text-muted-foreground h-4 w-4" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{dashboardStats.regionsCovered.value}</div>
              <p className="text-muted-foreground text-xs">{dashboardStats.regionsCovered.label}</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Tingkat Akurasi</CardTitle>
              <BarChart3 className="text-muted-foreground h-4 w-4" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{dashboardStats.accuracy.value}%</div>
              <p className="text-muted-foreground text-xs">{dashboardStats.accuracy.label}</p>
            </CardContent>
          </Card>
        </div>

        <div>
          <h2 className="mb-6 text-2xl font-bold text-gray-900">Fitur Dashboard</h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {dashboardFeatures.map((feature) => (
              <Card
                key={feature.id}
                className={`cursor-pointer transition-all duration-200 ${feature.color} hover:scale-105 hover:shadow-lg`}
                onClick={() => router.push(feature.route)}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="rounded-lg bg-white p-2 shadow-sm">{feature.icon}</div>
                      <div>
                        <CardTitle className="text-lg">{feature.title}</CardTitle>
                      </div>
                    </div>
                    <ChevronRight className="h-5 w-5 text-gray-400" />
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="mb-4 text-gray-600">{feature.description}</p>
                  <div className="space-y-2">
                    {feature.features.map((item, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <div className="h-1.5 w-1.5 rounded-full bg-blue-600"></div>
                        <span className="text-sm text-gray-600">{item}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* User Profile Section */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Profil Pengguna</CardTitle>
              <User className="text-muted-foreground h-4 w-4" />
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
                  <p className="text-sm text-gray-600">Role</p>
                  <Badge variant="secondary" className="capitalize">
                    {user?.role}
                  </Badge>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Status Email</p>
                  <Badge variant={user?.emailVerified ? 'default' : 'destructive'}>
                    {user?.emailVerified ? 'Terverifikasi' : 'Belum Terverifikasi'}
                  </Badge>
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
                <FileText className="mr-2 h-4 w-4" />
                Lihat Bantuan Tersedia
              </Button>
              <Button className="w-full justify-start" variant="outline">
                <Users className="mr-2 h-4 w-4" />
                Ajukan Bantuan Baru
              </Button>
              <Button className="w-full justify-start" variant="outline">
                <BarChart3 className="mr-2 h-4 w-4" />
                Riwayat Pengajuan
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-sm font-medium">Pengaturan</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button
                onClick={navigateToProfile}
                className="w-full justify-start"
                variant="outline">
                <User className="mr-2 h-4 w-4" />
                Edit Profil
              </Button>
              <Button className="w-full justify-start" variant="outline">
                <Settings className="mr-2 h-4 w-4" />
                Ubah Password
              </Button>
              <Button className="w-full justify-start" variant="outline">
                <Bell className="mr-2 h-4 w-4" />
                Notifikasi
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
