"use client";
import React, { useState } from "react";
import { Button, Form, Input, message, Spin } from "antd";
import { useRouter } from "next/navigation";
import axios from "axios";

const SignUp = () => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const onFinish = async (values) => {
    setLoading(true);
    try {
      await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/user/register`,
        values
      );
      message.success("Registration successful!");
      router.push("/login");
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
          <h1 className="text-3xl font-bold text-gray-800">
            Create Account
          </h1>
          <p className="text-gray-500 mt-2 text-sm">
            Sign up to get started with your account
          </p>
        </div>

        {/* Form */}
        <Form
          layout="vertical"
          onFinish={onFinish}
          className="space-y-3"
        >
          <Form.Item
            label="Full Name"
            name="name"
            rules={[
              { required: true, message: "Please enter your name" },
            ]}
          >
            <Input
              size="large"
              placeholder="Enter your full name"
              className="rounded-lg"
            />
          </Form.Item>

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

          <Form.Item
            label="Password"
            name="password"
            rules={[
              { required: true, message: "Please enter your password" },
            ]}
          >
            <Input.Password
              size="large"
              placeholder="Enter your password"
              className="rounded-lg"
            />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              size="large"
              className="w-full rounded-lg bg-primary hover:bg-primary/90"
              disabled={loading}
            >
              {loading ? <Spin /> : "Sign Up"}
            </Button>
          </Form.Item>
        </Form>

        {/* Login Link */}
        <p className="text-center text-sm text-gray-500 mt-4">
          Already have an account?{" "}
          <span
            onClick={() => router.push("/login")}
            className="text-primary cursor-pointer font-medium hover:underline"
          >
            Login
          </span>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
