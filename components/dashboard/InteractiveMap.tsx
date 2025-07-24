'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { regionalData } from '@/lib/constants/dashboard/dashboardData';
import { RegionalData } from '@/lib/types/dashboard';
import { MapPin, Minus, TrendingDown, TrendingUp } from 'lucide-react';
import { useState } from 'react';

interface InteractiveMapProps {
  selectedRegion: string | null;
  onRegionSelect: (regionId: string) => void;
}


export function InteractiveMap({ selectedRegion, onRegionSelect }: InteractiveMapProps) {
  const [hoveredRegion, setHoveredRegion] = useState<string | null>(null);

  const regions = Object.entries(regionalData);
  
  // Helper function to safely access regional data
  const getRegionalData = (regionId: string | null): RegionalData | null => {
    if (!regionId || !(regionId in regionalData)) return null;
    return regionalData[regionId as keyof typeof regionalData];
  };

  const getPriorityColor = (priority: string) => {
    switch (priority.toLowerCase()) {
      case 'tinggi': return 'bg-red-500 hover:bg-red-600';
      case 'sedang': return 'bg-yellow-500 hover:bg-yellow-600';
      case 'rendah': return 'bg-green-500 hover:bg-green-600';
      default: return 'bg-gray-500 hover:bg-gray-600';
    }
  };

  const getTrendIcon = (value: number, isPositive: boolean = true) => {
    if (value > 70) return isPositive ? <TrendingUp className="h-4 w-4 text-green-600" /> : <TrendingDown className="h-4 w-4 text-red-600" />;
    if (value > 40) return <Minus className="h-4 w-4 text-yellow-600" />;
    return isPositive ? <TrendingDown className="h-4 w-4 text-red-600" /> : <TrendingUp className="h-4 w-4 text-green-600" />;
  };

  return (
    <div className="grid gap-6 lg:grid-cols-3">
      {/* Map Display */}
      <div className="lg:col-span-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MapPin className="h-5 w-5" />
              Peta Klasifikasi Kelayakan Regional
            </CardTitle>
            <p className="text-sm text-muted-foreground">
              Klik pada wilayah untuk melihat detail statistik dan analisis
            </p>
          </CardHeader>
          <CardContent>
            <div className="h-96 bg-gradient-to-br from-blue-50 to-green-50 rounded-lg relative overflow-hidden border-2 border-dashed border-gray-200">
              {/* Map Placeholder with Interactive Regions */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <MapPin className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-500 font-medium mb-2">Peta Indonesia Interaktif</p>
                  <p className="text-sm text-gray-400 mb-4">
                    Implementasi peta akan menggunakan Google Maps/Leaflet
                  </p>
                  
                  {/* Interactive Demo Regions */}
                  <div className="space-y-2">
                    <p className="text-xs text-gray-500 mb-3">Demo: Klik wilayah di bawah</p>
                    {regions.map(([regionId, data]) => (
                      <Button
                        key={regionId}
                        variant="outline"
                        size="sm"
                        className={`block mx-auto mb-2 transition-all duration-200 ${
                          selectedRegion === regionId ? 'ring-2 ring-blue-500' : ''
                        } ${
                          hoveredRegion === regionId ? 'scale-105' : ''
                        }`}
                        onClick={() => onRegionSelect(regionId)}
                        onMouseEnter={() => setHoveredRegion(regionId)}
                        onMouseLeave={() => setHoveredRegion(null)}
                      >
                        <Badge className={`mr-2 ${getPriorityColor(data.priority)}`}>
                          {data.name}
                        </Badge>
                        Prioritas {data.priority}
                      </Button>
                    ))}
                  </div>
                </div>
              </div>
              
              {/* Legend */}
              <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm rounded-lg p-3 shadow-md">
                <h4 className="font-semibold text-sm mb-2">Legenda Prioritas</h4>
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-red-500 rounded"></div>
                    <span className="text-xs">Prioritas Tinggi</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-yellow-500 rounded"></div>
                    <span className="text-xs">Prioritas Sedang</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-green-500 rounded"></div>
                    <span className="text-xs">Prioritas Rendah</span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Region Details */}
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4" />
              Detail Wilayah
            </CardTitle>            <p className="text-sm text-muted-foreground">
              {getRegionalData(selectedRegion)
                ? `Analisis untuk ${getRegionalData(selectedRegion)!.name}` 
                : 'Pilih wilayah di peta untuk melihat detail'}
            </p>
          </CardHeader>          <CardContent>
            {(() => {
              const regionData = getRegionalData(selectedRegion);
              return regionData ? (
                <div className="space-y-6">
                  {/* Region Overview */}
                  <div className="p-4 rounded-lg bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-100">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-semibold text-lg">{regionData.name}</h3>
                      <Badge 
                        className={`${getPriorityColor(regionData.priority)} text-white`}
                      >
                        {regionData.recommendation}
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-600">{regionData.description}</p>
                  </div>

                  {/* Infrastructure Metrics */}
                  <div>
                    <h4 className="font-semibold text-sm mb-3 flex items-center gap-2">
                      🏗️ Kondisi Infrastruktur
                    </h4>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center p-2 rounded bg-gray-50">
                        <span className="text-sm">Atap Berkualitas Rendah</span>
                        <div className="flex items-center gap-2">
                          {getTrendIcon(regionData.infrastructure.lowQualityRoof, false)}
                          <span className="font-medium">{regionData.infrastructure.lowQualityRoof}%</span>
                        </div>
                      </div>
                      <div className="flex justify-between items-center p-2 rounded bg-gray-50">
                        <span className="text-sm">Akses Air Bersih</span>
                        <div className="flex items-center gap-2">
                          {getTrendIcon(regionData.infrastructure.cleanWaterAccess)}
                          <span className="font-medium">{regionData.infrastructure.cleanWaterAccess}%</span>
                        </div>
                      </div>
                      <div className="flex justify-between items-center p-2 rounded bg-gray-50">
                        <span className="text-sm">Listrik PLN</span>
                        <div className="flex items-center gap-2">
                          {getTrendIcon(regionData.infrastructure.electricityPLN)}
                          <span className="font-medium">{regionData.infrastructure.electricityPLN}%</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Socioeconomic Metrics */}
                  <div>
                    <h4 className="font-semibold text-sm mb-3 flex items-center gap-2">
                      👥 Kondisi Sosial Ekonomi
                    </h4>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center p-2 rounded bg-gray-50">
                        <span className="text-sm">Kepadatan Penduduk</span>
                        <span className="font-medium">{regionData.socioeconomic.populationDensity}</span>
                      </div>
                      <div className="flex justify-between items-center p-2 rounded bg-gray-50">
                        <span className="text-sm">Rerata Konsumsi Listrik</span>
                        <span className="font-medium">{regionData.socioeconomic.avgElectricityConsumption}</span>
                      </div>
                      <div className="flex justify-between items-center p-2 rounded bg-gray-50">
                        <span className="text-sm">Tingkat Kemiskinan</span>
                        <span className="font-medium">{regionData.socioeconomic.povertyRate}%</span>
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="space-y-2">
                    <Button className="w-full" size="sm">
                      📊 Lihat Analisis Lengkap
                    </Button>
                    <Button variant="outline" className="w-full" size="sm">
                      📈 Export Data Regional
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="text-center py-12">
                  <MapPin className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-500 mb-2">Pilih Wilayah</p>
                  <p className="text-xs text-gray-400">
                    Klik pada salah satu wilayah di peta untuk melihat statistik detail
                  </p>
                </div>
              );
            })()}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
