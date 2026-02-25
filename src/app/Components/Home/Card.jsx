"use client";
import React, { useState, useEffect } from "react";
import { Card, Image, Typography, Button, message } from "antd";
import { HeartOutlined, HeartFilled } from "@ant-design/icons";
import { addToWishlist, removeFromWishlist } from "@/app/api/whislist";

const { Title, Text } = Typography;

const MainCard = ({ product, onClick }) => {
  const [fav, setFav] = useState(false);
  const [loading, setLoading] = useState(false);

  // ✅ Set fav based on temporary isWishlisted field from backend
  useEffect(() => {
    if (product.isWishlisted === undefined) {
      setFav(null); // null = icon hide
    } else {
      setFav(product.isWishlisted);
    }
  }, [product.isWishlisted]);

  // ✅ Handle wishlist add/remove
  const handleWishlistClick = async (e) => {
    e.stopPropagation();
    if (fav === null) return; // icon hidden

    setLoading(true);
    try {
      if (!fav) {
        // Add to wishlist
        await addToWishlist(product._id);
        setFav(true);
        message.success("Added to wishlist");
      } else {
        // Remove from wishlist
        await removeFromWishlist(product._id);
        setFav(false);
        message.success("Removed from wishlist");
      }
    } catch (err) {
      message.error(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card hoverable onClick={onClick} bodyStyle={{ padding: 8 }} className="rounded-lg">
      <div className="relative w-full h-full flex flex-col">
        {fav !== null && (
          <Button
            onClick={handleWishlistClick}
            type="text"
            className="absolute right-2 top-2 z-20 p-1"
            loading={loading}
          >
            {fav ? (
              <HeartFilled className="text-purple-600 text-2xl" />
            ) : (
              <HeartOutlined className="text-2xl" />
            )}
          </Button>
        )}

        <div
          className="w-full rounded-md bg-gray-100 overflow-hidden flex items-center justify-center"
          style={{ aspectRatio: "4/5" }}
        >
          <Image
            src={product.images?.[0]}
            alt={product.productName}
            preview={false}
            className="max-w-full max-h-full object-contain transition-transform duration-300 hover:scale-105"
          />
        </div>

        <div className="mt-3 px-1">
          <Title level={5} className="mb-0 text-sm sm:text-base truncate">
            {product.productName}
          </Title>
          {product.price && <Text className="text-sm text-gray-600">${product.price}</Text>}
        </div>
      </div>
    </Card>
  );
};

export default MainCard;