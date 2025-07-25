'use client';

import { useAuth } from '@/hooks/use-auth';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  ArrowLeft,
  CreditCard,
  Smartphone,
  Building2,
  TrendingUp,
  Users,
  DollarSign,
  BarChart3,
  Wallet,
  Filter,
  Download,
} from 'lucide-react';
import { DigitalizationCharts } from '@/components/dashboard/DigitalizationCharts';

interface DigitalizationData {
  region: string;
  level: 'Kelurahan' | 'Kecamatan' | 'Kota' | 'Provinsi' | 'Nasional';
  totalRecipients: number;
  digitalizedRecipients: number;
  digitalizationRate: number;
  byWallet: {
    [key: string]: {
      recipients: number;
      amount: number;
      percentage: number;
    };
  };
  byProgram: {
    [key: string]: {
      total: number;
      digitalized: number;
      rate: number;
    };
  };
  trend: Array<{
    month: string;
    digitalized: number;
    rate: number;
  }>;
}

const mockDigitalizationData: DigitalizationData[] = [
  {
    region: 'DKI Jakarta',
    level: 'Provinsi',
    totalRecipients: 245670,
    digitalizedRecipients: 198540,
    digitalizationRate: 80.8,
    byWallet: {
      GoPay: { recipients: 89450, amount: 26835000000, percentage: 45.1 },
      OVO: { recipients: 67230, amount: 20169000000, percentage: 33.9 },
      DANA: { recipients: 34120, amount: 10236000000, percentage: 17.2 },
      ShopeePay: { recipients: 7740, amount: 2322000000, percentage: 3.9 },
    },
    byProgram: {
      PKH: { total: 89670, digitalized: 76320, rate: 85.1 },
      BPNT: { total: 123450, digitalized: 93860, rate: 76.0 },
      BST: { total: 67890, digitalized: 58720, rate: 86.5 },
      PIP: { total: 45230, digitalized: 39180, rate: 86.6 },
    },
    trend: [
      { month: 'Jan 2025', digitalized: 165420, rate: 67.3 },
      { month: 'Feb 2025', digitalized: 172340, rate: 70.1 },
      { month: 'Mar 2025', digitalized: 180220, rate: 73.4 },
      { month: 'Apr 2025', digitalized: 187890, rate: 76.5 },
      { month: 'Mei 2025', digitalized: 193450, rate: 78.8 },
      { month: 'Jun 2025', digitalized: 198540, rate: 80.8 },
    ],
  },
  {
    region: 'Jawa Barat',
    level: 'Provinsi',
    totalRecipients: 456780,
    digitalizedRecipients: 319146,
    digitalizationRate: 69.9,
    byWallet: {
      GoPay: { recipients: 127659, amount: 38297700000, percentage: 40.0 },
      OVO: { recipients: 111112, amount: 33333600000, percentage: 34.8 },
      DANA: { recipients: 63829, amount: 19148700000, percentage: 20.0 },
      ShopeePay: { recipients: 16546, amount: 4963800000, percentage: 5.2 },
    },
    byProgram: {
      PKH: { total: 167890, digitalized: 125918, rate: 75.0 },
      BPNT: { total: 234560, digitalized: 156514, rate: 66.7 },
      BST: { total: 123450, digitalized: 86415, rate: 70.0 },
      PIP: { total: 78690, digitalized: 62952, rate: 80.0 },
    },
    trend: [
      { month: 'Jan 2025', digitalized: 274084, rate: 60.0 },
      { month: 'Feb 2025', digitalized: 287612, rate: 63.0 },
      { month: 'Mar 2025', digitalized: 301140, rate: 65.9 },
      { month: 'Apr 2025', digitalized: 310041, rate: 67.9 },
      { month: 'Mei 2025', digitalized: 314668, rate: 68.9 },
      { month: 'Jun 2025', digitalized: 319146, rate: 69.9 },
    ],
  },
];

const walletProviders = [
  { id: 'all', name: 'Semua Wallet', icon: <Wallet className="h-4 w-4" /> },
  { id: 'GoPay', name: 'GoPay', icon: <Smartphone className="h-4 w-4" /> },
  { id: 'OVO', name: 'OVO', icon: <CreditCard className="h-4 w-4" /> },
  { id: 'DANA', name: 'DANA', icon: <Wallet className="h-4 w-4" /> },
  { id: 'ShopeePay', name: 'ShopeePay', icon: <Building2 className="h-4 w-4" /> },
];

export default function DigitalisasiBansosPage() {
  const { user, isLoggedIn, isLoading } = useAuth();
  const router = useRouter();
  const [selectedRegion, setSelectedRegion] = useState('DKI Jakarta');
  const [selectedWallet, setSelectedWallet] = useState('all');
  const [selectedLevel, setSelectedLevel] = useState('Provinsi');

  useEffect(() => {
    if (!isLoading && !isLoggedIn) {
      router.push('/login');
    }
  }, [isLoggedIn, isLoading, router]);

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

  const currentData = mockDigitalizationData.find((d) => d.region === selectedRegion);

  const getWalletData = () => {
    if (!currentData) return {};
    if (selectedWallet === 'all') return currentData.byWallet;
    return { [selectedWallet]: currentData.byWallet[selectedWallet] };
  };

  const walletData = getWalletData();
  const totalDigitalAmount = Object.values(walletData).reduce(
    (sum, wallet) => sum + wallet.amount,
    0,
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="border-b bg-white shadow-sm">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between py-6">
            <div className="flex items-center space-x-4">
              <Button onClick={() => router.push('/dashboard')} variant="outline" size="sm">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Kembali
              </Button>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Dashboard Digitalisasi Bansos</h1>
                <p className="text-gray-600">
                  Statistik penerima bansos yang telah terdigitalisasi per wallet
                </p>
              </div>
            </div>
            <Button variant="outline" size="sm">
              <Download className="mr-2 h-4 w-4" />
              Export Data
            </Button>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Filter className="h-5 w-5" />
              Filter Wilayah & Wallet
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-3">
              <div>
                <label className="mb-2 block text-sm font-medium">Wilayah</label>
                <Select value={selectedRegion} onValueChange={setSelectedRegion}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="DKI Jakarta">DKI Jakarta</SelectItem>
                    <SelectItem value="Jawa Barat">Jawa Barat</SelectItem>
                    <SelectItem value="Jawa Tengah">Jawa Tengah</SelectItem>
                    <SelectItem value="Jawa Timur">Jawa Timur</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium">Level Administrative</label>
                <Select value={selectedLevel} onValueChange={setSelectedLevel}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Nasional">Nasional</SelectItem>
                    <SelectItem value="Provinsi">Provinsi</SelectItem>
                    <SelectItem value="Kota">Kota/Kabupaten</SelectItem>
                    <SelectItem value="Kecamatan">Kecamatan</SelectItem>
                    <SelectItem value="Kelurahan">Kelurahan</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium">Penyedia Wallet</label>
                <Select value={selectedWallet} onValueChange={setSelectedWallet}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {walletProviders.map((provider) => (
                      <SelectItem key={provider.id} value={provider.id}>
                        <div className="flex items-center gap-2">
                          {provider.icon}
                          {provider.name}
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {currentData && (
          <>
            <div className="mb-8 grid gap-6 md:grid-cols-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Penerima</CardTitle>
                  <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {currentData.totalRecipients.toLocaleString()}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Penerima bansos di {currentData.region}
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Terdigitalisasi</CardTitle>
                  <Smartphone className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {currentData.digitalizedRecipients.toLocaleString()}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {currentData.digitalizationRate}% dari total penerima
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Dana Digital</CardTitle>
                  <DollarSign className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    Rp {(totalDigitalAmount / 1000000000).toFixed(1)}B
                  </div>
                  <p className="text-xs text-muted-foreground">Disalurkan melalui wallet digital</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Tingkat Digitalisasi</CardTitle>
                  <TrendingUp className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{currentData.digitalizationRate}%</div>
                  <p className="text-xs text-muted-foreground">Dari target 85% tahun 2025</p>
                </CardContent>
              </Card>
            </div>

            <div className="mb-8 grid gap-6 lg:grid-cols-2">
              <DigitalizationCharts
                data={currentData.trend}
                title="Tren Digitalisasi Bulanan"
                type="line"
              />
              <DigitalizationCharts
                data={Object.entries(walletData).map(([wallet, data]) => ({
                  wallet,
                  recipients: data.recipients,
                  percentage: data.percentage,
                }))}
                title={
                  selectedWallet === 'all' ? 'Distribusi per Wallet' : `Data ${selectedWallet}`
                }
                type="pie"
              />
            </div>

            <Card className="mb-8">
              <CardHeader>
                <CardTitle>Statistik per Penyedia Wallet</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                  {Object.entries(walletData).map(([wallet, data]) => (
                    <div key={wallet} className="rounded-lg border p-4">
                      <div className="mb-3 flex items-center gap-2">
                        <div className="rounded-lg bg-blue-50 p-2">
                          {walletProviders.find((p) => p.id === wallet)?.icon || (
                            <Wallet className="h-4 w-4" />
                          )}
                        </div>
                        <h3 className="font-medium">{wallet}</h3>
                      </div>

                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">Penerima</span>
                          <span className="font-medium">{data.recipients.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">Dana</span>
                          <span className="font-medium">
                            Rp {(data.amount / 1000000000).toFixed(1)}B
                          </span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">Persentase</span>
                          <Badge variant="outline">{data.percentage}%</Badge>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Digitalisasi per Program Bansos</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b">
                        <th className="px-4 py-3 text-left">Program</th>
                        <th className="px-4 py-3 text-left">Total Penerima</th>
                        <th className="px-4 py-3 text-left">Terdigitalisasi</th>
                        <th className="px-4 py-3 text-left">Tingkat Digitalisasi</th>
                        <th className="px-4 py-3 text-left">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {Object.entries(currentData.byProgram).map(([program, data]) => (
                        <tr key={program} className="border-b hover:bg-gray-50">
                          <td className="px-4 py-3 font-medium">{program}</td>
                          <td className="px-4 py-3">{data.total.toLocaleString()}</td>
                          <td className="px-4 py-3">{data.digitalized.toLocaleString()}</td>
                          <td className="px-4 py-3">
                            <div className="flex items-center gap-2">
                              <div className="h-2 flex-1 rounded-full bg-gray-200">
                                <div
                                  className="h-2 rounded-full bg-blue-600"
                                  style={{ width: `${data.rate}%` }}></div>
                              </div>
                              <span className="text-sm font-medium">{data.rate}%</span>
                            </div>
                          </td>
                          <td className="px-4 py-3">
                            <Badge
                              variant={
                                data.rate >= 80
                                  ? 'default'
                                  : data.rate >= 60
                                    ? 'secondary'
                                    : 'destructive'
                              }>
                              {data.rate >= 80
                                ? 'Target Tercapai'
                                : data.rate >= 60
                                  ? 'Dalam Progress'
                                  : 'Perlu Peningkatan'}
                            </Badge>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </>
        )}
      </div>
    </div>
  );
}
