import React from 'react';
import { Card, Statistic, Row, Col, Spin, Alert } from 'antd';
import { GasData } from '@/types/gas';

interface GasCardProps {
  gasData: GasData | null;
  loading: boolean;
  error: string | null;
}

const GasCard: React.FC<GasCardProps> = ({ gasData, loading, error }) => {
  if (loading) {
    return (
      <Card>
        <div style={{ textAlign: 'center', padding: '50px' }}>
          <Spin size="large" />
        </div>
      </Card>
    );
  }

  if (error) {
    return (
      <Card>
        <Alert message="Error" description={error} type="error" showIcon />
      </Card>
    );
  }

  if (!gasData) {
    return null;
  }

  return (
    <Card title="Current Gas Prices" style={{ marginBottom: 24 }}>
      <Row gutter={16}>
        <Col span={8}>
          <Statistic
            title="Slow (5-10 min)"
            value={gasData.slow.gasPrice}
            suffix="Gwei"
            valueStyle={{ color: '#52c41a' }}
          />
        </Col>
        <Col span={8}>
          <Statistic
            title="Standard (1-2 min)"
            value={gasData.standard.gasPrice}
            suffix="Gwei"
            valueStyle={{ color: '#1677ff' }}
          />
        </Col>
        <Col span={8}>
          <Statistic
            title="Fast (30 sec)"
            value={gasData.fast.gasPrice}
            suffix="Gwei"
            valueStyle={{ color: '#ff4d4f' }}
          />
        </Col>
      </Row>
      <div style={{ marginTop: 16, fontSize: 12, color: '#666' }}>
        Last updated: {new Date(gasData.timestamp).toLocaleTimeString()}
      </div>
    </Card>
  );
};

export default GasCard;