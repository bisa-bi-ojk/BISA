'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell, AreaChart, Area } from 'recharts';
import { TrendingUp, TrendingDown, BarChart3, Filter, Download, Calendar } from 'lucide-react';

interface StatisticsTabProps {
  selectedRegion?: string | null;
}

export function StatisticsTab({ selectedRegion }: StatisticsTabProps) {
  const [timeFilter, setTimeFilter] = useState('12months');
  const [metricFilter, setMetricFilter] = useState('all');

  // Sample data for charts
  const distributionData = [
    { month: 'Jan', bansos: 12.5, pkh: 8.2, bst: 6.1, kkp: 4.3 },
    { month: 'Feb', bansos: 13.2, pkh: 8.8, bst: 6.4, kkp: 4.7 },
    { month: 'Mar', bansos: 14.1, pkh: 9.2, bst: 6.8, kkp: 5.1 },
    { month: 'Apr', bansos: 15.3, pkh: 9.8, bst: 7.2, kkp: 5.4 },
    { month: 'May', bansos: 16.2, pkh: 10.4, bst: 7.6, kkp: 5.8 },
    { month: 'Jun', bansos: 17.1, pkh: 11.2, bst: 8.1, kkp: 6.2 },
    { month: 'Jul', bansos: 18.5, pkh: 11.8, bst: 8.4, kkp: 6.6 },
    { month: 'Aug', bansos: 19.2, pkh: 12.3, bst: 8.9, kkp: 7.1 },
    { month: 'Sep', bansos: 20.1, pkh: 12.8, bst: 9.2, kkp: 7.4 },
    { month: 'Oct', bansos: 21.3, pkh: 13.4, bst: 9.6, kkp: 7.8 },
    { month: 'Nov', bansos: 22.1, pkh: 14.1, bst: 10.2, kkp: 8.2 },
    { month: 'Dec', bansos: 23.5, pkh: 14.8, bst: 10.6, kkp: 8.7 }
  ];

  const regionData = [
    { region: 'Jawa Barat', recipients: 245, priority: 'Tinggi', color: '#ef4444' },
    { region: 'Jawa Timur', recipients: 198, priority: 'Sedang', color: '#f59e0b' },
    { region: 'Jawa Tengah', recipients: 176, priority: 'Sedang', color: '#f59e0b' },
    { region: 'Sumatera Utara', recipients: 142, priority: 'Tinggi', color: '#ef4444' },
    { region: 'DKI Jakarta', recipients: 89, priority: 'Rendah', color: '#10b981' },
    { region: 'Banten', recipients: 67, priority: 'Rendah', color: '#10b981' }
  ];

  const effectivenessData = [
    { period: 'Q1 2024', accuracy: 91.2, coverage: 87.5, satisfaction: 89.3 },
    { period: 'Q2 2024', accuracy: 92.8, coverage: 89.1, satisfaction: 90.7 },
    { period: 'Q3 2024', accuracy: 93.5, coverage: 90.4, satisfaction: 91.2 },
    { period: 'Q4 2024', accuracy: 94.2, coverage: 91.8, satisfaction: 92.1 }
  ];

  const budgetAllocation = [
    { name: 'Bantuan Sosial', value: 42.5, color: '#3b82f6' },
    { name: 'PKH', value: 28.3, color: '#10b981' },
    { name: 'BST', value: 18.7, color: '#f59e0b' },
    { name: 'KKP & Lainnya', value: 10.5, color: '#8b5cf6' }
  ];

  const impactMetrics = [
    { indicator: 'Tingkat Kemiskinan', baseline: 12.8, current: 11.2, target: 10.5, improvement: -1.6 },
    { indicator: 'Gini Ratio', baseline: 0.382, current: 0.371, target: 0.360, improvement: -0.011 },
    { indicator: 'IPM', baseline: 72.3, current: 73.8, target: 75.0, improvement: 1.5 },
    { indicator: 'Prevalensi Stunting', baseline: 24.4, current: 21.6, target: 19.0, improvement: -2.8 }
  ];

  return (
    <div className="space-y-6">
      {/* Filter Controls */}
      <div className="flex flex-wrap gap-4 p-4 bg-gray-50 rounded-lg">
        <div className="flex items-center gap-2">
          <Filter className="h-4 w-4 text-gray-500" />
          <span className="text-sm font-medium">Filter:</span>
        </div>
        
        <Select value={timeFilter} onValueChange={setTimeFilter}>
          <SelectTrigger className="w-40">
            <SelectValue placeholder="Periode waktu" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="3months">3 Bulan Terakhir</SelectItem>
            <SelectItem value="6months">6 Bulan Terakhir</SelectItem>
            <SelectItem value="12months">12 Bulan Terakhir</SelectItem>
            <SelectItem value="2years">2 Tahun Terakhir</SelectItem>
          </SelectContent>
        </Select>

        <Select value={metricFilter} onValueChange={setMetricFilter}>
          <SelectTrigger className="w-40">
            <SelectValue placeholder="Metrik" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Semua Program</SelectItem>
            <SelectItem value="bansos">Bantuan Sosial</SelectItem>
            <SelectItem value="pkh">PKH</SelectItem>
            <SelectItem value="bst">BST</SelectItem>
            <SelectItem value="kkp">KKP</SelectItem>
          </SelectContent>
        </Select>

        {selectedRegion && (
          <Badge variant="outline" className="flex items-center gap-1">
            <span>📍</span>
            {selectedRegion.replace('-', ' ').toUpperCase()}
          </Badge>
        )}

        <div className="ml-auto flex gap-2">
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-1" />
            Export Data
          </Button>
          <Button variant="outline" size="sm">
            <Calendar className="h-4 w-4 mr-1" />
            Laporan Bulanan
          </Button>
        </div>
      </div>

      {/* Key Performance Indicators */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Anggaran</p>
                <p className="text-2xl font-bold">Rp 45.2M</p>
                <div className="flex items-center gap-1 mt-1">
                  <TrendingUp className="h-3 w-3 text-green-500" />
                  <span className="text-xs text-green-600">+8.2% dari target</span>
                </div>
              </div>
              <div className="h-12 w-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <span className="text-xl">💰</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Penerima Aktif</p>
                <p className="text-2xl font-bold">2,459</p>
                <div className="flex items-center gap-1 mt-1">
                  <TrendingUp className="h-3 w-3 text-green-500" />
                  <span className="text-xs text-green-600">+12% bulan ini</span>
                </div>
              </div>
              <div className="h-12 w-12 bg-green-100 rounded-lg flex items-center justify-center">
                <span className="text-xl">👥</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Tingkat Akurasi</p>
                <p className="text-2xl font-bold">94.5%</p>
                <div className="flex items-center gap-1 mt-1">
                  <TrendingUp className="h-3 w-3 text-green-500" />
                  <span className="text-xs text-green-600">+2.1% dari bulan lalu</span>
                </div>
              </div>
              <div className="h-12 w-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <span className="text-xl">🎯</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Efisiensi Program</p>
                <p className="text-2xl font-bold">87.3%</p>
                <div className="flex items-center gap-1 mt-1">
                  <TrendingDown className="h-3 w-3 text-red-500" />
                  <span className="text-xs text-red-600">-1.2% dari target</span>
                </div>
              </div>
              <div className="h-12 w-12 bg-orange-100 rounded-lg flex items-center justify-center">
                <span className="text-xl">⚡</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Distribution Trend */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5" />
              Tren Distribusi Bantuan (2024)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={distributionData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip formatter={(value, name) => [`Rp ${value}M`, String(name).toUpperCase()]} />
                <Legend />
                <Area type="monotone" dataKey="bansos" stackId="1" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.7} />
                <Area type="monotone" dataKey="pkh" stackId="1" stroke="#10b981" fill="#10b981" fillOpacity={0.7} />
                <Area type="monotone" dataKey="bst" stackId="1" stroke="#f59e0b" fill="#f59e0b" fillOpacity={0.7} />
                <Area type="monotone" dataKey="kkp" stackId="1" stroke="#8b5cf6" fill="#8b5cf6" fillOpacity={0.7} />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Regional Distribution */}
        <Card>
          <CardHeader>
            <CardTitle>Distribusi Regional (Top 6)</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={regionData} layout="horizontal">
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" />
                <YAxis type="category" dataKey="region" width={100} />
                <Tooltip formatter={(value) => [`${value}K penerima`, 'Jumlah Penerima']} />
                <Bar dataKey="recipients" fill="#3b82f6" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Effectiveness Metrics */}
        <Card>
          <CardHeader>
            <CardTitle>Metrik Efektivitas Program</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={effectivenessData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="period" />
                <YAxis domain={[80, 100]} />
                <Tooltip formatter={(value) => [`${value}%`, '']} />
                <Legend />
                <Line type="monotone" dataKey="accuracy" stroke="#3b82f6" strokeWidth={3} name="Akurasi" />
                <Line type="monotone" dataKey="coverage" stroke="#10b981" strokeWidth={3} name="Cakupan" />
                <Line type="monotone" dataKey="satisfaction" stroke="#f59e0b" strokeWidth={3} name="Kepuasan" />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Budget Allocation */}
        <Card>
          <CardHeader>
            <CardTitle>Alokasi Anggaran 2024</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={budgetAllocation}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(1)}%`}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {budgetAllocation.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => [`${value}%`, 'Persentase']} />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Impact Analysis */}
      <Card>
        <CardHeader>
          <CardTitle>Analisis Dampak Program</CardTitle>
          <p className="text-sm text-muted-foreground">
            Perbandingan indikator sosial ekonomi sebelum dan sesudah implementasi program
          </p>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {impactMetrics.map((metric, index) => (
              <div key={index} className="p-4 border rounded-lg">
                <h4 className="font-medium text-sm mb-3">{metric.indicator}</h4>
                <div className="space-y-2">
                  <div className="flex justify-between text-xs">
                    <span className="text-gray-500">Baseline:</span>
                    <span>{typeof metric.baseline === 'number' && metric.baseline < 1 ? metric.baseline.toFixed(3) : metric.baseline}</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-gray-500">Saat ini:</span>
                    <span>{typeof metric.current === 'number' && metric.current < 1 ? metric.current.toFixed(3) : metric.current}</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-gray-500">Target:</span>
                    <span>{typeof metric.target === 'number' && metric.target < 1 ? metric.target.toFixed(3) : metric.target}</span>
                  </div>
                  <div className="flex justify-between items-center pt-2 border-t">
                    <span className="text-xs font-medium">Perubahan:</span>
                    <div className="flex items-center gap-1">
                      {metric.improvement > 0 ? (
                        <TrendingUp className="h-3 w-3 text-green-500" />
                      ) : (
                        <TrendingDown className="h-3 w-3 text-red-500" />
                      )}
                      <span className={`text-xs font-medium ${metric.improvement > 0 ? 'text-green-600' : 'text-red-600'}`}>
                        {metric.improvement > 0 ? '+' : ''}{typeof metric.improvement === 'number' && Math.abs(metric.improvement) < 1 ? metric.improvement.toFixed(3) : metric.improvement}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
