import React from 'react';
import { Card, Typography } from 'antd';

const { Title } = Typography;

const TrainingDrill: React.FC = () => {
  return (
    <div>
      <Title level={2}>Training & Drill</Title>
      <Card>
        <p>Training & Drill sayfası içeriği burada olacak.</p>
      </Card>
    </div>
  );
};

export default TrainingDrill; 