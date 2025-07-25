'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

interface ChartDataPoint {
  period?: string;
  month?: string;
  recipients?: number;
  amount?: number;
  accuracy?: number;
  [key: string]: string | number | undefined;
}

interface StatisticData {
  program: string;
  totalRecipients?: number;
  totalAmount?: number;
  accuracy?: number;
  trend?: number;
  chartData?: ChartDataPoint[];
}

interface GroupedChartData {
  period: string;
  [program: string]: string | number;
}

type DataKey = 'recipients' | 'amount' | 'accuracy';

interface StatisticsChartsProps {
  data: StatisticData[];
  chartType: 'line' | 'bar';
  title: string;
  dataKey: DataKey;
}

type ChartRowWithPeriod = { period: string; program: string } & Record<string, number>;
type ChartRowValue = { program: string; value: number; trend?: number };
type ChartRow = ChartRowWithPeriod | ChartRowValue;

export function StatisticsCharts({ data, chartType, title, dataKey }: StatisticsChartsProps) {
  const chartData: ChartRow[] = data.flatMap((item): ChartRow[] => {
    if (item.chartData) {
      return item.chartData.map((point) => {
        const rawValue =
          (point[dataKey] as number) ?? point.recipients ?? point.amount ?? point.accuracy ?? 0;

        return {
          period: point.period ?? point.month ?? '',
          program: item.program,
          [item.program]: rawValue,
        } as ChartRowWithPeriod;
      });
    } else {
      let value: number;
      switch (dataKey) {
        case 'recipients':
          value = item.totalRecipients ?? 0;
          break;
        case 'amount':
          value = item.totalAmount ?? 0;
          break;
        case 'accuracy':
          value = item.accuracy ?? 0;
          break;
      }
      return [
        {
          program: item.program,
          value,
          trend: item.trend,
        } as ChartRowValue,
      ];
    }
  });

  const groupedData: GroupedChartData[] = chartData
    .filter((r): r is ChartRowWithPeriod => 'period' in r && r.period !== '')
    .reduce((acc, curr) => {
      const existing = acc.find((row) => row.period === curr.period);
      if (existing) {
        existing[curr.program] = curr[curr.program];
      } else {
        acc.push({ period: curr.period, [curr.program]: curr[curr.program] });
      }
      return acc;
    }, [] as GroupedChartData[]);

  const finalData =
    chartType === 'line'
      ? groupedData
      : (chartData.filter((r): r is ChartRowValue => !('period' in r)) as ChartRowValue[]);

  const formatValue = (value: number) => {
    if (dataKey === 'amount') {
      return `Rp ${(value / 1_000_000_000).toFixed(1)}B`;
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
              <Tooltip formatter={(v: number) => formatValue(v)} />
              <Legend />
              {data.map((item, idx) => (
                <Line
                  key={item.program}
                  type="monotone"
                  dataKey={item.program}
                  stroke={`hsl(${idx * 60}, 70%, 50%)`}
                  strokeWidth={2}
                />
              ))}
            </LineChart>
          ) : (
            <BarChart data={finalData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="program" />
              <YAxis tickFormatter={formatValue} />
              <Tooltip formatter={(v: number) => formatValue(v)} />
              <Bar dataKey="value" radius={[4, 4, 0, 0]} />
            </BarChart>
          )}
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
