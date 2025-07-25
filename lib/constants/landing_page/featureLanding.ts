import type { LucideIcon } from 'lucide-react';
import { Target, Eye, BarChart3, Users } from 'lucide-react';

export interface Feature {
  icon: LucideIcon;
  title: string;
  description: string;
  color: string;
  stats: string;
}

export const features: Feature[] = [
  {
    icon: Target,
    title: 'Penargetan Akurat',
    description:
      'AI menganalisis data untuk memastikan bantuan tepat sasaran sesuai kriteria penerima.',
    color: 'bg-green-100',
    stats: '95% Akurasi',
  },
  {
    icon: Eye,
    title: 'Pemantauan Waktu Nyata',
    description:
      'Sistem pelacakan waktu nyata untuk memantau distribusi bantuan dari awal hingga akhir dengan transparansi penuh.',
    color: 'bg-blue-100',
    stats: 'Pemantauan 24/7',
  },
  {
    icon: BarChart3,
    title: 'Analisis Mendalam',
    description:
      'Dashboard analitik komprehensif untuk evaluasi efektivitas program bantuan sosial dan prediksi kebutuhan.',
    color: 'bg-blue-100',
    stats: '20+ Metrik',
  },
  {
    icon: Users,
    title: 'Kolaborasi Multi-Instansi',
    description:
      'Platform terintegrasi untuk koordinasi antar instansi dalam pengelolaan bantuan dengan alur kerja yang efisien.',
    color: 'bg-green-100',
    stats: 'Akses Multi-Level',
  },
];
