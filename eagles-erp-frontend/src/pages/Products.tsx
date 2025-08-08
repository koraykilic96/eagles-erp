import React, { useState } from 'react';
import { 
  Table, 
  Card, 
  Button, 
  Space, 
  Input, 
  Select, 
  Tag, 
  Avatar, 
  Modal, 
  Form, 
  InputNumber, 
  Switch,
  Popconfirm,
  message
} from 'antd';
import { 
  PlusOutlined, 
  SearchOutlined, 
  EditOutlined, 
  DeleteOutlined,
  EyeOutlined
} from '@ant-design/icons';
import { mockProducts } from '../data/mockData';
import type { Product } from '../types/index';

const { Search } = Input;
const { Option } = Select;

const Products: React.FC = () => {
  const [products, setProducts] = useState<Product[]>(mockProducts);
  const [searchText, setSearchText] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [form] = Form.useForm();

  const categories = ['Navigation Equipment', 'Safety Equipment', 'Engine Parts', 'Communication Systems', 'Deck Equipment', 'Hull Components'];

  const handleSearch = (value: string) => {
    setSearchText(value);
  };

  const handleCategoryChange = (value: string) => {
    setSelectedCategory(value);
  };

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchText.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchText.toLowerCase()) ||
                         product.sku.toLowerCase().includes(searchText.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleAddProduct = () => {
    setEditingProduct(null);
    form.resetFields();
    setIsModalVisible(true);
  };

  const handleEditProduct = (product: Product) => {
    setEditingProduct(product);
    form.setFieldsValue(product);
    setIsModalVisible(true);
  };

  const handleDeleteProduct = (productId: string) => {
    setProducts(products.filter(p => p.id !== productId));
    message.success('Equipment removed from inventory successfully');
  };

  const handleModalOk = async () => {
    try {
      const values = await form.validateFields();
      if (editingProduct) {
        // Edit existing product
        setProducts(products.map(p => 
          p.id === editingProduct.id ? { ...p, ...values } : p
        ));
        message.success('Equipment updated successfully');
      } else {
        // Add new product
        const newProduct: Product = {
          id: Date.now().toString(),
          ...values,
          isActive: true,
          createdAt: new Date().toISOString().split('T')[0]
        };
        setProducts([...products, newProduct]);
        message.success('Equipment added to inventory successfully');
      }
      setIsModalVisible(false);
    } catch (error) {
      console.error('Validation failed:', error);
    }
  };

  const columns = [
    {
      title: 'Equipment',
      dataIndex: 'name',
      key: 'name',
      render: (name: string, record: Product) => (
        <Space>
          <Avatar 
            src={record.image || ''} 
            shape="square" 
            size={50}
            style={{ objectFit: 'cover', background: '#f1f5f9' }}
          />
          <div>
            <div style={{ fontWeight: 'bold', color: '#1e40af' }}>{name}</div>
            <div style={{ fontSize: '12px', color: '#64748b' }}>Part # {record.sku}</div>
          </div>
        </Space>
      ),
    },
    {
      title: 'Equipment Type',
      dataIndex: 'category',
      key: 'category',
      render: (category: string) => {
        const categoryColors = {
          'Navigation Equipment': '#3b82f6',
          'Safety Equipment': '#ef4444',
          'Engine Parts': '#f59e0b',
          'Communication Systems': '#10b981',
          'Deck Equipment': '#8b5cf6',
          'Hull Components': '#06b6d4'
        };
        return <Tag color={categoryColors[category as keyof typeof categoryColors] || 'blue'}>{category}</Tag>;
      },
    },
    {
      title: 'Unit Price',
      dataIndex: 'price',
      key: 'price',
      render: (price: number) => `$${price.toLocaleString()}`,
      sorter: (a: Product, b: Product) => a.price - b.price,
    },
    {
      title: 'Stock Quantity',
      dataIndex: 'stock',
      key: 'stock',
      render: (stock: number) => (
        <Tag color={stock < 10 ? 'red' : stock < 20 ? 'orange' : 'green'}>
          {stock} units
        </Tag>
      ),
      sorter: (a: Product, b: Product) => a.stock - b.stock,
    },
    {
      title: 'Status',
      dataIndex: 'isActive',
      key: 'isActive',
      render: (isActive: boolean) => (
        <Tag color={isActive ? 'green' : 'red'}>
          {isActive ? 'Available' : 'Discontinued'}
        </Tag>
      ),
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record: Product) => (
        <Space>
          <Button 
            type="text" 
            icon={<EyeOutlined />} 
            onClick={() => console.log('View equipment:', record.id)}
            style={{ color: '#3b82f6' }}
          />
          <Button 
            type="text" 
            icon={<EditOutlined />} 
            onClick={() => handleEditProduct(record)}
            style={{ color: '#10b981' }}
          />
          <Popconfirm
            title="Are you sure you want to remove this equipment?"
            onConfirm={() => handleDeleteProduct(record.id)}
            okText="Yes"
            cancelText="No"
          >
            <Button 
              type="text" 
              danger 
              icon={<DeleteOutlined />} 
            />
          </Popconfirm>
        </Space>
      ),
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
            <SearchOutlined style={{ fontSize: '24px' }} />
            <h2 style={{ color: 'white', margin: 0, fontSize: '20px' }}>Marine Equipment & Ship Parts</h2>
          </div>
          <Button 
            icon={<PlusOutlined />}
            style={{ 
              background: 'rgba(255,255,255,0.2)', 
              border: 'none', 
              color: 'white',
              fontWeight: 500
            }}
            onClick={handleAddProduct}
          >
            Add New Equipment
          </Button>
        </div>
        <div style={{ marginTop: '12px', fontSize: '14px', opacity: 0.9, position: 'relative', zIndex: 1 }}>
          Manage vessel equipment, spare parts, and maritime supplies
        </div>
      </div>

      <Card style={{ 
        background: '#ffffff',
        borderRadius: '12px',
        border: '1px solid #e5e7eb',
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.06)'
      }}>
        <Space style={{ marginBottom: 16 }}>
          <Search
            placeholder="Search equipment, parts, SKU..."
            allowClear
            onSearch={handleSearch}
            style={{ width: 350 }}
            prefix={<SearchOutlined />}
          />
          <Select
            defaultValue="all"
            style={{ width: 200 }}
            onChange={handleCategoryChange}
          >
            <Option value="all">All Equipment Types</Option>
            {categories.map(category => (
              <Option key={category} value={category}>{category}</Option>
            ))}
          </Select>
        </Space>

        <Table
          columns={columns}
          dataSource={filteredProducts}
          rowKey="id"
          pagination={{
            total: filteredProducts.length,
            pageSize: 10,
            showSizeChanger: true,
            showQuickJumper: true,
            showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} equipment items`,
          }}
        />
      </Card>

      <Modal
        title={editingProduct ? 'Edit Marine Equipment' : 'Add New Marine Equipment'}
        open={isModalVisible}
        onOk={handleModalOk}
        onCancel={() => setIsModalVisible(false)}
        width={600}
      >
        <Form
          form={form}
          layout="vertical"
          initialValues={{ isActive: true }}
        >
          <Form.Item
            name="name"
            label="Equipment Name"
            rules={[{ required: true, message: 'Please enter equipment name!' }]}
          >
            <Input placeholder="e.g. Marine GPS Navigation System" />
          </Form.Item>

          <Form.Item
            name="description"
            label="Technical Description"
            rules={[{ required: true, message: 'Please enter technical description!' }]}
          >
            <Input.TextArea rows={3} placeholder="Detailed technical specifications and features..." />
          </Form.Item>

          <Form.Item
            name="category"
            label="Equipment Type"
            rules={[{ required: true, message: 'Please select equipment type!' }]}
          >
            <Select placeholder="Select equipment category">
              {categories.map(category => (
                <Option key={category} value={category}>{category}</Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item
            name="price"
            label="Unit Price (USD)"
            rules={[{ required: true, message: 'Please enter unit price!' }]}
          >
            <InputNumber
              style={{ width: '100%' }}
              formatter={value => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
              parser={(value: any) => value!.replace(/\$\s?|(,*)/g, '')}
              min={0}
              placeholder="0.00"
            />
          </Form.Item>

          <Form.Item
            name="stock"
            label="Stock Quantity"
            rules={[{ required: true, message: 'Please enter stock quantity!' }]}
          >
            <InputNumber style={{ width: '100%' }} min={0} placeholder="0" />
          </Form.Item>

          <Form.Item
            name="sku"
            label="Part Number / SKU"
            rules={[{ required: true, message: 'Please enter part number!' }]}
          >
            <Input placeholder="e.g. NAV-GPS-001" />
          </Form.Item>

          <Form.Item
            name="image"
            label="Equipment Image URL"
          >
            <Input placeholder="https://example.com/equipment-image.jpg" />
          </Form.Item>

          <Form.Item
            name="isActive"
            label="Available for Order"
            valuePropName="checked"
          >
            <Switch />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Products; 