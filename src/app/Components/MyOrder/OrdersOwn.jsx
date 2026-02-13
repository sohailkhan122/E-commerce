"use client";
import { Button, Typography, Skeleton } from "antd";
import React, { useEffect, useState } from "react";
import OrderCard from "./OrderCard";
import axios from "axios";
import { useRouter } from "next/navigation";

const { Title, Text } = Typography;

const OrdersOwn = ({ setSelectedOrderveiwId, setValue }) => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const userId =
    typeof window !== "undefined"
      ? JSON.parse(localStorage.getItem("userData"))?._id
      : null;

  const router = useRouter();

  useEffect(() => {
    if (!userId) return;

    const fetchOrdersByUserId = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/order/getOrdersByUserId/${userId}`
        );

        if (response.data.success) {
          setOrders(response.data.orders);
        }
      } catch (error) {
        console.error("Error fetching orders:", error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchOrdersByUserId();
  }, [userId]);

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
              key={item._id}
              data={item}
              setValue={setValue}
              setSelectedOrderveiwId={setSelectedOrderveiwId}
            />
          ))}
      </div>
    </div>
  );
};

export default OrdersOwn;
