import React, { useState, useMemo } from 'react';
import { Table, Card, Tag, Space, Input, Select, Button, Badge } from 'antd';
import { useNavigate } from 'react-router-dom';
import {
  SearchOutlined,
  BellOutlined,
  FilterOutlined,
  CheckCircleOutlined,
  ExclamationCircleOutlined,
  SyncOutlined,
  WarningOutlined,
  RightOutlined
} from '@ant-design/icons';

const { Search } = Input;
const { Option } = Select;

interface NotificationItem {
  key: string;
  vessel: string;
  module: string;
  status: string;
  count: number;
  description: string;
  priority: 'high' | 'medium' | 'low';
  lastUpdate: string;
}

const Notifications: React.FC = () => {
  const navigate = useNavigate();
  const [searchText, setSearchText] = useState('');
  const [filterVessel, setFilterVessel] = useState<string>('all');
  const [filterModule, setFilterModule] = useState<string>('all');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [filterPriority, setFilterPriority] = useState<string>('all');

  // Flattened notification data - each notification as a separate row
  const notificationData: NotificationItem[] = [
    // BATTLESHIP notifications
    { key: 'BATTLESHIP-CERT-1', vessel: 'BATTLESHIP', module: 'Certificate', status: 'Overdue', count: 20, description: 'Certificate renewals pending', priority: 'high', lastUpdate: '2 hours ago' },
    { key: 'BATTLESHIP-DEF-1', vessel: 'BATTLESHIP', module: 'Deficiency', status: 'NC', count: 5, description: 'Non-conformities identified', priority: 'high', lastUpdate: '4 hours ago' },
    { key: 'BATTLESHIP-DEF-2', vessel: 'BATTLESHIP', module: 'Deficiency', status: 'Not Completed', count: 204, description: 'Outstanding deficiency reports', priority: 'medium', lastUpdate: '6 hours ago' },
    { key: 'BATTLESHIP-MAINT-1', vessel: 'BATTLESHIP', module: 'Maintenance', status: 'Overdue', count: 8, description: 'Scheduled maintenance overdue', priority: 'high', lastUpdate: '1 hour ago' },
    { key: 'BATTLESHIP-RISK-1', vessel: 'BATTLESHIP', module: 'Risk Assessment', status: 'Approved', count: 2, description: 'Risk assessments approved', priority: 'low', lastUpdate: '8 hours ago' },
    { key: 'BATTLESHIP-RISK-2', vessel: 'BATTLESHIP', module: 'Risk Assessment', status: 'Rejected', count: 6, description: 'Risk assessments rejected', priority: 'medium', lastUpdate: '5 hours ago' },
    { key: 'BATTLESHIP-RISK-3', vessel: 'BATTLESHIP', module: 'Risk Assessment', status: 'Waiting', count: 171, description: 'Pending risk assessment reviews', priority: 'medium', lastUpdate: '3 hours ago' },
    
    // BLACK PEARL notifications
    { key: 'BLACK_PEARL-MAINT-1', vessel: 'BLACK PEARL', module: 'Maintenance', status: 'Overdue', count: 10, description: 'Engine maintenance overdue', priority: 'high', lastUpdate: '30 minutes ago' },
    { key: 'BLACK_PEARL-RISK-1', vessel: 'BLACK PEARL', module: 'Risk Assessment', status: 'Waiting', count: 10, description: 'Safety risk assessments pending', priority: 'medium', lastUpdate: '2 hours ago' },
    
    // FAKAR notifications
    { key: 'FAKAR-RISK-1', vessel: 'FAKAR', module: 'Risk Assessment', status: 'Waiting', count: 11, description: 'Port entry risk assessments', priority: 'medium', lastUpdate: '4 hours ago' },
    { key: 'FAKAR-DEF-1', vessel: 'FAKAR', module: 'Deficiency', status: 'NC', count: 1, description: 'Critical non-conformity found', priority: 'high', lastUpdate: '1 hour ago' },
    { key: 'FAKAR-DEF-2', vessel: 'FAKAR', module: 'Deficiency', status: 'Not Completed', count: 1, description: 'Deficiency correction pending', priority: 'medium', lastUpdate: '3 hours ago' },
    
    // VOYAGER notifications
    { key: 'VOYAGER-CERT-1', vessel: 'VOYAGER', module: 'Certificate', status: 'Overdue', count: 30, description: 'Multiple certificates expired', priority: 'high', lastUpdate: '45 minutes ago' },
    { key: 'VOYAGER-DEF-1', vessel: 'VOYAGER', module: 'Deficiency', status: 'NC', count: 7, description: 'Safety equipment non-conformities', priority: 'high', lastUpdate: '2 hours ago' },
    { key: 'VOYAGER-DEF-2', vessel: 'VOYAGER', module: 'Deficiency', status: 'Not Completed', count: 30, description: 'Hull inspection deficiencies', priority: 'medium', lastUpdate: '5 hours ago' },
    { key: 'VOYAGER-MAINT-1', vessel: 'VOYAGER', module: 'Maintenance', status: 'Overdue', count: 3, description: 'Navigation equipment maintenance', priority: 'high', lastUpdate: '1.5 hours ago' },
    { key: 'VOYAGER-RISK-1', vessel: 'VOYAGER', module: 'Risk Assessment', status: 'Waiting', count: 2, description: 'Weather routing assessments', priority: 'low', lastUpdate: '6 hours ago' },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Overdue': return '#ef4444';
      case 'NC': return '#dc2626';
      case 'Not Completed': return '#f59e0b';
      case 'Approved': return '#10b981';
      case 'Rejected': return '#ef4444';
      case 'Waiting': return '#3b82f6';
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

  // Filter data based on search and filters
  const filteredData = useMemo(() => {
    return notificationData.filter(item => {
      const matchesSearch = searchText === '' || 
        item.vessel.toLowerCase().includes(searchText.toLowerCase()) ||
        item.module.toLowerCase().includes(searchText.toLowerCase()) ||
        item.status.toLowerCase().includes(searchText.toLowerCase()) ||
        item.description.toLowerCase().includes(searchText.toLowerCase());
      
      const matchesVessel = filterVessel === 'all' || item.vessel === filterVessel;
      const matchesModule = filterModule === 'all' || item.module === filterModule;
      const matchesStatus = filterStatus === 'all' || item.status === filterStatus;
      const matchesPriority = filterPriority === 'all' || item.priority === filterPriority;

      return matchesSearch && matchesVessel && matchesModule && matchesStatus && matchesPriority;
    });
  }, [notificationData, searchText, filterVessel, filterModule, filterStatus, filterPriority]);

  // Get unique values for filter options
  const vessels = [...new Set(notificationData.map(item => item.vessel))];
  const modules = [...new Set(notificationData.map(item => item.module))];
  const statuses = [...new Set(notificationData.map(item => item.status))];
  const priorities = [...new Set(notificationData.map(item => item.priority))];

  const columns = [
    {
      title: 'Vessel',
      dataIndex: 'vessel',
      key: 'vessel',
      width: 150,
      render: (vessel: string) => (
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div style={{ 
            width: '8px', 
            height: '8px', 
            borderRadius: '50%', 
            background: '#1e40af' 
          }} />
          <span style={{ fontWeight: 'bold', color: '#1e40af' }}>
            {vessel}
          </span>
        </div>
      ),
      filters: vessels.map(vessel => ({ text: vessel, value: vessel })),
      onFilter: (value: any, record: NotificationItem) => record.vessel === value,
    },
    {
      title: 'Module',
      dataIndex: 'module',
      key: 'module',
      width: 150,
      render: (module: string) => (
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          {getModuleIcon(module)}
          <span style={{ color: '#374151' }}>{module}</span>
        </div>
      ),
      filters: modules.map(module => ({ text: module, value: module })),
      onFilter: (value: any, record: NotificationItem) => record.module === value,
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      width: 120,
      render: (status: string) => (
        <Tag color={getStatusColor(status)} style={{ fontWeight: 'bold' }}>
          {status}
        </Tag>
      ),
      filters: statuses.map(status => ({ text: status, value: status })),
      onFilter: (value: string, record: NotificationItem) => record.status === value,
    },
    {
      title: 'Count',
      dataIndex: 'count',
      key: 'count',
      width: 100,
      
      sorter: (a: NotificationItem, b: NotificationItem) => a.count - b.count,
    },
    {
      title: 'Priority',
      dataIndex: 'priority',
      key: 'priority',
      width: 100,
      render: (priority: 'high' | 'medium' | 'low') => (
        <Tag color={getPriorityColor(priority)} style={{ fontWeight: 'bold' }}>
          {priority.toUpperCase()}
        </Tag>
      ),
      filters: priorities.map(priority => ({ text: priority.toUpperCase(), value: priority })),
      onFilter: (value: string, record: NotificationItem) => record.priority === value,
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
      render: (description: string) => (
        <span style={{ color: '#374151', fontSize: '14px' }}>
          {description}
        </span>
      ),
    },
    {
      title: 'Last Update',
      dataIndex: 'lastUpdate',
      key: 'lastUpdate',
      width: 120,
      render: (lastUpdate: string) => (
        <span style={{ color: '#64748b', fontSize: '12px' }}>
          {lastUpdate}
        </span>
      ),
             sorter: (a: NotificationItem, b: NotificationItem) => {
         const timeA = a.lastUpdate.includes('hour') ? parseInt(a.lastUpdate) : 0;
         const timeB = b.lastUpdate.includes('hour') ? parseInt(b.lastUpdate) : 0;
         return timeA - timeB;
       },
     },
     {
       title: 'Detaya Git',
       key: 'action',
       width: 120,
               render: (_, record: NotificationItem) => {
          // Convert vessel name to 01_HS format
          const getVesselCode = (vesselName: string) => {
            const vesselMap: { [key: string]: string } = {
              'BATTLESHIP': '01_HS',
              'BLACK PEARL': '02_BP',
              'FAKAR': '03_FK',
              'VOYAGER': '04_VG'
            };
            return vesselMap[vesselName] || vesselName;
          };

          return (
            <Button
              type="primary"
              size="small"
              icon={<RightOutlined />}
              onClick={() => navigate(`/${record.module}?vessel=${getVesselCode(record.vessel)}`)}
              style={{
                background: '#3b82f6',
                border: 'none',
                borderRadius: '6px',
                fontSize: '12px',
                height: '28px',
                display: 'flex',
                alignItems: 'center',
                gap: '4px'
              }}
            >
              Detaya Git
            </Button>
          );
        },
     },
   ];

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
            <BellOutlined style={{ fontSize: '24px' }} />
            <h2 style={{ color: 'white', margin: 0, fontSize: '20px' }}>Fleet Notifications</h2>
          </div>
          <Space>
            <Button 
              icon={<FilterOutlined />}
              style={{ 
                background: 'rgba(255,255,255,0.2)', 
                border: 'none', 
                color: 'white' 
              }}
            >
              Filters
            </Button>
          </Space>
        </div>
        <div style={{ marginTop: '12px', fontSize: '14px', opacity: 0.9, position: 'relative', zIndex: 1 }}>
          Monitor vessel maintenance, certificates, and compliance status
        </div>
      </div>

      {/* Filters */}
      <Card style={{ 
        background: '#ffffff',
        borderRadius: '12px',
        border: '1px solid #e5e7eb',
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.06)',
        marginBottom: '20px'
      }}>
        <Space style={{ width: '100%', justifyContent: 'space-between' }}>
          <Space wrap>
            <Search
              placeholder="Search notifications..."
              allowClear
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              style={{ width: 300 }}
              prefix={<SearchOutlined />}
            />
            <Select
              value={filterVessel}
              style={{ width: 150 }}
              onChange={setFilterVessel}
              placeholder="Filter by Vessel"
            >
              <Option value="all">All Vessels</Option>
              {vessels.map(vessel => (
                <Option key={vessel} value={vessel}>{vessel}</Option>
              ))}
            </Select>
            <Select
              value={filterModule}
              style={{ width: 150 }}
              onChange={setFilterModule}
              placeholder="Filter by Module"
            >
              <Option value="all">All Modules</Option>
              {modules.map(module => (
                <Option key={module} value={module}>{module}</Option>
              ))}
            </Select>
            <Select
              value={filterStatus}
              style={{ width: 150 }}
              onChange={setFilterStatus}
              placeholder="Filter by Status"
            >
              <Option value="all">All Status</Option>
              {statuses.map(status => (
                <Option key={status} value={status}>{status}</Option>
              ))}
            </Select>
            <Select
              value={filterPriority}
              style={{ width: 120 }}
              onChange={setFilterPriority}
              placeholder="Priority"
            >
              <Option value="all">All Priority</Option>
              {priorities.map(priority => (
                <Option key={priority} value={priority}>{priority.toUpperCase()}</Option>
              ))}
            </Select>
          </Space>
          <div style={{ fontSize: '14px', color: '#64748b' }}>
            Showing: <strong style={{ color: '#1e40af' }}>
              {filteredData.length} of {notificationData.length}
            </strong> notifications
          </div>
        </Space>
      </Card>

      {/* Notification Table */}
      <Card style={{ 
        background: '#ffffff',
        borderRadius: '12px',
        border: '1px solid #e5e7eb',
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.06)'
      }}>
        <Table
          columns={columns}
          dataSource={filteredData}
          rowKey="key"
          pagination={{
            pageSize: 15,
            showSizeChanger: true,
            showQuickJumper: true,
            showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} notifications`,
            pageSizeOptions: ['10', '15', '25', '50'],
          }}
          style={{ 
            background: 'white'
          }}
          scroll={{ x: 1200 }}
        />
      </Card>
    </div>
  );
};

export default Notifications;