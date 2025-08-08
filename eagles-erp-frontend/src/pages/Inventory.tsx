import React, { useState } from 'react';
import { 
  Table, 
  Card, 
  Button, 
  Space, 
  Input, 
  Tag, 
  Modal, 
  Form, 
  InputNumber, 
  Progress,
  Alert,
  Row,
  Col,
  Statistic,
  message
} from 'antd';
import { 
  SearchOutlined, 
  EditOutlined, 
  ExclamationCircleOutlined,
  InboxOutlined,
  WarningOutlined,
  CheckCircleOutlined
} from '@ant-design/icons';
import { mockInventory, mockProducts } from '../data/mockData';
import type { InventoryItem } from '../types/index';

const { Search } = Input;

const Inventory: React.FC = () => {
  const [inventory, setInventory] = useState<InventoryItem[]>(mockInventory);
  const [searchText, setSearchText] = useState('');
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingItem, setEditingItem] = useState<InventoryItem | null>(null);
  const [form] = Form.useForm();

  const handleSearch = (value: string) => {
    setSearchText(value);
  };

  const filteredInventory = inventory.filter(item => {
    return item.productName.toLowerCase().includes(searchText.toLowerCase()) ||
           item.location.toLowerCase().includes(searchText.toLowerCase());
  });

  const handleEditItem = (item: InventoryItem) => {
    setEditingItem(item);
    form.setFieldsValue(item);
    setIsModalVisible(true);
  };

  const handleModalOk = async () => {
    try {
      const values = await form.validateFields();
      setInventory(inventory.map(item => 
        item.id === editingItem?.id ? { ...item, ...values, lastUpdated: new Date().toISOString().split('T')[0] } : item
      ));
      message.success('Ekipman envanteri başarıyla güncellendi');
      setIsModalVisible(false);
    } catch (error) {
      console.error('Validation failed:', error);
    }
  };

  const getStockStatus = (quantity: number, minStock: number) => {
    if (quantity <= minStock) return { color: 'red', text: 'Kritik Stok', icon: <ExclamationCircleOutlined /> };
    if (quantity <= minStock * 2) return { color: 'orange', text: 'Düşük Stok', icon: <WarningOutlined /> };
    return { color: 'green', text: 'Yeterli Stok', icon: <CheckCircleOutlined /> };
  };

  const getStockPercentage = (quantity: number, maxStock: number) => {
    return Math.round((quantity / maxStock) * 100);
  };

  const columns = [
    {
      title: 'Ekipman',
      dataIndex: 'productName',
      key: 'productName',
      render: (name: string, record: InventoryItem) => (
        <div>
          <div style={{ fontWeight: 'bold' }}>{name}</div>
          <div style={{ fontSize: '12px', color: '#666' }}>ID: {record.productId}</div>
        </div>
      ),
    },
    {
      title: 'Miktar',
      dataIndex: 'quantity',
      key: 'quantity',
      render: (quantity: number, record: InventoryItem) => (
        <div>
          <div style={{ fontWeight: 'bold', fontSize: '16px' }}>{quantity}</div>
          <Progress 
            percent={getStockPercentage(quantity, record.maxStock)} 
            size="small" 
            status={quantity <= record.minStock ? 'exception' : 'normal'}
            showInfo={false}
          />
        </div>
      ),
      sorter: (a: InventoryItem, b: InventoryItem) => a.quantity - b.quantity,
    },
    {
      title: 'Stok Durumu',
      key: 'stockStatus',
      render: (_, record: InventoryItem) => {
        const status = getStockStatus(record.quantity, record.minStock);
        return (
          <Tag color={status.color} icon={status.icon}>
            {status.text}
          </Tag>
        );
      },
    },
    {
      title: 'Min/Max Stok',
      key: 'stockLimits',
      render: (_, record: InventoryItem) => (
        <div>
          <div style={{ fontSize: '12px' }}>
            Min: <strong>{record.minStock}</strong>
          </div>
          <div style={{ fontSize: '12px' }}>
            Max: <strong>{record.maxStock}</strong>
          </div>
        </div>
      ),
    },
    {
      title: 'Konum',
      dataIndex: 'location',
      key: 'location',
      render: (location: string) => <Tag color="blue">{location}</Tag>,
    },
    {
      title: 'Son Güncelleme',
      dataIndex: 'lastUpdated',
      key: 'lastUpdated',
      render: (date: string) => new Date(date).toLocaleDateString('tr-TR'),
      sorter: (a: InventoryItem, b: InventoryItem) => new Date(a.lastUpdated).getTime() - new Date(b.lastUpdated).getTime(),
    },
    {
      title: 'İşlemler',
      key: 'actions',
      render: (_, record: InventoryItem) => (
        <Button 
          type="text" 
          icon={<EditOutlined />} 
          onClick={() => handleEditItem(record)}
        >
          Düzenle
        </Button>
      ),
    },
  ];

  const lowStockItems = inventory.filter(item => item.quantity <= item.minStock);
  const totalItems = inventory.length;
  const totalQuantity = inventory.reduce((sum, item) => sum + item.quantity, 0);
  const avgStockLevel = Math.round(totalQuantity / totalItems);

  return (
    <div style={{ background: '#f5f7fa', minHeight: '100vh', margin: '-24px', padding: '20px' }}>
      {/* Header */}
      <div style={{
        background: 'linear-gradient(135deg, #8b5cf6 0%, #a78bfa 50%, #c4b5fd 100%)',
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
            <InboxOutlined style={{ fontSize: '24px' }} />
            <h2 style={{ color: 'white', margin: 0, fontSize: '20px' }}>Gemi Ekipman Envanteri</h2>
          </div>
          <Space>
            <Button type="primary" style={{ background: 'rgba(255,255,255,0.2)', border: 'none' }}>Ekipman Girişi</Button>
            <Button style={{ background: 'rgba(255,255,255,0.2)', border: 'none', color: 'white' }}>Ekipman Çıkışı</Button>
          </Space>
        </div>
        <div style={{ marginTop: '12px', fontSize: '14px', opacity: 0.9, position: 'relative', zIndex: 1 }}>
          Gemi ekipmanlarının stok takibi ve yönetimi
        </div>
      </div>

      {/* Low Stock Alert */}
      {lowStockItems.length > 0 && (
        <Alert
          message={`${lowStockItems.length} ekipman kritik stok seviyesinde!`}
          description={`${lowStockItems.map(item => item.productName).join(', ')}`}
          type="warning"
          showIcon
          style={{ marginBottom: 16 }}
        />
      )}

      {/* Stats Cards */}
      <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Toplam Ekipman"
              value={totalItems}
              prefix={<InboxOutlined />}
              valueStyle={{ color: '#1890ff' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Toplam Stok"
              value={totalQuantity}
              prefix={<InboxOutlined />}
              valueStyle={{ color: '#52c41a' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Ortalama Stok"
              value={avgStockLevel}
              prefix={<InboxOutlined />}
              valueStyle={{ color: '#722ed1' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Kritik Stok"
              value={lowStockItems.length}
              prefix={<ExclamationCircleOutlined />}
              valueStyle={{ color: '#fa541c' }}
            />
          </Card>
        </Col>
      </Row>

      <Card>
        <Space style={{ marginBottom: 16 }}>
          <Search
            placeholder="Ekipman ara..."
            allowClear
            onSearch={handleSearch}
            style={{ width: 300 }}
            prefix={<SearchOutlined />}
          />
        </Space>

        <Table
          columns={columns}
          dataSource={filteredInventory}
          rowKey="id"
          pagination={{
            total: filteredInventory.length,
            pageSize: 10,
            showSizeChanger: true,
            showQuickJumper: true,
            showTotal: (total, range) => `${range[0]}-${range[1]} / ${total} ekipman`,
          }}
        />
      </Card>

      <Modal
        title="Ekipman Stok Güncelle"
        open={isModalVisible}
        onOk={handleModalOk}
        onCancel={() => setIsModalVisible(false)}
        width={500}
      >
        <Form
          form={form}
          layout="vertical"
        >
          <Form.Item
            name="productName"
            label="Ekipman Adı"
          >
            <Input disabled />
          </Form.Item>

          <Form.Item
            name="quantity"
            label="Mevcut Stok"
            rules={[{ required: true, message: 'Lütfen stok miktarını girin!' }]}
          >
            <InputNumber style={{ width: '100%' }} min={0} />
          </Form.Item>

          <Form.Item
            name="minStock"
            label="Minimum Stok"
            rules={[{ required: true, message: 'Lütfen minimum stok miktarını girin!' }]}
          >
            <InputNumber style={{ width: '100%' }} min={0} />
          </Form.Item>

          <Form.Item
            name="maxStock"
            label="Maksimum Stok"
            rules={[{ required: true, message: 'Lütfen maksimum stok miktarını girin!' }]}
          >
            <InputNumber style={{ width: '100%' }} min={0} />
          </Form.Item>

          <Form.Item
            name="location"
            label="Depo Konumu"
            rules={[{ required: true, message: 'Lütfen depo konumunu girin!' }]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Inventory; 