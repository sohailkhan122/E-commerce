"use client";
import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Button, message, Skeleton, Typography } from "antd";
import { useRouter } from "next/navigation";
import noteContext from "@/context/noteContext";

const CartPage = () => {
  const { refresh, setRefresh } = useContext(noteContext);
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [items, setItems] = useState([]);
  const [total, setTotal] = useState(0);
  const [userData, setUserData] = useState({});
  const [checkoutLoading, setCheckoutLoading] = useState(false);

  const shipping = 5.8;

  useEffect(() => {
    const data = localStorage.getItem("userData");
    if (data) setUserData(JSON.parse(data));
  }, []);

  useEffect(() => {
    if (!userData._id) return;

    const fetchCart = async () => {
      try {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/cart/getCartItem/${userData._id}`
        );

        if (!res.data.cartItem) {
          setItems([]);
          setTotal(0);
          return;
        }

        const qtyMap = {};
        res.data.cartItem.products.forEach(
          (p) => (qtyMap[p.productId] = p.quantity)
        );

        const products = await Promise.all(
          res.data.cartItem.products.map((p) =>
            axios.get(
              `${process.env.NEXT_PUBLIC_API_URL}/product/getSingleProduct/${p.productId}`
            )
          )
        );

        const finalItems = products.map((r) => ({
          ...r.data,
          quantity: qtyMap[r.data._id],
          subtotal: r.data.price * qtyMap[r.data._id],
        }));

        setItems(finalItems);
        setTotal(finalItems.reduce((a, b) => a + b.subtotal, 0));
      } catch {
        message.error("Cart load nahi ho saka");
      } finally {
        setLoading(false);
      }
    };

    fetchCart();
  }, [userData._id, refresh]);

  const changeQty = (id, qty) => {
    if (qty < 1) qty = 1;
    const updated = items.map((i) =>
      i._id === id ? { ...i, quantity: qty, subtotal: i.price * qty } : i
    );
    setItems(updated);
    setTotal(updated.reduce((a, b) => a + b.subtotal, 0));
  };

  const removeItem = async (id) => {
    try {
      await axios.delete(
        `${process.env.NEXT_PUBLIC_API_URL}/cart/deleteCartProducts/${id}/${userData._id}`
      );
      message.success("Item removed");
      setRefresh((p) => !p);
    } catch {
      message.error("Remove failed");
    }
  };

  const checkout = async () => {
    try {
      setCheckoutLoading(true);
      await Promise.all(
        items.map((i) =>
          axios.put(
            `${process.env.NEXT_PUBLIC_API_URL}/cart/updatequantiity/${userData._id}`,
            { productId: i._id, quantity: i.quantity }
          )
        )
      );
      router.push("/check_out");
    } catch {
      message.error("Checkout failed");
    } finally {
      setCheckoutLoading(false);
    }
  };

  /* EMPTY */
  if (!loading && items.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-6 px-4">
        <img src="/Images/Frame 376.png" className="w-64" />
        <h2 className="text-xl font-semibold">Your cart is empty</h2>
        <Button type="primary" onClick={() => router.push("/")}>
          Continue Shopping
        </Button>
      </div>
    );
  }

  return (
    <>
      <div className="max-w-7xl h-[80vh] mx-auto px-4 md:px-8 py-6 pb-28">
        <div className="flex items-center gap-4 mb-6">
          <img src="/Images/New Arrival Logo.png" alt="New Arrival Logo" className="h-8 w-auto" />
          <Typography.Title level={3} className="text-2xl md:text-4xl m-0">
            Shipping Cart
          </Typography.Title>
        </div>

        {/* SKELETON LOADER */}
        {loading ? (
          <div className="space-y-4">
            {[1, 2, 3].map((_, i) => (
              <div key={i} className="bg-white border rounded-xl p-4 flex flex-col md:flex-row gap-4">
                <Skeleton
                  active
                  avatar={{ size: 64, shape: "square" }}
                  paragraph={{ rows: 2 }}
                  className="flex-1"
                />
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

            {/* ITEMS */}
            <div className="lg:col-span-2 space-y-4">
              {items.map((p) => (
                <div
                  key={p._id}
                  className="bg-white border rounded-xl p-4 flex gap-4"
                >
                  <img
                    src={p.images}
                    className="w-24 h-24 rounded-lg object-cover"
                  />

                  <div className="flex-1">
                    <h3 className="font-semibold">{p.title}</h3>
                    <p className="text-gray-500">${p.price}</p>

                    <div className="flex items-center gap-3 mt-3">
                      <Button size="small" onClick={() => changeQty(p._id, p.quantity - 1)}>-</Button>
                      <span className="font-medium">{p.quantity}</span>
                      <Button size="small" onClick={() => changeQty(p._id, p.quantity + 1)}>+</Button>
                    </div>
                  </div>

                  <div className="flex flex-col justify-between items-end">
                    <p className="font-semibold">${p.subtotal}</p>
                    <button
                      onClick={() => removeItem(p._id)}
                      className="text-red-500 text-sm"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* DESKTOP SUMMARY */}
            <div className="hidden lg:block bg-gray-100 rounded-xl p-6 h-fit">
              <h2 className="text-xl font-semibold mb-4">Order Summary</h2>

              <div className="space-y-3">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>${total}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span>${shipping}</span>
                </div>
                <div className="flex justify-between font-bold text-lg">
                  <span>Total</span>
                  <span>${total + shipping}</span>
                </div>
              </div>

              <Button
                type="primary"
                size="large"
                className="w-full mt-6"
                loading={checkoutLoading}
                onClick={checkout}
              >
                Checkout
              </Button>
            </div>
          </div>
        )}
      </div>

      {/* MOBILE STICKY BAR */}
      {!loading && items.length > 0 && (
        <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t px-4 py-3 flex justify-between items-center z-50">
          <div>
            <p className="text-sm text-gray-500">Total</p>
            <p className="text-lg font-bold">${total + shipping}</p>
          </div>
          <Button
            type="primary"
            loading={checkoutLoading}
            onClick={checkout}
          >
            Checkout
          </Button>
        </div>
      )}
    </>
  );
};

export default CartPage;
