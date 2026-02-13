"use client";
import React, { useEffect, useState, useContext } from "react";
import {
  Card,
  Button,
  Skeleton,
  Radio,
  Rate,
  Divider,
  message,
} from "antd";
import { ShoppingCartOutlined } from "@ant-design/icons";
import axios from "axios";
import noteContext from "@/context/noteContext";
import { useRouter } from "next/navigation";

const ProductDetails = ({ route }) => {
  const { setRefresh, userId } = useContext(noteContext);
  const router = useRouter();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [size, setSize] = useState(null);
  const [color, setColor] = useState(null);
  const [adding, setAdding] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/product/getSingleProduct/${route?.id}`
        );
        setProduct(res.data);
      } catch {
        message.error("Failed to Load Product");
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [route]);

  const addToCart = async () => {
    if (!size) return message.warning("Please Select A Size");
    if (!color) return message.warning("Please Selecta A Color");

    try {
      setAdding(true);
      await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/cart/addToCart`,
        {
          productId: product._id,
          size,
          color,
          userId,
        }
      );
      message.success("Product Added To Cart Successfully");
      setRefresh((p) => !p);
    } catch {
      message.error("Product Not Added To Cart");
    } finally {
      setAdding(false);
    }
  };

  if (loading) {
    return (
      <div className="max-w-6xl mx-auto p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
        <Skeleton.Image active className="w-full h-[420px]" />
        <Skeleton active paragraph={{ rows: 8 }} />
      </div>
    );
  }

  return (
    <>
      <div className="max-w-6xl mx-auto p-4 md:p-6 pb-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">

          {/* PRODUCT IMAGE */}
          <Card bordered={false}>
            <img
              src={product.images}
              alt={product.title}
              className="w-full h-[420px] object-cover rounded-md"
            />
          </Card>

          {/* PRODUCT INFO */}
          <div className="flex flex-col justify-end">
            <h1 className="text-2xl font-semibold">{product.title}</h1>
            <p className="text-gray-500 mb-2">{product.productName}</p>

            <div className="flex items-center gap-2 mb-4">
              <Rate disabled defaultValue={4} />
              <span className="text-sm text-gray-500">(120 Reviews)</span>
            </div>

            <div className="text-3xl font-bold mb-6">
              ${product.price}.00
            </div>

            {/* SIZE */}
            <div className="mb-5">
              <h4 className="font-medium mb-2">Select Size</h4>
              <Radio.Group onChange={(e) => setSize(e.target.value)}>
                <Radio.Button value="S">S</Radio.Button>
                <Radio.Button value="M">M</Radio.Button>
                <Radio.Button value="L">L</Radio.Button>
                <Radio.Button value="XL">XL</Radio.Button>
              </Radio.Group>
            </div>

            {/* COLOR */}
            <div className="mb-6">
              <h4 className="font-medium mb-2">Select Color</h4>
              <div className="flex gap-3">
                {["black", "#EDD146", "#EB84B0", "#9C1F35"].map((c) => (
                  <div
                    key={c}
                    onClick={() => setColor(c)}
                    className={`w-9 h-9 rounded-full cursor-pointer border-2 ${color === c
                      ? "border-purple-600"
                      : "border-gray-300"
                      }`}
                    style={{ backgroundColor: c }}
                  />
                ))}
              </div>
            </div>

            {/* DESKTOP ACTIONS */}
            <div className="hidden sm:flex gap-3">
              <Button
                type="primary"
                size="large"
                icon={<ShoppingCartOutlined />}
                loading={adding}
                onClick={addToCart}
              >
                Add to Cart
              </Button>
              <Button size="large" onClick={() => router.push("/cart_page")}>Go to Cart</Button>
            </div>
          </div>
        </div>

        {/* REVIEWS */}
        <Divider />
        <div>
          <h2 className="text-xl font-semibold mb-4">Customer Reviews</h2>

          {["Hassan", "Sammeer", "Talha"].map((r) => (
            <Card key={r} className="mb-4">
              <div className="flex items-center justify-between">
                <strong>User {r}</strong>
                <Rate disabled defaultValue={4} />
              </div>
              <p className="text-gray-600 mt-2">
                Product quality achi hai aur delivery fast thi 👍
              </p>
            </Card>
          ))}
        </div>
      </div>

      {/* MOBILE STICKY BAR */}
      <div className="sm:hidden fixed bottom-0 left-0 right-0 bg-white border-t p-3 flex justify-between items-center z-50">
        <div className="font-bold text-lg">${product.price}.00</div>
        <Button
          type="primary"
          icon={<ShoppingCartOutlined />}
          loading={adding}
          onClick={addToCart}
        >
          Add to Cart
        </Button>
      </div>
    </>
  );
};

export default ProductDetails;
