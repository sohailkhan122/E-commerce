"use client";
import React from "react";
import { Collapse, Button } from "antd";

const { Panel } = Collapse;

const ReturnConditionPage = () => {
  return (
    <div className="bg-gray-50 min-h-screen px-4 py-12">
      <div className="max-w-4xl mx-auto flex flex-col gap-12">

        {/* Header */}
        <header className="text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            Returns & Conditions
          </h1>
          <p className="text-gray-600 text-lg md:text-xl">
            Learn about our return policies, refund conditions, and terms of service to shop with confidence.
          </p>
        </header>

        {/* Return Policy Section */}
        <section className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Return Policy</h2>
          <p className="text-gray-600 mb-4">
            We accept returns within 15 days of delivery. Products must be unused, in original packaging, and accompanied by the receipt.
          </p>
          <ul className="list-disc list-inside text-gray-600">
            <li>Clothes must be unwashed and tags intact.</li>
            <li>Electronics must include all accessories and packaging.</li>
            <li>Refunds are processed within 7-10 business days.</li>
          </ul>
        </section>

        {/* Refund Conditions Section */}
        <section className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Refund Conditions</h2>
          <p className="text-gray-600 mb-4">
            Refunds are applicable under the following conditions:
          </p>
          <ul className="list-disc list-inside text-gray-600">
            <li>Item received is damaged or defective.</li>
            <li>Wrong item delivered.</li>
            <li>Refund request submitted within the allowed time frame.</li>
          </ul>
        </section>

        {/* Terms & Conditions Section */}
        <section className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Terms & Conditions</h2>
          <Collapse accordion>
            <Panel header="Ordering Process" key="1">
              <p className="text-gray-600">
                Orders are confirmed once payment is received. Euphoria reserves the right to cancel or delay orders due to stock availability.
              </p>
            </Panel>
            <Panel header="Shipping" key="2">
              <p className="text-gray-600">
                Delivery times may vary based on location. We ensure timely dispatch of all orders.
              </p>
            </Panel>
            <Panel header="Liability" key="3">
              <p className="text-gray-600">
                Euphoria is not responsible for damages caused by misuse of products or delays caused by third-party shipping services.
              </p>
            </Panel>
            <Panel header="Privacy" key="4">
              <p className="text-gray-600">
                Customer information is kept confidential and is not shared with third parties, except for order fulfillment purposes.
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

export default ReturnConditionPage;
