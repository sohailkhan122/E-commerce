"use client";
import React from "react";
import { Collapse } from "antd";

const { Panel } = Collapse;

const FAQS = () => {
  const faqs = [
    {
      question: "How can I track my order?",
      answer:
        "You can track your order by logging into your account, going to 'My Orders', and clicking on 'Track Order'.",
    },
    {
      question: "What is the return policy?",
      answer:
        "You can request a return within 15 days of receiving your order. The product must be in its original condition with all tags and packaging.",
    },
    {
      question: "How do I contact customer support?",
      answer:
        "You can reach out to our support team via email at support@euphoria.in or call us at +91 123 456 7890.",
    },
    {
      question: "Do you offer international shipping?",
      answer:
        "Currently, we only ship within India. We plan to expand our shipping options in the future.",
    },
    {
      question: "Can I cancel my order?",
      answer:
        "Orders can be canceled within 2 hours of placement. After that, please contact our support team for assistance.",
    },
  ];

  return (
    <div className="bg-gray-50 min-h-screen px-4 py-12">
      <div className="max-w-5xl mx-auto flex flex-col gap-8">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800 text-center">
          Frequently Asked Questions
        </h1>

        <p className="text-gray-600 text-center md:text-lg">
          Find answers to some of the most common questions about our products, shipping, returns, and more.
        </p>

        {/* FAQ Accordion */}
        <Collapse
          accordion
          className="bg-white rounded-lg shadow-md divide-y divide-gray-200"
          bordered={false}
        >
          {faqs.map((faq, index) => (
            <Panel
              header={<span className="text-gray-800 font-medium">{faq.question}</span>}
              key={index}
              className="py-4"
            >
              <p className="text-gray-600">{faq.answer}</p>
            </Panel>
          ))}
        </Collapse>
      </div>
    </div>
  );
};

export default FAQS;
