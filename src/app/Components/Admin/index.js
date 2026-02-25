"use client";
import React, { useState } from "react";
import { Layout, Menu, Button, theme, Grid, message } from "antd";
import {
  AppstoreAddOutlined,
  EditOutlined,
  LoginOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  OrderedListOutlined,
  UserOutlined,
} from "@ant-design/icons";
import ProductAdd from "./ProductAdd";
import UpdateProduct from "./UpdateProduct";
import OrderList from "./OrderList";
import UserLogin from "./UserLogin";
import { useRouter } from "next/navigation";
import { logoutUser } from "@/app/api/user";

const { Header, Sider, Content } = Layout;
const { useBreakpoint } = Grid;

const AdminDashboard = () => {
  const screens = useBreakpoint(); // ✅ detect screen size
  const [collapsed, setCollapsed] = useState(false);
  const [selectedMenuKey, setSelectedMenuKey] = useState("1");
  const router = useRouter();

  const handleMenuClick = (key) => {
    setSelectedMenuKey(key);
  };

  const handleLogout = async () => {
    try {
      const res = await logoutUser();
      console.log("Logout response:", res);
      message.success("Logged out successfully");
      router.push("/login");
    } catch (error) {
      console.log("Logout error:", error);
      message.error("Logout failed");
    }
  };

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const renderContent = () => {
    switch (selectedMenuKey) {
      case "1":
        return <UserLogin />;
      case "2":
        return <ProductAdd />;
      case "3":
        return <UpdateProduct />;
      case "4":
        return <OrderList />;
      default:
        return null;
    }
  };

  return (
    <Layout style={{ minHeight: "100vh" }}>
      {/* ✅ Responsive Sider */}
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
        breakpoint="lg" // auto collapse below 992px
        collapsedWidth={screens.xs ? 0 : 80} // fully hide on mobile
      >
        <h1 style={{ color: "white", padding: "16px" }}>
          {!collapsed && "Admin"}
        </h1>

        <Menu
          theme="dark"
          mode="inline"
          selectedKeys={[selectedMenuKey]}
          onClick={({ key }) => {
            if (key === "5") {
              handleLogout();
            } else {
              handleMenuClick(key);
            }
          }}
          items={[
            { key: "1", icon: <UserOutlined />, label: "Users" },
            { key: "2", icon: <AppstoreAddOutlined />, label: "Product Add" },
            { key: "3", icon: <EditOutlined />, label: "Update Products" },
            { key: "4", icon: <OrderedListOutlined />, label: "Order List" },
            { key: "5", icon: <LoginOutlined />, label: "Log Out" },
          ]}
        />
      </Sider>

      <Layout>
        {/* ✅ Responsive Header */}
        <Header
          style={{
            padding: "0 16px",
            background: colorBgContainer,
            display: "flex",
            alignItems: "center",
          }}
        >
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{ fontSize: 18 }}
          />
        </Header>

        {/* ✅ Responsive Content */}
        <Content
          style={{
            margin: "16px",
            padding: "16px",
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
            overflowX: "auto",
          }}
        >
          {renderContent()}
        </Content>
      </Layout>
    </Layout>
  );
};

export default AdminDashboard;