'use client';

import { PredictiveChatbot } from '@/components/dashboard/PredictiveChatbot';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/hooks/use-auth';
import {
  ArrowLeft,
  BarChart3,
  Bot,
  Calendar,
  MessageSquare,
  Target,
  TrendingUp,
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function ChatbotPredictivePage() {
  const { isLoggedIn, isLoading } = useAuth();
  const router = useRouter();
  const [activeChat, setActiveChat] = useState<string | null>(null);

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

  const predictiveCapabilities = [
    {
      id: 'demographic-forecast',
      title: 'Proyeksi Demografi',
      description:
        'Prediksi perubahan komposisi penduduk dan kebutuhan bansos berdasarkan tren demografis',
      icon: <TrendingUp className="h-6 w-6" />,
      color: 'bg-blue-50 border-blue-200',
      examples: [
        'Proyeksikan jumlah keluarga miskin 5 tahun ke depan',
        'Prediksi perubahan struktur usia penduduk',
        'Estimasi kebutuhan program PKH berdasarkan proyeksi kelahiran',
      ],
    },
    {
      id: 'economic-projection',
      title: 'Proyeksi Ekonomi',
      description:
        'Analisis dampak perubahan ekonomi terhadap tingkat kemiskinan dan kebutuhan bantuan',
      icon: <BarChart3 className="h-6 w-6" />,
      color: 'bg-green-50 border-green-200',
      examples: [
        'Dampak inflasi terhadap daya beli masyarakat miskin',
        'Proyeksi kebutuhan BST akibat kenaikan harga pangan',
        'Estimasi pengurangan kemiskinan dengan program baru',
      ],
    },
    {
      id: 'seasonal-forecast',
      title: 'Prediksi Musiman',
      description: 'Perkiraan kebutuhan bansos berdasarkan pola musiman dan peristiwa berulang',
      icon: <Calendar className="h-6 w-6" />,
      color: 'bg-yellow-50 border-yellow-200',
      examples: [
        'Prediksi kebutuhan bantuan saat musim kemarau',
        'Proyeksi permintaan bansos menjelang hari raya',
        'Estimasi dampak musim hujan terhadap kebutuhan BPNT',
      ],
    },
    {
      id: 'policy-impact',
      title: 'Simulasi Kebijakan',
      description: 'Analisis dampak potensial dari perubahan kebijakan atau program baru',
      icon: <Target className="h-6 w-6" />,
      color: 'bg-purple-50 border-purple-200',
      examples: [
        'Simulasi dampak perubahan kriteria penerima PKH',
        'Proyeksi efektivitas program bantuan baru',
        'Analisis cost-benefit implementasi digitalisasi bansos',
      ],
    },
  ];

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
                <h1 className="text-3xl font-bold text-gray-900">AI Predictive Assistant</h1>
                <p className="text-gray-600">
                  Sistem prediksi dan proyeksi untuk perencanaan strategis bansos
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Bot className="h-8 w-8 text-[#3E9EDB]" />
              <span className="text-sm text-gray-600">Powered by AI</span>
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-3">
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="h-5 w-5" />
                  Kemampuan Prediktif
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {predictiveCapabilities.map((capability) => (
                  <div
                    key={capability.id}
                    className={`cursor-pointer rounded-lg border p-4 transition-all hover:shadow-md ${
                      activeChat === capability.id
                        ? 'border-blue-200 bg-blue-50 ring-2 ring-[#3E9EDB]'
                        : capability.color
                    }`}
                    onClick={() => setActiveChat(capability.id)}>
                    <div className="flex items-start gap-3">
                      <div className="flex-shrink-0 text-blue-600">{capability.icon}</div>
                      <div className="flex-1">
                        <h3 className="mb-1 font-medium text-gray-900">{capability.title}</h3>
                        <p className="mb-3 text-sm text-gray-600">{capability.description}</p>
                        <div className="space-y-1">
                          <p className="text-xs font-medium text-gray-700">Contoh pertanyaan:</p>
                          {capability.examples.map((example, index) => (
                            <p key={index} className="text-xs text-gray-600">
                              • {example}
                            </p>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card className="mt-6">
              <CardHeader>
                <CardTitle>Model Performance</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Akurasi Prediksi</span>
                  <span className="font-medium">89.3%</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Confidence Level</span>
                  <span className="font-medium">95%</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Data Points</span>
                  <span className="font-medium">1.2M+</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Last Updated</span>
                  <span className="font-medium">2 jam lalu</span>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="lg:col-span-2">
            <Card className="flex h-[700px] flex-col">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MessageSquare className="h-5 w-5" />
                  Predictive Analytics Chat
                  {activeChat && (
                    <span className="text-sm font-normal text-gray-600">
                      - {predictiveCapabilities.find((c) => c.id === activeChat)?.title}
                    </span>
                  )}
                </CardTitle>
              </CardHeader>
              <CardContent className="flex flex-1 flex-col">
                {activeChat ? (
                  <PredictiveChatbot mode={activeChat} onModeChange={setActiveChat} />
                ) : (
                  <div className="flex flex-1 items-center justify-center">
                    <div className="text-center">
                      <Bot className="mx-auto mb-4 h-16 w-16 text-gray-400" />
                      <h3 className="mb-2 text-lg font-medium text-gray-900">
                        Pilih Mode Prediksi
                      </h3>
                      <p className="mb-6 text-gray-600">
                        Pilih salah satu kemampuan prediktif di sebelah kiri untuk memulai analisis
                      </p>
                      <div className="mx-auto grid max-w-md grid-cols-2 gap-4">
                        {predictiveCapabilities.slice(0, 4).map((capability) => (
                          <Button
                            key={capability.id}
                            variant="outline"
                            size="sm"
                            onClick={() => setActiveChat(capability.id)}
                            className="flex items-center gap-2">
                            {capability.icon}
                            <span className="text-xs">{capability.title}</span>
                          </Button>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="mt-8 grid gap-6 md:grid-cols-3">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Data Sources</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>• Database penerima bansos historis</li>
                <li>• Data demografis BPS</li>
                <li>• Indikator ekonomi makro</li>
                <li>• Data cuaca dan iklim BMKG</li>
                <li>• Indeks harga konsumen</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Metodologi</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>• Machine Learning Algorithms</li>
                <li>• Time Series Analysis</li>
                <li>• Statistical Modeling</li>
                <li>• Monte Carlo Simulation</li>
                <li>• Ensemble Methods</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Limitations</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>• Prediksi berbasis data historis</li>
                <li>• Akurasi menurun untuk jangka panjang</li>
                <li>• Tidak memprediksi peristiwa ekstrem</li>
                <li>• Memerlukan validasi berkala</li>
                <li>• Hasil merupakan estimasi probabilistik</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
