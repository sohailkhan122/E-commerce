"use client";
import React, { useState } from "react";
import { Input, Button, message } from "antd";

const { TextArea } = Input;

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      // Example: send form data to your API
      await new Promise((res) => setTimeout(res, 1000));
      message.success("Message sent successfully!");
      setFormData({ name: "", email: "", subject: "", message: "" });
    } catch (error) {
      message.error("Failed to send message.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen px-4 py-12">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-12">
        {/* Left: Contact Form */}
        <div className="flex-1 bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-3xl font-bold mb-6 text-gray-800">Contact Us</h2>
          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <Input
              name="name"
              placeholder="Full Name"
              value={formData.name}
              onChange={handleChange}
              required
            />
            <Input
              type="email"
              name="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={handleChange}
              required
            />
            <Input
              name="subject"
              placeholder="Subject"
              value={formData.subject}
              onChange={handleChange}
              required
            />
            <TextArea
              name="message"
              rows={5}
              placeholder="Your Message"
              value={formData.message}
              onChange={handleChange}
              required
            />
            <Button
              type="primary"
              htmlType="submit"
              loading={loading}
              className="bg-purple-600 border-none hover:bg-purple-700"
            >
              Send Message
            </Button>
          </form>
        </div>

        {/* Right: Info / Map */}
        <div className="flex-1 flex flex-col gap-6">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-4 text-gray-800">
              Get in Touch
            </h3>
            <p className="text-gray-600">
              Email: support@euphoria.in
            </p>
            <p className="text-gray-600">
              Phone: +91 123 456 7890
            </p>
            <p className="text-gray-600">
              Address: Eklingpura Chouraha, Ahmedabad Main Road, Udaipur, India-313002
            </p>
          </div>

          {/* Map Placeholder */}
          <div className="w-full h-64 bg-gray-200 rounded-lg flex items-center justify-center text-gray-500">
            Map Placeholder
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
