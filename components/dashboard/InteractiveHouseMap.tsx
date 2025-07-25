'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Home, MapPin } from 'lucide-react';
import { useState } from 'react';

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
  coordinates: [number, number];
}

interface InteractiveHouseMapProps {
  houseData: HouseData[];
  selectedHouse: string | null;
  onHouseSelect: (houseId: string) => void;
}

export function InteractiveHouseMap({
  houseData,
  selectedHouse,
  onHouseSelect,
}: InteractiveHouseMapProps) {
  const [hoveredHouse, setHoveredHouse] = useState<string | null>(null);

  return (
    <Card className="h-[600px]">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <MapPin className="h-5 w-5" />
          Peta Rumah Tangga
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="relative h-full rounded-lg bg-gray-100 p-4">
          {/* Simulated map view with house markers */}
          <div className="grid h-full grid-cols-6 gap-4">
            {houseData.map((house, index) => (
              <div
                key={house.id}
                className={`relative flex cursor-pointer items-center justify-center transition-all duration-200 ${
                  selectedHouse === house.id
                    ? 'z-10 scale-125'
                    : hoveredHouse === house.id
                      ? 'scale-110'
                      : 'scale-100'
                } `}
                style={{
                  gridColumn: `${(index % 6) + 1}`,
                  gridRow: `${Math.floor(index / 6) + 1}`,
                }}
                onClick={() => onHouseSelect(house.id)}
                onMouseEnter={() => setHoveredHouse(house.id)}
                onMouseLeave={() => setHoveredHouse(null)}>
                <div
                  className={`flex h-12 w-12 items-center justify-center rounded-lg border-2 shadow-lg ${
                    selectedHouse === house.id
                      ? 'border-blue-600 bg-blue-500 text-white'
                      : hoveredHouse === house.id
                        ? 'border-blue-300 bg-blue-100 text-blue-700'
                        : 'border-gray-300 bg-white text-gray-600 hover:bg-gray-50'
                  } `}>
                  <Home className="h-6 w-6" />
                </div>

                {/* Tooltip */}
                {hoveredHouse === house.id && (
                  <div className="absolute bottom-14 left-1/2 z-20 -translate-x-1/2 transform rounded bg-black px-2 py-1 text-xs whitespace-nowrap text-white">
                    {house.familyHead}
                    <div className="absolute top-full left-1/2 -translate-x-1/2 transform border-4 border-transparent border-t-black"></div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Map Legend */}
          <div className="absolute bottom-4 left-4 rounded-lg bg-white p-3 shadow-lg">
            <h4 className="mb-2 text-sm font-medium">Legend</h4>
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <div className="h-3 w-3 rounded bg-blue-500"></div>
                <span className="text-xs">Rumah Terpilih</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-3 w-3 rounded border border-gray-300 bg-white"></div>
                <span className="text-xs">Rumah Tangga</span>
              </div>
            </div>
          </div>

          {/* Instructions */}
          <div className="absolute top-4 right-4 max-w-xs rounded-lg bg-white p-3 shadow-lg">
            <p className="text-xs text-gray-600">
              Klik pada rumah untuk melihat detail keluarga dan anggotanya
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
