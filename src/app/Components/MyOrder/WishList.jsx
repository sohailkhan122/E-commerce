"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button, Empty, Skeleton, Typography } from "antd";
import MainCard from "../../Components/Home/Card.jsx";
import { getWishlist } from "@/app/api/whislist.js";

const { Title } = Typography;

const WishlistPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchWishlist = async () => {
      try {
        setLoading(true);
        const data = await getWishlist();
        // ✅ data is already an array of products with isWishlisted: true
        setProducts(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchWishlist();
  }, []);

  if (loading) {
    return (
      <div className="flex flex-col w-full min-h-screen bg-white">
        <div className="px-4 sm:px-6 lg:px-8 py-6 border-b border-gray-100">
          <Skeleton.Avatar active size={32} style={{ marginRight: 12 }} />
          <Skeleton paragraph={{ rows: 1, width: "50%" }} style={{ marginTop: 12 }} />
        </div>

        <div className="flex-1 px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {Array.from({ length: 12 }).map((_, index) => (
              <div
                key={index}
                className="p-4 border rounded-lg shadow-sm flex flex-col h-[350px]"
              >
                <Skeleton.Image active style={{ width: "100%", height: 200 }} />
                <Skeleton active paragraph={{ rows: 2, width: ["100%", "80%"] }} style={{ marginTop: 12 }} />
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen bg-white px-4 sm:px-6 lg:px-8 py-6">
      {products.length === 0 ? (
        <div className="flex items-center justify-center h-[calc(100vh-200px)]">
          <Empty
            description={<Title level={4}>Your wishlist is empty</Title>}
          >
            <Button type="primary" onClick={() => router.push("/")}>
              Continue Shopping
            </Button>
          </Empty>
        </div>
      ) : (
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="flex items-center gap-3">
            <img
              src="/Images/New Arrival Logo.png"
              alt="My Wishlist"
            />
            <Title level={2} className="!m-0">My Wishlist</Title>
          </div>

          {/* Products Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-8">
            {products.map((product) => (
              <MainCard
                key={product._id}
                product={product} // ✅ pass full product object
                isWishlisted={product.isWishlisted} // ✅ use the field from API
                onClick={() => router.push(`/product_details/${product._id}`)}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default WishlistPage;