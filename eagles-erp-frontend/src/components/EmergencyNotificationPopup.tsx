import React, { useState, useEffect } from 'react';
import { Modal, List, Tag, Button, Space, Typography, Badge } from 'antd';
import { 
  ExclamationCircleOutlined, 
  CloseOutlined, 
  BellOutlined,
  ClockCircleOutlined,
  WarningOutlined,
  CheckCircleOutlined,
  SyncOutlined
} from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

const { Text, Title } = Typography;

interface EmergencyNotification {
  id: string;
  vessel: string;
  module: string;
  status: string;
  count: number;
  description: string;
  priority: 'high' | 'medium' | 'low';
  lastUpdate: string;
}

interface EmergencyNotificationPopupProps {
  visible: boolean;
  onClose: () => void;
}

const EmergencyNotificationPopup: React.FC<EmergencyNotificationPopupProps> = ({ 
  visible, 
  onClose 
}) => {
  const navigate = useNavigate();
  const [notifications, setNotifications] = useState<EmergencyNotification[]>([]);

  // Mock emergency notifications data
  useEffect(() => {
    const emergencyData: EmergencyNotification[] = [
      {
        id: '1',
        vessel: 'BATTLESHIP',
        module: 'Certificate',
        status: 'Overdue',
        count: 20,
        description: 'Safety Management Certificate expired',
        priority: 'high',
        lastUpdate: '2 hours ago'
      },
      {
        id: '2',
        vessel: 'BATTLESHIP',
        module: 'Deficiency',
        status: 'NC',
        count: 5,
        description: 'Critical non-conformities identified',
        priority: 'high',
        lastUpdate: '4 hours ago'
      },
      {
        id: '3',
        vessel: 'VOYAGER',
        module: 'Certificate',
        status: 'Overdue',
        count: 30,
        description: 'Multiple certificates expired',
        priority: 'high',
        lastUpdate: '45 minutes ago'
      },
      {
        id: '4',
        vessel: 'BLACK PEARL',
        module: 'Maintenance',
        status: 'Overdue',
        count: 10,
        description: 'Engine maintenance overdue',
        priority: 'high',
        lastUpdate: '30 minutes ago'
      }
    ];

    setNotifications(emergencyData);
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Overdue': return '#ef4444';
      case 'NC': return '#dc2626';
      case 'Not Completed': return '#f59e0b';
      default: return '#64748b';
    }
  };

  const getModuleIcon = (module: string) => {
    switch (module) {
      case 'Certificate': return <CheckCircleOutlined style={{ color: '#10b981' }} />;
      case 'Deficiency': return <ExclamationCircleOutlined style={{ color: '#ef4444' }} />;
      case 'Maintenance': return <SyncOutlined style={{ color: '#f59e0b' }} />;
      case 'Risk Assessment': return <WarningOutlined style={{ color: '#8b5cf6' }} />;
      default: return <BellOutlined />;
    }
  };

  const getPriorityColor = (priority: 'high' | 'medium' | 'low') => {
    switch (priority) {
      case 'high': return '#ef4444';
      case 'medium': return '#f59e0b';
      case 'low': return '#10b981';
      default: return '#64748b';
    }
  };

  const getVesselCode = (vesselName: string) => {
    const vesselMap: { [key: string]: string } = {
      'BATTLESHIP': '01_HS',
      'BLACK PEARL': '02_BP',
      'FAKAR': '03_FK',
      'VOYAGER': '04_VG'
    };
    return vesselMap[vesselName] || vesselName;
  };

  const handleNotificationClick = (notification: EmergencyNotification) => {
    navigate(`/${notification.module}?vessel=${getVesselCode(notification.vessel)}`);
    onClose();
  };

  const handleViewAll = () => {
    navigate('/notifications');
    onClose();
  };

  return (
    <Modal
      title={
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <ExclamationCircleOutlined style={{ color: '#ef4444', fontSize: '20px' }} />
          <span style={{ color: '#ef4444', fontWeight: 'bold', fontSize: '18px' }}>
            Emergency Notifications
          </span>
          <Badge 
            count={notifications.length} 
            style={{ 
              backgroundColor: '#ef4444',
              color: 'white'
            }} 
          />
        </div>
      }
      open={visible}
      onCancel={onClose}
      footer={[
        <Button key="close" onClick={onClose} style={{ border: '1px solid #d1d5db' }}>
          Close
        </Button>,
        <Button 
          key="viewAll" 
          type="primary" 
          onClick={handleViewAll}
          style={{ 
            background: '#ef4444',
            border: 'none'
          }}
        >
          View All Notifications
        </Button>
      ]}
      width={600}
      style={{ top: 50 }}
      styles={{
        body: {
          maxHeight: '400px', 
          overflowY: 'auto',
          padding: '16px'
        }
      }}
    >
      <div style={{ marginBottom: '16px' }}>
        <Text style={{ color: '#64748b', fontSize: '14px' }}>
          <ClockCircleOutlined style={{ marginRight: '8px' }} />
          Critical alerts requiring immediate attention
        </Text>
      </div>

      <List
        dataSource={notifications}
        renderItem={(item) => (
          <List.Item
            style={{
              padding: '12px',
              border: '1px solid #e5e7eb',
              borderRadius: '8px',
              marginBottom: '8px',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
              background: item.priority === 'high' ? '#fef2f2' : '#ffffff'
            }}
            onClick={() => handleNotificationClick(item)}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = '#f8fafc';
              e.currentTarget.style.borderColor = '#3b82f6';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = item.priority === 'high' ? '#fef2f2' : '#ffffff';
              e.currentTarget.style.borderColor = '#e5e7eb';
            }}
          >
            <div style={{ width: '100%' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <div style={{
                    width: '8px',
                    height: '8px',
                    borderRadius: '50%',
                    background: '#1e40af'
                  }} />
                  <Text strong style={{ color: '#1e40af', fontSize: '14px' }}>
                    {item.vessel}
                  </Text>
                </div>
                <div style={{ display: 'flex', gap: '8px' }}>
                  <Tag color={getStatusColor(item.status)} style={{ fontWeight: 'bold', fontSize: '11px' }}>
                    {item.status}
                  </Tag>
                  <Tag color={getPriorityColor(item.priority)} style={{ fontWeight: 'bold', fontSize: '11px' }}>
                    {item.priority.toUpperCase()}
                  </Tag>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
                {getModuleIcon(item.module)}
                <Text style={{ color: '#374151', fontSize: '13px', fontWeight: '500' }}>
                  {item.module}
                </Text>
                <Badge 
                  count={item.count} 
                  style={{ 
                    backgroundColor: item.count > 50 ? '#ef4444' : item.count > 20 ? '#f59e0b' : '#10b981',
                    color: 'white',
                    fontSize: '10px'
                  }} 
                />
              </div>

              <Text style={{ color: '#374151', fontSize: '12px', display: 'block', marginBottom: '4px' }}>
                {item.description}
              </Text>

              <Text style={{ color: '#64748b', fontSize: '11px' }}>
                <ClockCircleOutlined style={{ marginRight: '4px' }} />
                {item.lastUpdate}
              </Text>
            </div>
          </List.Item>
        )}
      />

      {notifications.length === 0 && (
        <div style={{ 
          textAlign: 'center', 
          padding: '40px 20px',
          color: '#64748b'
        }}>
          <CheckCircleOutlined style={{ fontSize: '48px', color: '#10b981', marginBottom: '16px' }} />
          <div style={{ fontSize: '16px', fontWeight: '500', marginBottom: '8px' }}>
            No Emergency Notifications
          </div>
          <div style={{ fontSize: '14px' }}>
            All systems are operating normally
          </div>
        </div>
      )}
    </Modal>
  );
};

export default EmergencyNotificationPopup; 