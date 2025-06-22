'use client';

import { useAuth } from '@/hooks/use-auth';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { 
  User, 
  LogOut, 
  Map, 
  BarChart3, 
  MessageSquare, 
  Users, 
  TrendingUp, 
  MapPin,
  Settings,
  Home,
  FileText,
  Bell
} from 'lucide-react';
import { InteractiveMap } from '@/components/dashboard/InteractiveMap';
import { ChatbotInterface } from '@/components/dashboard/ChatbotInterface';
import { StatisticsTab } from '@/components/dashboard/StatisticsTab';
import { dashboardStats } from '@/lib/constants/dashboard/dashboardData';

export default function DashboardPage() {
  const { user, isLoggedIn, logout, isLoading } = useAuth();
  const router = useRouter();
  const [selectedRegion, setSelectedRegion] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState('overview');

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
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Dashboard BISA</h1>
              <p className="text-gray-600">Sistem Bantuan Inklusif & Sasaran Akurat</p>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="outline" size="sm">
                <Bell className="h-4 w-4 mr-2" />
                Notifikasi
              </Button>
              <Button 
                onClick={navigateToProfile}
                variant="outline" 
                size="sm"
              >
                <User className="h-4 w-4 mr-2" />
                Profil
              </Button>
              <Button 
                onClick={handleLogout}
                variant="destructive" 
                size="sm"
              >
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview" className="flex items-center gap-2">
              <Home className="h-4 w-4" />
              Overview
            </TabsTrigger>
            <TabsTrigger value="map" className="flex items-center gap-2">
              <Map className="h-4 w-4" />
              Peta Regional
            </TabsTrigger>
            <TabsTrigger value="stats" className="flex items-center gap-2">
              <BarChart3 className="h-4 w-4" />
              Statistik
            </TabsTrigger>
            <TabsTrigger value="chatbot" className="flex items-center gap-2">
              <MessageSquare className="h-4 w-4" />
              AI Assistant
            </TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            {/* Stats Cards */}
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Penerima</CardTitle>
                  <Users className="h-4 w-4 text-muted-foreground" />                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{dashboardStats.totalRecipients.value.toLocaleString()}</div>
                  <p className="text-xs text-muted-foreground">
                    +{dashboardStats.totalRecipients.change}% dari {dashboardStats.totalRecipients.period}
                  </p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Dana Tersalurkan</CardTitle>
                  <TrendingUp className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">Rp {dashboardStats.fundsDistributed.value}{dashboardStats.fundsDistributed.currency}</div>
                  <p className="text-xs text-muted-foreground">
                    +{dashboardStats.fundsDistributed.change}% dari {dashboardStats.fundsDistributed.period}
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Wilayah Tercakup</CardTitle>
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{dashboardStats.regionsCovered.value}</div>
                  <p className="text-xs text-muted-foreground">
                    {dashboardStats.regionsCovered.label}
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Tingkat Akurasi</CardTitle>
                  <BarChart3 className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{dashboardStats.accuracy.value}%</div>
                  <p className="text-xs text-muted-foreground">
                    {dashboardStats.accuracy.label}
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* User Profile Card */}
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
                      <p className="text-sm text-gray-600">Role</p>
                      <Badge variant="secondary" className="capitalize">
                        {user?.role}
                      </Badge>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Status Email</p>
                      <Badge variant={user?.emailVerified ? "default" : "destructive"}>
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
                    variant="outline"
                  >
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
          </TabsContent>          {/* Map Tab */}
          <TabsContent value="map" className="space-y-6">
            <InteractiveMap
              selectedRegion={selectedRegion}
              onRegionSelect={setSelectedRegion}
            />
          </TabsContent>          {/* Statistics Tab */}
          <TabsContent value="stats" className="space-y-6">
            <StatisticsTab selectedRegion={selectedRegion} />
          </TabsContent>{/* Chatbot Tab */}
          <TabsContent value="chatbot" className="space-y-6">
            <ChatbotInterface selectedRegion={selectedRegion} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
