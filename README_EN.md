# Gas Monitor Dashboard

Real-time Gas fee monitoring dashboard supporting Ethereum and other EVM chains for Gas fee monitoring and analysis.

## Features

- 🔥 **Real-time Gas Fee Display** - Shows slow, standard, and fast Gas fee prices
- 📊 **Historical Charts** - Visualizes Gas fee trends with multiple time ranges
- 🌐 **Multi-network Support** - Supports Ethereum, BSC, Polygon, and other networks
- 📱 **Responsive Design** - Perfect adaptation for desktop and mobile devices
- ⚡ **Real-time Updates** - Automatically updates Gas fee data every 30 seconds

## Quick Start

### 1. Install Dependencies

```bash
npm install
# or
yarn install
```

### 2. Configure API Keys

Copy the environment variables file:
```bash
cp .env.example .env
```

Edit the `.env` file and configure your API keys:

#### Get Etherscan API Key (Recommended)

1. Visit [https://etherscan.io/apis](https://etherscan.io/apis)
2. Register and login to your account
3. Go to the "API-KEYs" page
4. Create a new API key
5. Copy the key to your `.env` file

```env
VITE_ETHERSCAN_API_KEY=your_etherscan_api_key_here
```

#### Get Alchemy API Key (Optional, as backup)

1. Visit [https://www.alchemy.com/](https://www.alchemy.com/)
2. Register and create a new App
3. Select Ethereum Mainnet
4. Copy the API key to your `.env` file

```env
VITE_ALCHEMY_API_KEY=your_alchemy_api_key_here
```

### 3. Start Development Server

```bash
npm run dev
# or
yarn dev
```

Visit [http://localhost:3000](http://localhost:3000) to view the application.

## API Information

### Etherscan API
- **Free Quota**: 100,000 requests per day
- **Data Accuracy**: Official data with timely updates
- **Complete Features**: Supports Gas fee prediction and historical data

### Alchemy API
- **Free Quota**: 300M compute units per month
- **Enterprise Grade**: More stable service
- **Multi-network**: Supports multiple blockchain networks

## Project Structure

```
src/
├── components/          # React components
│   ├── GasCard.tsx     # Gas fee display card
│   ├── GasChart.tsx    # Historical chart component
│   └── NetworkSelector.tsx # Network selector
├── hooks/              # Custom hooks
│   └── useGasData.ts   # Gas data fetching hook
├── services/           # API services
│   └── gasService.ts   # Gas fee API service
├── types/              # TypeScript type definitions
│   └── gas.ts          # Gas fee related types
├── utils/              # Utility functions
│   └── networks.ts     # Network configuration
└── App.tsx             # Main application component
```

## Tech Stack

- **Frontend Framework**: React 18 + TypeScript
- **UI Component Library**: Ant Design
- **Chart Library**: Recharts
- **HTTP Client**: Axios
- **Build Tool**: Vite
- **Development Tools**: ESLint + TypeScript

## Deployment

### Build Production Version

```bash
npm run build
# or
yarn build
```

### Preview Production Version

```bash
npm run preview
# or
yarn preview
```

## Contributing

Issues and Pull Requests are welcome to improve this project.

## License

MIT License