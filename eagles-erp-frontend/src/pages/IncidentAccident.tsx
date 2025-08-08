import React from 'react';
import { Card, Typography } from 'antd';

const { Title } = Typography;

const IncidentAccident: React.FC = () => {
  return (
    <div>
      <Title level={2}>Incident / Accident</Title>
      <Card>
        <p>Incident / Accident sayfası içeriği burada olacak.</p>
      </Card>
    </div>
  );
};

export default IncidentAccident; 