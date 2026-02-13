"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { Button, Empty, Skeleton } from "antd";
import MainCard from "../../Components/Home/Card.jsx";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const userId =
    typeof window !== "undefined"
      ? JSON.parse(localStorage.getItem("userData"))?._id
      : null;

  useEffect(() => {
    if (!userId) return;

    const fetchWishlistProducts = async () => {
      try {
        setLoading(true);

        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/wishlist/${userId}`
        );

        // Direct populated products lo
        const wishlistProducts =
          res.data.wishlist?.products.map((item) => item.productId) || [];

        setProducts(wishlistProducts);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    fetchWishlistProducts();
  }, [userId]);

  // Loading Skeleton
  if (loading) {
    return (
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 px-3 mt-6">
        {Array.from({ length: 8 }).map((_, index) => (
          <div key={index} className="p-4 border rounded-lg shadow-sm">
            <Skeleton.Image style={{ width: "100%", height: 200 }} active />
            <Skeleton active paragraph={{ rows: 2 }} />
          </div>
        ))}
      </div>
    );
  }

  // Empty Wishlist
  if (!products.length) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <Empty description="Your wishlist is empty">
          <Button type="primary" onClick={() => router.push("/")}>
            Continue Shopping
          </Button>
        </Empty>
      </div>
    );
  }

  // Wishlist Products Grid
  return (
    <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 px-3 mt-6">
      {products.map((product) => (
        <MainCard
          key={product._id}
          product={product}
          isWishlisted={true}
          onClick={() => router.push(`/product_details/${product._id}`)}
        />
      ))}
    </div>
  );
};

export default ProductList;
