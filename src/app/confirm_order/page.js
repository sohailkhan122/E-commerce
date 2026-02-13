'use client'
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useContext, useEffect, useState } from 'react';
import { Button, Result, Skeleton } from 'antd';
import noteContext from '@/context/noteContext';

const Page = () => {
  const [productDetails, setProductDetails] = useState([]);
  const { refresh, setRefresh } = useContext(noteContext);
  const [loading, setLoading] = useState(true);
  const [total, setTotal] = useState(0);
  const router = useRouter();

  const userId =
    typeof window !== "undefined"
      ? JSON.parse(localStorage.getItem("userData"))?._id
      : null;

  // Fetch cart products
  useEffect(() => {
    if (!userId) return;

    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/cart/getCartItem/${userId}`
        );
        const { products } = response.data.cartItem || {};

        if (!products || products.length === 0) {
          setLoading(false);
          return;
        }

        const productDetailPromises = products.map(async (product) => {
          const productDetailResponse = await axios.get(
            `${process.env.NEXT_PUBLIC_API_URL}/product/getSingleProduct/${product.productId}`
          );
          return { ...product, ...productDetailResponse.data };
        });

        const productDetails = await Promise.all(productDetailPromises);

        // Calculate total
        const totalAmount = productDetails.reduce(
          (sum, item) => sum + item.price * item.quantity,
          0
        );

        setProductDetails(productDetails);
        setTotal(totalAmount);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [userId, router]);

  // Trigger order API automatically when productDetails are ready
  useEffect(() => {
    if (productDetails.length === 0 || !total) return;

    const createOrder = async () => {
      try {
        const response = await axios.post(
          `${process.env.NEXT_PUBLIC_API_URL}/order/createOrder`,
          {
            userId,
            productDetails,
            total,
          }
        );
        console.log("Order created:", response.data);
        setRefresh(!refresh);
      } catch (error) {
        console.error("Error creating order:", error);
      }
    };

    createOrder();
  }, [productDetails, total, userId, router]);

  return (
    <div className="w-full min-h-screen flex items-center justify-center px-4 py-10">
      {loading ? (
        // Skeleton Loading while fetching data
        <div className="w-full max-w-md">
          <Skeleton.Image active className="!w-full !h-60 !rounded-xl" />
          <Skeleton active paragraph={{ rows: 3 }} className="mt-6" />
        </div>
      ) : (
        <div className="w-full max-w-md text-center">
          <Result
            status="success"
            title="Order Confirmed Successfully!"
            extra={[
              <Button
                type="primary"
                key="home"
                onClick={() => router.push("/")}
              >
                Go Home
              </Button>,
            ]}
          />
        </div>
      )}
    </div>
  );
};

export default Page;
