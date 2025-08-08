import React, { useState, useEffect } from 'react';
import { Table, Card, Tag, Space, Input, Select, Button, Badge } from 'antd';
import { useLocation } from 'react-router-dom';
import {
  SearchOutlined,
  CheckCircleOutlined,
  FilterOutlined,
  FileTextOutlined,
  ClockCircleOutlined,
  ExclamationCircleOutlined
} from '@ant-design/icons';

const { Search } = Input;
const { Option } = Select;

interface CertificateItem {
  key: string;
  certificateName: string;
  vessel: string;
  status: string;
  expiryDate: string;
  daysRemaining: number;
  priority: 'high' | 'medium' | 'low';
  description: string;
  lastUpdate: string;
}

const Certificate: React.FC = () => {
  const location = useLocation();
  const [searchText, setSearchText] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [filterPriority, setFilterPriority] = useState<string>('all');
  
  // Get vessel from URL parameters
  const urlParams = new URLSearchParams(location.search);
  const vesselCode = urlParams.get('vessel') || '01_HS';
  
  // Convert vessel code back to vessel name
  const getVesselName = (code: string) => {
    const vesselMap: { [key: string]: string } = {
      '01_HS': 'BATTLESHIP',
      '02_BP': 'BLACK PEARL',
      '03_FK': 'FAKAR',
      '04_VG': 'VOYAGER'
    };
    return vesselMap[code] || code;
  };

  const vesselName = getVesselName(vesselCode);

  // Mock certificate data
  const certificateData: CertificateItem[] = [
    {
      key: '1',
      certificateName: 'Safety Management Certificate',
      vessel: vesselName,
      status: 'Overdue',
      expiryDate: '2024-01-15',
      daysRemaining: -5,
      priority: 'high',
      description: 'Safety management system certificate expired',
      lastUpdate: '2 hours ago'
    },
    {
      key: '2',
      certificateName: 'Document of Compliance',
      vessel: vesselName,
      status: 'Active',
      expiryDate: '2024-06-20',
      daysRemaining: 45,
      priority: 'medium',
      description: 'Document of compliance for safety management',
      lastUpdate: '1 day ago'
    },
    {
      key: '3',
      certificateName: 'Safety Equipment Certificate',
      vessel: vesselName,
      status: 'Expiring Soon',
      expiryDate: '2024-03-10',
      daysRemaining: 15,
      priority: 'high',
      description: 'Safety equipment certificate expiring soon',
      lastUpdate: '3 hours ago'
    },
    {
      key: '4',
      certificateName: 'Radio Safety Certificate',
      vessel: vesselName,
      status: 'Active',
      expiryDate: '2024-08-15',
      daysRemaining: 120,
      priority: 'low',
      description: 'Radio safety certificate valid',
      lastUpdate: '1 week ago'
    },
    {
      key: '5',
      certificateName: 'Load Line Certificate',
      vessel: vesselName,
      status: 'Overdue',
      expiryDate: '2024-01-20',
      daysRemaining: -10,
      priority: 'high',
      description: 'Load line certificate expired',
      lastUpdate: '4 hours ago'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Overdue': return '#ef4444';
      case 'Expiring Soon': return '#f59e0b';
      case 'Active': return '#10b981';
      default: return '#64748b';
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

  const getDaysRemainingColor = (days: number) => {
    if (days < 0) return '#ef4444';
    if (days <= 30) return '#f59e0b';
    return '#10b981';
  };

  // Filter data based on search and filters
  const filteredData = certificateData.filter(item => {
    const matchesSearch = searchText === '' || 
      item.certificateName.toLowerCase().includes(searchText.toLowerCase()) ||
      item.description.toLowerCase().includes(searchText.toLowerCase());
    
    const matchesStatus = filterStatus === 'all' || item.status === filterStatus;
    const matchesPriority = filterPriority === 'all' || item.priority === filterPriority;

    return matchesSearch && matchesStatus && matchesPriority;
  });

  // Get unique values for filter options
  const statuses = [...new Set(certificateData.map(item => item.status))];
  const priorities = [...new Set(certificateData.map(item => item.priority))];

  const columns = [
    {
      title: 'Certificate Name',
      dataIndex: 'certificateName',
      key: 'certificateName',
      width: 250,
      render: (name: string) => (
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <FileTextOutlined style={{ color: '#3b82f6' }} />
          <span style={{ fontWeight: '500', color: '#374151' }}>{name}</span>
        </div>
      ),
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
      onFilter: (value: any, record: CertificateItem) => record.status === value,
    },
    {
      title: 'Expiry Date',
      dataIndex: 'expiryDate',
      key: 'expiryDate',
      width: 120,
      render: (date: string) => (
        <span style={{ color: '#374151', fontSize: '14px' }}>
          {new Date(date).toLocaleDateString()}
        </span>
      ),
      sorter: (a: CertificateItem, b: CertificateItem) => 
        new Date(a.expiryDate).getTime() - new Date(b.expiryDate).getTime(),
    },
    {
      title: 'Days Remaining',
      dataIndex: 'daysRemaining',
      key: 'daysRemaining',
      width: 120,
      render: (days: number) => (
        <Badge 
          count={days < 0 ? `Expired ${Math.abs(days)} days ago` : `${days} days`}
          style={{ 
            backgroundColor: getDaysRemainingColor(days),
            color: 'white'
          }} 
        />
      ),
      sorter: (a: CertificateItem, b: CertificateItem) => a.daysRemaining - b.daysRemaining,
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
      onFilter: (value: any, record: CertificateItem) => record.priority === value,
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
    },
  ];

  return (
    <div style={{ background: '#f5f7fa', minHeight: '100vh', margin: '-24px', padding: '20px' }}>
      {/* Header */}
      <div style={{
        background: 'linear-gradient(135deg, #10b981 0%, #34d399 50%, #6ee7b7 100%)',
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
            <CheckCircleOutlined style={{ fontSize: '24px' }} />
            <h2 style={{ color: 'white', margin: 0, fontSize: '20px' }}>
              Certificate Management - {vesselName}
            </h2>
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
          Manage vessel certificates, compliance, and renewal schedules
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
              placeholder="Search certificates..."
              allowClear
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              style={{ width: 300 }}
              prefix={<SearchOutlined />}
            />
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
            Vessel: <strong style={{ color: '#10b981' }}>{vesselName}</strong> 
            ({vesselCode}) | Showing: <strong style={{ color: '#10b981' }}>
              {filteredData.length} of {certificateData.length}
            </strong> certificates
          </div>
        </Space>
      </Card>

      {/* Certificate Table */}
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
            pageSize: 10,
            showSizeChanger: true,
            showQuickJumper: true,
            showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} certificates`,
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

export default Certificate; 