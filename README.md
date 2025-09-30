# Gas Monitor Dashboard

实时Gas费监控面板，支持以太坊及其他EVM链的Gas费监控和分析。

## 功能特性

- 🔥 **实时Gas费显示** - 显示慢速、标准、快速三种Gas费价格
- 📊 **历史图表** - 可视化展示Gas费变化趋势，支持多种时间范围
- 🌐 **多网络支持** - 支持以太坊、BSC、Polygon等网络
- 📱 **响应式设计** - 完美适配桌面和移动设备
- ⚡ **实时更新** - 每30秒自动更新Gas费数据

## 快速开始

### 1. 安装依赖

```bash
npm install
# 或
yarn install
```

### 2. 配置API密钥

复制环境变量文件：
```bash
cp .env.example .env
```

编辑 `.env` 文件，配置你的API密钥：

#### 申请Etherscan API密钥（推荐）

1. 访问 [https://etherscan.io/apis](https://etherscan.io/apis)
2. 注册并登录账户
3. 进入 "API-KEYs" 页面
4. 创建新的API密钥
5. 复制密钥到 `.env` 文件

```env
VITE_ETHERSCAN_API_KEY=your_etherscan_api_key_here
```

#### 申请Alchemy API密钥（可选，作为备用）

1. 访问 [https://www.alchemy.com/](https://www.alchemy.com/)
2. 注册并创建新App
3. 选择 Ethereum Mainnet
4. 复制API密钥到 `.env` 文件

```env
VITE_ALCHEMY_API_KEY=your_alchemy_api_key_here
```

### 3. 启动开发服务器

```bash
npm run dev
# 或
yarn dev
```

访问 [http://localhost:3000](http://localhost:3000) 查看应用。

## API说明

### Etherscan API
- **免费额度**: 每天100,000次请求
- **数据准确**: 官方数据，更新及时
- **功能完整**: 支持Gas费预测和历史数据

### Alchemy API
- **免费额度**: 每月300M请求单位
- **企业级**: 更稳定的服务
- **多网络**: 支持多种区块链网络

## 项目结构

```
src/
├── components/          # React组件
│   ├── GasCard.tsx     # Gas费显示卡片
│   ├── GasChart.tsx    # 历史图表组件
│   └── NetworkSelector.tsx # 网络选择器
├── hooks/              # 自定义Hook
│   └── useGasData.ts   # Gas数据获取Hook
├── services/           # API服务
│   └── gasService.ts   # Gas费API服务
├── types/              # TypeScript类型定义
│   └── gas.ts          # Gas费相关类型
├── utils/              # 工具函数
│   └── networks.ts     # 网络配置
└── App.tsx             # 主应用组件
```

## 技术栈

- **前端框架**: React 18 + TypeScript
- **UI组件库**: Ant Design
- **图表库**: Recharts
- **HTTP客户端**: Axios
- **构建工具**: Vite
- **开发工具**: ESLint + TypeScript

## 部署

### 构建生产版本

```bash
npm run build
# 或
yarn build
```

### 预览生产版本

```bash
npm run preview
# 或
yarn preview
```

## 贡献

欢迎提交Issue和Pull Request来改进这个项目。

## 许可证

MIT License

好的，我来给你系统地介绍一下 **加密货币里的 gas**。

---

## 1. 什么是 Gas？

在区块链（尤其是 **以太坊 Ethereum**）里，**Gas 就是交易或智能合约运行时需要支付的计算费用**。
它相当于区块链世界里的“燃料”，用来激励矿工或验证者去打包和执行你的交易。

* **Gas 本质**：一种计量单位，用来衡量某个操作需要多少计算资源（CPU、内存、存储、带宽）。
* **支付方式**：用户用区块链的原生代币（比如 ETH）来支付 Gas。

---

## 2. Gas 的组成部分

一次区块链交易需要两个核心参数：

1. **Gas Limit（燃料上限）**

   * 你愿意为这笔交易支付的 **最大 Gas 数量**。
   * 防止程序进入死循环，避免无限消耗。
   * 举例：转账可能只要 21,000 gas，而调用复杂的 DeFi 合约可能需要几百万 gas。

2. **Gas Price（燃料单价）**

   * 你愿意为每单位 Gas 支付多少 ETH（通常用 **gwei** 表示，1 gwei = 0.000000001 ETH）。
   * Gas Price 越高，矿工/验证者越愿意优先打包你的交易。

**最终手续费计算公式**：
[
交易费 = Gas\ Limit \times Gas\ Price
]

---

## 3. 举个例子

* **普通转账 ETH**：大约需要 21,000 gas。

* 如果 Gas Price = 30 gwei，且 ETH = 2000 USD：

  * 手续费 = 21,000 × 30 gwei = 0.00063 ETH ≈ 1.26 美元。

* **复杂的合约操作（如 Uniswap 交易、NFT mint）**：可能需要 200,000~1,000,000 gas，手续费会成倍增加。

---

## 4. 为什么 Gas 会波动？

Gas 费用常常高低不一，原因主要有：

* **区块容量有限**：每个区块能处理的 Gas 总量有限（如以太坊约 30M gas）。
* **网络拥堵**：当交易量很大时，大家会竞价，Gas Price 上升。
* **合约复杂度**：不同操作消耗的 Gas 数量差别很大。

---

## 5. 相关改进

* **EIP-1559（以太坊伦敦升级）**
  引入了 **Base Fee + Priority Fee** 机制：

  * Base Fee（基础费）：自动调整，直接销毁（减少 ETH 通胀）。
  * Priority Fee（小费）：给矿工/验证者的激励，类似小费。

这样 Gas 更透明，用户只需设置 **最大费用上限**。

---

## 6. 不同链的 Gas

* **以太坊**：Gas 成本较高，拥堵时几美元到几十美元。
* **L2（Arbitrum、Optimism、zkSync）**：手续费低很多，几美分到几毛钱。
* **其他链（BSC、Solana、Polygon）**：因为设计不同，Gas 费往往更低。

---

📌 **一句话总结**：
Gas 就是区块链里的“手续费单位”，用来衡量和支付执行交易所需的计算成本。Gas 价格由市场决定，Gas 消耗量取决于交易复杂度。

---