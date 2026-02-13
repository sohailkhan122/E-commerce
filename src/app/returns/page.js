"use client";
import React from "react";
import { Button } from "antd";
import { MailOutlined, PhoneOutlined } from "@ant-design/icons";

const ReturnsRefund = () => {
  const steps = [
    {
      title: "Request a Return",
      description:
        "Log in to your account, go to 'My Orders', select the order, and click 'Request Return'.",
    },
    {
      title: "Pack the Product",
      description:
        "Ensure the product is in its original packaging with all tags and accessories included.",
    },
    {
      title: "Schedule Pickup",
      description:
        "Our courier partner will pick up the product at your convenience.",
    },
    {
      title: "Refund Processing",
      description:
        "Once we receive the product and verify its condition, the refund will be processed to your original payment method.",
    },
  ];

  return (
    <div className="bg-gray-50 min-h-screen px-4 py-12">
      <div className="max-w-5xl mx-auto flex flex-col gap-8">
        {/* Title */}
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800 text-center">
          Returns & Refunds
        </h1>

        {/* Description */}
        <p className="text-gray-600 text-center md:text-lg">
          At Euphoria, we want you to be completely satisfied. If you are not
          happy with your purchase, you can request a return within 15 days of
          receiving your order. Follow the steps below for a smooth return and
          refund process.
        </p>

        {/* Steps */}
        <div className="flex flex-col md:flex-row md:gap-6 gap-8">
          {steps.map((step, index) => (
            <div
              key={index}
              className="flex-1 bg-white p-6 rounded-lg shadow-md flex flex-col"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="w-8 h-8 flex items-center justify-center bg-purple-600 text-white font-bold rounded-full">
                  {index + 1}
                </div>
                <h3 className="text-lg font-semibold text-gray-800">{step.title}</h3>
              </div>
              <p className="text-gray-600 text-sm md:text-base">{step.description}</p>
            </div>
          ))}
        </div>

        {/* Contact Info */}
        <div className="bg-white p-6 rounded-lg shadow-md flex flex-col md:flex-row gap-6 justify-between items-center">
          <div className="flex flex-col gap-2 text-center md:text-left">
            <h2 className="text-xl font-bold text-gray-800">Need Assistance?</h2>
            <p className="text-gray-600">Contact our support team for help</p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button
              type="primary"
              icon={<MailOutlined />}
              className="bg-purple-600 border-none hover:bg-purple-700 flex items-center gap-2"
            >
              support@euphoria.in
            </Button>
            <Button
              type="default"
              icon={<PhoneOutlined />}
              className="flex items-center gap-2"
            >
              +91 123 456 7890
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReturnsRefund;
