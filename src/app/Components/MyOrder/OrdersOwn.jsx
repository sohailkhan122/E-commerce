"use client";
import { Button, Typography, Skeleton } from "antd";
import React, { useEffect, useState } from "react";
import OrderCard from "./OrderCard"; // pre-configured axios instance
import { useRouter } from "next/navigation";
import { getUserOrders } from "@/app/api/order";

const { Title, Text } = Typography;

const OrdersOwn = ({ setorder, setValue }) => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const router = useRouter();

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true);
        const response = await getUserOrders(); // backend: /api/orders
        if (response.success) {
          setOrders(response.orders);
        }
      } catch (error) {
        console.error("Error fetching orders:", error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  /* ---------- Empty State ---------- */
  if (!loading && orders.length === 0) {
    return (
      <div className="w-full min-h-[70vh] flex flex-col items-center justify-center gap-4 text-center px-4">
        <img
          src="/Images/Frame 376.png"
          alt="No Orders"
          className="max-w-xs md:max-w-md w-full object-contain"
        />
        <div>
          <Title level={3}>No Orders 😕</Title>
          <Text type="secondary">Add something to make it happy!</Text>
        </div>
        <Button type="primary" onClick={() => router.push("/")}>
          Continue Shopping
        </Button>
      </div>
    );
  }

  /* ---------- Orders List ---------- */
  return (
    <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 py-6">
      <Title level={3} className="mb-6">
        My Orders
      </Title>

      <div className="flex flex-col gap-4">
        {loading
          ? Array.from({ length: 3 }).map((_, index) => (
            <Skeleton key={index} active paragraph={{ rows: 4 }} />
          ))
          : orders.map((item) => (
            <OrderCard
              key={item._id} // Use a unique identifier like item._id instead of Math.random()
              item={item}
              setValue={setValue}
              setorder={setorder}
            />
          ))}
      </div>
    </div>
  );
};

export default OrdersOwn;