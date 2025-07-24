'use client';

import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Info, MapPin } from 'lucide-react';

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
  onKelurahanHover 
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
        <div className="relative h-full bg-gray-100 rounded-lg p-4">
          {/* Simulated map view with kelurahan areas */}
          <div className="grid grid-cols-4 gap-3 h-full">
            {kelurahanData.map((kelurahan) => (
              <div
                key={kelurahan.id}
                className={`
                  relative p-4 rounded-lg border-2 cursor-pointer transition-all duration-200
                  ${selectedKelurahan === kelurahan.id 
                    ? 'scale-105 z-10 shadow-lg ring-2 ring-blue-400' 
                    : hoveredKelurahan === kelurahan.id 
                      ? 'scale-102 shadow-md' 
                      : 'scale-100'
                  }
                  ${getColorByVegetation(kelurahan.vegetationIndex)} 
                  ${getColorByPopulation(kelurahan.population)}
                `}
                onClick={() => onKelurahanSelect(kelurahan.id)}
                onMouseEnter={() => onKelurahanHover(kelurahan.id)}
                onMouseLeave={() => onKelurahanHover(null)}
              >
                <div className="bg-white bg-opacity-90 rounded p-2">
                  <h4 className="font-medium text-sm truncate">{kelurahan.name}</h4>
                  <p className="text-xs text-gray-600">{kelurahan.kecamatan}</p>
                  <div className="mt-2 space-y-1">
                    <div className="text-xs">
                      <span className="font-medium">{kelurahan.population.toLocaleString()}</span> jiwa
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
                  <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 -translate-y-full bg-black text-white text-xs rounded px-2 py-1 whitespace-nowrap z-20">
                    Klik untuk detail lengkap
                    <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-black"></div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Map Legend */}
          <div className="absolute bottom-4 left-4 bg-white p-3 rounded-lg shadow-lg">
            <h4 className="text-sm font-medium mb-2">Legend</h4>
            <div className="space-y-2">
              <div>
                <p className="text-xs font-medium mb-1">Indeks Vegetasi:</p>
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-green-400 rounded"></div>
                    <span className="text-xs">Tinggi (≥0.7)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-yellow-400 rounded"></div>
                    <span className="text-xs">Sedang (0.5-0.7)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-red-400 rounded"></div>
                    <span className="text-xs">Rendah (&lt;0.5)</span>
                  </div>
                </div>
              </div>
              <div>
                <p className="text-xs font-medium mb-1">Populasi:</p>
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 border-2 border-red-500 rounded"></div>
                    <span className="text-xs">Tinggi (≥25K)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 border-2 border-yellow-500 rounded"></div>
                    <span className="text-xs">Sedang (15-25K)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 border-2 border-green-500 rounded"></div>
                    <span className="text-xs">Rendah (&lt;15K)</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Instructions */}
          <div className="absolute top-4 right-4 bg-white p-3 rounded-lg shadow-lg max-w-xs">
            <div className="flex items-start gap-2">
              <Info className="h-4 w-4 text-blue-500 flex-shrink-0 mt-0.5" />
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
