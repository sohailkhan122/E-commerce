"use client";
import { Layout, Menu, Drawer, Button, Grid, Typography, Divider } from "antd";
import { FilterOutlined } from "@ant-design/icons";
import { useState } from "react";

const { Sider } = Layout;
const { Title, Text } = Typography;
const { useBreakpoint } = Grid;

const ProductSidebar = ({ route, selectedFilter, handleFilter }) => {
    const screens = useBreakpoint();
    const [open, setOpen] = useState(false);

    const joggersMenu = [
        { key: "snackers", label: "Snackers" },
        { key: "joggers", label: "Joggers" },
        { key: "normalshoes", label: "Normal Shoes" },
    ];

    const defaultMenu = [
        { key: "", label: "All Products" },
        { key: "tops", label: "Tops" },
        { key: "printed_t_shirt", label: "Printed T-shirts" },
        { key: "plain_t_shirt", label: "Plain T-shirts" },
        { key: "kurti", label: "Kurti" },
        { key: "full_sleeve_t_shirt", label: "Full sleeve T-shirts" },
        { key: "jeans", label: "Jeans" },
    ];

    const menuItems =
        route.category === "joggers" ? joggersMenu : defaultMenu;

    const SidebarContent = (
        <div className="flex flex-col gap-4">
            <Title level={4} className="!m-0">
                Filters
            </Title>
            <Menu
                mode="inline"
                selectedKeys={[selectedFilter]}
                onClick={(e) => handleFilter(e.key)}
                items={menuItems}
                className="border-0"
                style={{ borderRight: 0 }}
            />
            <Divider />
            {/* Additional Info Sections */}
            <div className="space-y-4">
                <div>
                    <Title level={5} className="!m-0 !mb-2">
                        Enjoy Shopping
                    </Title>
                    <Text type="secondary" className="text-xs leading-relaxed">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Obcaecati
                        sapiente odio explicabo dolore eius numquam quibusdam!
                    </Text>
                </div>
                <Divider className="!my-3" />
                <div>
                    <Title level={5} className="!m-0 !mb-2">
                        Free Delivery
                    </Title>
                    <Text type="secondary" className="text-xs leading-relaxed">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Obcaecati
                        sapiente odio explicabo dolore eius numquam quibusdam!
                    </Text>
                </div>
            </div>
        </div>
    );
    // 🔹 Tablet View and below (!lg - show Drawer)
    if (!screens.lg) {
        return (
            <div className="w-full mb-4">
                <Button
                    icon={<FilterOutlined />}
                    onClick={() => setOpen(true)}
                    type="default"
                    className="w-full"
                    size="large"
                >
                    Filters
                </Button>

                <Drawer
                    title={<Title level={4} className="!m-0">Filters</Title>}
                    placement="left"
                    open={open}
                    onClose={() => setOpen(false)}
                    width={280}
                    className="products-filter-drawer"
                >
                    {SidebarContent}
                </Drawer>
            </div>
        )
    }
    // 🔹 Desktop View (lg and above - show Sidebar)
    return (
        <Sider
            width={295}
            className="!sticky !top-20 !bg-white !border-r !border-gray-200 !h-fit shadow-sm"
            style={{
                padding: "16px 12px",
            }}
        >
            {SidebarContent}
        </Sider>
    );
};

export default ProductSidebar;
