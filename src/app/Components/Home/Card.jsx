"use client";
import React, { useState, useEffect } from "react";
import { Card, Image, Typography, Button, message } from "antd";
import { HeartOutlined, HeartFilled } from "@ant-design/icons";
import axios from "axios";

const { Title, Text } = Typography;

const MainCard = ({ product, onClick }) => {
  const [fav, setFav] = useState(false);

  const userId =
    typeof window !== "undefined"
      ? JSON.parse(localStorage.getItem("userData"))?._id
      : null;

  // ✅ Check if product already in wishlist
  useEffect(() => {
    const checkWishlist = async () => {
      try {
        if (!userId) return;

        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/wishlist/${userId}`
        );

        const wishlistProducts = res.data.wishlist?.products || [];

        const exists = wishlistProducts.some(
          (item) => item.productId === product._id ||
            item.productId?._id === product._id
        );

        setFav(exists);
      } catch (err) {
        console.log("Wishlist check error:", err);
      }
    };

    checkWishlist();
  }, [userId, product._id]);

  // ✅ Toggle Wishlist
  const handleWishlistClick = async (e) => {
    e.stopPropagation();

    if (!userId) {
      message.warning("Please login first");
      return;
    }

    try {
      if (!fav) {
        // Add
        await axios.post(
          `${process.env.NEXT_PUBLIC_API_URL}/wishlist/add`,
          {
            userId,
            productId: product._id,
          }
        );
        setFav(true);
        message.success("Added to wishlist");
      } else {
        // Remove
        await axios.post(
          `${process.env.NEXT_PUBLIC_API_URL}/wishlist/remove`,
          {
            userId,
            productId: product._id,
          }
        );
        setFav(false);
        message.success("Removed from wishlist");
      }
    } catch (error) {
      console.error("Wishlist error:", error);
      message.error("Something went wrong");
    }
  };

  return (
    <Card
      hoverable
      onClick={onClick}
      bodyStyle={{ padding: 8 }}
      className="rounded-lg"
    >
      <div className="relative w-full h-full flex flex-col">

        {/* ❤️ Wishlist Heart */}
        <Button
          onClick={handleWishlistClick}
          type="text"
          className="absolute right-2 top-2 z-20 p-1"
        >
          {fav ? (
            <HeartFilled className="text-purple-600 text-2xl" />
          ) : (
            <HeartOutlined className="text-2xl" />
          )}
        </Button>

        {/* Product Image */}
        <div
          className="w-full rounded-md bg-gray-100 overflow-hidden flex items-center justify-center"
          style={{ aspectRatio: "4/5" }}
        >
          <Image
            src={product.images}
            alt={product.productName}
            preview={false}
            className="max-w-full max-h-full object-contain transition-transform duration-300 hover:scale-105"
          />
        </div>

        {/* Product Info */}
        <div className="mt-3 px-1">
          <Title
            level={5}
            className="mb-0 text-sm sm:text-base text-gray-800 truncate"
          >
            {product.productName}
          </Title>

          {product.price && (
            <Text className="text-sm text-gray-600">
              ${product.price}
            </Text>
          )}
        </div>
      </div>
    </Card>
  );
};

export default MainCard;
