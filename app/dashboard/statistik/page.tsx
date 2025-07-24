'use client';

import { StatisticsCharts } from '@/components/dashboard/StatisticsCharts';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useAuth } from '@/hooks/use-auth';
import {
  ArrowLeft,
  BarChart3,
  Download,
  Filter,
  Target,
  TrendingDown,
  TrendingUp
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

interface StatisticData {
  id: string;
  program: string;
  period: string;
  totalRecipients: number;
  totalAmount: number;
  accuracy: number;
  trend: number;
  chartData: Array<{
    period: string;
    recipients: number;
    amount: number;
    accuracy: number;
  }>;
}

const mockStatisticsData: StatisticData[] = [
  {
    id: "stat-001",
    program: "PKH",
    period: "2025",
    totalRecipients: 15678,
    totalAmount: 11758500000,
    accuracy: 87.5,
    trend: 8.3,
    chartData: [
      { period: "Jan 2025", recipients: 14520, amount: 10890000000, accuracy: 85.2 },
      { period: "Feb 2025", recipients: 14789, amount: 11091750000, accuracy: 86.1 },
      { period: "Mar 2025", recipients: 15123, amount: 11342250000, accuracy: 86.8 },
      { period: "Apr 2025", recipients: 15456, amount: 11592000000, accuracy: 87.2 },
      { period: "Mei 2025", recipients: 15678, amount: 11758500000, accuracy: 87.5 },
      { period: "Jun 2025", recipients: 15890, amount: 11917500000, accuracy: 87.8 }
    ]
  },
  {
    id: "stat-002",
    program: "BPNT",
    period: "2025",
    totalRecipients: 23456,
    totalAmount: 4691200000,
    accuracy: 84.2,
    trend: 5.7,
    chartData: [
      { period: "Jan 2025", recipients: 22340, amount: 4468000000, accuracy: 82.1 },
      { period: "Feb 2025", recipients: 22567, amount: 4513400000, accuracy: 82.8 },
      { period: "Mar 2025", recipients: 22890, amount: 4578000000, accuracy: 83.4 },
      { period: "Apr 2025", recipients: 23145, amount: 4629000000, accuracy: 83.9 },
      { period: "Mei 2025", recipients: 23456, amount: 4691200000, accuracy: 84.2 },
      { period: "Jun 2025", recipients: 23678, amount: 4735600000, accuracy: 84.6 }
    ]
  },
  {
    id: "stat-003",
    program: "BST",
    period: "2025",
    totalRecipients: 12345,
    totalAmount: 3703500000,
    accuracy: 91.3,
    trend: -2.1,
    chartData: [
      { period: "Jan 2025", recipients: 12890, amount: 3867000000, accuracy: 90.1 },
      { period: "Feb 2025", recipients: 12756, amount: 3826800000, accuracy: 90.5 },
      { period: "Mar 2025", recipients: 12654, amount: 3796200000, accuracy: 90.8 },
      { period: "Apr 2025", recipients: 12523, amount: 3756900000, accuracy: 91.0 },
      { period: "Mei 2025", recipients: 12456, amount: 3736800000, accuracy: 91.2 },
      { period: "Jun 2025", recipients: 12345, amount: 3703500000, accuracy: 91.3 }
    ]
  },
  {
    id: "stat-004",
    program: "PIP",
    period: "2025",
    totalRecipients: 8976,
    totalAmount: 2692800000,
    accuracy: 89.7,
    trend: 12.4,
    chartData: [
      { period: "Jan 2025", recipients: 7890, amount: 2367000000, accuracy: 87.2 },
      { period: "Feb 2025", recipients: 8123, amount: 2436900000, accuracy: 87.9 },
      { period: "Mar 2025", recipients: 8345, amount: 2503500000, accuracy: 88.4 },
      { period: "Apr 2025", recipients: 8567, amount: 2570100000, accuracy: 88.9 },
      { period: "Mei 2025", recipients: 8789, amount: 2636700000, accuracy: 89.3 },
      { period: "Jun 2025", recipients: 8976, amount: 2692800000, accuracy: 89.7 }
    ]
  }
];

export default function StatistikPage() {
  const { user, isLoggedIn, isLoading } = useAuth();
  const router = useRouter();
  const [selectedProgram, setSelectedProgram] = useState<string>("all");
  const [selectedPeriod, setSelectedPeriod] = useState<string>("2025");
  const [sortBy, setSortBy] = useState<string>("recipients");
  const [sortOrder, setSortOrder] = useState<string>("desc");
  const [searchQuery, setSearchQuery] = useState<string>("");

  useEffect(() => {
    if (!isLoading && !isLoggedIn) {
      router.push('/login');
    }
  }, [isLoggedIn, isLoading, router]);

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
    return null;
  }

  let filteredData = mockStatisticsData;
  
  if (selectedProgram !== "all") {
    filteredData = filteredData.filter(item => item.program === selectedProgram);
  }
  
  if (searchQuery) {
    filteredData = filteredData.filter(item => 
      item.program.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }

  filteredData.sort((a, b) => {
    let aValue: number;
    let bValue: number;
    
    switch (sortBy) {
      case "recipients":
        aValue = a.totalRecipients;
        bValue = b.totalRecipients;
        break;
      case "amount":
        aValue = a.totalAmount;
        bValue = b.totalAmount;
        break;
      case "accuracy":
        aValue = a.accuracy;
        bValue = b.accuracy;
        break;
      case "trend":
        aValue = a.trend;
        bValue = b.trend;
        break;
      default:
        aValue = a.totalRecipients;
        bValue = b.totalRecipients;
    }
    
    return sortOrder === "desc" ? bValue - aValue : aValue - bValue;
  });

  const totalRecipients = filteredData.reduce((sum, item) => sum + item.totalRecipients, 0);
  const totalAmount = filteredData.reduce((sum, item) => sum + item.totalAmount, 0);
  const averageAccuracy = filteredData.reduce((sum, item) => sum + item.accuracy, 0) / filteredData.length;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center space-x-4">
              <Button 
                onClick={() => router.push('/dashboard')}
                variant="outline" 
                size="sm"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Kembali
              </Button>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Dashboard Statistik</h1>
                <p className="text-gray-600">Analisis data time-series dan perbandingan program bansos</p>
              </div>
            </div>
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 mr-2" />
              Export Data
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Filter className="h-5 w-5" />
              Filter & Pencarian
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
              <div>
                <label className="text-sm font-medium mb-2 block">Program</label>
                <Select value={selectedProgram} onValueChange={setSelectedProgram}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Semua Program</SelectItem>
                    <SelectItem value="PKH">PKH</SelectItem>
                    <SelectItem value="BPNT">BPNT</SelectItem>
                    <SelectItem value="BST">BST</SelectItem>
                    <SelectItem value="PIP">PIP</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">Periode</label>
                <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="2025">2025</SelectItem>
                    <SelectItem value="2024">2024</SelectItem>
                    <SelectItem value="2023">2023</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">Urutkan Berdasarkan</label>
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="recipients">Jumlah Penerima</SelectItem>
                    <SelectItem value="amount">Total Dana</SelectItem>
                    <SelectItem value="accuracy">Akurasi</SelectItem>
                    <SelectItem value="trend">Tren</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">Urutan</label>
                <Select value={sortOrder} onValueChange={setSortOrder}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="desc">Tertinggi ke Terendah</SelectItem>
                    <SelectItem value="asc">Terendah ke Tertinggi</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">Pencarian</label>
                <Input
                  placeholder="Cari program..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid gap-6 md:grid-cols-3 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Penerima</CardTitle>
              <Target className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalRecipients.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">
                Dari {filteredData.length} program aktif
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Dana</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                Rp {(totalAmount / 1000000000).toFixed(1)}B
              </div>
              <p className="text-xs text-muted-foreground">
                Miliar rupiah tersalurkan
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Rata-rata Akurasi</CardTitle>
              <BarChart3 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{averageAccuracy.toFixed(1)}%</div>
              <p className="text-xs text-muted-foreground">
                Tingkat akurasi program
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-6 lg:grid-cols-2 mb-8">
          <StatisticsCharts 
            data={filteredData} 
            chartType="line"
            title="Tren Penerima Bansos"
            dataKey="recipients"
          />
          <StatisticsCharts 
            data={filteredData} 
            chartType="bar"
            title="Perbandingan Total Dana"
            dataKey="amount"
          />
        </div>

        <div className="grid gap-6 lg:grid-cols-2 mb-8">
          <StatisticsCharts 
            data={filteredData} 
            chartType="line"
            title="Tren Akurasi Program"
            dataKey="accuracy"
          />
          <StatisticsCharts 
            data={filteredData} 
            chartType="bar"
            title="Perbandingan Jumlah Penerima"
            dataKey="recipients"
          />
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Detail Statistik Program</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-4">Program</th>
                    <th className="text-left py-3 px-4">Penerima</th>
                    <th className="text-left py-3 px-4">Total Dana</th>
                    <th className="text-left py-3 px-4">Akurasi</th>
                    <th className="text-left py-3 px-4">Tren</th>
                    <th className="text-left py-3 px-4">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredData.map((item) => (
                    <tr key={item.id} className="border-b hover:bg-gray-50">
                      <td className="py-3 px-4">
                        <div className="font-medium">{item.program}</div>
                        <div className="text-xs text-gray-500">{item.period}</div>
                      </td>
                      <td className="py-3 px-4">
                        {item.totalRecipients.toLocaleString()}
                      </td>
                      <td className="py-3 px-4">
                        Rp {(item.totalAmount / 1000000000).toFixed(2)}B
                      </td>
                      <td className="py-3 px-4">
                        <Badge variant={item.accuracy >= 85 ? "default" : "secondary"}>
                          {item.accuracy}%
                        </Badge>
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-1">
                          {item.trend > 0 ? (
                            <TrendingUp className="h-4 w-4 text-green-600" />
                          ) : (
                            <TrendingDown className="h-4 w-4 text-red-600" />
                          )}
                          <span className={item.trend > 0 ? "text-green-600" : "text-red-600"}>
                            {item.trend > 0 ? '+' : ''}{item.trend}%
                          </span>
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <Badge variant="outline">Aktif</Badge>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
