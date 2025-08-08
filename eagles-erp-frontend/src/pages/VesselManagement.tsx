import React from 'react';
import { Card, Typography } from 'antd';

const { Title } = Typography;

const VesselManagement: React.FC = () => {
  return (
    <div>
      <Title level={2}>Vessel Management</Title>
      <Card>
        <p>Vessel Management sayfası içeriği burada olacak.</p>
      </Card>
    </div>
  );
};

export default VesselManagement; 