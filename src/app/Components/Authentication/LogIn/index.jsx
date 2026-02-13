"use client";
import React, { useState } from "react";
import { Button, Checkbox, Form, Input, message, Spin } from "antd";
import axios from "axios";
import { useRouter } from "next/navigation";

const LogIn = () => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const onFinish = async (values) => {
    setLoading(true);
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/user/login`,
        values
      );

      message.success("Login successful!");
      localStorage.setItem("userData", JSON.stringify(response.data));
      router.push("/");
    } catch (error) {
      message.error(
        error?.response?.data?.error || "Invalid credentials"
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
            Welcome Back
          </h1>
          <p className="text-gray-500 mt-2 text-sm">
            Login to access your account
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

          {/* Remember + Forgot */}
          <div className="flex justify-between items-center mb-4">
            <Form.Item name="remember" valuePropName="checked" className="m-0">
              <Checkbox>Remember me</Checkbox>
            </Form.Item>

            <span
              onClick={() => router.push("/forgot-password")}
              className="text-primary cursor-pointer text-sm hover:underline"
            >
              Forgot Password?
            </span>
          </div>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              size="large"
              className="w-full rounded-lg bg-primary hover:bg-primary/90"
              disabled={loading}
            >
              {loading ? <Spin /> : "Login"}
            </Button>
          </Form.Item>
        </Form>

        {/* SignUp Link */}
        <p className="text-center text-sm text-gray-500 mt-4">
          Don’t have an account?{" "}
          <span
            onClick={() => router.push("/signin")}
            className="text-primary cursor-pointer font-medium hover:underline"
          >
            Sign Up
          </span>
        </p>
      </div>
    </div>
  );
};

export default LogIn;
