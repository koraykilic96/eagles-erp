import React from 'react';
import { Card, Typography } from 'antd';

const { Title } = Typography;

const KPI: React.FC = () => {
  return (
    <div>
      <Title level={2}>KPI</Title>
      <Card>
        <p>KPI sayfası içeriği burada olacak.</p>
      </Card>
    </div>
  );
};

export default KPI; 