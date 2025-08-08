import React, { useState, useEffect } from 'react';
import { Layout, Menu, Avatar, Dropdown, Space, Badge, Button } from 'antd';
import {
  DashboardOutlined,
  ShoppingCartOutlined,
  UserOutlined,
  ShoppingOutlined,
  InboxOutlined,
  SettingOutlined,
  BellOutlined,
  LogoutOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
} from '@ant-design/icons';
import { useNavigate, useLocation } from 'react-router-dom';
import carettaLogo from '../assets/caretta-logo.png';
import carettaLogoWide from '../assets/caretta-logo-wide.png';
import EmergencyNotificationPopup from './EmergencyNotificationPopup';
import { useEmergencyNotification } from '../hooks/useEmergencyNotification';

const { Header, Sider, Content } = Layout;

interface LayoutProps {
  children: React.ReactNode;
}

const MainLayout: React.FC<LayoutProps> = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { isVisible, handleClose } = useEmergencyNotification();

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const menuItems = [
    {
      key: '/',
      icon: <DashboardOutlined />,
      label: 'Vessel Dashboard',
    },
    {
      key: '/jobs',
      icon: <DashboardOutlined />,
      label: 'Jobs',
    },
    {
      key: '/events',
      icon: <ShoppingOutlined />,
      label: 'Events',
    },
    {
      key: '/action-plan',
      icon: <ShoppingCartOutlined />,
      label: 'Action Plan',
    },
    {
      key: '/vessel-management',
      icon: <UserOutlined />,
      label: 'Vessel Managements',
    },
    {
      type: 'group' as const,
      label: 'PLANNED MAINTENANCE',
      children: [
        {
          key: '/certificate',
          icon: <InboxOutlined />,
          label: 'Certificate',
        },
        {
          key: '/maintenance',
          icon: <SettingOutlined />,
          label: 'Maintenance',
        },
        {
          key: '/activation-deactivation-library',
          icon: <ShoppingCartOutlined />,
          label: 'Activation-Deactivation Library',
        },
        {
          key: '/kpi',
          icon: <DashboardOutlined />,
          label: 'KPI',
        },
        {
          key: '/spare-part',
          icon: <ShoppingOutlined />,
          label: 'Spare Part',
        },
        {
          key: '/chemical-test-center',
          icon: <UserOutlined />,
          label: 'Chemical Test Center',
        },
      ],
    },
    {
      type: 'group' as const,
      label: 'PURCHASING & FINANCE',
      children: [
        {
          key: '/purchasing',
          icon: <ShoppingCartOutlined />,
          label: 'Purchasing',
        },
        {
          key: '/running-cost-accounting',
      icon: <InboxOutlined />,
          label: 'Running Cost / Accounting',
        },
      ],
    },
    {
      type: 'group' as const,
      label: 'HSEQ',
      children: [
        {
          key: '/safety',
      icon: <SettingOutlined />,
          label: 'Safety',
        },
        {
          key: '/inspection',
          icon: <DashboardOutlined />,
          label: 'Inspection',
        },
        {
          key: '/offer',
          icon: <ShoppingOutlined />,
          label: 'Offer',
        },
        {
          key: '/training-drill',
          icon: <UserOutlined />,
          label: 'Training & Drill',
        },
        {
          key: '/incident-accident',
          icon: <ShoppingCartOutlined />,
          label: 'Incident / Accident',
        },
        {
          key: '/near-miss',
          icon: <InboxOutlined />,
          label: 'Near Miss',
        },
      ],
    },
  ];

  const userMenuItems = [
    {
      key: 'profile',
      icon: <UserOutlined />,
      label: 'Profil',
    },
    {
      key: 'settings',
      icon: <SettingOutlined />,
      label: 'Ayarlar',
    },
    {
      type: 'divider' as const,
    },
    {
      key: 'logout',
      icon: <LogoutOutlined />,
      label: 'Çıkış Yap',
    },
  ];

  const handleMenuClick = ({ key }: { key: string }) => {
    navigate(key);
  };

  const handleUserMenuClick = ({ key }: { key: string }) => {
    if (key === 'logout') {
      // Logout logic here
      console.log('Logout clicked');
    }
  };

  return (
    <Layout style={{ minHeight: '100vh', background: '#f5f7fa' }}>
        <Header style={{ 
        padding: '0 24px', 
        background: 'linear-gradient(135deg, #1e40af 0%, #3b82f6 50%, #60a5fa 100%)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          position: 'sticky',
          top: 0,
          zIndex: 999,
        width: '100%',
        height: 70,
        boxShadow: '0 4px 12px rgba(30, 64, 175, 0.15)'
      }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '16px'
        }}>
          <img 
            src={collapsed ? carettaLogo : carettaLogoWide} 
            alt="Caretta Logo" 
            style={{ 
              height: 36, 
              width: 'auto',
              objectFit: 'contain',
              filter: 'brightness(0) invert(1)',
              cursor: 'pointer',
              transition: 'opacity 0.2s ease'
            }}
            onClick={() => navigate('/')}
            onMouseEnter={(e) => {
              e.currentTarget.style.opacity = '0.8';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.opacity = '1';
            }}
          />
        </div>
          <Space size="large">
          <Dropdown
            menu={{
              items: [
                {
                  key: 'notification-1',
                  label: (
                    <div style={{ 
                      padding: '8px 12px', 
                      borderBottom: '1px solid #f0f0f0',
                      background: '#ffffff',
                      cursor: 'pointer',
                      transition: 'background-color 0.2s ease'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = '#f8fafc';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = '#ffffff';
                    }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '12px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '4px', minWidth: '80px' }}>
                          <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#3b82f6' }} />
                          <span style={{ fontWeight: '500' }}>BATTLESHIP</span>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '4px', minWidth: '80px' }}>
                          <span style={{ color: '#059669' }}>✓</span>
                          <span>Certificate</span>
                        </div>
                        <div style={{ minWidth: '70px' }}>
                          <span style={{ 
                            background: '#ef4444', 
                            color: 'white', 
                            padding: '2px 6px', 
                            borderRadius: '4px', 
                            fontSize: '10px' 
                          }}>
                            Overdue
                          </span>
                        </div>
                        <div style={{ minWidth: '30px', textAlign: 'center' }}>
                          <span style={{ fontWeight: '500' }}>20</span>
                        </div>
                        <div style={{ minWidth: '50px' }}>
                          <span style={{ 
                            background: '#ef4444', 
                            color: 'white', 
                            padding: '2px 6px', 
                            borderRadius: '4px', 
                            fontSize: '10px' 
                          }}>
                            HIGH
                          </span>
                        </div>
                        <div style={{ flex: 1, fontSize: '11px', color: '#64748b' }}>
                          Certificate renewals pending
                        </div>
                        <div style={{ minWidth: '70px', fontSize: '10px', color: '#94a3b8' }}>
                          2 hours ago
                        </div>
                      </div>
                    </div>
                  ),
                },
                {
                  key: 'notification-2',
                  label: (
                    <div style={{ 
                      padding: '8px 12px', 
                      borderBottom: '1px solid #f0f0f0',
                      background: '#ffffff',
                      cursor: 'pointer',
                      transition: 'background-color 0.2s ease'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = '#f8fafc';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = '#ffffff';
                    }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '12px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '4px', minWidth: '80px' }}>
                          <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#3b82f6' }} />
                          <span style={{ fontWeight: '500' }}>BATTLESHIP</span>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '4px', minWidth: '80px' }}>
                          <span style={{ color: '#ef4444' }}>!</span>
                          <span>Deficiency</span>
                        </div>
                        <div style={{ minWidth: '70px' }}>
                          <span style={{ 
                            background: '#ef4444', 
                            color: 'white', 
                            padding: '2px 6px', 
                            borderRadius: '4px', 
                            fontSize: '10px' 
                          }}>
                            NC
                          </span>
                        </div>
                        <div style={{ minWidth: '30px', textAlign: 'center' }}>
                          <span style={{ fontWeight: '500' }}>5</span>
                        </div>
                        <div style={{ minWidth: '50px' }}>
                          <span style={{ 
                            background: '#ef4444', 
                            color: 'white', 
                            padding: '2px 6px', 
                            borderRadius: '4px', 
                            fontSize: '10px' 
                          }}>
                            HIGH
                          </span>
                        </div>
                        <div style={{ flex: 1, fontSize: '11px', color: '#64748b' }}>
                          Non-conformities identified
                        </div>
                        <div style={{ minWidth: '70px', fontSize: '10px', color: '#94a3b8' }}>
                          4 hours ago
                        </div>
                      </div>
                    </div>
                  ),
                },
                {
                  key: 'notification-3',
                  label: (
                    <div style={{ 
                      padding: '8px 12px', 
                      borderBottom: '1px solid #f0f0f0',
                      background: '#ffffff',
                      cursor: 'pointer',
                      transition: 'background-color 0.2s ease'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = '#f8fafc';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = '#ffffff';
                    }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '12px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '4px', minWidth: '80px' }}>
                          <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#3b82f6' }} />
                          <span style={{ fontWeight: '500' }}>BATTLESHIP</span>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '4px', minWidth: '80px' }}>
                          <span style={{ color: '#ef4444' }}>!</span>
                          <span>Deficiency</span>
                        </div>
                        <div style={{ minWidth: '70px' }}>
                          <span style={{ 
                            background: '#f97316', 
                            color: 'white', 
                            padding: '2px 6px', 
                            borderRadius: '4px', 
                            fontSize: '10px' 
                          }}>
                            Not Completed
                          </span>
                        </div>
                        <div style={{ minWidth: '30px', textAlign: 'center' }}>
                          <span style={{ fontWeight: '500' }}>204</span>
                        </div>
                        <div style={{ minWidth: '50px' }}>
                          <span style={{ 
                            background: '#f97316', 
                            color: 'white', 
                            padding: '2px 6px', 
                            borderRadius: '4px', 
                            fontSize: '10px' 
                          }}>
                            MEDIUM
                          </span>
                        </div>
                        <div style={{ flex: 1, fontSize: '11px', color: '#64748b' }}>
                          Outstanding deficiency reports
                        </div>
                        <div style={{ minWidth: '70px', fontSize: '10px', color: '#94a3b8' }}>
                          6 hours ago
                        </div>
                      </div>
                    </div>
                  ),
                },
                {
                  key: 'notification-4',
                  label: (
                    <div style={{ 
                      padding: '8px 12px', 
                      borderBottom: '1px solid #f0f0f0',
                      background: '#ffffff',
                      cursor: 'pointer',
                      transition: 'background-color 0.2s ease'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = '#f8fafc';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = '#ffffff';
                    }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '12px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '4px', minWidth: '80px' }}>
                          <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#3b82f6' }} />
                          <span style={{ fontWeight: '500' }}>BATTLESHIP</span>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '4px', minWidth: '80px' }}>
                          <span style={{ color: '#f97316' }}>⟳</span>
                          <span>Maintenance</span>
                        </div>
                        <div style={{ minWidth: '70px' }}>
                          <span style={{ 
                            background: '#ef4444', 
                            color: 'white', 
                            padding: '2px 6px', 
                            borderRadius: '4px', 
                            fontSize: '10px' 
                          }}>
                            Overdue
                          </span>
                        </div>
                        <div style={{ minWidth: '30px', textAlign: 'center' }}>
                          <span style={{ fontWeight: '500' }}>8</span>
                        </div>
                        <div style={{ minWidth: '50px' }}>
                          <span style={{ 
                            background: '#ef4444', 
                            color: 'white', 
                            padding: '2px 6px', 
                            borderRadius: '4px', 
                            fontSize: '10px' 
                          }}>
                            HIGH
                          </span>
                        </div>
                        <div style={{ flex: 1, fontSize: '11px', color: '#64748b' }}>
                          Scheduled maintenance overdue
                        </div>
                        <div style={{ minWidth: '70px', fontSize: '10px', color: '#94a3b8' }}>
                          1 hour ago
                        </div>
                      </div>
                    </div>
                  ),
                },
                {
                  key: 'notification-5',
                  label: (
                    <div style={{ 
                      padding: '8px 12px', 
                      borderBottom: '1px solid #f0f0f0',
                      background: '#ffffff',
                      cursor: 'pointer',
                      transition: 'background-color 0.2s ease'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = '#f8fafc';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = '#ffffff';
                    }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '12px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '4px', minWidth: '80px' }}>
                          <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#3b82f6' }} />
                          <span style={{ fontWeight: '500' }}>BATTLESHIP</span>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '4px', minWidth: '80px' }}>
                          <span style={{ color: '#7c3aed' }}>△</span>
                          <span>Risk Assessment</span>
                        </div>
                        <div style={{ minWidth: '70px' }}>
                          <span style={{ 
                            background: '#059669', 
                            color: 'white', 
                            padding: '2px 6px', 
                            borderRadius: '4px', 
                            fontSize: '10px' 
                          }}>
                            Approved
                          </span>
                        </div>
                        <div style={{ minWidth: '30px', textAlign: 'center' }}>
                          <span style={{ fontWeight: '500' }}>2</span>
                        </div>
                        <div style={{ minWidth: '50px' }}>
                          <span style={{ 
                            background: '#059669', 
                            color: 'white', 
                            padding: '2px 6px', 
                            borderRadius: '4px', 
                            fontSize: '10px' 
                          }}>
                            LOW
                          </span>
                        </div>
                        <div style={{ flex: 1, fontSize: '11px', color: '#64748b' }}>
                          Risk assessments approved
                        </div>
                        <div style={{ minWidth: '70px', fontSize: '10px', color: '#94a3b8' }}>
                          8 hours ago
                        </div>
                      </div>
                    </div>
                  ),
                },
                {
                  type: 'divider' as const,
                },
                {
                  key: 'view-all',
                  label: (
                    <div style={{ textAlign: 'center', padding: '12px 16px' }}>
                      <Button type="link" style={{ padding: 0, color: '#3b82f6', fontWeight: 500 }}>
                        Tümünü Gör
                      </Button>
                    </div>
                  ),
                },
              ],
              onClick: ({ key }) => {
                if (key === 'view-all') {
                  navigate('/notifications');
                } else {
                  console.log('View notification:', key);
                }
              },
            }}
            placement="bottomRight"
            trigger={['click']}
            popupRender={(menu) => (
              <div style={{ 
                background: '#ffffff', 
                borderRadius: '8px', 
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
                border: '1px solid #e5e7eb',
                minWidth: '350px'
              }}>
                <div style={{ 
                  padding: '12px 16px', 
                  borderBottom: '1px solid #e5e7eb',
                  background: '#f8fafc'
                }}>
                  <div style={{ fontWeight: 'bold', color: '#1e293b' }}>Recent Notifications</div>
                  <div style={{ fontSize: '12px', color: '#64748b' }}>Latest updates from your fleet</div>
                </div>
                {menu}
              </div>
            )}
          >
            <Badge count={5} size="small" color="#ef4444">
              <BellOutlined style={{ fontSize: '20px', cursor: 'pointer', color: '#ffffff' }} />
            </Badge>
          </Dropdown>
            <Dropdown
              menu={{
                items: userMenuItems,
                onClick: handleUserMenuClick,
              }}
              placement="bottomRight"
            >
              <Space style={{ cursor: 'pointer' }}>
              <Avatar size={36} src="https://api.dicebear.com/7.x/avataaars/svg?seed=Admin" />
              <span style={{ color: '#ffffff', fontWeight: 500 }}>Koray Kılıç</span>
              </Space>
            </Dropdown>
          </Space>
        </Header>
      <Layout style={{ display: 'flex', flexDirection: 'row' }}>
        <Sider 
          trigger={null} 
          collapsible 
          collapsed={collapsed} 
          theme="light"
          style={{
            height: 'calc(100vh - 70px)',
            position: 'fixed',
            left: 0,
            top: 70,
            zIndex: 1000,
            display: isMobile && !collapsed ? 'none' : 'block',
            background: '#ffffff',
            borderRight: '1px solid #e5e7eb',
            boxShadow: '2px 0 8px rgba(0, 0, 0, 0.08)'
          }}
        >
          <div style={{
            padding: '20px 16px',
            borderBottom: '1px solid #f3f4f6',
            background: '#fafbfc'
          }}>
            <div style={{
              fontSize: collapsed ? 12 : 16,
              fontWeight: 600,
              color: '#374151',
              textAlign: collapsed ? 'center' : 'left'
            }}>
              {collapsed ? 'MENU' : 'NAVIGATION'}
            </div>
          </div>
          <Menu
            theme="light"
            mode="inline"
            selectedKeys={[location.pathname]}
            items={menuItems}
            onClick={handleMenuClick}
            style={{ 
              height: 'calc(100vh - 180px)',
              background: '#ffffff',
              border: 'none',
              fontSize: '14px'
            }}
          />
          <style>
            {`
              .ant-menu-light .ant-menu-item-selected {
                background: linear-gradient(135deg, #1e40af 0%, #3b82f6 50%, #60a5fa 100%) !important;
                color: #ffffff !important;
                border-radius: 8px !important;
                margin: 4px 8px !important;
              }
              .ant-menu-light .ant-menu-item-selected .anticon {
                color: #ffffff !important;
              }
              .ant-menu-light .ant-menu-item-selected::after {
                display: none !important;
              }
              .ant-menu-light .ant-menu-item-selected:hover {
                background: linear-gradient(135deg, #1e40af 0%, #3b82f6 50%, #60a5fa 100%) !important;
                color: #ffffff !important;
              }
            `}
          </style>
          <div style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            padding: '16px',
            borderTop: '1px solid #f3f4f6',
            display: 'flex',
            justifyContent: collapsed ? 'center' : 'flex-end',
            background: '#fafbfc'
          }}>
            {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
              className: 'trigger',
              onClick: () => setCollapsed(!collapsed),
              style: { 
                fontSize: '18px',
                color: '#6b7280',
                cursor: 'pointer',
                padding: '8px',
                borderRadius: '6px',
                transition: 'all 0.2s ease',
                background: collapsed ? 'transparent' : '#ffffff',
                border: collapsed ? 'none' : '1px solid #e5e7eb'
              }
            })}
          </div>
        </Sider>
        <Layout style={{ 
          marginLeft: isMobile ? 0 : (collapsed ? 80 : 200), 
          transition: 'margin-left 0.2s',
          width: '100%'
        }}>
          <Content
            style={{
              margin: '20px',
              padding: 0,
              minHeight: 'calc(100vh - 110px)',
              background: '#f5f7fa',
              borderRadius: 12,
              overflow: 'hidden'
            }}
          >
            <div style={{
              background: '#ffffff',
              margin: 0,
              padding: '24px',
              minHeight: '100%',
              borderRadius: 12,
              boxShadow: '0 2px 8px rgba(0, 0, 0, 0.06)',
              border: '1px solid #f1f5f9'
            }}>
          {children}
            </div>
        </Content>
        </Layout>
      </Layout>
      
      {/* Emergency Notification Popup */}
      <EmergencyNotificationPopup 
        visible={isVisible} 
        onClose={handleClose} 
      />
    </Layout>
  );
};

export default MainLayout; 