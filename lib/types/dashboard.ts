export interface RegionalData {
  name: string;
  priority: string;
  color: string;
  infrastructure: {
    lowQualityRoof: number;
    cleanWaterAccess: number;
    electricityPLN: number;
  };
  socioeconomic: {
    populationDensity: string;
    avgElectricityConsumption: string;
    povertyRate: number;
  };
  recommendation: string;
  description: string;
}

export interface RegionalDataMap {
  [key: string]: RegionalData;
}

export interface ChatMessage {
  type: 'user' | 'ai';
  message: string;
  suggestions?: string[];
  predictions?: Array<{
    icon: string;
    metric: string;
    value: string;
  }>;
  note?: string;
  timestamp?: Date;
}

export interface DashboardStats {
  totalRecipients: {
    value: number;
    change: number;
    period: string;
  };
  fundsDistributed: {
    value: number;
    currency: string;
    change: number;
    period: string;
  };
  regionsCovered: {
    value: number;
    label: string;
  };
  accuracy: {
    value: number;
    label: string;
  };
}

export interface MLModel {
  name: string;
  description: string;
  accuracy: number;
  type: string;
}

export interface Dataset {
  name: string;
  description: string;
  size: string;
  lastUpdate: string;
}
