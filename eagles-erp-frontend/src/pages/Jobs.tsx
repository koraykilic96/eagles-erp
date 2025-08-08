import React from 'react';
import { Card, Typography } from 'antd';

const { Title } = Typography;

const Jobs: React.FC = () => {
  return (
    <div>
      <Title level={2}>Jobs</Title>
      <Card>
        <p>Jobs sayfası içeriği burada olacak.</p>
      </Card>
    </div>
  );
};

export default Jobs; 