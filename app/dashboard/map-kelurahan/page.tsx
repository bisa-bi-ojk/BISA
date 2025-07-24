'use client';

import { ChatbotInterface } from '@/components/dashboard/ChatbotInterface';
import { InteractiveKelurahanMap } from '@/components/dashboard/InteractiveKelurahanMap';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/hooks/use-auth';
import {
  AlertTriangle,
  ArrowLeft,
  BarChart3,
  DollarSign,
  Leaf,
  MapPin,
  Users
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

interface KelurahanData {
  id: string;
  name: string;
  kecamatan: string;
  population: number;
  area: number;
  vegetationIndex: number;
  disasterHistory: Array<{
    year: number;
    type: string;
    severity: 'Ringan' | 'Sedang' | 'Berat';
    affected: number;
  }>;
  bansosStatistics: {
    [key: string]: {
      totalRecipients: number;
      totalAmount: number;
      eligibleButNotReceiving: number;
      accuracy: number;
    };
  };
  coordinates: [number, number];
  polygon: Array<[number, number]>;
}

const mockKelurahanData: KelurahanData[] = [
  {
    id: "kel-001",
    name: "Kelurahan Menteng",
    kecamatan: "Menteng",
    population: 25430,
    area: 2.34,
    vegetationIndex: 0.65,
    disasterHistory: [
      { year: 2024, type: "Banjir", severity: "Sedang", affected: 1250 },
      { year: 2023, type: "Angin Kencang", severity: "Ringan", affected: 340 },
      { year: 2022, type: "Banjir", severity: "Berat", affected: 2100 }
    ],
    bansosStatistics: {
      "PKH": {
        totalRecipients: 1245,
        totalAmount: 934000000,
        eligibleButNotReceiving: 234,
        accuracy: 87.5
      },
      "BPNT": {
        totalRecipients: 2341,
        totalAmount: 468200000,
        eligibleButNotReceiving: 445,
        accuracy: 84.2
      },
      "BST": {
        totalRecipients: 890,
        totalAmount: 267000000,
        eligibleButNotReceiving: 123,
        accuracy: 91.3
      },
      "PIP": {
        totalRecipients: 567,
        totalAmount: 170100000,
        eligibleButNotReceiving: 78,
        accuracy: 89.7
      }
    },
    coordinates: [-6.1944, 106.8229],
    polygon: [
      [-6.1900, 106.8180],
      [-6.1900, 106.8280],
      [-6.2000, 106.8280],
      [-6.2000, 106.8180]
    ]
  },
  {
    id: "kel-002",
    name: "Kelurahan Gondangdia",
    kecamatan: "Menteng",
    population: 18765,
    area: 1.87,
    vegetationIndex: 0.45,
    disasterHistory: [
      { year: 2024, type: "Banjir", severity: "Ringan", affected: 890 },
      { year: 2023, type: "Kebakaran", severity: "Sedang", affected: 156 }
    ],
    bansosStatistics: {
      "PKH": {
        totalRecipients: 934,
        totalAmount: 700500000,
        eligibleButNotReceiving: 178,
        accuracy: 85.1
      },
      "BPNT": {
        totalRecipients: 1567,
        totalAmount: 313400000,
        eligibleButNotReceiving: 289,
        accuracy: 82.8
      },
      "BST": {
        totalRecipients: 645,
        totalAmount: 193500000,
        eligibleButNotReceiving: 89,
        accuracy: 88.9
      },
      "PIP": {
        totalRecipients: 423,
        totalAmount: 126900000,
        eligibleButNotReceiving: 67,
        accuracy: 87.3
      }
    },
    coordinates: [-6.1856, 106.8317],
    polygon: [
      [-6.1800, 106.8280],
      [-6.1800, 106.8350],
      [-6.1900, 106.8350],
      [-6.1900, 106.8280]
    ]
  }
];

export default function MapKelurahanPage() {
  const { isLoggedIn, isLoading } = useAuth();
  const router = useRouter();
  const [selectedKelurahan, setSelectedKelurahan] = useState<string | null>(null);
  const [showChatbot, setShowChatbot] = useState(false);
  const [hoveredKelurahan, setHoveredKelurahan] = useState<string | null>(null);

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

  const selectedKelurahanData = selectedKelurahan ? 
    mockKelurahanData.find(k => k.id === selectedKelurahan) : null;

  const getVegetationColor = (index: number) => {
    if (index >= 0.7) return 'text-green-600';
    if (index >= 0.5) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getVegetationLabel = (index: number) => {
    if (index >= 0.7) return 'Tinggi';
    if (index >= 0.5) return 'Sedang';
    return 'Rendah';
  };

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
                <h1 className="text-3xl font-bold text-gray-900">Peta Interaktif Per Kelurahan</h1>
                <p className="text-gray-600">Visualisasi data kelurahan dan statistik bansos</p>
              </div>
            </div>
            <Button 
              onClick={() => setShowChatbot(!showChatbot)}
              variant={showChatbot ? "default" : "outline"}
              size="sm"
            >
              <MapPin className="h-4 w-4 mr-2" />
              {showChatbot ? 'Tutup Chat' : 'Buka Chat'}
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <InteractiveKelurahanMap 
              kelurahanData={mockKelurahanData}
              selectedKelurahan={selectedKelurahan}
              hoveredKelurahan={hoveredKelurahan}
              onKelurahanSelect={setSelectedKelurahan}
              onKelurahanHover={setHoveredKelurahan}
            />
          </div>

          <div className="space-y-6">
            {selectedKelurahanData ? (
              <>
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <MapPin className="h-5 w-5" />
                      Informasi Kelurahan
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <p className="text-sm text-gray-600">Nama Kelurahan</p>
                      <p className="font-medium">{selectedKelurahanData.name}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Kecamatan</p>
                      <p className="font-medium">{selectedKelurahanData.kecamatan}</p>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-gray-600">Populasi</p>
                        <p className="font-medium">{selectedKelurahanData.population.toLocaleString()} jiwa</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Luas Area</p>
                        <p className="font-medium">{selectedKelurahanData.area} km²</p>
                      </div>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Indeks Vegetasi</p>
                      <div className="flex items-center gap-2">
                        <Leaf className={`h-4 w-4 ${getVegetationColor(selectedKelurahanData.vegetationIndex)}`} />
                        <span className="font-medium">{selectedKelurahanData.vegetationIndex.toFixed(2)}</span>
                        <Badge variant="outline" className={getVegetationColor(selectedKelurahanData.vegetationIndex)}>
                          {getVegetationLabel(selectedKelurahanData.vegetationIndex)}
                        </Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <AlertTriangle className="h-5 w-5" />
                      Riwayat Bencana
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {selectedKelurahanData.disasterHistory.length > 0 ? (
                      selectedKelurahanData.disasterHistory.map((disaster, index) => (
                        <div key={index} className="p-3 border rounded-lg">
                          <div className="flex justify-between items-start mb-2">
                            <div>
                              <h4 className="font-medium">{disaster.type}</h4>
                              <p className="text-sm text-gray-600">Tahun {disaster.year}</p>
                            </div>
                            <Badge 
                              variant={
                                disaster.severity === 'Berat' ? 'destructive' :
                                disaster.severity === 'Sedang' ? 'default' : 'secondary'
                              }
                            >
                              {disaster.severity}
                            </Badge>
                          </div>
                          <p className="text-sm text-gray-600">
                            Terdampak: {disaster.affected.toLocaleString()} jiwa
                          </p>
                        </div>
                      ))
                    ) : (
                      <p className="text-gray-500 text-center py-4">Tidak ada riwayat bencana tercatat</p>
                    )}
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <BarChart3 className="h-5 w-5" />
                      Statistik Bansos
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {Object.entries(selectedKelurahanData.bansosStatistics).map(([program, stats]) => (
                      <div key={program} className="p-4 border rounded-lg space-y-3">
                        <div className="flex justify-between items-center">
                          <h4 className="font-medium">{program}</h4>
                          <Badge variant="outline">
                            Akurasi: {stats.accuracy}%
                          </Badge>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div>
                            <p className="text-gray-600">Penerima</p>
                            <div className="flex items-center gap-1">
                              <Users className="h-4 w-4 text-blue-600" />
                              <span className="font-medium">{stats.totalRecipients.toLocaleString()}</span>
                            </div>
                          </div>
                          <div>
                            <p className="text-gray-600">Total Dana</p>
                            <div className="flex items-center gap-1">
                              <DollarSign className="h-4 w-4 text-green-600" />
                              <span className="font-medium">Rp {(stats.totalAmount / 1000000).toFixed(1)}M</span>
                            </div>
                          </div>
                        </div>

                        {stats.eligibleButNotReceiving > 0 && (
                          <div className="pt-2 border-t">
                            <div className="flex items-center gap-2 text-amber-600">
                              <AlertTriangle className="h-4 w-4" />
                              <span className="text-sm">
                                {stats.eligibleButNotReceiving} layak tapi belum menerima
                              </span>
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </>
            ) : (
              <Card>
                <CardContent className="text-center py-12">
                  <MapPin className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Pilih Kelurahan</h3>
                  <p className="text-gray-600">Hover atau klik pada kelurahan di peta untuk melihat detail informasi</p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>

        {showChatbot && (
          <div className="mt-8">
            <Card>
              <CardHeader>
                <CardTitle>AI Assistant - Analisis Kelurahan</CardTitle>
              </CardHeader>
              <CardContent>
                <ChatbotInterface 
                  selectedRegion={selectedKelurahan} 
                  context="kelurahan"
                  placeholder="Tanyakan tentang kelurahan yang dipilih atau analisis pola bansos..."
                />
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}
