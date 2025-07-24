'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Bar, BarChart, CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

interface StatisticsChartsProps {
  data: any[];
  chartType: 'line' | 'bar';
  title: string;
  dataKey: string;
}

export function StatisticsCharts({ data, chartType, title, dataKey }: StatisticsChartsProps) {
  // Transform data for charts
  const chartData = data.map(item => {
    if (item.chartData) {
      // For time series data
      return item.chartData.map((point: any) => ({
        period: point.period || point.month,
        [item.program]: point[dataKey] || point.recipients || point.amount || point.accuracy,
        program: item.program
      }));
    } else {
      // For direct comparison data
      return {
        program: item.program,
        value: item[dataKey] || item.totalRecipients || item.totalAmount || item.accuracy,
        trend: item.trend
      };
    }
  }).flat();

  // Group data by period for line charts
  const groupedData = chartData.reduce((acc: any, curr: any) => {
    if (curr.period) {
      const existing = acc.find((item: any) => item.period === curr.period);
      if (existing) {
        Object.assign(existing, { [curr.program]: curr[curr.program] });
      } else {
        acc.push({ period: curr.period, [curr.program]: curr[curr.program] });
      }
    }
    return acc;
  }, []);

  const finalData = chartType === 'line' ? groupedData : chartData.filter(item => item.program);

  const formatValue = (value: number) => {
    if (dataKey === 'amount') {
      return `Rp ${(value / 1000000000).toFixed(1)}B`;
    }
    if (dataKey === 'accuracy') {
      return `${value}%`;
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
          {chartType === 'line' ? (
            <LineChart data={finalData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="period" />
              <YAxis tickFormatter={formatValue} />
              <Tooltip formatter={(value: number) => formatValue(value)} />
              <Legend />
              {data.map((item, index) => (
                <Line
                  key={item.program}
                  type="monotone"
                  dataKey={item.program}
                  stroke={`hsl(${index * 60}, 70%, 50%)`}
                  strokeWidth={2}
                />
              ))}
            </LineChart>
          ) : (
            <BarChart data={finalData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="program" />
              <YAxis tickFormatter={formatValue} />
              <Tooltip formatter={(value: number) => formatValue(value)} />
              <Bar 
                dataKey="value" 
                fill="#3B82F6"
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          )}
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
