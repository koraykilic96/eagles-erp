import React from 'react';
import { Card, Typography } from 'antd';

const { Title } = Typography;

const SparePart: React.FC = () => {
  return (
    <div>
      <Title level={2}>Spare Part</Title>
      <Card>
        <p>Spare Part sayfası içeriği burada olacak.</p>
      </Card>
    </div>
  );
};

export default SparePart; 