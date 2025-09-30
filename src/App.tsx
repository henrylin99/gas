import React, { useState } from 'react';
import { Layout, Typography, Space, theme } from 'antd';
import GasCard from '@/components/GasCard';
import GasChart from '@/components/GasChart';
import NetworkSelector from '@/components/NetworkSelector';
import { useGasData, useGasHistory } from '@/hooks/useGasData';
import { DEFAULT_NETWORK } from '@/utils/networks';
import { TimeRange } from '@/types/gas';

const { Header, Content } = Layout;
const { Title } = Typography;

const App: React.FC = () => {
  const [selectedNetwork, setSelectedNetwork] = useState(DEFAULT_NETWORK);
  const [timeRange, setTimeRange] = useState<TimeRange>('24h');

  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const { gasData, loading: gasLoading, error: gasError } = useGasData(selectedNetwork);
  const {
    historyData,
    loading: historyLoading,
    error: historyError
  } = useGasHistory(selectedNetwork, timeRange);

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Header style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        background: colorBgContainer,
        borderBottom: '1px solid #f0f0f0'
      }}>
        <Title level={3} style={{ margin: 0, color: '#1677ff' }}>
          Gas Monitor Dashboard
        </Title>
        <Space>
          <NetworkSelector
            value={selectedNetwork}
            onChange={setSelectedNetwork}
          />
        </Space>
      </Header>

      <Content style={{ padding: '24px', background: '#f5f5f5' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <GasCard
            gasData={gasData}
            loading={gasLoading}
            error={gasError}
          />

          <GasChart
            data={historyData}
            loading={historyLoading}
            error={historyError}
            timeRange={timeRange}
            onTimeRangeChange={setTimeRange}
          />
        </div>
      </Content>
    </Layout>
  );
};

export default App;