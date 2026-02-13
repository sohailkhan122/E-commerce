"use client";

import React, { useEffect, useState } from "react";
import { Typography, Card, Button, Skeleton, Divider, Tag } from "antd";
import axios from "axios";
import { useRouter } from "next/navigation";
import OrderProductCard from "./OrderProductCard";

const { Title, Text } = Typography;

const OrderDetails = ({ selectedOrderveiwId, setValue }) => {
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  const router = useRouter();

  const userId =
    typeof window !== "undefined"
      ? JSON.parse(localStorage.getItem("userData"))?._id
      : null;

  useEffect(() => {
    if (!selectedOrderveiwId || !userId) return;

    const fetchOrder = async () => {
      try {
        setLoading(true);
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/order/getOrdersByUserId/${userId}`
        );

        if (res.data.success) {
          const selected = res.data.orders.find(
            (o) => o._id === selectedOrderveiwId
          );
          setOrder(selected || null);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();
  }, [selectedOrderveiwId, userId]);

  /* ================= LOADING ================= */
  if (loading) {
    return (
      <div className="p-4 max-w-5xl mx-auto">
        <Skeleton active paragraph={{ rows: 6 }} />
      </div>
    );
  }

  /* ================= NO ORDER ================= */
  if (!order) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center gap-3">
        <Title level={4}>Order not found</Title>
        <Button type="primary" onClick={() => router.push("/")}>
          Continue Shopping
        </Button>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-4">
      {/* ================= HEADER ================= */}
      <Card className="mb-4">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
          <div>
            <Title level={4} className="!mb-1">
              My Order
            </Title>
            <Text type="secondary">Order ID: #{order._id?.slice(0, 8)?.toUpperCase()}</Text>
          </div>

          <Tag
            color={
              order.status === "completed"
                ? "green"
                : order.status === "pending"
                  ? "orange"
                  : "blue"
            }
            className="w-fit"
          >
            {order.status.toUpperCase()}
          </Tag>
        </div>
      </Card>

      {/* ================= ORDER INFO ================= */}
      <Card className="mb-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <div>
            <Text type="secondary">Total Amount</Text>
            <Title level={5}>${order.total?.toFixed(2)}</Title>
          </div>

          <div>
            <Text type="secondary">Placed On</Text>
            <Title level={5}>
              {new Date(order.createdAt).toLocaleDateString()}
            </Title>
          </div>

          <div>
            <Text type="secondary">Payment Method</Text>
            <Title level={5}>{order.paymentMethod || "N/A"}</Title>
          </div>
        </div>
      </Card>

      {/* ================= PRODUCTS ================= */}
      <Card>
        <Title level={5} className="!mb-3">
          Ordered Products
        </Title>

        <Divider className="!my-3" />

        <div className="flex flex-col gap-4">
          {order.productDetails?.map((item) => (
            <OrderProductCard
              key={item._id}
              items={item}
              orderId={order._id}
              setValue={setValue}
            />
          ))}
        </div>
      </Card>
    </div>
  );
};

export default OrderDetails;
