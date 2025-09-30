import React from 'react';
import { Card, Select, Spin, Alert } from 'antd';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';
import { GasHistoryData, TimeRange } from '@/types/gas';

interface GasChartProps {
  data: GasHistoryData[];
  loading: boolean;
  error: string | null;
  timeRange: TimeRange;
  onTimeRangeChange: (range: TimeRange) => void;
}

const timeRangeOptions = [
  { value: '1h', label: '1 Hour' },
  { value: '6h', label: '6 Hours' },
  { value: '24h', label: '24 Hours' },
  { value: '7d', label: '7 Days' },
  { value: '30d', label: '30 Days' },
];

const GasChart: React.FC<GasChartProps> = ({
  data,
  loading,
  error,
  timeRange,
  onTimeRangeChange,
}) => {
  const formatXAxis = (timestamp: number) => {
    const date = new Date(timestamp);
    switch (timeRange) {
      case '1h':
      case '6h':
        return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      case '24h':
        return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      case '7d':
        return date.toLocaleDateString([], { month: 'short', day: 'numeric' });
      case '30d':
        return date.toLocaleDateString([], { month: 'short', day: 'numeric' });
      default:
        return date.toLocaleTimeString();
    }
  };

  const formatTooltip = (value: number, name: string) => {
    return [`${value} Gwei`, name];
  };

  const formatLabel = (timestamp: number) => {
    return new Date(timestamp).toLocaleString();
  };

  const extra = (
    <Select
      value={timeRange}
      onChange={onTimeRangeChange}
      options={timeRangeOptions}
      style={{ width: 120 }}
    />
  );

  if (loading) {
    return (
      <Card title="Gas Price History" extra={extra}>
        <div style={{ textAlign: 'center', padding: '100px' }}>
          <Spin size="large" />
        </div>
      </Card>
    );
  }

  if (error) {
    return (
      <Card title="Gas Price History" extra={extra}>
        <Alert message="Error" description={error} type="error" showIcon />
      </Card>
    );
  }

  return (
    <Card title="Gas Price History" extra={extra}>
      <ResponsiveContainer width="100%" height={400}>
        <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="timestamp"
            tickFormatter={formatXAxis}
            domain={['dataMin', 'dataMax']}
            type="number"
            scale="time"
          />
          <YAxis
            label={{ value: 'Gas Price (Gwei)', angle: -90, position: 'insideLeft' }}
          />
          <Tooltip
            labelFormatter={formatLabel}
            formatter={formatTooltip}
          />
          <Legend />
          <Line
            type="monotone"
            dataKey="slow"
            stroke="#52c41a"
            name="Slow"
            strokeWidth={2}
            dot={false}
          />
          <Line
            type="monotone"
            dataKey="standard"
            stroke="#1677ff"
            name="Standard"
            strokeWidth={2}
            dot={false}
          />
          <Line
            type="monotone"
            dataKey="fast"
            stroke="#ff4d4f"
            name="Fast"
            strokeWidth={2}
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </Card>
  );
};

export default GasChart;