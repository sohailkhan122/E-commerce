"use client";
import React, { useState } from "react";
import { Button, Form, Input, message, Spin } from "antd";
import axios from "axios";
import { useRouter } from "next/navigation";

const ResetPassword = ({ token }) => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  console.log("Received token:", token); // Debugging line to check the token value
  const onFinish = async (values) => {
    const { password, confirmPassword } = values;

    if (password !== confirmPassword) {
      return message.error("Passwords do not match");
    }

    setLoading(true);
    try {
      await axios.put(
        `${process.env.NEXT_PUBLIC_API_URL}/user/reset-password/${token}`,
        { password }
      );

      message.success("Password reset successfully! Redirecting to login...");

      setTimeout(() => {
        router.push("/login");
      }, 3000);
    } catch (error) {
      message.error(
        error?.response?.data?.error || "Something went wrong"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-200 px-4">
      <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-xl">

        {/* Heading */}
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800">Reset Password</h1>
          <p className="text-gray-500 mt-2 text-sm">
            Enter your new password below
          </p>
        </div>

        {/* Form */}
        <Form layout="vertical" onFinish={onFinish}>
          <Form.Item
            label="New Password"
            name="password"
            rules={[
              { required: true, message: "Please enter your new password" },
              { min: 6, message: "Password must be at least 6 characters" },
            ]}
          >
            <Input.Password
              size="large"
              placeholder="Enter new password"
              className="rounded-lg"
            />
          </Form.Item>

          <Form.Item
            label="Confirm Password"
            name="confirmPassword"
            rules={[
              { required: true, message: "Please confirm your password" },
            ]}
          >
            <Input.Password
              size="large"
              placeholder="Confirm new password"
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
              {loading ? <Spin size="small" /> : "Reset Password"}
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

export default ResetPassword;
