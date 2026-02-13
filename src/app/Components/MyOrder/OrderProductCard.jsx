"use client";

import React from "react";
import { Card, Typography } from "antd";

const { Text, Title } = Typography;

const OrderProductCard = ({ items }) => {
  return (
    <Card
      hoverable
      className="p-4 rounded-lg shadow-md w-full transition hover:shadow-lg"
    >
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">

        {/* LEFT SIDE (Image + Details) */}
        <div className="flex flex-col sm:flex-row gap-4 flex-1">

          {/* Image */}
          <div className="w-full sm:w-32 h-32 bg-gray-100 rounded-md overflow-hidden flex-shrink-0">
            <img
              src={items.images}
              alt={items.title}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Details */}
          <div className="flex flex-col justify-center gap-1 flex-1">
            <Title level={5} className="m-0 text-gray-800 truncate">
              {items.title}
            </Title>

            <Text className="text-gray-600">
              Color: <span className="font-medium">{items.color}</span>
            </Text>

            <Text className="text-gray-600">
              Quantity: <span className="font-medium">{items.quantity}</span>
            </Text>
          </div>
        </div>

        {/* RIGHT SIDE (Price) */}
        <div className="flex sm:justify-end justify-start">
          <Text strong className="text-lg text-gray-800">
            $ {items.price}
          </Text>
        </div>

      </div>
    </Card>
  );
};

export default OrderProductCard;
