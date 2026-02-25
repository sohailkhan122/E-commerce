"use client";
import React, { useContext, useEffect, useState } from "react";
import { Button, message, Skeleton, Typography } from "antd";
import { useRouter } from "next/navigation";
import noteContext from "@/context/noteContext";
import { getCart, deleteFromCart, updateQuantity } from "@/app/api/cart";

const CartPage = () => {
  const { setRefresh } = useContext(noteContext);
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [items, setItems] = useState([]);
  const [total, setTotal] = useState(0);
  const [checkoutLoading, setCheckoutLoading] = useState(false);

  const shipping = 5.8;

  // ✅ FETCH CART
  useEffect(() => {
    const fetchCart = async () => {
      setLoading(true);
      try {
        const res = await getCart();
        const cartItem = res.cartItem;

        if (!cartItem || cartItem.products.length === 0) {
          setItems([]);
          setTotal(0);
          return;
        }

        const finalItems = cartItem.products.map((p) => ({
          ...p.productId,
          quantity: p.quantity,
          subtotal: p.productId.price * p.quantity,
        }));

        setItems(finalItems);
        setTotal(finalItems.reduce((acc, item) => acc + item.subtotal, 0));
      } catch (err) {
        throwerror("Failed to fetch cart");
      } finally {
        setLoading(false);
      }
    };

    fetchCart();
  }, []);

  // ✅ UPDATE QUANTITY
  const changeQty = async (id, qty) => {
    if (qty < 1) return;

    const updatedItems = items.map((item) =>
      item._id === id ? { ...item, quantity: qty, subtotal: item.price * qty } : item
    );

    setItems(updatedItems);
    setTotal(updatedItems.reduce((acc, item) => acc + item.subtotal, 0));

    try {
      await updateQuantity({ productId: id, quantity: qty });
    } catch (err) {
      message.error("Quantity update failed");

      // Rollback
      const originalItems = items.map((item) =>
        item._id === id
          ? { ...item, quantity: item.quantity, subtotal: item.price * item.quantity }
          : item
      );
      setItems(originalItems);
      setTotal(originalItems.reduce((acc, item) => acc + item.subtotal, 0));
    }
  };

  // ✅ REMOVE ITEM
  const removeItem = async (productId) => {
    const filteredItems = items.filter((item) => item._id !== productId);
    setItems(filteredItems);
    setTotal(filteredItems.reduce((acc, item) => acc + item.subtotal, 0));

    try {
      await deleteFromCart(productId);
      message.success("Item removed");
    } catch (err) {
      message.error("Remove failed");
      // Rollback
      setItems(items);
      setTotal(items.reduce((acc, item) => acc + item.subtotal, 0));
    } finally {
      setRefresh((prev) => !prev);
    }
  };

  // ✅ CHECKOUT
  const checkout = async () => {
    try {
      setCheckoutLoading(true); // start loader
      router.push("/check_out"); // navigation
      // No need to setCheckoutLoading(false, loader stops automatically after navigation)
    } catch (err) {
      message.error("Checkout failed");
      setCheckoutLoading(false); // only stop loader if error occurs
    }
  };

  // ✅ EMPTY CART UI
  if (!loading && items.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-6">
        <h2 className="text-xl font-semibold">Your cart is empty</h2>
        <Button type="primary" onClick={() => router.push("/")}>
          Continue Shopping
        </Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen max-w-7xl mx-auto px-4 py-6 pb-28">
      <Typography.Title level={3}>Shopping Cart</Typography.Title>

      {loading ? (
        <Skeleton active />
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* CART ITEMS */}
          <div className="lg:col-span-2 space-y-4">
            {items.map((p) => (
              <div key={p._id} className="border rounded-xl p-4 flex gap-4">
                <img
                  src={p.images[0]}
                  className="w-24 h-24 object-cover rounded"
                />
                <div className="flex-1">
                  <h3 className="font-semibold">{p.title}</h3>
                  <p>${p.price.toFixed(2)}</p>
                  <div className="flex gap-2 mt-2">
                    <Button
                      size="small"
                      onClick={() => changeQty(p._id, p.quantity - 1)}
                    >
                      -
                    </Button>
                    <span>{p.quantity}</span>
                    <Button
                      size="small"
                      onClick={() => changeQty(p._id, p.quantity + 1)}
                    >
                      +
                    </Button>
                  </div>
                </div>
                <div className="flex flex-col justify-between items-end">
                  <p>${p.subtotal.toFixed(2)}</p>
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

          {/* ORDER SUMMARY */}
          <div className="bg-gray-100 p-6 rounded-xl h-fit">
            <h2 className="text-xl font-semibold mb-4">Order Summary</h2>

            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>${total.toFixed(2)}</span>
            </div>

            <div className="flex justify-between">
              <span>Shipping</span>
              <span>${shipping.toFixed(2)}</span>
            </div>

            <div className="flex justify-between font-bold">
              <span>Total</span>
              <span>${(total + shipping).toFixed(2)}</span>
            </div>

            <Button
              type="primary"
              className="w-full mt-6"
              loading={checkoutLoading} // ✅ AntD loader
              onClick={checkout}
            >
              Checkout
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;