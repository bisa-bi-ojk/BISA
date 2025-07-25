'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { MapPin, Info } from 'lucide-react';

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

interface InteractiveKelurahanMapProps {
  kelurahanData: KelurahanData[];
  selectedKelurahan: string | null;
  hoveredKelurahan: string | null;
  onKelurahanSelect: (kelurahanId: string) => void;
  onKelurahanHover: (kelurahanId: string | null) => void;
}

export function InteractiveKelurahanMap({
  kelurahanData,
  selectedKelurahan,
  hoveredKelurahan,
  onKelurahanSelect,
  onKelurahanHover,
}: InteractiveKelurahanMapProps) {
  const getColorByVegetation = (index: number) => {
    if (index >= 0.7) return 'bg-green-400';
    if (index >= 0.5) return 'bg-yellow-400';
    return 'bg-red-400';
  };

  const getColorByPopulation = (population: number) => {
    if (population >= 25000) return 'border-red-500';
    if (population >= 15000) return 'border-yellow-500';
    return 'border-green-500';
  };

  return (
    <Card className="h-[600px]">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <MapPin className="h-5 w-5" />
          Peta Kelurahan Interactive
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="relative h-full rounded-lg bg-gray-100 p-4">
          {/* Simulated map view with kelurahan areas */}
          <div className="grid h-full grid-cols-4 gap-3">
            {kelurahanData.map((kelurahan, index) => (
              <div
                key={kelurahan.id}
                className={`relative cursor-pointer rounded-lg border-2 p-4 transition-all duration-200 ${
                  selectedKelurahan === kelurahan.id
                    ? 'z-10 scale-105 shadow-lg ring-2 ring-blue-400'
                    : hoveredKelurahan === kelurahan.id
                      ? 'scale-102 shadow-md'
                      : 'scale-100'
                } ${getColorByVegetation(kelurahan.vegetationIndex)} ${getColorByPopulation(kelurahan.population)} `}
                onClick={() => onKelurahanSelect(kelurahan.id)}
                onMouseEnter={() => onKelurahanHover(kelurahan.id)}
                onMouseLeave={() => onKelurahanHover(null)}>
                <div className="rounded bg-white bg-opacity-90 p-2">
                  <h4 className="truncate text-sm font-medium">{kelurahan.name}</h4>
                  <p className="text-xs text-gray-600">{kelurahan.kecamatan}</p>
                  <div className="mt-2 space-y-1">
                    <div className="text-xs">
                      <span className="font-medium">{kelurahan.population.toLocaleString()}</span>{' '}
                      jiwa
                    </div>
                    <div className="text-xs">
                      <span className="font-medium">{kelurahan.area}</span> km²
                    </div>
                    <Badge variant="outline" className="text-xs">
                      VI: {kelurahan.vegetationIndex.toFixed(2)}
                    </Badge>
                  </div>
                </div>

                {/* Hover tooltip */}
                {hoveredKelurahan === kelurahan.id && (
                  <div className="absolute -top-2 left-1/2 z-20 -translate-x-1/2 -translate-y-full transform whitespace-nowrap rounded bg-black px-2 py-1 text-xs text-white">
                    Klik untuk detail lengkap
                    <div className="absolute left-1/2 top-full -translate-x-1/2 transform border-4 border-transparent border-t-black"></div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Map Legend */}
          <div className="absolute bottom-4 left-4 rounded-lg bg-white p-3 shadow-lg">
            <h4 className="mb-2 text-sm font-medium">Legend</h4>
            <div className="space-y-2">
              <div>
                <p className="mb-1 text-xs font-medium">Indeks Vegetasi:</p>
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <div className="h-3 w-3 rounded bg-green-400"></div>
                    <span className="text-xs">Tinggi (≥0.7)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="h-3 w-3 rounded bg-yellow-400"></div>
                    <span className="text-xs">Sedang (0.5-0.7)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="h-3 w-3 rounded bg-red-400"></div>
                    <span className="text-xs">Rendah (&lt;0.5)</span>
                  </div>
                </div>
              </div>
              <div>
                <p className="mb-1 text-xs font-medium">Populasi:</p>
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <div className="h-3 w-3 rounded border-2 border-red-500"></div>
                    <span className="text-xs">Tinggi (≥25K)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="h-3 w-3 rounded border-2 border-yellow-500"></div>
                    <span className="text-xs">Sedang (15-25K)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="h-3 w-3 rounded border-2 border-green-500"></div>
                    <span className="text-xs">Rendah (&lt;15K)</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Instructions */}
          <div className="absolute right-4 top-4 max-w-xs rounded-lg bg-white p-3 shadow-lg">
            <div className="flex items-start gap-2">
              <Info className="mt-0.5 h-4 w-4 flex-shrink-0 text-blue-500" />
              <p className="text-xs text-gray-600">
                Hover untuk preview, klik untuk detail kelurahan lengkap
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
