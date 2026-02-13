"use client"
import React, { useState } from "react";
import { Button, Form, Input, message, Spin } from "antd";
import axios from "axios";
import { useRouter } from "next/navigation";

const ForgetPassword = () => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  // Form submit handler
  const onFinish = async (values) => {
    setLoading(true);

    try {
      // Call backend forgot-password API
      await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/user/forgot-password`,
        values
      );

      // Success message
      message.success(
        "Password reset link sent to your email! Check your inbox."
      );

      // Optional: redirect to login after 3 sec
      setTimeout(() => {
        router.push("/login");
      }, 3000);

    } catch (error) {
      // Handle error
      const errMsg =
        error?.response?.data?.error ||
        "Something went wrong. Please try again.";
      message.error(errMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-200 px-4">
      <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-xl">

        {/* Heading */}
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800">
            Forgot Password
          </h1>
          <p className="text-gray-500 mt-2 text-sm">
            Enter your email to receive a password reset link
          </p>
        </div>

        {/* Form */}
        <Form layout="vertical" onFinish={onFinish}>
          <Form.Item
            label="Email Address"
            name="email"
            rules={[
              { required: true, message: "Please enter your email" },
              { type: "email", message: "Enter a valid email" },
            ]}
          >
            <Input
              size="large"
              placeholder="Enter your email"
              className="rounded-lg"
            />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              size="large"
              className="w-full rounded-lg bg-primary hover:bg-primary/90 flex justify-center items-center"
              disabled={loading}
            >
              {loading ? <Spin size="small" /> : "Send Reset Link"}
            </Button>
          </Form.Item>
        </Form>

        {/* Back to Login */}
        <p className="text-center text-sm text-gray-500 mt-4">
          Remember your password?{" "}
          <span
            onClick={() => router.push("/login")}
            className="text-primary cursor-pointer font-medium hover:underline"
          >
            Back to Login
          </span>
        </p>
      </div>
    </div>
  );
};

export default ForgetPassword;
