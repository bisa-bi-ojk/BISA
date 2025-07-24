// Sample data for the dashboard - this would come from API in production
import { ChatMessage, DashboardStats, Dataset, MLModel, RegionalDataMap } from '@/lib/types/dashboard';

export const dashboardStats: DashboardStats = {
  totalRecipients: {
    value: 2459,
    change: 12,
    period: 'bulan lalu'
  },
  fundsDistributed: {
    value: 45.2,
    currency: 'M',
    change: 8,
    period: 'bulan lalu'
  },
  regionsCovered: {
    value: 34,
    label: 'Provinsi di Indonesia'
  },
  accuracy: {
    value: 94.5,
    label: 'Target bantuan tepat sasaran'
  }
};

export const regionalData: RegionalDataMap = {
  'jawa-barat': {
    name: 'Jawa Barat',
    priority: 'Tinggi',
    color: 'red',
    infrastructure: {
      lowQualityRoof: 75,
      cleanWaterAccess: 45,
      electricityPLN: 60
    },
    socioeconomic: {
      populationDensity: 'Tinggi',
      avgElectricityConsumption: 'Rendah',
      povertyRate: 18.5
    },
    recommendation: 'Prioritas Tinggi',
    description: 'Membutuhkan perhatian khusus dalam program bantuan sosial'
  },
  'jawa-timur': {
    name: 'Jawa Timur',
    priority: 'Sedang',
    color: 'yellow',
    infrastructure: {
      lowQualityRoof: 55,
      cleanWaterAccess: 65,
      electricityPLN: 70
    },
    socioeconomic: {
      populationDensity: 'Sedang',
      avgElectricityConsumption: 'Sedang',
      povertyRate: 12.3
    },
    recommendation: 'Prioritas Sedang',
    description: 'Program bantuan dapat disesuaikan dengan kondisi regional'
  },
  'dki-jakarta': {
    name: 'DKI Jakarta',
    priority: 'Rendah',
    color: 'green',
    infrastructure: {
      lowQualityRoof: 25,
      cleanWaterAccess: 85,
      electricityPLN: 90
    },
    socioeconomic: {
      populationDensity: 'Sangat Tinggi',
      avgElectricityConsumption: 'Tinggi',
      povertyRate: 3.8
    },
    recommendation: 'Prioritas Rendah',
    description: 'Infrastruktur baik, bantuan dapat difokuskan pada kelompok tertentu'
  }
};

export const chatbotSampleConversations: ChatMessage[] = [
  {
    type: 'ai',
    message: 'Selamat datang! Saya dapat membantu menganalisis dampak kebijakan bantuan sosial. Contoh pertanyaan:',
    suggestions: [
      '"Apa yang terjadi jika bansos di Jawa Barat dinaikkan 5%?"',
      '"Bagaimana dampak program PKH terhadap tingkat belanja bahan pokok?"',
      '"Prediksi harga telur jika subsidi pangan ditingkatkan 10%"'
    ]
  },
  {
    type: 'user',
    message: 'Apa yang terjadi jika bansos di Jawa Barat dinaikkan 5%?'
  },
  {
    type: 'ai',
    message: 'Berdasarkan analisis model ML kami:',
    predictions: [
      { icon: '📈', metric: 'Tingkat belanja bahan pokok', value: 'Naik 5.2%' },
      { icon: '🥚', metric: 'Harga telur lokal', value: 'Naik 2.1%' },
      { icon: '🏠', metric: 'Kondisi perumahan', value: 'Perbaikan 3.5%' },
      { icon: '💰', metric: 'Daya beli masyarakat', value: 'Meningkat 4.8%' }
    ],
    note: '*Prediksi berdasarkan data historis 2017-2024'
  }
];

export const mlModels: MLModel[] = [
  {
    name: 'Model Prediksi Bantuan Sosial',
    description: 'Time series prediction untuk program bansos',
    accuracy: 92.5,
    type: 'Time Series'
  },
  {
    name: 'Model Belanja Bahan Pokok',
    description: 'Prediksi perubahan pola belanja',
    accuracy: 89.3,
    type: 'Regression'
  },
  {
    name: 'Model Harga Komoditas',
    description: 'Prediksi harga telur dan bahan pokok',
    accuracy: 87.8,
    type: 'Forecasting'
  }
];

export const datasets: Dataset[] = [
  {
    name: 'Data Bantuan Sosial',
    description: '2017-2024, Update bulanan',
    size: '2.3M records',
    lastUpdate: '2024-12-01'
  },
  {
    name: 'Data Belanja Rumah Tangga',
    description: 'Survey BPS, Update tahunan',
    size: '850K records',
    lastUpdate: '2024-01-15'
  },
  {
    name: 'Harga Komoditas',
    description: 'Data harian pasar tradisional',
    size: '5.1M records',
    lastUpdate: '2024-12-22'
  },
  {
    name: 'Data Sosial Ekonomi',
    description: 'Sintetik berdasarkan constraint real',
    size: '1.7M records',
    lastUpdate: '2024-11-30'
  }
];
