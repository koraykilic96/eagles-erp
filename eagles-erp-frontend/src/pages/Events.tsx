import React from 'react';
import { Card, Typography } from 'antd';

const { Title } = Typography;

const Events: React.FC = () => {
  return (
    <div>
      <Title level={2}>Events</Title>
      <Card>
        <p>Events sayfası içeriği burada olacak.</p>
      </Card>
    </div>
  );
};

export default Events; 