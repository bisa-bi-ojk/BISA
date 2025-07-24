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

export function InteractiveHouseMap({ houseData, selectedHouse, onHouseSelect }: InteractiveHouseMapProps) {
  const [hoveredHouse, setHoveredHouse] = useState<string | null>(null);

  // Simple grid layout for houses (in real app, this would be a proper map)
  return (
    <Card className="h-[600px]">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <MapPin className="h-5 w-5" />
          Peta Rumah Tangga
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="relative h-full bg-gray-100 rounded-lg p-4">
          {/* Simulated map view with house markers */}
          <div className="grid grid-cols-6 gap-4 h-full">
            {houseData.map((house, index) => (
              <div
                key={house.id}
                className={`
                  relative flex items-center justify-center cursor-pointer transition-all duration-200
                  ${selectedHouse === house.id 
                    ? 'scale-125 z-10' 
                    : hoveredHouse === house.id 
                      ? 'scale-110' 
                      : 'scale-100'
                  }
                `}
                style={{
                  gridColumn: `${(index % 6) + 1}`,
                  gridRow: `${Math.floor(index / 6) + 1}`
                }}
                onClick={() => onHouseSelect(house.id)}
                onMouseEnter={() => setHoveredHouse(house.id)}
                onMouseLeave={() => setHoveredHouse(null)}
              >
                <div
                  className={`
                    w-12 h-12 rounded-lg border-2 flex items-center justify-center shadow-lg
                    ${selectedHouse === house.id
                      ? 'bg-blue-500 border-blue-600 text-white'
                      : hoveredHouse === house.id
                        ? 'bg-blue-100 border-blue-300 text-blue-700'
                        : 'bg-white border-gray-300 text-gray-600 hover:bg-gray-50'
                    }
                  `}
                >
                  <Home className="h-6 w-6" />
                </div>
                
                {/* Tooltip */}
                {hoveredHouse === house.id && (
                  <div className="absolute bottom-14 left-1/2 transform -translate-x-1/2 bg-black text-white text-xs rounded px-2 py-1 whitespace-nowrap z-20">
                    {house.familyHead}
                    <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-black"></div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Map Legend */}
          <div className="absolute bottom-4 left-4 bg-white p-3 rounded-lg shadow-lg">
            <h4 className="text-sm font-medium mb-2">Legend</h4>
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-blue-500 rounded"></div>
                <span className="text-xs">Rumah Terpilih</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-white border border-gray-300 rounded"></div>
                <span className="text-xs">Rumah Tangga</span>
              </div>
            </div>
          </div>

          {/* Instructions */}
          <div className="absolute top-4 right-4 bg-white p-3 rounded-lg shadow-lg max-w-xs">
            <p className="text-xs text-gray-600">
              Klik pada rumah untuk melihat detail keluarga dan anggotanya
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
