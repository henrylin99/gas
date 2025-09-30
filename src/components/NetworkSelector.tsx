import React from 'react';
import { Select } from 'antd';
import { NETWORKS } from '@/utils/networks';

interface NetworkSelectorProps {
  value: string;
  onChange: (network: string) => void;
}

const NetworkSelector: React.FC<NetworkSelectorProps> = ({ value, onChange }) => {
  const options = Object.values(NETWORKS).map(network => ({
    value: network.id,
    label: network.name,
  }));

  return (
    <Select
      value={value}
      onChange={onChange}
      options={options}
      style={{ width: 120 }}
      placeholder="Select Network"
    />
  );
};

export default NetworkSelector;