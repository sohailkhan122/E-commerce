"use client";

import React from "react";
import { Typography, Card, Button, Divider, Tag } from "antd";

import OrderProductCard from "./OrderProductCard";

const { Title, Text } = Typography;

const OrderDetails = ({ order, setValue }) => {
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
            {order.payment.status}
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
            <Title level={5}>{order.payment.status || "N/A"}</Title>
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
          {order.products?.map((item) => (
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
