import React, { useState } from 'react';
import { Row, Col, Card, Button, Space, Tag, Statistic, Tree, Select, Table, Checkbox } from 'antd';
import { useDrag, useDrop } from 'react-dnd';
import { useNavigate } from 'react-router-dom';
import VesselTrackingMap from '../components/VesselTrackingMap';
import { useEmergencyNotification } from '../hooks/useEmergencyNotification';
import gemiImage from '../assets/gemi.png';
import canSimidiImage from '../assets/can-simidi.png';
import gemiTekerlegiImage from '../assets/gemi-tekerleği.png';
import capaImage from '../assets/capa.png';
import {
  SettingOutlined,
  ExpandOutlined,
  SyncOutlined,
  BarChartOutlined,
  PieChartOutlined,
  LineChartOutlined,
  CheckCircleOutlined,
  ExclamationCircleOutlined,
  ClockCircleOutlined,
  ArrowDownOutlined,
  WarningOutlined,
  SafetyOutlined,
  BellOutlined,
  CaretRightOutlined,
  CaretDownOutlined,
  CaretUpOutlined,
  DollarOutlined,
  SearchOutlined,
} from '@ant-design/icons';

// Draggable Widget Component
const DraggableWidget: React.FC<{
  id: string;
  children: React.ReactNode;
  index: number;
  moveWidget: (dragIndex: number, hoverIndex: number) => void;
}> = ({ id, children, index, moveWidget }) => {
  const [{ isDragging }, drag] = useDrag({
    type: 'widget',
    item: { id, index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const [, drop] = useDrop({
    accept: 'widget',
    hover: (item: { id: string; index: number }) => {
      const dragIndex = item.index;
      const hoverIndex = index;

      if (dragIndex === hoverIndex) {
        return;
      }

      moveWidget(dragIndex, hoverIndex);
      item.index = hoverIndex;
    },
  });

  return (
    <div
      ref={(node) => {
        drag(node);
        drop(node);
      }}
      style={{
        opacity: isDragging ? 0.5 : 1,
        cursor: 'move',
        transition: 'all 0.2s ease',
      }}
    >
      {children}
    </div>
  );
};

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const [searchText, setSearchText] = useState('');
  const { checkAndShowPopup } = useEmergencyNotification();
  const [firstRowOrder, setFirstRowOrder] = useState([
    'emergency-notifications',
    'vessel-maintenance',
    'fleet-performance'
  ]);

  const [secondRowOrder, setSecondRowOrder] = useState([
    'vessel-tracking-map',
    'purchasing-status',
    'remaining-on-board',
    'deficiency-analyze'
  ]);

  const [thirdRowOrder, setThirdRowOrder] = useState([
  ]);

  // Maritime notification data - Expanded from the provided tree structure
  const notificationData = [
    // BATTLESHIP notifications
    { key: 'BATTLESHIP-CERT', vessel: 'BATTLESHIP', module: 'Certificate', status: 'Overdue', count: 20, priority: 'high', lastUpdate: '2 hours ago' },
    { key: 'BATTLESHIP-DEF', vessel: 'BATTLESHIP', module: 'Deficiency', status: 'NC', count: 5, priority: 'high', lastUpdate: '4 hours ago' },
    { key: 'BATTLESHIP-DEF-NC1', vessel: 'BATTLESHIP', module: 'Deficiency', status: 'NC', count: 0, priority: 'high', lastUpdate: '4 hours ago' },
    { key: 'BATTLESHIP-DEF-NC2', vessel: 'BATTLESHIP', module: 'Deficiency', status: 'Not Completed', count: 204, priority: 'medium', lastUpdate: '3 hours ago' },
    { key: 'BATTLESHIP-MAINT', vessel: 'BATTLESHIP', module: 'Maintenance', status: 'Overdue', count: 8, priority: 'high', lastUpdate: '1 hour ago' },
    { key: 'BATTLESHIP-RISK', vessel: 'BATTLESHIP', module: 'Risk Assessment', status: 'Approved', count: 2, priority: 'low', lastUpdate: '6 hours ago' },
    { key: 'BATTLESHIP-RISK-APP1', vessel: 'BATTLESHIP', module: 'Risk Assessment', status: 'Approved', count: 1, priority: 'low', lastUpdate: '6 hours ago' },
    { key: 'BATTLESHIP-RISK-APP2', vessel: 'BATTLESHIP', module: 'Risk Assessment', status: 'Approved', count: 1, priority: 'low', lastUpdate: '6 hours ago' },
    { key: 'BATTLESHIP-RISK-REJ1', vessel: 'BATTLESHIP', module: 'Risk Assessment', status: 'Rejected', count: 1, priority: 'medium', lastUpdate: '5 hours ago' },
    { key: 'BATTLESHIP-RISK-REJ2', vessel: 'BATTLESHIP', module: 'Risk Assessment', status: 'Rejected', count: 1, priority: 'medium', lastUpdate: '5 hours ago' },
    
    // BLACK PEARL notifications
    { key: 'BLACK_PEARL-MAINT', vessel: 'BLACK PEARL', module: 'Maintenance', status: 'Overdue', count: 10, priority: 'high', lastUpdate: '30 minutes ago' },
    { key: 'BLACK_PEARL-RISK', vessel: 'BLACK PEARL', module: 'Risk Assessment', status: 'Waiting', count: 10, priority: 'medium', lastUpdate: '2 hours ago' },
    { key: 'BLACK_PEARL-RISK-APP1', vessel: 'BLACK PEARL', module: 'Risk Assessment', status: 'Approved', count: 2, priority: 'low', lastUpdate: '3 hours ago' },
    { key: 'BLACK_PEARL-RISK-REJ1', vessel: 'BLACK PEARL', module: 'Risk Assessment', status: 'Rejected', count: 6, priority: 'medium', lastUpdate: '2 hours ago' },
    { key: 'BLACK_PEARL-RISK-REJ2', vessel: 'BLACK PEARL', module: 'Risk Assessment', status: 'Rejected', count: 6, priority: 'medium', lastUpdate: '2 hours ago' },
    { key: 'BLACK_PEARL-RISK-WAIT1', vessel: 'BLACK PEARL', module: 'Risk Assessment', status: 'Waiting', count: 171, priority: 'high', lastUpdate: '1 hour ago' },
    { key: 'BLACK_PEARL-RISK-WAIT2', vessel: 'BLACK PEARL', module: 'Risk Assessment', status: 'Waiting', count: 171, priority: 'high', lastUpdate: '1 hour ago' },
    
    // FAKAR notifications
    { key: 'FAKAR-RISK', vessel: 'FAKAR', module: 'Risk Assessment', status: 'Waiting', count: 11, priority: 'medium', lastUpdate: '1 hour ago' },
    { key: 'FAKAR-RISK-WAIT', vessel: 'FAKAR', module: 'Risk Assessment', status: 'Waiting', count: 11, priority: 'medium', lastUpdate: '1 hour ago' },
    
    // Azeri Karabakh notifications
    { key: 'AZERI_KARABAKH-DEF', vessel: 'Azeri Karabakh', module: 'Deficiency', status: 'NC', count: 1, priority: 'high', lastUpdate: '3 hours ago' },
    { key: 'AZERI_KARABAKH-DEF-NC', vessel: 'Azeri Karabakh', module: 'Deficiency', status: 'NC', count: 1, priority: 'high', lastUpdate: '3 hours ago' },
    { key: 'AZERI_KARABAKH-DEF-NOT', vessel: 'Azeri Karabakh', module: 'Deficiency', status: 'Not Completed', count: 1, priority: 'medium', lastUpdate: '4 hours ago' },
    
    // VOYAGER notifications
    { key: 'VOYAGER-CERT', vessel: 'VOYAGER', module: 'Certificate', status: 'Overdue', count: 30, priority: 'high', lastUpdate: '45 minutes ago' },
    { key: 'VOYAGER-DEF', vessel: 'VOYAGER', module: 'Deficiency', status: 'NC', count: 7, priority: 'high', lastUpdate: '2 hours ago' },
    { key: 'VOYAGER-DEF-NC', vessel: 'VOYAGER', module: 'Deficiency', status: 'NC', count: 7, priority: 'high', lastUpdate: '2 hours ago' },
    { key: 'VOYAGER-DEF-NOT', vessel: 'VOYAGER', module: 'Deficiency', status: 'Not Completed', count: 30, priority: 'medium', lastUpdate: '3 hours ago' },
    { key: 'VOYAGER-MAINT', vessel: 'VOYAGER', module: 'Maintenance', status: 'Overdue', count: 3, priority: 'medium', lastUpdate: '4 hours ago' },
    { key: 'VOYAGER-RISK', vessel: 'VOYAGER', module: 'Risk Assessment', status: 'Waiting', count: 2, priority: 'low', lastUpdate: '5 hours ago' },
    { key: 'VOYAGER-RISK-WAIT1', vessel: 'VOYAGER', module: 'Risk Assessment', status: 'Waiting', count: 2, priority: 'low', lastUpdate: '5 hours ago' },
    { key: 'VOYAGER-RISK-WAIT2', vessel: 'VOYAGER', module: 'Risk Assessment', status: 'Waiting', count: 2, priority: 'low', lastUpdate: '5 hours ago' },
  ];

  // Chart data
  const vesselMaintenanceData = [
    { vessel: 'TITANIC', completed: 85, pending: 15, overdue: 5 },
    { vessel: 'BLACK PEARL', completed: 78, pending: 12, overdue: 10 },
    { vessel: 'VOYAGER', completed: 65, pending: 25, overdue: 10 },
    { vessel: 'EAGLES', completed: 92, pending: 6, overdue: 2 },
    { vessel: 'BATTLESHIP', completed: 70, pending: 20, overdue: 10 },
  ];

  const fleetPerformanceData = [
    { month: 'Jan', efficiency: 85, safety: 92, compliance: 88 },
    { month: 'Feb', efficiency: 87, safety: 89, compliance: 91 },
    { month: 'Mar', efficiency: 82, safety: 94, compliance: 87 },
    { month: 'Apr', efficiency: 89, safety: 91, compliance: 93 },
    { month: 'May', efficiency: 91, safety: 96, compliance: 90 },
    { month: 'Jun', efficiency: 88, safety: 93, compliance: 95 },
  ];

  const expenseData = [
    { type: 'Operational', value: 45, color: '#60a5fa' },
    { type: 'Maintenance', value: 30, color: '#34d399' },
    { type: 'Emergency', value: 15, color: '#f87171' },
    { type: 'Regulatory', value: 10, color: '#fbbf24' },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Overdue': return '#f87171';
      case 'NC': return '#ef4444';
      case 'Not Completed': return '#fbbf24';
      case 'Approved': return '#34d399';
      case 'Rejected': return '#f87171';
      case 'Waiting': return '#60a5fa';
      default: return '#9ca3af';
    }
  };

  const getModuleIcon = (module: string) => {
    switch (module) {
      case 'Certificate': return <CheckCircleOutlined style={{ color: '#34d399' }} />;
      case 'Deficiency': return <ExclamationCircleOutlined style={{ color: '#f87171' }} />;
      case 'Maintenance': return <SyncOutlined style={{ color: '#fbbf24' }} />;
      case 'Risk Assessment': return <WarningOutlined style={{ color: '#a78bfa' }} />;
      default: return <BellOutlined />;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return '#f87171';
      case 'medium': return '#fbbf24';
      case 'low': return '#34d399';
      default: return '#9ca3af';
    }
  };

  // Convert notifications to tree structure with 3 levels
  const convertToTreeData = (data: any[]) => {
    // First level: Group by vessel
    const vesselGroups = data.reduce((acc: any, item: any) => {
      if (!acc[item.vessel]) {
        acc[item.vessel] = [];
      }
      acc[item.vessel].push(item);
      return acc;
    }, {});

    return Object.keys(vesselGroups).map(vessel => {
      const vesselNotifications = vesselGroups[vessel];
      const totalCount = vesselNotifications.reduce((sum: number, item: any) => sum + item.count, 0);
      const criticalStatusCount = vesselNotifications.filter((item: any) => 
        item.status === 'Overdue' || item.status === 'NC'
      ).length;

      // Second level: Group by module within each vessel
      const moduleGroups = vesselNotifications.reduce((acc: any, item: any) => {
        if (!acc[item.module]) {
          acc[item.module] = [];
        }
        acc[item.module].push(item);
        return acc;
      }, {});

      return {
        title: (
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{ 
                  width: '10px', 
                  height: '10px', 
                  borderRadius: '50%', 
                  background: criticalStatusCount > 0 ? '#f87171' : '#34d399' 
                }} />
                <span style={{ fontWeight: 'bold', fontSize: '14px', color: '#374151' }}>
                  {vessel}
                </span>
                <Tag 
                  color={criticalStatusCount > 0 ? '#f87171' : '#34d399'} 
                  style={{ color: '#ffffff', fontSize: '10px' }}
                >
                  {criticalStatusCount > 0 ? 'CRITICAL' : 'ACTIVE'}
                </Tag>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <span style={{ 
                  background: '#f87171', 
                  color: '#ffffff', 
                  borderRadius: '12px', 
                  padding: '2px 8px', 
                  fontSize: '11px',
                  fontWeight: '600'
                }}>
                  {totalCount}
                </span>
              </div>
            </div>
        ),
        key: vessel,
        children: Object.keys(moduleGroups).map(module => {
          const moduleNotifications = moduleGroups[module];
          const moduleCount = moduleNotifications.reduce((sum: number, item: any) => sum + item.count, 0);
          const moduleCriticalCount = moduleNotifications.filter((item: any) => 
            item.status === 'Overdue' || item.status === 'NC'
          ).length;

          return {
            title: (
                          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                {getModuleIcon(module)}
                <span style={{ color: '#374151', fontWeight: '500' }}>{module}</span>
                <Tag 
                  color={moduleCriticalCount > 0 ? '#f87171' : '#34d399'} 
                  style={{ color: '#ffffff' }}
                >
                  {moduleCriticalCount > 0 ? 'CRITICAL' : 'ACTIVE'}
                </Tag>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ color: '#000000', fontSize: '12px', fontWeight: '600' }}>
                  {moduleCount}
                </span>
              </div>
            </div>
            ),
            key: `${vessel}-${module}`,
            children: moduleNotifications.map((notification: any) => ({
              title: (
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Tag color={getStatusColor(notification.status)} style={{ color: '#ffffff' }}>
                      {notification.status}
                    </Tag>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{ color: '#000000', fontSize: '12px', fontWeight: '600' }}>
                      {notification.count}
                    </span>
                    <Tag color={getPriorityColor(notification.priority)} style={{ color: '#ffffff' }}>
                      {notification.priority.toUpperCase()}
                    </Tag>
                  </div>
                </div>
              ),
              key: notification.key,
              isLeaf: true
            }))
          };
        })
      };
    });
  };

  const treeData = convertToTreeData(notificationData);

  const moveFirstRowWidget = (dragIndex: number, hoverIndex: number) => {
    const newOrder = [...firstRowOrder];
    const draggedItem = newOrder[dragIndex];
    newOrder.splice(dragIndex, 1);
    newOrder.splice(hoverIndex, 0, draggedItem);
    setFirstRowOrder(newOrder);
  };

  const getWidgetById = (id: string) => {
    switch (id) {
      case 'emergency-notifications':
        return (
          <Col xs={24} lg={8} key={id}>
            <DraggableWidget id={id} index={firstRowOrder.indexOf(id)} moveWidget={moveFirstRowWidget}>
              <Card 
                title={
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <ExclamationCircleOutlined style={{ color: '#f87171', fontSize: '18px' }} />
                    <span style={{ color: '#374151', fontWeight: 'bold' }}>Emergency Notifications</span>
                  </div>
                }
                extra={
                  <Space>
                    <Button type="link" onClick={() => window.location.href = '/notifications'}>
                      View All
                    </Button>
                  </Space>
                }
                style={{ 
                  borderRadius: '12px', 
                  border: '1px solid #e5e7eb', 
                  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.06)'
                }}
              >
                <div style={{ 
                  background: '#ffffff', 
                  padding: '12px', 
                  height: '272px', 
                  borderRadius: '8px',
                  overflowY: 'auto'
                }}>
                  <style>
                    {`
                      .ant-tree-switcher {
                        display: flex !important;
                        align-items: center !important;
                        justify-content: center !important;
                        height: 24px !important;
                        width: 24px !important;
                        margin-right: 8px !important;
                      }
                      .ant-tree-node-content-wrapper {
                        display: flex !important;
                        align-items: center !important;
                        height: 32px !important;
                      }
                      .ant-tree-title {
                        display: flex !important;
                        align-items: center !important;
                        width: 100% !important;
                      }
                    `}
                  </style>
                  <Tree
                    treeData={treeData}
                    defaultExpandAll={false}
                    showLine={false}
                    showIcon={false}
                    onSelect={(selectedKeys, info) => {
                      if (info.node.isLeaf) {
                        const vessel = info.node.key.split('-')[0];
                        const module = info.node.key.split('-')[1];
                        
                        // Convert vessel name to vessel code
                        const getVesselCode = (vesselName: string) => {
                          const vesselMap: { [key: string]: string } = {
                            'BATTLESHIP': '01_HS',
                            'BLACK PEARL': '02_BP',
                            'FAKAR': '03_FK',
                            'VOYAGER': '04_VG'
                          };
                          return vesselMap[vesselName] || vesselName;
                        };
                        
                        const vesselCode = getVesselCode(vessel);
                        navigate(`/${module}?vessel=${vesselCode}`);
                      }
                    }}
                    switcherIcon={({ expanded }) => 
                      expanded ? (
                        <CaretRightOutlined style={{ color: '#f87171', fontSize: '12px' }} />
                      ) : (
                        <CaretDownOutlined style={{ color: '#f87171', fontSize: '12px' }} />
                      )
                    }
                    titleRender={(nodeData) => (
                      <div style={{ 
                        padding: '8px 0', 
                        borderBottom: (nodeData as any).isLeaf ? 'none' : '1px solid #f0f0f0',
                        width: '100%',
                        display: 'flex',
                        alignItems: 'center',
                        cursor: (nodeData as any).isLeaf ? 'pointer' : 'default'
                      }}>
                        {nodeData.title}
                      </div>
                    )}
                  />
                </div>
              </Card>
            </DraggableWidget>
          </Col>
        );
      case 'vessel-maintenance':
        return (
          <Col xs={24} lg={8} key={id}>
            <DraggableWidget id={id} index={firstRowOrder.indexOf(id)} moveWidget={moveFirstRowWidget}>
              <Card
                title={
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <BarChartOutlined style={{ color: '#60a5fa', fontSize: '18px' }} />
                    <span style={{ color: '#374151', fontWeight: 'bold' }}>Vessel Maintenance Status</span>
                  </div>
                }
                style={{ 
                  borderRadius: '12px', 
                  border: '1px solid #e5e7eb', 
                  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.06)'
                }}
              >
                <div style={{ height: '272px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  {vesselMaintenanceData.map((vessel, index) => (
                    <div key={vessel.vessel} style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <span style={{ 
                        minWidth: '80px', 
                        fontSize: '12px', 
                        fontWeight: '500', 
                        color: '#374151' 
                      }}>
                        {vessel.vessel}
                      </span>
                      <div style={{ 
                        flex: 1, 
                        height: '20px', 
                        background: '#f3f4f6', 
                        borderRadius: '4px',
                        overflow: 'hidden',
                        position: 'relative'
                      }}>
                        <div style={{
                          position: 'absolute',
                          left: 0,
                          top: 0,
                          height: '100%',
                          width: `${vessel.completed}%`,
                          background: '#34d399'
                        }} />
                        <div style={{
                          position: 'absolute',
                          left: `${vessel.completed}%`,
                          top: 0,
                          height: '100%',
                          width: `${vessel.pending}%`,
                          background: '#fbbf24'
                        }} />
                        <div style={{
                          position: 'absolute',
                          left: `${vessel.completed + vessel.pending}%`,
                          top: 0,
                          height: '100%',
                          width: `${vessel.overdue}%`,
                          background: '#f87171'
                        }} />
                      </div>
                      <div style={{ display: 'flex', gap: '8px', fontSize: '10px' }}>
                        <span style={{ color: '#34d399' }}>{vessel.completed}%</span>
                        <span style={{ color: '#fbbf24' }}>{vessel.pending}%</span>
                        <span style={{ color: '#f87171' }}>{vessel.overdue}%</span>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </DraggableWidget>
          </Col>
        );
      case 'fleet-performance':
        return (
          <Col xs={24} lg={8} key={id}>
            <DraggableWidget id={id} index={firstRowOrder.indexOf(id)} moveWidget={moveFirstRowWidget}>
              <Card
                title={
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <DollarOutlined style={{ color: '#8b5cf6', fontSize: '18px' }} />
                    <span style={{ color: '#374151', fontWeight: 'bold' }}>Expenses</span>
                  </div>
                }
                extra={
        <Space>
                    <Button 
                      type="text" 
                      size="small" 
                      icon={<SearchOutlined />} 
                      style={{ borderRadius: '50%', width: '32px', height: '32px' }}
                    />
                    <Button 
                      type="text" 
          size="small" 
                      icon={<CaretUpOutlined />} 
                      style={{ borderRadius: '50%', width: '32px', height: '32px' }}
                    />
                  </Space>
                }
                style={{ 
                  borderRadius: '12px', 
                  border: '1px solid #e5e7eb', 
                  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.06)'
                }}
              >
                <div style={{ height: '272px', padding: '16px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                  {/* Donut Chart */}
                  <div style={{ 
                    display: 'flex', 
                    justifyContent: 'center', 
                    alignItems: 'center', 
                    flex: 1,
                    position: 'relative'
                  }}>
                    <div style={{
                      width: '200px',
                      height: '200px',
                      borderRadius: '50%',
                      background: 'conic-gradient(#FFCC33 0deg 220deg, #40CCC4 220deg 320deg, #FF6666 320deg 360deg)',
                      position: 'relative',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}>
                      <div style={{
                        width: '120px',
                        height: '120px',
                        borderRadius: '50%',
                        background: 'white',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}>
                        <div style={{ textAlign: 'center' }}>
                          <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#374151' }}>$2.4M</div>
                          <div style={{ fontSize: '12px', color: '#6b7280' }}>Total</div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Legend */}
                  <div style={{ 
                    display: 'flex', 
                    justifyContent: 'space-around', 
                    alignItems: 'center',
                    padding: '16px 0'
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <div style={{ 
                        width: '12px', 
                        height: '12px', 
                        borderRadius: '50%', 
                        background: '#FFCC33' 
                      }} />
                      <span style={{ fontSize: '12px', color: '#374151' }}>Operational</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <div style={{ 
                        width: '12px', 
                        height: '12px', 
                        borderRadius: '50%', 
                        background: '#40CCC4' 
                      }} />
                      <span style={{ fontSize: '12px', color: '#374151' }}>Maintenance</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <div style={{ 
                        width: '12px', 
                        height: '12px', 
                        borderRadius: '50%', 
                        background: '#FF6666' 
                      }} />
                      <span style={{ fontSize: '12px', color: '#374151' }}>Emergency</span>
                    </div>
                  </div>
                </div>
              </Card>
            </DraggableWidget>
          </Col>
        );
      case 'purchasing-status':
        return (
          <Col xs={24} lg={8} key={id}>
            <DraggableWidget id={id} index={secondRowOrder.indexOf(id)} moveWidget={(dragIndex, hoverIndex) => {
              const newOrder = [...secondRowOrder];
              const draggedItem = newOrder[dragIndex];
              newOrder.splice(dragIndex, 1);
              newOrder.splice(hoverIndex, 0, draggedItem);
              setSecondRowOrder(newOrder);
            }}>
              <Card
                title={
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <BarChartOutlined style={{ color: '#3b82f6', fontSize: '18px' }} />
                    <span style={{ color: '#374151', fontWeight: 'bold' }}>Purchasing Status Count (by Vessel)</span>
                  </div>
                }
                style={{ 
                  borderRadius: '12px', 
                  border: '1px solid #e5e7eb', 
                  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.06)'
                }}
              >
                <div style={{ height: '400px', padding: '16px' }}>
                  {/* Custom Stacked Bar Chart */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', height: '100%' }}>
                    {[
                      { vessel: 'BATTLES', closed: 15, open: 85, ordered: 0 },
                      { vessel: 'VOYAGER', closed: 10, open: 90, ordered: 0 },
                      { vessel: 'EAGLES', closed: 20, open: 80, ordered: 0 },
                      { vessel: 'DUMLUPI', closed: 60, open: 40, ordered: 0 },
                      { vessel: 'BANDIRM', closed: 5, open: 85, ordered: 10 },
                      { vessel: 'FLYING', closed: 8, open: 92, ordered: 0 },
                      { vessel: 'APOLLO', closed: 70, open: 30, ordered: 0 },
                      { vessel: 'BLACK P', closed: 12, open: 88, ordered: 0 },
                      { vessel: 'TITANIC', closed: 25, open: 75, ordered: 0 }
                    ].map((item, index) => (
                      <div key={item.vessel} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <span style={{ 
                          minWidth: '80px', 
                          fontSize: '11px', 
                          fontWeight: '500', 
                          color: '#374151' 
                        }}>
                          {item.vessel}
                        </span>
                        <div style={{ 
                          flex: 1, 
                          height: '20px', 
                          background: '#f3f4f6', 
                          borderRadius: '4px',
                          overflow: 'hidden',
                          position: 'relative'
                        }}>
                          <div style={{
                            position: 'absolute',
                            left: 0,
                            top: 0,
                            height: '100%',
                            width: `${item.closed}%`,
                            background: '#2196F3'
                          }} />
                          <div style={{
                            position: 'absolute',
                            left: `${item.closed}%`,
                            top: 0,
                            height: '100%',
                            width: `${item.open}%`,
                            background: '#EF5350'
                          }} />
                          <div style={{
                            position: 'absolute',
                            left: `${item.closed + item.open}%`,
                            top: 0,
                            height: '100%',
                            width: `${item.ordered}%`,
                            background: '#4DD0E1'
                          }} />
                        </div>
                      </div>
                    ))}
                  </div>
                  {/* Legend */}
                  <div style={{ display: 'flex', gap: '16px', marginTop: '16px', fontSize: '12px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <div style={{ width: '12px', height: '12px', background: '#2196F3', borderRadius: '2px' }} />
                      <span>Closed</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <div style={{ width: '12px', height: '12px', background: '#EF5350', borderRadius: '2px' }} />
                      <span>Open</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <div style={{ width: '12px', height: '12px', background: '#4DD0E1', borderRadius: '2px' }} />
                      <span>Ordered</span>
                    </div>
                  </div>
                </div>
              </Card>
            </DraggableWidget>
          </Col>
        );
      case 'remaining-on-board':
        return (
          <Col xs={24} lg={8} key={id}>
            <DraggableWidget id={id} index={secondRowOrder.indexOf(id)} moveWidget={(dragIndex, hoverIndex) => {
              const newOrder = [...secondRowOrder];
              const draggedItem = newOrder[dragIndex];
              newOrder.splice(dragIndex, 1);
              newOrder.splice(hoverIndex, 0, draggedItem);
              setSecondRowOrder(newOrder);
            }}>
              <Card
                title={
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <BarChartOutlined style={{ color: '#3b82f6', fontSize: '18px' }} />
                    <span style={{ color: '#374151', fontWeight: 'bold' }}>Remaining on Board (Voyage)</span>
                  </div>
                }
                style={{ 
                  borderRadius: '12px', 
                  border: '1px solid #e5e7eb', 
                  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.06)'
                }}
              >
                <div style={{ height: '400px', padding: '16px' }}>
                  {/* Custom Bar Chart */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', height: '100%' }}>
                    {[
                      { vessel: 'BATTLES', hfo: 1200, mgo: -300 },
                      { vessel: 'VOYAGER', hfo: 800, mgo: -200 },
                      { vessel: 'EAGLES', hfo: 1500, mgo: -400 },
                      { vessel: 'DUMLUPI', hfo: 600, mgo: -150 },
                      { vessel: 'BANDIRM', hfo: 900, mgo: -250 },
                      { vessel: 'FLYING', hfo: 1100, mgo: -350 },
                      { vessel: 'APOLLO', hfo: 700, mgo: -180 },
                      { vessel: 'BLACK P', hfo: 1300, mgo: -320 },
                      { vessel: 'TITANIC', hfo: 1000, mgo: -280 }
                    ].map((item, index) => (
                      <div key={item.vessel} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <span style={{ 
                          minWidth: '80px', 
                          fontSize: '11px', 
                          fontWeight: '500', 
                          color: '#374151' 
                        }}>
                          {item.vessel}
                        </span>
                        <div style={{ 
                          flex: 1, 
                          height: '20px', 
                          background: '#f3f4f6', 
                          borderRadius: '4px',
                          overflow: 'hidden',
                          position: 'relative'
                        }}>
                          <div style={{
                            position: 'absolute',
                            left: '50%',
                            top: 0,
                            height: '100%',
                            width: '1px',
                            background: '#d1d5db'
                          }} />
                          <div style={{
                            position: 'absolute',
                            left: '50%',
                            top: 0,
                            height: '100%',
                            width: `${Math.abs(item.hfo) / 20}%`,
                            background: '#2196F3',
                            transform: 'translateX(-100%)'
                          }} />
                          <div style={{
                            position: 'absolute',
                            left: '50%',
                            top: 0,
                            height: '100%',
                            width: `${Math.abs(item.mgo) / 20}%`,
                            background: '#64B5F6',
                            transform: 'translateX(0%)'
                          }} />
                        </div>
                      </div>
                    ))}
                  </div>
                  {/* Legend */}
                  <div style={{ display: 'flex', gap: '16px', marginTop: '16px', fontSize: '12px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <div style={{ width: '12px', height: '12px', background: '#2196F3', borderRadius: '2px' }} />
                      <span>HFO (LS)</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <div style={{ width: '12px', height: '12px', background: '#64B5F6', borderRadius: '2px' }} />
                      <span>MGO (LS)</span>
                    </div>
                  </div>
                </div>
              </Card>
            </DraggableWidget>
          </Col>
        );
      case 'deficiency-analyze':
        return (
          <Col xs={24} lg={8} key={id}>
            <DraggableWidget id={id} index={thirdRowOrder.indexOf(id)} moveWidget={(dragIndex, hoverIndex) => {
              const newOrder = [...thirdRowOrder];
              const draggedItem = newOrder[dragIndex];
              newOrder.splice(dragIndex, 1);
              newOrder.splice(hoverIndex, 0, draggedItem);
              setThirdRowOrder(newOrder);
            }}>
              <Card
                title={
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <BarChartOutlined style={{ color: '#3b82f6', fontSize: '18px' }} />
                    <span style={{ color: '#374151', fontWeight: 'bold' }}>Deficiency Analyze</span>
                  </div>
                }
                extra={
                  <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                    <Select defaultValue="Q1" style={{ width: 80 }} size="small">
                      <Select.Option value="Q1">Q1</Select.Option>
                      <Select.Option value="Q2">Q2</Select.Option>
                      <Select.Option value="Q3">Q3</Select.Option>
                      <Select.Option value="Q4">Q4</Select.Option>
                    </Select>
                    <Select defaultValue="2024" style={{ width: 80 }} size="small">
                      <Select.Option value="2023">2023</Select.Option>
                      <Select.Option value="2024">2024</Select.Option>
                      <Select.Option value="2025">2025</Select.Option>
                    </Select>
                    <Button type="primary" size="small">Show</Button>
                  </div>
                }
                style={{ 
                  borderRadius: '12px', 
                  border: '1px solid #e5e7eb', 
                  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.06)'
                }}
              >
                <div style={{ height: '400px', padding: '16px' }}>
                  {/* Custom Stacked Bar Chart */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', height: '100%' }}>
                    {[
                      { vessel: 'BATTLES', status1: 30, status2: 40, status3: 30 },
                      { vessel: 'VOYAGER', status1: 25, status2: 45, status3: 30 },
                      { vessel: 'EAGLES', status1: 35, status2: 35, status3: 30 },
                      { vessel: 'DUMLUPI', status1: 20, status2: 50, status3: 30 },
                      { vessel: 'BANDIRM', status1: 40, status2: 30, status3: 30 },
                      { vessel: 'FLYING', status1: 15, status2: 55, status3: 30 },
                      { vessel: 'APOLLO', status1: 45, status2: 25, status3: 30 },
                      { vessel: 'BLACK P', status1: 10, status2: 60, status3: 30 },
                      { vessel: 'TITANIC', status1: 50, status2: 20, status3: 30 }
                    ].map((item, index) => (
                      <div key={item.vessel} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <span style={{ 
                          minWidth: '80px', 
                          fontSize: '11px', 
                          fontWeight: '500', 
                          color: '#374151' 
                        }}>
                          {item.vessel}
                        </span>
                        <div style={{ 
                          flex: 1, 
                          height: '20px', 
                          background: '#f3f4f6', 
                          borderRadius: '4px',
                          overflow: 'hidden',
                          position: 'relative'
                        }}>
                          <div style={{
                            position: 'absolute',
                            left: 0,
                            top: 0,
                            height: '100%',
                            width: `${item.status1}%`,
                            background: '#2196F3'
                          }} />
                          <div style={{
                            position: 'absolute',
                            left: `${item.status1}%`,
                            top: 0,
                            height: '100%',
                            width: `${item.status2}%`,
                            background: '#EF5350'
                          }} />
                          <div style={{
                            position: 'absolute',
                            left: `${item.status1 + item.status2}%`,
                            top: 0,
                            height: '100%',
                            width: `${item.status3}%`,
                            background: '#64B5F6'
                          }} />
                        </div>
                      </div>
                    ))}
                  </div>
                  {/* Legend */}
                  <div style={{ display: 'flex', gap: '16px', marginTop: '16px', fontSize: '12px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <div style={{ width: '12px', height: '12px', background: '#2196F3', borderRadius: '2px' }} />
                      <span>Status1</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <div style={{ width: '12px', height: '12px', background: '#EF5350', borderRadius: '2px' }} />
                      <span>Status2</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <div style={{ width: '12px', height: '12px', background: '#64B5F6', borderRadius: '2px' }} />
                      <span>Status3</span>
                    </div>
                  </div>
                </div>
              </Card>
            </DraggableWidget>
          </Col>
        );
      case 'vessel-tracking-map':
        return (
          <Col xs={24} lg={24} key={id}>
            <DraggableWidget id={id} index={secondRowOrder.indexOf(id)} moveWidget={(dragIndex, hoverIndex) => {
              const newOrder = [...secondRowOrder];
              const draggedItem = newOrder[dragIndex];
              newOrder.splice(dragIndex, 1);
              newOrder.splice(hoverIndex, 0, draggedItem);
              setSecondRowOrder(newOrder);
            }}>
              <Card
                title={
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <BarChartOutlined style={{ color: '#3b82f6', fontSize: '18px' }} />
                    <span style={{ color: '#374151', fontWeight: 'bold' }}>Vessel Tracking Map</span>
                  </div>
                }
                extra={
                  <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                    <Select defaultValue="all" style={{ width: 120 }} size="small">
                      <Select.Option value="all">All Vessels</Select.Option>
                      <Select.Option value="active">Active Only</Select.Option>
                      <Select.Option value="inactive">Inactive Only</Select.Option>
                    </Select>
                    <Select defaultValue="all" style={{ width: 120 }} size="small">
                      <Select.Option value="all">All Types</Select.Option>
                      <Select.Option value="cargo">Cargo</Select.Option>
                      <Select.Option value="tanker">Tanker</Select.Option>
                      <Select.Option value="passenger">Passenger</Select.Option>
                    </Select>
                    <Button type="primary" size="small">Refresh</Button>
                  </div>
                }
                style={{ 
                  borderRadius: '12px', 
                  border: '1px solid #e5e7eb', 
                  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.06)'
                }}
              >
                <div style={{ height: '500px', padding: '16px' }}>
                  <VesselTrackingMap />
                </div>
              </Card>
            </DraggableWidget>
          </Col>
        );
      default:
        return null;
    }
  };

  return (
    <div style={{ background: '#f5f7fa', minHeight: '100vh', margin: '-24px', padding: '20px' }}>
      {/* Header */}
      <div style={{
        background: 'linear-gradient(135deg, #1e40af 0%, #3b82f6 50%, #60a5fa 100%)',
        borderRadius: '12px',
        padding: '20px',
        marginBottom: '20px',
        color: 'white',
        position: 'relative',
        overflow: 'hidden'
      }}>
        {/* Basit Dalga SVG'si */}
        <svg 
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            width: '100%',
            height: '100%',
            opacity: 0.3,
            transform: 'rotate(5deg) scale(1.1)'
          }}
          viewBox="0 0 400 200" 
          preserveAspectRatio="none"
        >
          <path 
            d="M0,200 Q50,180 100,190 Q150,200 200,185 Q250,170 300,180 Q350,190 400,175 L400,200 Z" 
            fill="rgba(255,255,255,0.1)"
          />
          <path 
            d="M0,200 Q75,185 150,195 Q225,205 300,190 Q375,175 400,180 L400,200 Z" 
            fill="rgba(255,255,255,0.06)"
          />
        </svg>
        
        {/* Sağ Taraf Belirgin Dalgalar */}
        <svg 
          style={{
            position: 'absolute',
            bottom: 0,
            right: 0,
            width: '60%',
            height: '100%',
            opacity: 0.6,
            transform: 'rotate(-10deg) scale(1.3)'
          }}
          viewBox="0 0 400 200" 
          preserveAspectRatio="none"
        >
          <path 
            d="M400,200 Q380,170 360,190 Q340,210 320,180 Q300,160 280,185 Q260,200 240,175 Q220,150 200,170 Q180,190 160,165 Q140,140 120,160 Q100,180 80,155 Q60,130 40,150 Q20,170 0,145 L0,200 Z" 
            fill="rgba(255,255,255,0.25)"
          />
          <path 
            d="M400,200 Q370,180 340,200 Q310,220 280,190 Q250,170 220,195 Q190,210 160,185 Q130,160 100,175 Q70,190 40,165 Q10,140 0,160 L0,200 Z" 
            fill="rgba(255,255,255,0.18)"
          />
          <path 
            d="M400,200 Q360,190 320,210 Q280,230 240,200 Q200,180 160,205 Q120,220 80,195 Q40,170 0,185 L0,200 Z" 
            fill="rgba(255,255,255,0.15)"
          />
          <path 
            d="M400,200 Q350,200 300,220 Q250,240 200,210 Q150,190 100,215 Q50,230 0,205 L0,200 Z" 
            fill="rgba(255,255,255,0.12)"
          />
          <path 
            d="M400,200 Q340,210 280,230 Q220,250 160,220 Q100,200 40,225 Q0,240 0,215 L0,200 Z" 
            fill="rgba(255,255,255,0.08)"
          />
        </svg>
        
        {/* Çapraz Dalga SVG'si */}
        <svg 
          style={{
            position: 'absolute',
            bottom: 0,
            right: 0,
            width: '100%',
            height: '100%',
            opacity: 0.4,
            transform: 'rotate(-15deg) scale(1.2)'
          }}
          viewBox="0 0 400 200" 
          preserveAspectRatio="none"
        >
          {/* Ana dalga - sağ alt köşeden başlayıp sol üste doğru */}
          <path 
            d="M400,200 Q380,180 360,190 Q340,200 320,185 Q300,170 280,180 Q260,190 240,175 Q220,160 200,170 Q180,180 160,165 Q140,150 120,160 Q100,170 80,155 Q60,140 40,150 Q20,160 0,145 L0,200 Z" 
            fill="rgba(255,255,255,0.15)"
          />
          
          {/* İkinci dalga - daha küçük ve şeffaf */}
          <path 
            d="M400,200 Q370,185 340,195 Q310,205 280,190 Q250,175 220,185 Q190,195 160,180 Q130,165 100,175 Q70,185 40,170 Q10,155 0,160 L0,200 Z" 
            fill="rgba(255,255,255,0.08)"
          />
          
          {/* Üçüncü dalga - en küçük ve en şeffaf */}
          <path 
            d="M400,200 Q350,190 300,200 Q250,210 200,195 Q150,180 100,190 Q50,200 0,185 L0,200 Z" 
            fill="rgba(255,255,255,0.05)"
          />
          
          {/* Ek dalga detayları - sağ tarafta daha sık */}
          <path 
            d="M400,200 Q390,195 380,200 Q370,205 360,200 Q350,195 340,200 Q330,205 320,200 Q310,195 300,200 Q290,205 280,200 Q270,195 260,200 Q250,205 240,200 Q230,195 220,200 Q210,205 200,200 L200,200 Z" 
            fill="rgba(255,255,255,0.12)"
          />
          
          {/* Sol tarafta seyrelen dalga */}
          <path 
            d="M200,200 Q180,195 160,200 Q140,205 120,200 Q100,195 80,200 Q60,205 40,200 Q20,195 0,200 L0,200 Z" 
            fill="rgba(255,255,255,0.06)"
          />
          
          {/* Ek dalga çizgileri - farklı yüksekliklerde */}
          <path 
            d="M400,200 Q385,190 370,200 Q355,210 340,200 Q325,190 310,200 Q295,210 280,200 Q265,190 250,200 Q235,210 220,200 Q205,190 190,200 Q175,210 160,200 Q145,190 130,200 Q115,210 100,200 Q85,190 70,200 Q55,210 40,200 Q25,190 10,200 L10,200 Z" 
            fill="rgba(255,255,255,0.09)"
          />
          
          {/* Orta seviye dalga çizgileri */}
          <path 
            d="M400,200 Q375,195 350,200 Q325,205 300,200 Q275,195 250,200 Q225,205 200,200 Q175,195 150,200 Q125,205 100,200 Q75,195 50,200 Q25,205 0,200 L0,200 Z" 
            fill="rgba(255,255,255,0.07)"
          />
          
          {/* İnce dalga çizgileri - en üstte */}
          <path 
            d="M400,200 Q395,195 390,200 Q385,205 380,200 Q375,195 370,200 Q365,205 360,200 Q355,195 350,200 Q345,205 340,200 Q335,195 330,200 Q325,205 320,200 Q315,195 310,200 Q305,205 300,200 Q295,195 290,200 Q285,205 280,200 Q275,195 270,200 Q265,205 260,200 Q255,195 250,200 Q245,205 240,200 Q235,195 230,200 Q225,205 220,200 Q215,195 210,200 Q205,205 200,200 L200,200 Z" 
            fill="rgba(255,255,255,0.04)"
          />
          
          {/* Sol tarafta ek ince dalgalar */}
          <path 
            d="M200,200 Q190,195 180,200 Q170,205 160,200 Q150,195 140,200 Q130,205 120,200 Q110,195 100,200 Q90,205 80,200 Q70,195 60,200 Q50,205 40,200 Q30,195 20,200 Q10,205 0,200 L0,200 Z" 
            fill="rgba(255,255,255,0.03)"
          />
          
          {/* En üst seviye mikro dalgalar */}
          <path 
            d="M400,200 Q398,198 396,200 Q394,202 392,200 Q390,198 388,200 Q386,202 384,200 Q382,198 380,200 Q378,202 376,200 Q374,198 372,200 Q370,202 368,200 Q366,198 364,200 Q362,202 360,200 Q358,198 356,200 Q354,202 352,200 Q350,198 348,200 Q346,202 344,200 Q342,198 340,200 Q338,202 336,200 Q334,198 332,200 Q330,202 328,200 Q326,198 324,200 Q322,202 320,200 Q318,198 316,200 Q314,202 312,200 Q310,198 308,200 Q306,202 304,200 Q302,198 300,200 L300,200 Z" 
            fill="rgba(255,255,255,0.02)"
          />
          
          {/* Orta seviye mikro dalgalar */}
          <path 
            d="M300,200 Q298,198 296,200 Q294,202 292,200 Q290,198 288,200 Q286,202 284,200 Q282,198 280,200 Q278,202 276,200 Q274,198 272,200 Q270,202 268,200 Q266,198 264,200 Q262,202 260,200 Q260,198 258,200 Q256,202 254,200 Q252,198 250,200 Q248,202 246,200 Q244,198 242,200 Q240,202 238,200 Q236,198 234,200 Q232,202 230,200 Q228,198 226,200 Q224,202 222,200 Q220,198 218,200 Q216,202 214,200 Q212,198 210,200 Q208,202 206,200 Q204,198 202,200 Q200,202 198,200 L198,200 Z" 
            fill="rgba(255,255,255,0.025)"
          />
        </svg>
        
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', position: 'relative', zIndex: 1 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <BarChartOutlined style={{ fontSize: '24px' }} />
            <h2 style={{ color: 'white', margin: 0, fontSize: '20px' }}>Vessel Management Dashboard</h2>
          </div>
          {/*<Space>
            <Button icon={<ExpandOutlined />} style={{ border: 'none', background: 'rgba(255,255,255,0.2)', color: 'white' }} />
            <Button icon={<SettingOutlined />} style={{ border: 'none', background: 'rgba(255,255,255,0.2)', color: 'white' }} />
          </Space>
          */}
        </div>
        <div style={{ marginTop: '12px', fontSize: '14px', opacity: 0.9, position: 'relative', zIndex: 1 }}>
          Real-time vessel monitoring and fleet performance analytics
        </div>
      </div>

      {/* Task Overview Cards */}
      <Row gutter={[20, 20]} style={{ marginBottom: 20 }}>
        <Col xs={24} sm={12} lg={6}>
          <Card style={{ 
            borderRadius: '12px', 
            border: 'none',
            background: 'linear-gradient(135deg, #f97316 0%, #fb923c 100%)',
            boxShadow: '0 4px 12px rgba(249, 115, 22, 0.3)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div style={{ flex: 1 }}>
                <div style={{ color: 'white', fontSize: '32px', fontWeight: 'bold', marginBottom: '4px' }}>1</div>
                <div style={{ color: 'white', fontSize: '14px', opacity: 0.9 }}>OVERDUE</div>
              </div>
            </div>
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card style={{ 
            borderRadius: '12px', 
            border: 'none',
            background: 'linear-gradient(135deg, #eab308 0%, #facc15 100%)',
            boxShadow: '0 4px 12px rgba(234, 179, 8, 0.3)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div style={{ flex: 1 }}>
                <div style={{ color: 'white', fontSize: '32px', fontWeight: 'bold', marginBottom: '4px' }}>138</div>
                <div style={{ color: 'white', fontSize: '14px', opacity: 0.9 }}>HIGH PRIORITY</div>
              </div>
            </div>
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card style={{ 
            borderRadius: '12px', 
            border: 'none',
            background: 'linear-gradient(135deg, #0ea5e9 0%, #38bdf8 100%)',
            boxShadow: '0 4px 12px rgba(14, 165, 233, 0.3)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div style={{ flex: 1 }}>
                <div style={{ color: 'white', fontSize: '32px', fontWeight: 'bold', marginBottom: '4px' }}>2</div>
                <div style={{ color: 'white', fontSize: '14px', opacity: 0.9 }}>TODAY</div>
              </div>
            </div>
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card style={{ 
            borderRadius: '12px', 
            border: 'none',
            background: 'linear-gradient(135deg, #22c55e 0%, #4ade80 100%)',
            boxShadow: '0 4px 12px rgba(34, 197, 94, 0.3)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div style={{ flex: 1 }}>
                <div style={{ color: 'white', fontSize: '32px', fontWeight: 'bold', marginBottom: '4px' }}>3</div>
                <div style={{ color: 'white', fontSize: '14px', opacity: 0.9 }}>FOR APPROVAL</div>
              </div>
            </div>
          </Card>
        </Col>
      </Row>

      {/* Task Manager Widget */}
      <Row gutter={[20, 20]} style={{ marginBottom: 20 }}>
        <Col xs={24}>
          <Card style={{ 
            borderRadius: '12px', 
            border: '1px solid #e5e7eb', 
            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.06)'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <h3 style={{ color: '#14b8a6', margin: 0, fontSize: '18px', fontWeight: 'bold' }}>TASKS | MINE</h3>
              <Button type="link" style={{ color: '#14b8a6', padding: 0 }}>
                Go To Task Manager →
              </Button>
            </div>
            
            <Table
              columns={[
                { title: 'Done', dataIndex: 'done', key: 'done', width: 60, render: () => <Checkbox /> },
                { title: 'Task', dataIndex: 'task', key: 'task', render: (text) => <span style={{ fontWeight: '500' }}>{text}</span> },
                { title: 'Project / Asset', dataIndex: 'project', key: 'project', render: (text) => <span style={{ color: '#64748b' }}>{text}</span> },
                { title: 'Company', dataIndex: 'company', key: 'company', render: (text) => <span style={{ color: '#64748b' }}>{text}</span> },
                { title: 'Status', dataIndex: 'status', key: 'status', render: (status) => (
                  <Tag color={status === 'Open' ? 'blue' : status === 'Not started' ? 'orange' : 'green'}>{status}</Tag>
                )},
                { title: 'Responsible', dataIndex: 'responsible', key: 'responsible', render: (text) => <span style={{ color: '#64748b' }}>{text}</span> },
                { title: 'Due', dataIndex: 'due', key: 'due', render: (due, record) => (
                  <span style={{ color: record.overdue ? '#ef4444' : '#64748b' }}>
                    {due} {record.overdue && '⚠️'}
                  </span>
                )}
              ]}
              dataSource={[
                { key: '1', task: 'GMDSS Annual Radio Survey + VDR APT...', project: 'BATTLESHIP', company: 'Caretta Shipping', status: 'Open', responsible: 'Lara Bautista', due: '28.07.2025', overdue: true },
                { key: '2', task: 'Report approval: Day 1', project: 'BATTLESHIP', company: 'Caretta Shipping', status: 'Open', responsible: 'Lara Bautista', due: '04.08.2025', overdue: false },
                { key: '3', task: 'Risk Assessment Docking', project: 'BATTLESHIP', company: 'Caretta Shipping', status: 'Not started', responsible: 'Lara Bautista', due: '04.08.2025', overdue: false },
                { key: '4', task: 'Report approval: da3', project: 'BATTLESHIP', company: 'Caretta Shipping', status: 'Open', responsible: 'Lara Bautista', due: '05.08.2025', overdue: false }
              ]}
              pagination={false}
              size="small"
            />
          </Card>
        </Col>
      </Row>

      {/* KPI Cards - Moved to Bottom */}
      <Row gutter={[20, 20]} style={{ marginBottom: 20 }}>
        <Col xs={24} sm={12} lg={6}>
          <Card style={{ borderRadius: '12px', border: '1px solid #e5e7eb', boxShadow: '0 2px 8px rgba(0, 0, 0, 0.06)' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div style={{ flex: 1 }}>
                <Statistic
                  title="Active Vessels"
                  value={12}
                  valueStyle={{ color: '#1e40af', fontSize: '32px', fontWeight: 'bold' }}
                  prefix={<SafetyOutlined style={{ color: '#60a5fa' }} />}
                />
                <div style={{ marginTop: 8, display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <ArrowDownOutlined style={{ color: '#34d399', fontSize: '14px' }} />
                  <span style={{ color: '#34d399', fontSize: '12px' }}>+2 this month</span>
                </div>
              </div>
              <div style={{ marginLeft: '16px' }}>
                <img 
                  src={gemiImage} 
                  alt="Gemi" 
                  style={{ 
                    width: '60px', 
                    height: '60px', 
                    objectFit: 'contain',
                    filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.1))'
                  }} 
                />
              </div>
            </div>
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card style={{ borderRadius: '12px', border: '1px solid #e5e7eb', boxShadow: '0 2px 8px rgba(0, 0, 0, 0.06)' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div style={{ flex: 1 }}>
                <Statistic
                  title="Critical Alerts"
                  value={47}
                  valueStyle={{ color: '#dc2626', fontSize: '32px', fontWeight: 'bold' }}
                  prefix={<ExclamationCircleOutlined style={{ color: '#f87171' }} />}
                />
                <div style={{ marginTop: 8, display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <ArrowDownOutlined style={{ color: '#f87171', fontSize: '14px' }} />
                  <span style={{ color: '#f87171', fontSize: '12px' }}>-5 from yesterday</span>
                </div>
              </div>
              <div style={{ marginLeft: '16px' }}>
                <img 
                  src={canSimidiImage} 
                  alt="Can Simidi" 
                  style={{ 
                    width: '60px', 
                    height: '60px', 
                    objectFit: 'contain',
                    filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.1))'
                  }} 
                />
              </div>
            </div>
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card style={{ borderRadius: '12px', border: '1px solid #e5e7eb', boxShadow: '0 2px 8px rgba(0, 0, 0, 0.06)' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div style={{ flex: 1 }}>
                <Statistic
                  title="Fleet Efficiency"
                  value={87.4}
                  suffix="%"
                  valueStyle={{ color: '#0891b2', fontSize: '32px', fontWeight: 'bold' }}
                  prefix={<ArrowDownOutlined style={{ color: '#22d3ee' }} />}
                />
                <div style={{ marginTop: 8, display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <ArrowDownOutlined style={{ color: '#34d399', fontSize: '14px' }} />
                  <span style={{ color: '#34d399', fontSize: '12px' }}>+2.1% this week</span>
                </div>
              </div>
              <div style={{ marginLeft: '16px' }}>
                <img 
                  src={gemiTekerlegiImage} 
                  alt="Gemi Tekerleği" 
                  style={{ 
                    width: '100px', 
                    height: '100px', 
                    marginRight: '-20px',
                    objectFit: 'contain',
                    filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.1))'
                  }} 
                />
              </div>
            </div>
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card style={{ borderRadius: '12px', border: '1px solid #e5e7eb', boxShadow: '0 2px 8px rgba(0, 0, 0, 0.06)' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div style={{ flex: 1 }}>
                <Statistic
                  title="Maintenance Due"
                  value={23}
                  valueStyle={{ color: '#d97706', fontSize: '32px', fontWeight: 'bold' }}
                  prefix={<ClockCircleOutlined style={{ color: '#fbbf24' }} />}
                />
                <div style={{ marginTop: 8, display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <ClockCircleOutlined style={{ color: '#fbbf24', fontSize: '14px' }} />
                  <span style={{ color: '#fbbf24', fontSize: '12px' }}>Next 7 days</span>
                </div>
              </div>
              <div style={{ marginLeft: '16px' }}>
                <img 
                  src={capaImage} 
                  alt="Çapa" 
                  style={{ 
                    width: '60px', 
                    height: '60px', 
                    objectFit: 'contain',
                    filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.1))'
                  }} 
                />
              </div>
            </div>
          </Card>
        </Col>
      </Row>

      {/* First Row - Three Widgets */}
      <Row gutter={[20, 20]} style={{ marginBottom: 20 }}>
        {firstRowOrder.map(id => getWidgetById(id))}
      </Row>

      {/* Second Row - Purchasing Status & Remaining on Board */}
      <Row gutter={[20, 20]} style={{ marginBottom: 20 }}>
        {secondRowOrder.map(id => getWidgetById(id))}
      </Row>


    </div>
  );
};

export default Dashboard; 