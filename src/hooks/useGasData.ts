import { useState, useEffect, useCallback } from 'react';
import { GasData, GasHistoryData, TimeRange } from '@/types/gas';
import { gasService } from '@/services/gasService';

export const useGasData = (network: string) => {
  const [gasData, setGasData] = useState<GasData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchGasData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await gasService.getCurrentGasPrice(network);
      setGasData(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch gas data');
    } finally {
      setLoading(false);
    }
  }, [network]);

  useEffect(() => {
    fetchGasData();

    const interval = setInterval(fetchGasData, 30000);

    return () => clearInterval(interval);
  }, [fetchGasData]);

  return {
    gasData,
    loading,
    error,
    refetch: fetchGasData,
  };
};

export const useGasHistory = (network: string, timeRange: TimeRange) => {
  const [historyData, setHistoryData] = useState<GasHistoryData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchHistoryData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await gasService.getGasHistory(network, timeRange);
      setHistoryData(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch history data');
    } finally {
      setLoading(false);
    }
  }, [network, timeRange]);

  useEffect(() => {
    fetchHistoryData();
  }, [fetchHistoryData]);

  return {
    historyData,
    loading,
    error,
    refetch: fetchHistoryData,
  };
};