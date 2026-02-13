"use client";
import React from "react";
import { Card, Avatar, Typography } from "antd";

const { Title, Paragraph } = Typography;

const FeedBackCard = ({ data }) => {
  return (
    <Card hoverable bodyStyle={{ padding: 16 }} className="rounded-lg">
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
        <div className="flex-shrink-0">
          <Avatar src={data.img} size={64} shape="circle" />
        </div>

        <div className="min-w-0">
          <Title level={5} className="!m-0 text-base sm:text-lg md:text-xl">
            {data.tittle}
          </Title>
          <Paragraph className="!m-0 text-sm sm:text-base text-gray-600 max-h-24 overflow-hidden">
            {data.describtion}
          </Paragraph>
        </div>
      </div>
    </Card>
  );
};

export default FeedBackCard;
