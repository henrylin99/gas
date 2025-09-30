import axios from 'axios';
import { GasData, GasHistoryData, TimeRange, ApiResponse } from '@/types/gas';

class GasService {
  private etherscanApiKey = import.meta.env.VITE_ETHERSCAN_API_KEY;
  private alchemyApiKey = import.meta.env.VITE_ALCHEMY_API_KEY;

  async getCurrentGasPrice(network: string = 'ethereum'): Promise<GasData> {
    // 如果没有配置真实API密钥，使用模拟数据
    if (!this.etherscanApiKey || this.etherscanApiKey === 'your_etherscan_api_key_here') {
      console.warn('使用模拟数据 - 请配置真实的API密钥以获取实时数据');
      return this.getMockGasData(network);
    }

    // 尝试使用Etherscan API
    try {
      const response = await axios.get('https://api.etherscan.io/api', {
        params: {
          module: 'gastracker',
          action: 'gasoracle',
          apikey: this.etherscanApiKey,
        },
        timeout: 10000, // 10秒超时
      });

      if (response.data.status === '1') {
        const result = response.data.result;

        // 安全的数值转换，防止NaN
        const safeParseGasPrice = (value: any): number => {
          const num = Number(value);
          return isNaN(num) || num <= 0 ? 1 : num;
        };

        return {
          slow: { gasPrice: safeParseGasPrice(result.SafeGasPrice) },
          standard: { gasPrice: safeParseGasPrice(result.StandardGasPrice) },
          fast: { gasPrice: safeParseGasPrice(result.FastGasPrice) },
          timestamp: Date.now(),
          network,
        };
      }

      throw new Error(`Etherscan API error: ${response.data.message}`);
    } catch (error) {
      console.error('Etherscan API 请求失败:', error);

      // 尝试使用Alchemy作为备用数据源
      if (this.alchemyApiKey && this.alchemyApiKey !== 'your_alchemy_api_key_here') {
        try {
          return await this.getGasPriceFromAlchemy(network);
        } catch (alchemyError) {
          console.error('Alchemy API 也失败了:', alchemyError);
        }
      }

      // 如果所有API都失败，返回模拟数据
      console.warn('所有API都失败，使用模拟数据');
      return this.getMockGasData(network);
    }
  }

  private async getGasPriceFromAlchemy(network: string): Promise<GasData> {
    const response = await axios.post(`https://eth-mainnet.g.alchemy.com/v2/${this.alchemyApiKey}`, {
      jsonrpc: '2.0',
      method: 'eth_gasPrice',
      params: [],
      id: 1,
    }, {
      timeout: 10000,
    });

    if (response.data.result) {
      const gasPriceWei = parseInt(response.data.result, 16);
      const gasPriceGwei = Math.round(gasPriceWei / 1e9);

      // Alchemy只返回当前gas价格，我们需要估算不同速度
      return {
        slow: { gasPrice: Math.max(1, gasPriceGwei - 5) },
        standard: { gasPrice: gasPriceGwei },
        fast: { gasPrice: gasPriceGwei + 10 },
        timestamp: Date.now(),
        network,
      };
    }

    throw new Error('Invalid response from Alchemy');
  }

  async getGasHistory(
    network: string = 'ethereum',
    timeRange: TimeRange = '24h'
  ): Promise<GasHistoryData[]> {
    const now = Date.now();
    const intervals = this.getTimeIntervals(timeRange);
    const data: GasHistoryData[] = [];

    for (let i = 0; i < intervals; i++) {
      const timestamp = now - (intervals - i) * this.getInterval(timeRange);
      data.push({
        timestamp,
        slow: this.generateMockGasPrice(15, 25),
        standard: this.generateMockGasPrice(25, 40),
        fast: this.generateMockGasPrice(40, 60),
      });
    }

    return data;
  }

  private getMockGasData(network: string): GasData {
    return {
      slow: { gasPrice: this.generateMockGasPrice(15, 25) },
      standard: { gasPrice: this.generateMockGasPrice(25, 40) },
      fast: { gasPrice: this.generateMockGasPrice(40, 60) },
      timestamp: Date.now(),
      network,
    };
  }

  private generateMockGasPrice(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  private getTimeIntervals(timeRange: TimeRange): number {
    switch (timeRange) {
      case '1h': return 60;
      case '6h': return 72;
      case '24h': return 144;
      case '7d': return 168;
      case '30d': return 180;
      default: return 144;
    }
  }

  private getInterval(timeRange: TimeRange): number {
    switch (timeRange) {
      case '1h': return 60 * 1000;
      case '6h': return 5 * 60 * 1000;
      case '24h': return 10 * 60 * 1000;
      case '7d': return 60 * 60 * 1000;
      case '30d': return 4 * 60 * 60 * 1000;
      default: return 10 * 60 * 1000;
    }
  }
}

export const gasService = new GasService();