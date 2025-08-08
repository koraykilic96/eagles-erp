import React from 'react';
import { Card, Typography } from 'antd';

const { Title } = Typography;

const NearMiss: React.FC = () => {
  return (
    <div>
      <Title level={2}>Near Miss</Title>
      <Card>
        <p>Near Miss sayfası içeriği burada olacak.</p>
      </Card>
    </div>
  );
};

export default NearMiss; 