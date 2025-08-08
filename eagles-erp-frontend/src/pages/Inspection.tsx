import React from 'react';
import { Card, Typography } from 'antd';

const { Title } = Typography;

const Inspection: React.FC = () => {
  return (
    <div>
      <Title level={2}>Inspection</Title>
      <Card>
        <p>Inspection sayfası içeriği burada olacak.</p>
      </Card>
    </div>
  );
};

export default Inspection; 