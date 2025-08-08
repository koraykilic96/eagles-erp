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
  Avatar, 
  Statistic,
  Row,
  Col,
  message,
  Popconfirm
} from 'antd';
import { 
  PlusOutlined, 
  SearchOutlined, 
  EditOutlined, 
  DeleteOutlined,
  UserOutlined,
  MailOutlined,
  PhoneOutlined,
  EnvironmentOutlined
} from '@ant-design/icons';
import { mockCustomers } from '../data/mockData';
import type { Customer } from '../types/index';

const { Search } = Input;

const Customers: React.FC = () => {
  const [customers, setCustomers] = useState<Customer[]>(mockCustomers);
  const [searchText, setSearchText] = useState('');
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingCustomer, setEditingCustomer] = useState<Customer | null>(null);
  const [form] = Form.useForm();

  const handleSearch = (value: string) => {
    setSearchText(value);
  };

  const filteredCustomers = customers.filter(customer => {
    return customer.name.toLowerCase().includes(searchText.toLowerCase()) ||
           customer.email.toLowerCase().includes(searchText.toLowerCase()) ||
           customer.phone.includes(searchText) ||
           (customer.company && customer.company.toLowerCase().includes(searchText.toLowerCase()));
  });

  const handleAddCustomer = () => {
    setEditingCustomer(null);
    form.resetFields();
    setIsModalVisible(true);
  };

  const handleEditCustomer = (customer: Customer) => {
    setEditingCustomer(customer);
    form.setFieldsValue(customer);
    setIsModalVisible(true);
  };

  const handleDeleteCustomer = (customerId: string) => {
    setCustomers(customers.filter(c => c.id !== customerId));
    message.success('Müşteri başarıyla silindi');
  };

  const handleModalOk = async () => {
    try {
      const values = await form.validateFields();
      if (editingCustomer) {
        // Edit existing customer
        setCustomers(customers.map(c => 
          c.id === editingCustomer.id ? { ...c, ...values } : c
        ));
        message.success('Müşteri başarıyla güncellendi');
      } else {
        // Add new customer
        const newCustomer: Customer = {
          id: Date.now().toString(),
          ...values,
          totalOrders: 0,
          totalSpent: 0,
          isActive: true,
          createdAt: new Date().toISOString().split('T')[0]
        };
        setCustomers([...customers, newCustomer]);
        message.success('Müşteri başarıyla eklendi');
      }
      setIsModalVisible(false);
    } catch (error) {
      console.error('Validation failed:', error);
    }
  };

  const columns = [
    {
      title: 'Müşteri',
      dataIndex: 'name',
      key: 'name',
      render: (name: string, record: Customer) => (
        <Space>
          <Avatar 
            src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${name}`}
            size={40}
          />
          <div>
            <div style={{ fontWeight: 'bold' }}>{name}</div>
            <div style={{ fontSize: '12px', color: '#666' }}>
              <MailOutlined style={{ marginRight: 4 }} />
              {record.email}
            </div>
          </div>
        </Space>
      ),
    },
    {
      title: 'İletişim',
      key: 'contact',
      render: (_, record: Customer) => (
        <div>
          <div style={{ fontSize: '12px', marginBottom: '4px' }}>
            <PhoneOutlined style={{ marginRight: 4 }} />
            {record.phone}
          </div>
          <div style={{ fontSize: '12px', color: '#666' }}>
            <EnvironmentOutlined style={{ marginRight: 4 }} />
            {record.address}
          </div>
        </div>
      ),
    },
    {
      title: 'Şirket',
      dataIndex: 'company',
      key: 'company',
      render: (company: string) => company ? <Tag color="blue">{company}</Tag> : '-',
    },
    {
      title: 'Siparişler',
      dataIndex: 'totalOrders',
      key: 'totalOrders',
      render: (orders: number) => (
        <Tag color="green">{orders} sipariş</Tag>
      ),
      sorter: (a: Customer, b: Customer) => a.totalOrders - b.totalOrders,
    },
    {
      title: 'Toplam Harcama',
      dataIndex: 'totalSpent',
      key: 'totalSpent',
      render: (spent: number) => (
        <strong style={{ color: '#1890ff' }}>₺{spent.toLocaleString()}</strong>
      ),
      sorter: (a: Customer, b: Customer) => a.totalSpent - b.totalSpent,
    },
    {
      title: 'Durum',
      dataIndex: 'isActive',
      key: 'isActive',
      render: (isActive: boolean) => (
        <Tag color={isActive ? 'green' : 'red'}>
          {isActive ? 'Aktif' : 'Pasif'}
        </Tag>
      ),
    },
    {
      title: 'İşlemler',
      key: 'actions',
      render: (_, record: Customer) => (
        <Space>
          <Button 
            type="text" 
            icon={<EditOutlined />} 
            onClick={() => handleEditCustomer(record)}
          />
          <Popconfirm
            title="Bu müşteriyi silmek istediğinizden emin misiniz?"
            onConfirm={() => handleDeleteCustomer(record.id)}
            okText="Evet"
            cancelText="Hayır"
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

  const totalCustomers = customers.length;
  const activeCustomers = customers.filter(c => c.isActive).length;
  const totalRevenue = customers.reduce((sum, c) => sum + c.totalSpent, 0);
  const avgOrderValue = totalRevenue / customers.reduce((sum, c) => sum + c.totalOrders, 1);

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
        <h1>Müşteriler</h1>
        <Button 
          type="primary" 
          icon={<PlusOutlined />} 
          onClick={handleAddCustomer}
        >
          Yeni Müşteri Ekle
        </Button>
      </div>

      {/* Stats Cards */}
      <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Toplam Müşteri"
              value={totalCustomers}
              prefix={<UserOutlined />}
              valueStyle={{ color: '#1890ff' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Aktif Müşteri"
              value={activeCustomers}
              prefix={<UserOutlined />}
              valueStyle={{ color: '#52c41a' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Toplam Gelir"
              value={totalRevenue}
              prefix="₺"
              valueStyle={{ color: '#3f8600' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Ortalama Sipariş"
              value={Math.round(avgOrderValue)}
              prefix="₺"
              valueStyle={{ color: '#722ed1' }}
            />
          </Card>
        </Col>
      </Row>

      <Card>
        <Space style={{ marginBottom: 16 }}>
          <Search
            placeholder="Müşteri ara..."
            allowClear
            onSearch={handleSearch}
            style={{ width: 300 }}
            prefix={<SearchOutlined />}
          />
        </Space>

        <Table
          columns={columns}
          dataSource={filteredCustomers}
          rowKey="id"
          pagination={{
            total: filteredCustomers.length,
            pageSize: 10,
            showSizeChanger: true,
            showQuickJumper: true,
            showTotal: (total, range) => `${range[0]}-${range[1]} / ${total} müşteri`,
          }}
        />
      </Card>

      <Modal
        title={editingCustomer ? 'Müşteri Düzenle' : 'Yeni Müşteri Ekle'}
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
            label="Müşteri Adı"
            rules={[{ required: true, message: 'Lütfen müşteri adını girin!' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="email"
            label="E-posta"
            rules={[
              { required: true, message: 'Lütfen e-posta adresini girin!' },
              { type: 'email', message: 'Geçerli bir e-posta adresi girin!' }
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="phone"
            label="Telefon"
            rules={[{ required: true, message: 'Lütfen telefon numarasını girin!' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="address"
            label="Adres"
            rules={[{ required: true, message: 'Lütfen adresi girin!' }]}
          >
            <Input.TextArea rows={3} />
          </Form.Item>

          <Form.Item
            name="company"
            label="Şirket"
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Customers; 