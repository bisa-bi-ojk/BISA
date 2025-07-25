'use client';

import { useAuth } from '@/hooks/use-auth';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  ArrowLeft,
  Home,
  Users,
  DollarSign,
  MapPin,
  Info,
  User,
  Calendar,
  Phone,
  FileText,
} from 'lucide-react';
import { InteractiveHouseMap } from '@/components/dashboard/InteractiveHouseMap';
import { ChatbotInterface } from '@/components/dashboard/ChatbotInterface';

interface HouseData {
  id: string;
  address: string;
  familyHead: string;
  familySize: number;
  income: number;
  bansosEligibility: {
    [key: string]: {
      eligible: boolean;
      score: number;
      reason: string;
    };
  };
  individuals: Array<{
    id: string;
    name: string;
    age: number;
    gender: string;
    occupation: string;
    income: number;
    education: string;
    healthStatus: string;
    bansosStatus: {
      [key: string]: {
        eligible: boolean;
        amount: number;
        lastReceived: string;
      };
    };
  }>;
  coordinates: [number, number];
}

const mockHouseData: HouseData[] = [
  {
    id: 'house-001',
    address: 'Jl. Mawar No. 12, RT 03/RW 05',
    familyHead: 'Budi Santoso',
    familySize: 4,
    income: 2500000,
    bansosEligibility: {
      PKH: {
        eligible: true,
        score: 85,
        reason: 'Memiliki anak usia sekolah dan pendapatan rendah',
      },
      BPNT: { eligible: true, score: 90, reason: 'Kategori keluarga miskin dengan anak balita' },
      BST: { eligible: false, score: 45, reason: 'Pendapatan melebihi batas maksimal' },
      PIP: { eligible: true, score: 88, reason: 'Memiliki anak usia sekolah dengan prestasi baik' },
    },
    individuals: [
      {
        id: 'ind-001',
        name: 'Budi Santoso',
        age: 42,
        gender: 'Laki-laki',
        occupation: 'Pedagang',
        income: 1800000,
        education: 'SMA',
        healthStatus: 'Sehat',
        bansosStatus: {
          PKH: { eligible: true, amount: 750000, lastReceived: '2025-05-15' },
          BPNT: { eligible: true, amount: 200000, lastReceived: '2025-06-01' },
        },
      },
      {
        id: 'ind-002',
        name: 'Siti Aminah',
        age: 38,
        gender: 'Perempuan',
        occupation: 'Ibu Rumah Tangga',
        income: 0,
        education: 'SMP',
        healthStatus: 'Sehat',
        bansosStatus: {
          PKH: { eligible: true, amount: 750000, lastReceived: '2025-05-15' },
        },
      },
      {
        id: 'ind-003',
        name: 'Ahmad Santoso',
        age: 15,
        gender: 'Laki-laki',
        occupation: 'Pelajar',
        income: 0,
        education: 'SMP',
        healthStatus: 'Sehat',
        bansosStatus: {
          PIP: { eligible: true, amount: 450000, lastReceived: '2025-04-20' },
        },
      },
      {
        id: 'ind-004',
        name: 'Dewi Santoso',
        age: 8,
        gender: 'Perempuan',
        occupation: 'Pelajar',
        income: 0,
        education: 'SD',
        healthStatus: 'Sehat',
        bansosStatus: {
          PIP: { eligible: true, amount: 225000, lastReceived: '2025-04-20' },
        },
      },
    ],
    coordinates: [-6.2088, 106.8456],
  },
];

export default function MapRumahPage() {
  const { user, isLoggedIn, isLoading } = useAuth();
  const router = useRouter();
  const [selectedHouse, setSelectedHouse] = useState<string | null>(null);
  const [showChatbot, setShowChatbot] = useState(false);

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

  const selectedHouseData = selectedHouse
    ? mockHouseData.find((h) => h.id === selectedHouse)
    : null;

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
                <h1 className="text-3xl font-bold text-gray-900">Peta Interaktif Per Rumah</h1>
                <p className="text-gray-600">
                  Visualisasi data keluarga dan individu per rumah tangga
                </p>
              </div>
            </div>
            <Button
              onClick={() => setShowChatbot(!showChatbot)}
              variant={showChatbot ? 'default' : 'outline'}
              size="sm">
              <MapPin className="mr-2 h-4 w-4" />
              {showChatbot ? 'Tutup Chat' : 'Buka Chat'}
            </Button>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <InteractiveHouseMap
              houseData={mockHouseData}
              selectedHouse={selectedHouse}
              onHouseSelect={setSelectedHouse}
            />
          </div>

          <div className="space-y-6">
            {selectedHouseData ? (
              <>
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Home className="h-5 w-5" />
                      Detail Rumah Tangga
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <p className="text-sm text-gray-600">Alamat</p>
                      <p className="font-medium">{selectedHouseData.address}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Kepala Keluarga</p>
                      <p className="font-medium">{selectedHouseData.familyHead}</p>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-gray-600">Jumlah Anggota</p>
                        <p className="font-medium">{selectedHouseData.familySize} orang</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Pendapatan</p>
                        <p className="font-medium">
                          Rp {selectedHouseData.income.toLocaleString()}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <DollarSign className="h-5 w-5" />
                      Kelayakan Bansos Keluarga
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {Object.entries(selectedHouseData.bansosEligibility).map(([program, data]) => (
                      <div key={program} className="rounded-lg border p-3">
                        <div className="mb-2 flex items-start justify-between">
                          <h4 className="font-medium">{program}</h4>
                          <Badge variant={data.eligible ? 'default' : 'secondary'}>
                            {data.eligible ? 'Layak' : 'Tidak Layak'}
                          </Badge>
                        </div>
                        <div className="space-y-1">
                          <p className="text-sm text-gray-600">Skor: {data.score}/100</p>
                          <p className="text-xs text-gray-500">{data.reason}</p>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Users className="h-5 w-5" />
                      Anggota Keluarga
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {selectedHouseData.individuals.map((individual) => (
                      <div key={individual.id} className="space-y-3 rounded-lg border p-4">
                        <div className="flex items-start justify-between">
                          <div>
                            <h4 className="font-medium">{individual.name}</h4>
                            <p className="text-sm text-gray-600">
                              {individual.age} tahun • {individual.gender} • {individual.occupation}
                            </p>
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-2 text-sm">
                          <div>
                            <span className="text-gray-600">Pendidikan:</span>
                            <span className="ml-1">{individual.education}</span>
                          </div>
                          <div>
                            <span className="text-gray-600">Kesehatan:</span>
                            <span className="ml-1">{individual.healthStatus}</span>
                          </div>
                        </div>

                        {Object.keys(individual.bansosStatus).length > 0 && (
                          <div>
                            <p className="mb-2 text-sm font-medium">Status Bansos:</p>
                            <div className="space-y-1">
                              {Object.entries(individual.bansosStatus).map(([program, status]) => (
                                <div
                                  key={program}
                                  className="flex items-center justify-between text-sm">
                                  <span>{program}</span>
                                  <div className="text-right">
                                    <Badge
                                      variant={status.eligible ? 'default' : 'secondary'}
                                      className="text-xs">
                                      {status.eligible
                                        ? `Rp ${status.amount.toLocaleString()}`
                                        : 'Tidak Layak'}
                                    </Badge>
                                    {status.eligible && (
                                      <p className="text-xs text-gray-500">
                                        Terakhir:{' '}
                                        {new Date(status.lastReceived).toLocaleDateString('id-ID')}
                                      </p>
                                    )}
                                  </div>
                                </div>
                              ))}
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
                <CardContent className="py-12 text-center">
                  <Home className="mx-auto mb-4 h-12 w-12 text-gray-400" />
                  <h3 className="mb-2 text-lg font-medium text-gray-900">Pilih Rumah</h3>
                  <p className="text-gray-600">
                    Klik pada rumah di peta untuk melihat detail keluarga dan anggotanya
                  </p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>

        {showChatbot && (
          <div className="mt-8">
            <Card>
              <CardHeader>
                <CardTitle>AI Assistant - Analisis Rumah Tangga</CardTitle>
              </CardHeader>
              <CardContent>
                <ChatbotInterface
                  selectedRegion={selectedHouse}
                  context="house"
                  placeholder="Tanyakan tentang rumah yang dipilih atau analisis kebutuhan bansos..."
                />
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}
