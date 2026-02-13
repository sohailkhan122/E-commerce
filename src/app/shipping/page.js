"use client";
import React from "react";
import { Collapse, Button } from "antd";

const { Panel } = Collapse;

const ShippingPolicyPage = () => {
  return (
    <div className="bg-gray-50 min-h-screen px-4 py-12">
      <div className="max-w-4xl mx-auto flex flex-col gap-12">

        {/* Header */}
        <header className="text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            Shipping Policy
          </h1>
          <p className="text-gray-600 text-lg md:text-xl">
            Learn about our shipping options, delivery timelines, and tracking process.
          </p>
        </header>

        {/* Shipping Options */}
        <section className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Shipping Options</h2>
          <p className="text-gray-600 mb-4">
            We offer standard and express shipping to ensure your order reaches you on time.
          </p>
          <ul className="list-disc list-inside text-gray-600">
            <li>Standard Shipping: 5-7 business days</li>
            <li>Express Shipping: 2-3 business days</li>
            <li>Free shipping on orders above $50</li>
          </ul>
        </section>

        {/* International Shipping */}
        <section className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">International Shipping</h2>
          <p className="text-gray-600 mb-4">
            We ship to select international destinations. Delivery timelines may vary based on location and customs clearance.
          </p>
          <ul className="list-disc list-inside text-gray-600">
            <li>International Shipping: 7-14 business days</li>
            <li>Additional customs or import duties may apply</li>
            <li>Tracking available for all international orders</li>
          </ul>
        </section>

        {/* Tracking Information */}
        <section className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Order Tracking</h2>
          <p className="text-gray-600 mb-4">
            After your order is shipped, you will receive a tracking number via email. You can use this to monitor your package in real-time.
          </p>
          <Collapse accordion>
            <Panel header="How to track your order?" key="1">
              <p className="text-gray-600">
                Log in to your account, go to &quot;My Orders&quot;, select your order, and click on the tracking link provided.
              </p>

            </Panel>
            <Panel header="Tracking not updating?" key="2">
              <p className="text-gray-600">
                It may take 24 hours for tracking information to appear after the shipment has been dispatched. If the issue persists, contact our support team.
              </p>
            </Panel>
          </Collapse>
        </section>

        {/* CTA */}
        <section className="text-center">
          <Button
            type="primary"
            className="bg-purple-600 border-none hover:bg-purple-700"
          >
            Contact Support
          </Button>
        </section>
      </div>
    </div>
  );
};

export default ShippingPolicyPage;
