import React, { useState } from 'react';
import { 
  Table, 
  Card, 
  Button, 
  Space, 
  Input, 
  Select, 
  Tag, 
  Modal, 
  Descriptions, 
  List,
  Avatar,
  message,
  Badge
} from 'antd';
import { 
  SearchOutlined, 
  EyeOutlined, 
  EditOutlined,
  PrinterOutlined,
  MailOutlined
} from '@ant-design/icons';
import { mockOrders, mockProducts } from '../data/mockData';
import type { Order } from '../types/index';

const { Search } = Input;
const { Option } = Select;

const Orders: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>(mockOrders);
  const [searchText, setSearchText] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  const handleSearch = (value: string) => {
    setSearchText(value);
  };

  const handleStatusChange = (value: string) => {
    setSelectedStatus(value);
  };

  const filteredOrders = orders.filter(order => {
    const matchesSearch = order.customerName.toLowerCase().includes(searchText.toLowerCase()) ||
                         order.customerEmail.toLowerCase().includes(searchText.toLowerCase()) ||
                         order.id.toLowerCase().includes(searchText.toLowerCase());
    const matchesStatus = selectedStatus === 'all' || order.status === selectedStatus;
    return matchesSearch && matchesStatus;
  });

  const handleViewOrder = (order: Order) => {
    setSelectedOrder(order);
    setIsModalVisible(true);
  };

  const handleStatusUpdate = (orderId: string, newStatus: Order['status']) => {
    setOrders(orders.map(order => 
      order.id === orderId ? { ...order, status: newStatus } : order
    ));
    message.success('Sipariş durumu güncellendi');
  };

  const getStatusColor = (status: string) => {
    const statusConfig = {
      pending: 'orange',
      processing: 'blue',
      shipped: 'purple',
      delivered: 'green',
      cancelled: 'red',
    };
    return statusConfig[status as keyof typeof statusConfig] || 'default';
  };

  const getStatusText = (status: string) => {
    const statusConfig = {
      pending: 'Beklemede',
      processing: 'İşleniyor',
      shipped: 'Kargoda',
      delivered: 'Teslim Edildi',
      cancelled: 'İptal Edildi',
    };
    return statusConfig[status as keyof typeof statusConfig] || status;
  };

  const columns = [
    {
      title: 'Sipariş No',
      dataIndex: 'id',
      key: 'id',
      render: (id: string) => <strong>#{id}</strong>,
    },
    {
      title: 'Müşteri',
      dataIndex: 'customerName',
      key: 'customerName',
      render: (name: string, record: Order) => (
        <div>
          <div style={{ fontWeight: 'bold' }}>{name}</div>
          <div style={{ fontSize: '12px', color: '#666' }}>{record.customerEmail}</div>
        </div>
      ),
    },
    {
      title: 'Ürünler',
      dataIndex: 'products',
      key: 'products',
      render: (products: any[]) => (
        <div>
          {products.map((product, index) => (
            <div key={index} style={{ fontSize: '12px', marginBottom: '2px' }}>
              {product.productName} x{product.quantity}
            </div>
          ))}
        </div>
      ),
    },
    {
      title: 'Toplam',
      dataIndex: 'totalAmount',
      key: 'totalAmount',
      render: (amount: number) => (
        <strong style={{ color: '#1890ff' }}>₺{amount.toLocaleString()}</strong>
      ),
      sorter: (a: Order, b: Order) => a.totalAmount - b.totalAmount,
    },
    {
      title: 'Durum',
      dataIndex: 'status',
      key: 'status',
      render: (status: string, record: Order) => (
        <Space direction="vertical" size="small">
          <Tag color={getStatusColor(status)}>
            {getStatusText(status)}
          </Tag>
          <Select
            size="small"
            value={status}
            style={{ width: 120 }}
            onChange={(value) => handleStatusUpdate(record.id, value)}
          >
            <Option value="pending">Beklemede</Option>
            <Option value="processing">İşleniyor</Option>
            <Option value="shipped">Kargoda</Option>
            <Option value="delivered">Teslim Edildi</Option>
            <Option value="cancelled">İptal Edildi</Option>
          </Select>
        </Space>
      ),
    },
    {
      title: 'Tarih',
      dataIndex: 'orderDate',
      key: 'orderDate',
      render: (date: string) => new Date(date).toLocaleDateString('tr-TR'),
      sorter: (a: Order, b: Order) => new Date(a.orderDate).getTime() - new Date(b.orderDate).getTime(),
    },
    {
      title: 'İşlemler',
      key: 'actions',
      render: (_, record: Order) => (
        <Space>
          <Button 
            type="text" 
            icon={<EyeOutlined />} 
            onClick={() => handleViewOrder(record)}
          />
          <Button 
            type="text" 
            icon={<EditOutlined />} 
            onClick={() => console.log('Edit order:', record.id)}
          />
          <Button 
            type="text" 
            icon={<PrinterOutlined />} 
            onClick={() => console.log('Print order:', record.id)}
          />
          <Button 
            type="text" 
            icon={<MailOutlined />} 
            onClick={() => console.log('Send email:', record.id)}
          />
        </Space>
      ),
    },
  ];

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
        <h1>Siparişler</h1>
        <Space>
          <Badge count={orders.filter(o => o.status === 'pending').length} size="small">
            <Button>Bekleyen Siparişler</Button>
          </Badge>
          <Button type="primary">Yeni Sipariş</Button>
        </Space>
      </div>

      <Card>
        <Space style={{ marginBottom: 16 }}>
          <Search
            placeholder="Sipariş ara..."
            allowClear
            onSearch={handleSearch}
            style={{ width: 300 }}
            prefix={<SearchOutlined />}
          />
          <Select
            defaultValue="all"
            style={{ width: 150 }}
            onChange={handleStatusChange}
          >
            <Option value="all">Tüm Durumlar</Option>
            <Option value="pending">Beklemede</Option>
            <Option value="processing">İşleniyor</Option>
            <Option value="shipped">Kargoda</Option>
            <Option value="delivered">Teslim Edildi</Option>
            <Option value="cancelled">İptal Edildi</Option>
          </Select>
        </Space>

        <Table
          columns={columns}
          dataSource={filteredOrders}
          rowKey="id"
          pagination={{
            total: filteredOrders.length,
            pageSize: 10,
            showSizeChanger: true,
            showQuickJumper: true,
            showTotal: (total, range) => `${range[0]}-${range[1]} / ${total} sipariş`,
          }}
        />
      </Card>

      <Modal
        title={`Sipariş Detayı - #${selectedOrder?.id}`}
        open={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={[
          <Button key="back" onClick={() => setIsModalVisible(false)}>
            Kapat
          </Button>,
          <Button key="print" icon={<PrinterOutlined />}>
            Yazdır
          </Button>,
          <Button key="email" icon={<MailOutlined />}>
            E-posta Gönder
          </Button>,
        ]}
        width={800}
      >
        {selectedOrder && (
          <div>
            <Descriptions title="Müşteri Bilgileri" bordered column={2}>
              <Descriptions.Item label="Müşteri Adı">{selectedOrder.customerName}</Descriptions.Item>
              <Descriptions.Item label="E-posta">{selectedOrder.customerEmail}</Descriptions.Item>
              <Descriptions.Item label="Sipariş Tarihi">
                {new Date(selectedOrder.orderDate).toLocaleDateString('tr-TR')}
              </Descriptions.Item>
              <Descriptions.Item label="Durum">
                <Tag color={getStatusColor(selectedOrder.status)}>
                  {getStatusText(selectedOrder.status)}
                </Tag>
              </Descriptions.Item>
              {selectedOrder.deliveryDate && (
                <Descriptions.Item label="Teslimat Tarihi">
                  {new Date(selectedOrder.deliveryDate).toLocaleDateString('tr-TR')}
                </Descriptions.Item>
              )}
            </Descriptions>

            <div style={{ marginTop: 24 }}>
              <h3>Ürünler</h3>
              <List
                itemLayout="horizontal"
                dataSource={selectedOrder.products}
                renderItem={(item) => (
                  <List.Item>
                    <List.Item.Meta
                      avatar={<Avatar shape="square" size={50} />}
                      title={item.productName}
                      description={`Miktar: ${item.quantity} | Birim Fiyat: ₺${item.unitPrice.toLocaleString()}`}
                    />
                    <div style={{ textAlign: 'right' }}>
                      <div style={{ fontWeight: 'bold', fontSize: '16px' }}>
                        ₺{item.totalPrice.toLocaleString()}
                      </div>
                    </div>
                  </List.Item>
                )}
              />
            </div>

            <div style={{ 
              marginTop: 24, 
              padding: 16, 
              backgroundColor: '#f5f5f5', 
              borderRadius: 6,
              textAlign: 'right'
            }}>
              <div style={{ fontSize: '18px', fontWeight: 'bold' }}>
                Toplam: ₺{selectedOrder.totalAmount.toLocaleString()}
              </div>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default Orders; 