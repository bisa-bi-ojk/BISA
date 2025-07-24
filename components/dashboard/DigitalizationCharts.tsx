'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Bar, CartesianGrid, Cell, Legend, Line, LineChart, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

interface LineChartData {
  month: string;
  digitalized: number;
  rate: number;
}

interface PieChartData {
  wallet: string;
  recipients: number;
  percentage: number;
}

interface DigitalizationChartsProps {
  data: LineChartData[] | PieChartData[];
  title: string;
  type: 'line' | 'pie';
}

export function DigitalizationCharts({ data, title, type }: DigitalizationChartsProps) {
  const COLORS = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6'];

  const formatValue = (value: number, context?: string) => {
    if (context === 'percentage') {
      return `${value}%`;
    }
    if (value > 1000000) {
      return `${(value / 1000000).toFixed(1)}M`;
    }
    return value.toLocaleString();
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          {type === 'line' ? (
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis yAxisId="left" />
              <YAxis yAxisId="right" orientation="right" />
              <Tooltip 
                formatter={(value: number, name: string) => [
                  formatValue(value, name === 'rate' ? 'percentage' : ''),
                  name === 'digitalized' ? 'Terdigitalisasi' : 'Tingkat (%)'
                ]}
              />
              <Legend />
              <Bar 
                yAxisId="left"
                dataKey="digitalized" 
                fill="#3B82F6"
                name="Terdigitalisasi"
              />
              <Line 
                yAxisId="right"
                type="monotone" 
                dataKey="rate" 
                stroke="#10B981" 
                strokeWidth={3}
                name="Tingkat (%)"
              />
            </LineChart>
          ) : (
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ wallet, percentage }) => `${wallet} (${percentage}%)`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="recipients"
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip formatter={(value: number) => formatValue(value)} />
            </PieChart>
          )}
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
