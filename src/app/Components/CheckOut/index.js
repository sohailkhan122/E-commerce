"use client";
import React, { useEffect, useState } from "react";
import { Button, Checkbox, Form, Input, Select, message, Skeleton } from "antd";
import TextArea from "antd/es/input/TextArea";
import { useRouter } from "next/navigation";
import axios from "axios";

const CheckOut = () => {
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false); // Spinner for "Update Information"
  const [processingPayment, setProcessingPayment] = useState(false);
  const router = useRouter();
  const [userData, setUserData] = useState(null);
  const [productDetails, setProductDetails] = useState([]);
  const shippingCharges = 5.8;

  const userId =
    typeof window !== "undefined"
      ? JSON.parse(localStorage.getItem("userData"))?._id
      : null;

  // Fetch user data
  useEffect(() => {
    if (!userId) return;
    const getUserById = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/user/getUserById/${userId}`
        );
        setUserData(response.data);
      } catch (error) {
        console.error("Error fetching user by ID:", error);
        message.error("Failed to fetch user data");
      }
    };
    getUserById();
  }, [userId]);

  // Fetch cart details
  useEffect(() => {
    if (!userId) return;
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/cart/getCartItem/${userId}`
        );
        const { products } = response.data.cartItem || {};

        if (!products || products.length === 0) {
          router.push("/");
          return;
        }

        const productDetailPromises = products.map(async (product) => {
          const productDetailResponse = await axios.get(
            `${process.env.NEXT_PUBLIC_API_URL}/product/getSingleProduct/${product.productId}`
          );
          return { ...product, ...productDetailResponse.data };
        });

        const productDetails = await Promise.all(productDetailPromises);
        setProductDetails(productDetails);
      } catch (error) {
        console.error("Error fetching data:", error);
        message.error("Failed to fetch cart details");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [userId, router]);

  const onFinish = async (values) => {
    try {
       setUpdating(true);
      await axios.put(
        `${process.env.NEXT_PUBLIC_API_URL}/user/updateUser/${userId}`,
        values
      );
      message.success("User information updated successfully");
    } catch (error) {
      message.error("Failed to update user information");
    } finally {
      setUpdating(false);
    }
  };

  const subtotal = productDetails.reduce(
    (acc, curr) => acc + curr.price * curr.quantity,
    0
  );
  const total = subtotal + shippingCharges;
  const startstripeCheckout = async () => {
    try {
       setProcessingPayment(true); // <-- Start spinner
      const response = await axios.post("/api/stripe_checkout", {
        products: productDetails,
        total: total,
      });
      const { message: session } = response.data;

      if (session.url) {
        window.location.href = session.url; // Redirect to Stripe Checkout
      }
      else {
        message.error("Failed to create Stripe checkout session");
      }

    } catch (error) {
      console.error("Error starting Stripe checkout:", error);
      message.error("Failed to start Stripe checkout");
    }
    finally {
      setProcessingPayment(false); // <-- Stop spinner
    }
  }
  console.log("Product Details:", productDetails);
  return (
    <div className="min-h-screen px-4 md:px-8 lg:px-16 py-8 flex flex-col lg:flex-row gap-8 lg:gap-12 mb-32">
      {/* Billing Form */}
      <div className="flex-1 bg-white p-6 rounded-xl shadow">
        <div className="flex items-center gap-2 mb-6">
          <img
            src="/Images/New Arrival Logo.png"
            alt="Logo"
            className="h-8 w-auto"
          />
          <h1 className="text-2xl md:text-3xl font-bold m-0">Checkout</h1>
        </div>
        <h2 className="text-xl font-semibold mb-4">Billing Details</h2>

        {loading ? (
          <Skeleton active paragraph={{ rows: 8 }} />
        ) : (
          userData && (
            <Form
              name="billing"
              layout="vertical"
              onFinish={onFinish}
              initialValues={userData}
              className="flex flex-wrap gap-4"
            >
              <Form.Item
                name="name"
                label="First Name"
                rules={[{ required: true, message: "Please input your name!" }]}
                className="w-full md:w-[48%]"
              >
                <Input />
              </Form.Item>

              <Form.Item
                name="lastname"
                label="Last Name"
                rules={[
                  { required: true, message: "Please input your last name!" },
                ]}
                className="w-full md:w-[48%]"
              >
                <Input />
              </Form.Item>

              <Form.Item
                name="region"
                label="Country / Region"
                rules={[
                  { required: true, message: "Please input your region!" },
                ]}
                className="w-full md:w-[48%]"
              >
                <Input />
              </Form.Item>

              <Form.Item
                name="companyname"
                label="Company Name"
                rules={[
                  { required: true, message: "Please input your company name!" },
                ]}
                className="w-full md:w-[48%]"
              >
                <Input />
              </Form.Item>

              <Form.Item
                name="streetadress"
                label="Street Address"
                rules={[
                  { required: true, message: "Please input your street address!" },
                ]}
                className="w-full md:w-[48%]"
              >
                <Input />
              </Form.Item>

              <Form.Item
                name="unit"
                label="Apt, Suite, Unit"
                rules={[
                  { required: true, message: "Please input your unit!" },
                ]}
                className="w-full md:w-[48%]"
              >
                <Input />
              </Form.Item>

              <Form.Item
                name="city"
                label="City"
                rules={[{ required: true, message: "Please input your city!" }]}
                className="w-full md:w-[48%]"
              >
                <Input />
              </Form.Item>

              <Form.Item
                name="state"
                label="State"
                rules={[
                  { required: true, message: "Please select your state!" },
                ]}
                className="w-full md:w-[48%]"
              >
                <Select
                  placeholder="Select State"
                  showSearch
                  optionFilterProp="children"
                  className="w-full"
                  options={[
                    { label: "Pakistan", value: "Pakistan" },
                    { label: "India", value: "India" },
                    { label: "Turkey", value: "Turkey" },
                  ]}
                />
              </Form.Item>

              <Form.Item
                name="phone"
                label="Phone"
                rules={[
                  { required: true, message: "Please input your phone number!" },
                ]}
                className="w-full md:w-[48%]"
              >
                <Input />
              </Form.Item>

              <Form.Item
                name="postalcode"
                label="Postal Code"
                rules={[
                  { required: true, message: "Please input your postal code!" },
                ]}
                className="w-full md:w-[48%]"
              >
                <Input />
              </Form.Item>

              <Form.Item
                name="deliveryinstruction"
                label="Delivery Instruction"
                rules={[
                  {
                    required: true,
                    message: "Please input delivery instruction!",
                  },
                ]}
                className="w-full"
              >
                <TextArea rows={4} />
              </Form.Item>

              <Form.Item
                name="remember"
                valuePropName="checked"
                className="w-full"
              >
                <Checkbox>Set as default shipping address</Checkbox>
              </Form.Item>

              <Form.Item className="w-full">
                <Button
                  type="primary"
                  htmlType="submit"
                 loading={updating} // <-- Spinner here
                  className="w-full"
                >
                  Update Information
                </Button>
              </Form.Item>
            </Form>
          )
        )}
      </div>

      {/* Order Summary */}
      <div className="w-full lg:w-[400px] bg-white p-6 rounded-xl shadow">
        <h2 className="text-xl font-semibold mb-4">Order Summary</h2>

        {loading ? (
          <Skeleton active paragraph={{ rows: 5 }} />
        ) : (
          <>
            <div className="space-y-4">
              {productDetails.map((item) => (
                <div
                  key={item.productId || item._id}
                  className="flex items-center justify-between"
                >
                  <div className="flex items-center gap-3">
                    <img
                      src={item.images}
                      alt={item.title}
                      className="w-16 h-16 rounded-lg object-cover"
                    />
                    <div>
                      <h4 className="font-medium">{item.title}</h4>
                      <p className="text-gray-500 text-sm">
                        Color: {item.color || "N/A"} | Qty: {item.quantity}
                      </p>
                    </div>
                  </div>
                  <p className="font-semibold">${item.price}</p>
                </div>
              ))}
            </div>

            <div className="border-t border-gray-200 mt-4 pt-4 space-y-2">
              <div className="flex justify-between font-medium">
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between font-medium">
                <span>Shipping</span>
                <span>${shippingCharges.toFixed(2)}</span>
              </div>
              <div className="flex justify-between font-bold text-lg">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </div>

            <Button
              type="primary"
              size="large"
              className="w-full mt-6"
              onClick={startstripeCheckout}
              loading={processingPayment} // <-- Spinner here
            >
              Proceed to Payment
            </Button>
          </>
        )}
      </div>
    </div>
  );
};

export default CheckOut;
