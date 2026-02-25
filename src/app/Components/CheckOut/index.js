"use client";
import React, { useEffect, useState } from "react";
import { Button, Checkbox, Form, Input, Select, message, Skeleton } from "antd";
import TextArea from "antd/es/input/TextArea";
import { getCurrentUser, updateUser } from "@/app/api/user";
import { getCart } from "@/app/api/cart";
import axios from "axios";

const CheckOut = () => {
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [processingPayment, setProcessingPayment] = useState(false);
  const [userData, setUserData] = useState(null);
  const [cartItems, setCartItems] = useState([]);
  const shippingCharges = 5.8;
  const [infoUpdated, setInfoUpdated] = useState(false); // ✅ track if user updated info

  const [selectedCountry, setSelectedCountry] = useState(null);
  const [selectedState, setSelectedState] = useState(null);
  const [form] = Form.useForm();

  const countryData = {
    Pakistan: {
      provinces: ["Punjab", "Sindh", "Khyber Pakhtunkhwa", "Balochistan"],
      cities: {
        Punjab: ["Lahore", "Faisalabad", "Rawalpindi"],
        Sindh: ["Karachi", "Hyderabad", "Sukkur"],
        "Khyber Pakhtunkhwa": ["Peshawar", "Abbottabad", "Mardan"],
        Balochistan: ["Quetta", "Gwadar", "Sibi"],
      },
    },
    USA: {
      states: ["California", "Texas", "New York", "Florida"],
      cities: {
        California: ["Los Angeles", "San Francisco", "San Diego"],
        Texas: ["Houston", "Dallas", "Austin"],
        "New York": ["New York City", "Buffalo", "Rochester"],
        Florida: ["Miami", "Orlando", "Tampa"],
      },
    },
  };

  // ---------------- FETCH CURRENT USER ----------------
  useEffect(() => {
    const fetchCurrentUser = async () => {
      try {
        const response = await getCurrentUser(); // cookie se backend user fetch kare
        setUserData(response.user);
      } catch (error) {
        console.error("Error fetching current user:", error);
        message.error("Failed to fetch user data");
      }
    };
    fetchCurrentUser();
  }, []);

  // ---------------- FETCH CART ----------------
  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        setLoading(true);
        const res = await getCart();
        const cartData = res.cartItem?.products || [];

        if (cartData.length === 0) {
          setCartItems([]);
          return;
        }

        const items = cartData.map((p) => ({
          _id: p.productId._id,
          title: p.productId.title,
          images: p.productId.images,
          price: p.productId.price,
          quantity: p.quantity,
        }));

        setCartItems(items);
      } catch (error) {
        console.error("Failed to load cart:", error);
        message.error("Failed to load cart");
      } finally {
        setLoading(false);
      }
    };

    fetchCartItems();
  }, []);

  // ---------------- UPDATE USER ----------------
  const onFinish = async (values) => {
    try {
      setUpdating(true);
      await updateUser(values);
      message.success("User information updated successfully");
      setUserData({ ...userData, ...values }); // update frontend state

      setInfoUpdated(true); // ✅ enable the payment button
    } catch (error) {
      console.error(error);
      message.error("Failed to update user information");
    } finally {
      setUpdating(false);
    }
  };

  // ---------------- SUBTOTAL & TOTAL ----------------
  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );
  const total = subtotal + shippingCharges;

  // ---------------- STRIPE CHECKOUT ----------------
  const startStripeCheckout = async () => {
    try {
      setProcessingPayment(true); // spinner start

      // axios instance or plain axios can be used
      const response = await axios.post("/api/stripe_checkout", {
        products: cartItems, // array of products with { title, price, quantity }
      });

      const { message: session } = response.data;

      if (session?.url) {
        window.location.href = session.url; // Redirect to Stripe Checkout
      } else {
        message.error("Failed to create Stripe checkout session");
      }
    } catch (error) {
      console.error("Error starting Stripe checkout:", error);
      message.error("Failed to start Stripe checkout");
    } finally {
      setProcessingPayment(false); // spinner stop
    }
  };

  return (
    <div className="min-h-screen px-4 md:px-8 lg:px-16 py-8 flex flex-col lg:flex-row gap-8 lg:gap-12 mb-32">
      {/* ---------------- BILLING FORM ---------------- */}
      <div className="flex-1 bg-white p-6 rounded-xl shadow">
        <div className="flex items-center gap-2 mb-6">
          <img src="/Images/New Arrival Logo.png" alt="Logo" className="h-8 w-auto" />
          <h1 className="text-2xl md:text-3xl font-bold m-0">Checkout</h1>
        </div>
        <h2 className="text-xl font-semibold mb-4">Billing Details</h2>

        {loading ? (
          <Skeleton active paragraph={{ rows: 12 }} />
        ) : (
          userData && (
            <Form
              name="billing"
              layout="vertical"
              onFinish={onFinish}
              initialValues={userData}
              className="flex flex-wrap gap-4"
            >
              {/* Desktop: 2 fields per row, Mobile: 1 field per row */}
              <Form.Item
                name="name"
                label="First Name"
                rules={[{ required: true }]}
                className="w-full sm:w-full md:w-[48%]"
              >
                <Input />
              </Form.Item>

              <Form.Item
                name="lastname"
                label="Last Name"
                className="w-full sm:w-full md:w-[48%]"
              >
                <Input />
              </Form.Item>

              <Form.Item
                name="region"
                label="Country"
                rules={[{ required: true, message: "Please select a country" }]}
                className="w-full sm:w-full md:w-[48%]"
              >
                <Select
                  placeholder="Select Country"
                  onChange={(value) => {
                    setSelectedCountry(value);
                    form.setFieldsValue({ state: undefined, city: undefined }); // reset state & city
                  }}
                >
                  {Object.keys(countryData).map((country) => (
                    <Select.Option key={country} value={country}>
                      {country}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>

              <Form.Item
                name="streetadress"
                label="Street Address"
                className="w-full sm:w-full md:w-[48%]"
              >
                <Input />
              </Form.Item>

              <Form.Item
                name="unit"
                label="Apt, Suite, Unit"
                className="w-full sm:w-full md:w-[48%]"
              >
                <Input />
              </Form.Item>
              <Form.Item
                name="state"
                label="State / Province"
                rules={[{ required: true, message: "Please select a state" }]}
                className="w-full sm:w-full md:w-[48%]"
              >
                <Select
                  placeholder="Select State"
                  disabled={!selectedCountry}
                  onChange={(value) => {
                    setSelectedState(value);
                    form.setFieldsValue({ city: undefined }); // reset city
                  }}
                >
                  {selectedCountry &&
                    (countryData[selectedCountry].provinces || countryData[selectedCountry].states).map((state) => (
                      <Select.Option key={state} value={state}>
                        {state}
                      </Select.Option>
                    ))}
                </Select>
              </Form.Item>

              <Form.Item
                name="city"
                label="City"
                rules={[{ required: true, message: "Please select a city" }]}
                className="w-full sm:w-full md:w-[48%]"
              >
                <Select placeholder="Select City" disabled={!selectedState}>
                  {selectedState &&
                    (countryData[selectedCountry].cities[selectedState] || []).map((city) => (
                      <Select.Option key={city} value={city}>
                        {city}
                      </Select.Option>
                    ))}
                </Select>
              </Form.Item>

              <Form.Item
                name="postalcode"
                label="Postal Code"
                className="w-full sm:w-full md:w-[48%]"
              >
                <Input />
              </Form.Item>

              <Form.Item
                name="phone"
                label="Phone"
                className="w-full sm:w-full md:w-[48%]"
              >
                <Input />
              </Form.Item>

              <Form.Item
                name="deliveryinstruction"
                label="Delivery Instruction"
                className="w-full"
              >
                <TextArea rows={4} />
              </Form.Item>

              <Form.Item name="remember" valuePropName="checked" className="w-full">
                <Checkbox>Set as default shipping address</Checkbox>
              </Form.Item>

              <Form.Item className="w-full">
                <Button type="primary" htmlType="submit" loading={updating} className="w-full">
                  Update Information
                </Button>
              </Form.Item>
            </Form>
          )
        )}
      </div>

      {/* ---------------- ORDER SUMMARY ---------------- */}
      <div className="w-full lg:w-[400px] bg-white p-6 rounded-xl shadow">
        <h2 className="text-xl font-semibold mb-4">Order Summary</h2>

        {loading ? (
          <Skeleton active paragraph={{ rows: 5 }} />
        ) : (
          <>
            <div className="space-y-4">
              {cartItems.map((item) => (
                <div key={item._id} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <img src={item.images[0]} alt={item.title} className="w-16 h-16 rounded-lg object-cover" />
                    <div>
                      <h4 className="font-medium">{item.title}</h4>
                      <p className="text-gray-500 text-sm">Qty: {item.quantity}</p>
                    </div>
                  </div>
                  <p className="font-semibold">${(item.price * item.quantity).toFixed(2)}</p>
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
              onClick={startStripeCheckout}
              loading={processingPayment}
              disabled={!infoUpdated} // ✅ disabled until user updates info
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