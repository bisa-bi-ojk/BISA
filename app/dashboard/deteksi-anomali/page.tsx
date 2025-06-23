'use client';

import { useAuth } from '@/hooks/use-auth';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  ArrowLeft,
  AlertTriangle,
  Search,
  Filter,
  User,
  MapPin,
  DollarSign,
  Calendar,
  Shield,
  Eye,
  Download
} from 'lucide-react';

interface AnomalyData {
  id: string;
  recipientName: string;
  idNumber: string;
  anomalyType: string;
  riskScore: number;
  description: string;
  regions: string[];
  programs: string[];
  totalReceived: number;
  detectedDate: string;
  status: 'New' | 'Under Review' | 'Resolved' | 'Flagged';
  details: {
    registrationCount: number;
    amountVariance: number;
    avgRegionalAmount: number;
    lastActivity: string;
    verificationStatus: string;
  };
}

const mockAnomalyData: AnomalyData[] = [
  {
    id: "anom-001",
    recipientName: "Budi Santoso",
    idNumber: "3201234567890123",
    anomalyType: "Multiple Registration",
    riskScore: 95,
    description: "Terdaftar di 4 daerah berbeda dengan data yang sama",
    regions: ["Jakarta Pusat", "Jakarta Timur", "Bogor", "Depok"],
    programs: ["PKH", "BPNT", "BST"],
    totalReceived: 4500000,
    detectedDate: "2025-06-20",
    status: "New",
    details: {
      registrationCount: 4,
      amountVariance: 45,
      avgRegionalAmount: 1125000,
      lastActivity: "2025-06-19",
      verificationStatus: "Pending"
    }
  },
  {
    id: "anom-002",
    recipientName: "Siti Aminah",
    idNumber: "3301234567890456",
    anomalyType: "Excessive Amount",
    riskScore: 88,
    description: "Menerima bantuan 180% di atas rata-rata wilayah",
    regions: ["Bandung"],
    programs: ["PKH", "BPNT", "PIP"],
    totalReceived: 2850000,
    detectedDate: "2025-06-19",
    status: "Under Review",
    details: {
      registrationCount: 1,
      amountVariance: 180,
      avgRegionalAmount: 1000000,
      lastActivity: "2025-06-18",
      verificationStatus: "In Progress"
    }
  },
  {
    id: "anom-003",
    recipientName: "Ahmad Wijaya",
    idNumber: "3501234567890789",
    anomalyType: "Suspicious Pattern",
    riskScore: 76,
    description: "Pola penerimaan tidak konsisten dengan data demografis",
    regions: ["Surabaya"],
    programs: ["BST", "PIP"],
    totalReceived: 1650000,
    detectedDate: "2025-06-18",
    status: "Flagged",
    details: {
      registrationCount: 1,
      amountVariance: 25,
      avgRegionalAmount: 1320000,
      lastActivity: "2025-06-15",
      verificationStatus: "Requires Review"
    }
  },
  {
    id: "anom-004",
    recipientName: "Dewi Sartika",
    idNumber: "3601234567890012",
    anomalyType: "Data Inconsistency",
    riskScore: 72,
    description: "Ketidaksesuaian data pendapatan dengan program yang diterima",
    regions: ["Yogyakarta"],
    programs: ["PKH"],
    totalReceived: 900000,
    detectedDate: "2025-06-17",
    status: "Resolved",
    details: {
      registrationCount: 1,
      amountVariance: 15,
      avgRegionalAmount: 750000,
      lastActivity: "2025-06-16",
      verificationStatus: "Verified"
    }
  }
];

export default function DeteksiAnomalyPage() {
  const { user, isLoggedIn, isLoading } = useAuth();
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [selectedAnomalyType, setSelectedAnomalyType] = useState("all");
  const [selectedRiskLevel, setSelectedRiskLevel] = useState("all");
  const [selectedAnomaly, setSelectedAnomaly] = useState<string | null>(null);

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

  let filteredData = mockAnomalyData;

  if (searchQuery) {
    filteredData = filteredData.filter(item => 
      item.recipientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.idNumber.includes(searchQuery)
    );
  }

  if (selectedStatus !== "all") {
    filteredData = filteredData.filter(item => item.status === selectedStatus);
  }

  if (selectedAnomalyType !== "all") {
    filteredData = filteredData.filter(item => item.anomalyType === selectedAnomalyType);
  }

  if (selectedRiskLevel !== "all") {
    if (selectedRiskLevel === "high") {
      filteredData = filteredData.filter(item => item.riskScore >= 80);
    } else if (selectedRiskLevel === "medium") {
      filteredData = filteredData.filter(item => item.riskScore >= 60 && item.riskScore < 80);
    } else if (selectedRiskLevel === "low") {
      filteredData = filteredData.filter(item => item.riskScore < 60);
    }
  }

  const getRiskColor = (score: number) => {
    if (score >= 80) return "text-red-600 bg-red-50 border-red-200";
    if (score >= 60) return "text-yellow-600 bg-yellow-50 border-yellow-200";
    return "text-green-600 bg-green-50 border-green-200";
  };

  const getRiskLabel = (score: number) => {
    if (score >= 80) return "Tinggi";
    if (score >= 60) return "Sedang";
    return "Rendah";
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "New": return "bg-blue-50 text-blue-700 border-blue-200";
      case "Under Review": return "bg-yellow-50 text-yellow-700 border-yellow-200";
      case "Resolved": return "bg-green-50 text-green-700 border-green-200";
      case "Flagged": return "bg-red-50 text-red-700 border-red-200";
      default: return "bg-gray-50 text-gray-700 border-gray-200";
    }
  };

  const selectedAnomalyData = selectedAnomaly ? 
    mockAnomalyData.find(a => a.id === selectedAnomaly) : null;

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
                <h1 className="text-3xl font-bold text-gray-900">Deteksi Anomali Penerima Bansos</h1>
                <p className="text-gray-600">Identifikasi dan analisis pola tidak normal dalam penyaluran bantuan sosial</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 mr-2" />
                Export
              </Button>
              <Badge variant="destructive">
                {filteredData.filter(item => item.status === "New").length} Baru
              </Badge>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Filter className="h-5 w-5" />
                  Filter & Pencarian
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                  <div>
                    <label className="text-sm font-medium mb-2 block">Pencarian</label>
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <Input
                        placeholder="Nama atau NIK..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-10"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-sm font-medium mb-2 block">Status</label>
                    <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">Semua Status</SelectItem>
                        <SelectItem value="New">Baru</SelectItem>
                        <SelectItem value="Under Review">Dalam Review</SelectItem>
                        <SelectItem value="Flagged">Ditandai</SelectItem>
                        <SelectItem value="Resolved">Terselesaikan</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <label className="text-sm font-medium mb-2 block">Jenis Anomali</label>
                    <Select value={selectedAnomalyType} onValueChange={setSelectedAnomalyType}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">Semua Jenis</SelectItem>
                        <SelectItem value="Multiple Registration">Registrasi Ganda</SelectItem>
                        <SelectItem value="Excessive Amount">Jumlah Berlebih</SelectItem>
                        <SelectItem value="Suspicious Pattern">Pola Mencurigakan</SelectItem>
                        <SelectItem value="Data Inconsistency">Inkonsistensi Data</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <label className="text-sm font-medium mb-2 block">Tingkat Risiko</label>
                    <Select value={selectedRiskLevel} onValueChange={setSelectedRiskLevel}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">Semua Level</SelectItem>
                        <SelectItem value="high">Tinggi (≥80)</SelectItem>
                        <SelectItem value="medium">Sedang (60-79)</SelectItem>
                        <SelectItem value="low">Rendah (&lt;60)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Anomaly List */}
            <Card>
              <CardHeader>
                <CardTitle>
                  Daftar Anomali ({filteredData.length} ditemukan)
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {filteredData.map((anomaly) => (
                    <div
                      key={anomaly.id}
                      className={`p-4 border rounded-lg cursor-pointer transition-all hover:shadow-md ${
                        selectedAnomaly === anomaly.id 
                          ? 'ring-2 ring-[#3E9EDB] bg-blue-50 border-blue-200' 
                          : 'hover:bg-gray-50'
                      }`}
                      onClick={() => setSelectedAnomaly(anomaly.id)}
                    >
                      <div className="flex justify-between items-start mb-3">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className="font-medium text-gray-900">{anomaly.recipientName}</h3>
                            <Badge className={getRiskColor(anomaly.riskScore)}>
                              Risk: {anomaly.riskScore}
                            </Badge>
                          </div>
                          <p className="text-sm text-gray-600">{anomaly.idNumber}</p>
                        </div>
                        <Badge className={getStatusColor(anomaly.status)}>
                          {anomaly.status}
                        </Badge>
                      </div>

                      <div className="mb-3">
                        <div className="flex items-center gap-2 mb-1">
                          <AlertTriangle className="h-4 w-4 text-orange-500" />
                          <span className="font-medium text-sm">{anomaly.anomalyType}</span>
                        </div>
                        <p className="text-sm text-gray-600">{anomaly.description}</p>
                      </div>

                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div className="flex items-center gap-1">
                          <MapPin className="h-4 w-4 text-gray-400" />
                          <span>{anomaly.regions.length} wilayah</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <DollarSign className="h-4 w-4 text-gray-400" />
                          <span>Rp {anomaly.totalReceived.toLocaleString()}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Shield className="h-4 w-4 text-gray-400" />
                          <span>{anomaly.programs.length} program</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Calendar className="h-4 w-4 text-gray-400" />
                          <span>{new Date(anomaly.detectedDate).toLocaleDateString('id-ID')}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                  
                  {filteredData.length === 0 && (
                    <div className="text-center py-12">
                      <AlertTriangle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                      <h3 className="text-lg font-medium text-gray-900 mb-2">Tidak ada anomali ditemukan</h3>
                      <p className="text-gray-600">Coba ubah filter pencarian Anda</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            {selectedAnomalyData ? (
              <>
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <User className="h-5 w-5" />
                      Detail Anomali
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <p className="text-sm text-gray-600">Nama Lengkap</p>
                      <p className="font-medium">{selectedAnomalyData.recipientName}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">NIK</p>
                      <p className="font-medium">{selectedAnomalyData.idNumber}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Jenis Anomali</p>
                      <Badge variant="outline">{selectedAnomalyData.anomalyType}</Badge>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Skor Risiko</p>
                      <div className="flex items-center gap-2">
                        <div className="text-2xl font-bold">{selectedAnomalyData.riskScore}</div>
                        <Badge className={getRiskColor(selectedAnomalyData.riskScore)}>
                          {getRiskLabel(selectedAnomalyData.riskScore)}
                        </Badge>
                      </div>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Deskripsi</p>
                      <p className="text-sm">{selectedAnomalyData.description}</p>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Detail Teknis</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Jumlah Registrasi</span>
                      <span className="font-medium">{selectedAnomalyData.details.registrationCount}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Varians Jumlah</span>
                      <span className="font-medium">{selectedAnomalyData.details.amountVariance}%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Rata-rata Regional</span>
                      <span className="font-medium">Rp {selectedAnomalyData.details.avgRegionalAmount.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Aktivitas Terakhir</span>
                      <span className="font-medium">{new Date(selectedAnomalyData.details.lastActivity).toLocaleDateString('id-ID')}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Status Verifikasi</span>
                      <Badge variant="outline">{selectedAnomalyData.details.verificationStatus}</Badge>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Wilayah Terdaftar</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      {selectedAnomalyData.regions.map((region, index) => (
                        <div key={index} className="flex items-center gap-2">
                          <MapPin className="h-4 w-4 text-gray-400" />
                          <span className="text-sm">{region}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Program Bantuan</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      {selectedAnomalyData.programs.map((program, index) => (
                        <Badge key={index} variant="outline" className="mr-2">
                          {program}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <div className="space-y-2">
                  <Button className="w-full" variant="default">
                    <Eye className="h-4 w-4 mr-2" />
                    Tinjau Detail
                  </Button>
                  <Button className="w-full" variant="outline">
                    <Shield className="h-4 w-4 mr-2" />
                    Tandai sebagai Valid
                  </Button>
                </div>
              </>
            ) : (
              <Card>
                <CardContent className="text-center py-12">
                  <AlertTriangle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Pilih Anomali</h3>
                  <p className="text-gray-600">Klik pada item di daftar untuk melihat detail</p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
