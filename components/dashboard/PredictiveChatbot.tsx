'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Bot, Lightbulb, Send, User } from 'lucide-react';
import { useState } from 'react';

interface PredictiveChatbotProps {
  mode: string;
  onModeChange: (mode: string) => void;
}

interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  analysisType?: string;
  data?: unknown;
}

export function PredictiveChatbot({ mode }: PredictiveChatbotProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      role: 'assistant',
      content: `Halo! Saya adalah AI Predictive Assistant. Saat ini dalam mode "${getModeLabel(mode)}". Saya dapat membantu Anda dengan analisis prediktif dan proyeksi data bansos. Apa yang ingin Anda analisis?`,
      timestamp: new Date(),
    },
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  function getModeLabel(mode: string) {
    switch (mode) {
      case 'demographic-forecast':
        return 'Proyeksi Demografi';
      case 'economic-projection':
        return 'Proyeksi Ekonomi';
      case 'seasonal-forecast':
        return 'Prediksi Musiman';
      case 'policy-impact':
        return 'Simulasi Kebijakan';
      default:
        return mode;
    }
  }

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      content: inputMessage,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputMessage('');
    setIsLoading(true);

    setTimeout(() => {
      const aiResponse = generateAIResponse(inputMessage, mode);
      setMessages((prev) => [...prev, aiResponse]);
      setIsLoading(false);
    }, 1500);
  };

  const generateAIResponse = (query: string, mode: string): ChatMessage => {
    let content = '';
    let analysisType = '';
    const data = null;

    switch (mode) {
      case 'demographic-forecast':
        content = `Berdasarkan analisis tren demografis dan pola kelahiran, berikut proyeksi untuk 5 tahun ke depan:

**Proyeksi Keluarga Miskin (2025-2030):**
- 2025: 245,670 keluarga
- 2026: 252,340 keluarga (+2.7%)
- 2027: 259,250 keluarga (+2.7%)
- 2028: 266,410 keluarga (+2.8%)
- 2029: 273,830 keluarga (+2.8%)
- 2030: 281,520 keluarga (+2.8%)

**Faktor-faktor kunci:**
- Pertumbuhan populasi urban: 2.1% per tahun
- Migrasi dari daerah rural: +15,000 keluarga/tahun
- Perubahan struktur usia: peningkatan lansia 3.2%/tahun

**Rekomendasi:**
- Tingkatkan alokasi PKH sebesar 12% dalam 3 tahun
- Fokus program pada kelompok usia produktif
- Persiapkan program khusus lansia`;
        analysisType = 'Demographic Projection';
        break;

      case 'economic-projection':
        content = `Analisis dampak ekonomi terhadap kebutuhan bansos menunjukkan:

**Skenario Inflasi 2025:**
- Inflasi ringan (3-4%): +8% kebutuhan BST
- Inflasi sedang (4-6%): +15% kebutuhan BST  
- Inflasi tinggi (>6%): +25% kebutuhan BST

**Proyeksi Daya Beli:**
- Penurunan daya beli riil: 2.3% per tahun
- Peningkatan kebutuhan BPNT: 180,000 penerima baru
- Estimasi budget tambahan: Rp 2.4 Triliun

**Mitigasi yang disarankan:**
- Penyesuaian nilai bantuan setiap 6 bulan
- Program pelatihan kerja untuk 50,000 penerima
- Kemitraan dengan sektor swasta untuk lapangan kerja`;
        analysisType = 'Economic Impact Analysis';
        break;

      case 'seasonal-forecast':
        content = `Prediksi pola musiman untuk 12 bulan ke depan:

**Musim Kemarau (Jun-Sep 2025):**
- Peningkatan kebutuhan air bersih: +35%
- Penurunan produksi pangan lokal: -20%
- Estimasi penerima tambahan BST: 45,000 keluarga

**Menjelang Hari Raya (Mar-Apr 2025):**
- Lonjakan permintaan bantuan: +60%
- Kebutuhan dana ekstra: Rp 850 Miliar
- Puncak aktivitas: 2 minggu sebelum Idul Fitri

**Musim Hujan (Nov 2025-Feb 2026):**
- Risiko banjir: wilayah Jakarta, Bekasi, Tangerang
- Bantuan darurat diperkirakan: 25,000 keluarga
- Alokasi khusus BPNT: Rp 150 Miliar`;
        analysisType = 'Seasonal Pattern Analysis';
        break;

      case 'policy-impact':
        content = `Simulasi dampak perubahan kebijakan:

**Skenario: Perubahan Kriteria PKH**
- Kriteria saat ini: Pendapatan <Rp 1.5 juta
- Kriteria usulan: Pendapatan <Rp 2 juta

**Dampak yang diproyeksikan:**
- Peningkatan penerima: +180,000 keluarga (+32%)
- Kebutuhan budget tambahan: Rp 4.2 Triliun/tahun
- Tingkat poverty reduction: +12%

**Cost-Benefit Analysis:**
- ROI jangka panjang: 1:3.8
- Pengurangan biaya kesehatan: Rp 850 Miliar
- Peningkatan produktivitas: Rp 1.2 Triliun

**Implementasi bertahap:**
- Fase 1 (6 bulan): 60,000 penerima baru
- Fase 2 (12 bulan): 120,000 penerima tambahan
- Full implementation: 24 bulan`;
        analysisType = 'Policy Impact Simulation';
        break;

      default:
        content =
          'Maaf, saya belum dapat memproses permintaan tersebut. Silakan coba dengan pertanyaan yang lebih spesifik terkait prediksi dan proyeksi data bansos.';
    }

    return {
      id: Date.now().toString(),
      role: 'assistant',
      content,
      timestamp: new Date(),
      analysisType,
      data,
    };
  };

  const exampleQuestions = {
    'demographic-forecast': [
      'Proyeksikan jumlah keluarga miskin 5 tahun ke depan',
      'Bagaimana tren kelahiran mempengaruhi kebutuhan PIP?',
      'Estimasi perubahan struktur usia penduduk',
    ],
    'economic-projection': [
      'Dampak inflasi 5% terhadap daya beli masyarakat miskin',
      'Proyeksi kebutuhan BST jika harga pangan naik 15%',
      'Analisis cost-benefit program baru',
    ],
    'seasonal-forecast': [
      'Prediksi kebutuhan bantuan saat musim kemarau',
      'Proyeksi lonjakan permintaan menjelang hari raya',
      'Estimasi dampak musim hujan terhadap BPNT',
    ],
    'policy-impact': [
      'Simulasi perubahan kriteria penerima PKH',
      'Dampak digitalisasi penuh terhadap efisiensi',
      'Proyeksi efektivitas program bantuan baru',
    ],
  };

  return (
    <div className="flex h-full flex-col">
      {/* Chat Messages */}
      <div className="mb-4 flex-1 space-y-4 overflow-y-auto">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div
              className={`max-w-[80%] rounded-lg p-3 ${
                message.role === 'user' ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-900'
              }`}>
              <div className="flex items-start gap-2">
                {message.role === 'assistant' && <Bot className="mt-0.5 h-5 w-5 flex-shrink-0" />}
                {message.role === 'user' && <User className="mt-0.5 h-5 w-5 flex-shrink-0" />}
                <div className="flex-1">
                  {message.analysisType && (
                    <Badge variant="outline" className="mb-2">
                      {message.analysisType}
                    </Badge>
                  )}
                  <div className="text-sm whitespace-pre-wrap">{message.content}</div>
                  <div className="mt-1 text-xs opacity-70">
                    {message.timestamp.toLocaleTimeString('id-ID')}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}

        {isLoading && (
          <div className="flex justify-start">
            <div className="rounded-lg bg-gray-100 p-3">
              <div className="flex items-center gap-2">
                <Bot className="h-5 w-5" />
                <div className="flex space-x-1">
                  <div className="h-2 w-2 animate-bounce rounded-full bg-gray-400"></div>
                  <div
                    className="h-2 w-2 animate-bounce rounded-full bg-gray-400"
                    style={{ animationDelay: '0.1s' }}></div>
                  <div
                    className="h-2 w-2 animate-bounce rounded-full bg-gray-400"
                    style={{ animationDelay: '0.2s' }}></div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Example Questions */}
      <Card className="mb-4">
        <CardContent className="p-3">
          <div className="mb-2 flex items-center gap-2">
            <Lightbulb className="h-4 w-4 text-yellow-500" />
            <span className="text-sm font-medium">Contoh pertanyaan:</span>
          </div>
          <div className="space-y-1">
            {exampleQuestions[mode as keyof typeof exampleQuestions]?.map((question, index) => (
              <button
                key={index}
                onClick={() => setInputMessage(question)}
                className="w-full rounded p-1 text-left text-xs text-blue-600 hover:bg-blue-50 hover:text-blue-800">
                • {question}
              </button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Input */}
      <div className="flex gap-2">
        <Input
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          placeholder={`Tanyakan tentang ${getModeLabel(mode).toLowerCase()}...`}
          onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
          disabled={isLoading}
        />
        <Button onClick={handleSendMessage} disabled={!inputMessage.trim() || isLoading}>
          <Send className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
