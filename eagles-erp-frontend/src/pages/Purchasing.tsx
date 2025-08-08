import React from 'react';
import { Card, Typography } from 'antd';

const { Title } = Typography;

const Purchasing: React.FC = () => {
  return (
    <div>
      <Title level={2}>Purchasing</Title>
      <Card>
        <p>Purchasing sayfası içeriği burada olacak.</p>
      </Card>
    </div>
  );
};

export default Purchasing; 