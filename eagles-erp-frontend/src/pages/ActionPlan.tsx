import React from 'react';
import { Card, Typography } from 'antd';

const { Title } = Typography;

const ActionPlan: React.FC = () => {
  return (
    <div>
      <Title level={2}>Action Plan</Title>
      <Card>
        <p>Action Plan sayfası içeriği burada olacak.</p>
      </Card>
    </div>
  );
};

export default ActionPlan; 