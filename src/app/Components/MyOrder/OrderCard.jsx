"use client";
import { Button, Typography } from "antd";
import React from "react";

const { Title, Text } = Typography;

const OrderCard = ({ setSelectedOrderveiwId, data, setValue }) => {
  return (
    <div className="bg-white shadow-md rounded-lg p-4 mb-4 w-full max-w-3x5 mx-auto">
      {/* Order Header */}
      <div className="flex flex-col md:flex-row justify-between md:items-center border-b pb-4 mb-4">
        <div className="space-y-1">
          <Title level={5} className="m-0">
            Order No: #{data._id?.slice(0, 8)?.toUpperCase()}
          </Title>
          <Text className="text-gray-500 text-sm">
            Order Date:{" "}
            <Text className="text-gray-700">
              {new Date(data.createdAt).toLocaleDateString()}{" "}
            </Text>
          </Text>
          <Text className="text-gray-500 text-sm">
            Estimated Delivery: {""}
            <Text className="text-gray-700">
              {new Date(data.createdAt).toLocaleDateString()}{" "}
            </Text>
          </Text>
        </div>

        <div className="mt-3 md:mt-0 space-y-1 text-gray-500 text-sm md:text-right">
          <Typography>
            Order Status:{" "}
            <Text className="text-gray-700 font-medium">{data.status}</Text>
          </Typography>
          <Text>
            Payment Method:{" "}
            <Text className="text-gray-700 font-medium">
              {data.securitycode === null ? "Cash on Delivery" : "Pay"}
            </Text>
          </Text>
        </div>
      </div>

      {/* Order Items Summary */}
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
        <div className="flex items-center gap-4 w-full sm:w-auto">
          <img
            src="https://e7.pngegg.com/pngimages/406/777/png-clipart-logo-shopping-cart-product-design-shopping-cart-angle-rectangle-thumbnail.png"
            alt="order"
            className="w-20 h-20 object-contain rounded-md"
          />
          <div className="flex flex-col gap-1">
            <Title level={5} className="m-0">
              Items: {data.productDetails.length}
            </Title>
            <Text className="text-gray-500 font-medium">
              Total: ${data.total}
            </Text>
          </div>
        </div>

        <div className="w-full sm:w-auto">
          <Button
            type="default"
            className="w-full sm:w-auto mt-2 sm:mt-0"
            onClick={() => {
              setValue("OrdersDetails");
              setSelectedOrderveiwId(data._id);
            }}
          >
            View Detail
          </Button>
        </div>
      </div>
    </div>
  );
};

export default OrderCard;
