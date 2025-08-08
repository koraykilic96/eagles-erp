import React from 'react';
import { Card, Typography } from 'antd';

const { Title } = Typography;

const ChemicalTestCenter: React.FC = () => {
  return (
    <div>
      <Title level={2}>Chemical Test Center</Title>
      <Card>
        <p>Chemical Test Center sayfası içeriği burada olacak.</p>
      </Card>
    </div>
  );
};

export default ChemicalTestCenter; 