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
  TrendingUp
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

  const predictiveCapabilities = [
    {
      id: "demographic-forecast",
      title: "Proyeksi Demografi",
      description: "Prediksi perubahan komposisi penduduk dan kebutuhan bansos berdasarkan tren demografis",
      icon: <TrendingUp className="h-6 w-6" />,
      color: "bg-blue-50 border-blue-200",
      examples: [
        "Proyeksikan jumlah keluarga miskin 5 tahun ke depan",
        "Prediksi perubahan struktur usia penduduk",
        "Estimasi kebutuhan program PKH berdasarkan proyeksi kelahiran"
      ]
    },
    {
      id: "economic-projection",
      title: "Proyeksi Ekonomi",
      description: "Analisis dampak perubahan ekonomi terhadap tingkat kemiskinan dan kebutuhan bantuan",
      icon: <BarChart3 className="h-6 w-6" />,
      color: "bg-green-50 border-green-200",
      examples: [
        "Dampak inflasi terhadap daya beli masyarakat miskin",
        "Proyeksi kebutuhan BST akibat kenaikan harga pangan",
        "Estimasi pengurangan kemiskinan dengan program baru"
      ]
    },
    {
      id: "seasonal-forecast",
      title: "Prediksi Musiman",
      description: "Perkiraan kebutuhan bansos berdasarkan pola musiman dan peristiwa berulang",
      icon: <Calendar className="h-6 w-6" />,
      color: "bg-yellow-50 border-yellow-200",
      examples: [
        "Prediksi kebutuhan bantuan saat musim kemarau",
        "Proyeksi permintaan bansos menjelang hari raya",
        "Estimasi dampak musim hujan terhadap kebutuhan BPNT"
      ]
    },
    {
      id: "policy-impact",
      title: "Simulasi Kebijakan",
      description: "Analisis dampak potensial dari perubahan kebijakan atau program baru",
      icon: <Target className="h-6 w-6" />,
      color: "bg-purple-50 border-purple-200",
      examples: [
        "Simulasi dampak perubahan kriteria penerima PKH",
        "Proyeksi efektivitas program bantuan baru",
        "Analisis cost-benefit implementasi digitalisasi bansos"
      ]
    }
  ];

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
                <h1 className="text-3xl font-bold text-gray-900">AI Predictive Assistant</h1>
                <p className="text-gray-600">Sistem prediksi dan proyeksi untuk perencanaan strategis bansos</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Bot className="h-8 w-8 text-[#3E9EDB]" />
              <span className="text-sm text-gray-600">Powered by AI</span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
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
                    className={`p-4 rounded-lg border cursor-pointer transition-all hover:shadow-md ${
                      activeChat === capability.id 
                        ? 'ring-2 ring-[#3E9EDB] bg-blue-50 border-blue-200' 
                        : capability.color
                    }`}
                    onClick={() => setActiveChat(capability.id)}
                  >
                    <div className="flex items-start gap-3">
                      <div className="flex-shrink-0 text-blue-600">
                        {capability.icon}
                      </div>
                      <div className="flex-1">
                        <h3 className="font-medium text-gray-900 mb-1">
                          {capability.title}
                        </h3>
                        <p className="text-sm text-gray-600 mb-3">
                          {capability.description}
                        </p>
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
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Akurasi Prediksi</span>
                  <span className="font-medium">89.3%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Confidence Level</span>
                  <span className="font-medium">95%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Data Points</span>
                  <span className="font-medium">1.2M+</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Last Updated</span>
                  <span className="font-medium">2 jam lalu</span>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="lg:col-span-2">
            <Card className="h-[700px] flex flex-col">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MessageSquare className="h-5 w-5" />
                  Predictive Analytics Chat
                  {activeChat && (
                    <span className="text-sm font-normal text-gray-600">
                      - {predictiveCapabilities.find(c => c.id === activeChat)?.title}
                    </span>
                  )}
                </CardTitle>
              </CardHeader>
              <CardContent className="flex-1 flex flex-col">
                {activeChat ? (
                  <PredictiveChatbot 
                    mode={activeChat}
                    onModeChange={setActiveChat}
                  />
                ) : (
                  <div className="flex-1 flex items-center justify-center">
                    <div className="text-center">
                      <Bot className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                      <h3 className="text-lg font-medium text-gray-900 mb-2">
                        Pilih Mode Prediksi
                      </h3>
                      <p className="text-gray-600 mb-6">
                        Pilih salah satu kemampuan prediktif di sebelah kiri untuk memulai analisis
                      </p>
                      <div className="grid grid-cols-2 gap-4 max-w-md mx-auto">
                        {predictiveCapabilities.slice(0, 4).map((capability) => (
                          <Button
                            key={capability.id}
                            variant="outline"
                            size="sm"
                            onClick={() => setActiveChat(capability.id)}
                            className="flex items-center gap-2"
                          >
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
