export interface GasFee {
  slow: number;
  standard: number;
  fast: number;
  timestamp: number;
  network: string;
}

export interface GasPrice {
  gasPrice: number;
  maxFeePerGas?: number;
  maxPriorityFeePerGas?: number;
}

export interface GasData {
  slow: GasPrice;
  standard: GasPrice;
  fast: GasPrice;
  timestamp: number;
  network: string;
  baseFee?: number;
}

export interface NetworkConfig {
  id: string;
  name: string;
  symbol: string;
  rpcUrl: string;
  explorerUrl: string;
  chainId: number;
}

export interface GasHistoryData {
  timestamp: number;
  slow: number;
  standard: number;
  fast: number;
}

export type TimeRange = '1h' | '6h' | '24h' | '7d' | '30d';

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  error?: string;
}