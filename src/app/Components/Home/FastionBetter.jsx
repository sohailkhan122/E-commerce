'use client';
import React from "react";
import { Button, Typography } from "antd";
const { Title, Paragraph } = Typography;

const FastionBetter = () => {
  return (
    <section className="w-full max-w-6xl mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
        <div
          className="w-full rounded-lg overflow-hidden relative h-64 sm:h-80 md:h-96 lg:h-[520px] bg-center bg-cover"
          style={{ backgroundImage: "url('/Images/Big Saving Zone 1.png')" }}
          aria-hidden
        >
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/20 to-transparent" />
        </div>

        <div className="flex flex-col justify-center gap-4 px-2 md:px-6">
          <Title level={3} className="!m-0 text-2xl sm:text-3xl md:text-4xl lg:text-5xl">WE MADE YOUR EVERYDAY FASHION BETTER!</Title>
          <Paragraph className="!m-0 text-sm sm:text-base  text-gray-600 max-w-xl">In our journey to improve everyday fashion, EUPHORIA presents EVERYDAY wear range - Comfortable & Affordable fashion 24/7</Paragraph>
          <div>
            <Button type="primary" size="large" className="mt-2 bg-black border-black hover:bg-gray-900">
              Shop Now
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FastionBetter;
