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