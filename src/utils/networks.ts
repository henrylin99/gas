import { NetworkConfig } from '@/types/gas';

export const NETWORKS: Record<string, NetworkConfig> = {
  ethereum: {
    id: 'ethereum',
    name: 'Ethereum',
    symbol: 'ETH',
    rpcUrl: 'https://eth-mainnet.g.alchemy.com/v2/',
    explorerUrl: 'https://etherscan.io',
    chainId: 1,
  },
  bsc: {
    id: 'bsc',
    name: 'BSC',
    symbol: 'BNB',
    rpcUrl: 'https://bsc-dataseed1.binance.org/',
    explorerUrl: 'https://bscscan.com',
    chainId: 56,
  },
  polygon: {
    id: 'polygon',
    name: 'Polygon',
    symbol: 'MATIC',
    rpcUrl: 'https://polygon-rpc.com/',
    explorerUrl: 'https://polygonscan.com',
    chainId: 137,
  },
};

export const DEFAULT_NETWORK = 'ethereum';