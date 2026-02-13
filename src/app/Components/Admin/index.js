"use client"
import React, { useState } from 'react';
import { Layout, Menu, Button, theme } from 'antd';
import {
  AppstoreAddOutlined,
  EditOutlined,
  LoginOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  OrderedListOutlined,
  UserOutlined,
} from '@ant-design/icons';
import ProductAdd from './ProductAdd';
import UpdateProduct from './UpdateProduct';
import OrderList from './OrderList';
import UserLogin from './UserLogin';
import { useRouter } from 'next/navigation';

const { Header, Sider, Content } = Layout;

const AdminDashboard = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [selectedMenuKey, setSelectedMenuKey] = useState('1');
  const router = useRouter();

  const handleMenuClick = (key) => {
    setSelectedMenuKey(key);
  };

  const handleLogout = () => {
    router.push('/login');
  };

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const renderContent = () => {
    switch (selectedMenuKey) {
      case '1':
        return <UserLogin />;
      case '2':
        return <ProductAdd />;
      case '3':
        return <UpdateProduct />;
      case '4':
        return <OrderList />;
      default:
        return null;
    }
  };

  return (
    <Layout style={{ width: '100%', height: '100vh' }}>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="demo-logo-vertical" />
        <h1 style={{ color: 'white', padding: '10px' }}>Admin</h1>
        <Menu
          style={{ marginTop: '20px' }}
          theme="dark"
          mode="inline"
          defaultSelectedKeys={['1']}
          selectedKeys={[selectedMenuKey]}
          onClick={({ key }) => handleMenuClick(key)}
          items={[
            {
              key: '1',
              icon: <UserOutlined />,
              label: 'Users',
            },
            {
              key: '2',
              icon: <AppstoreAddOutlined />,
              label: 'Product Add',
            },
            {
              key: '3',
              icon: <EditOutlined />,
              label: 'Update Products',
            },
            {
              key: '4',
              icon: <OrderedListOutlined />,
              label: 'Order List',
            },
            {
              key: '5',
              icon: <LoginOutlined />,
              label: 'Log Out',
              onClick: handleLogout,
            },
          ]}
        />
      </Sider>
      <Layout>
        <Header
          style={{
            padding: 0,
            background: colorBgContainer,
          }}
        >
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: '16px',
              width: 64,
              height: 64,
            }}
          />
        </Header>
        <Content
          style={{
            margin: '24px 16px',
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
            overflow: 'scroll',
          }}
        >
          {renderContent()}
        </Content>
      </Layout>
    </Layout>
  );
};

export default AdminDashboard;

