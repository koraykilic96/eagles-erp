import React from 'react';
import { Card, Typography } from 'antd';

const { Title } = Typography;

const Offer: React.FC = () => {
  return (
    <div>
      <Title level={2}>Offer</Title>
      <Card>
        <p>Offer sayfası içeriği burada olacak.</p>
      </Card>
    </div>
  );
};

export default Offer; 