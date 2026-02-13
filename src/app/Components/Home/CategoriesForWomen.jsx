"use client"
import React, { useEffect, useState } from "react";
import MainCard from "./Card";
import { message, Typography, Skeleton, Card } from "antd";
import axios from "axios";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useRouter } from "next/navigation";

const CategoriesForWomen = () => {
  const router = useRouter();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProductsByName = async () => {
      try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/product/productGetByName/${'Categories_For_Women'}`);
        setProducts(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching products:', error);
        message.error('Failed to fetch products');
      } finally {
        setLoading(false);
      }
    };
    fetchProductsByName()
  }, [])

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <section className="w-full max-w-6xl mx-auto px-4 py-8">
      <div className="flex items-center gap-4 mb-6">
        <img src="/Images/New Arrival Logo.png" alt="New Arrival Logo" className="h-8 w-auto" />
        <Typography.Title level={3} className="text-2xl md:text-4xl m-0">
          Categories For Women
        </Typography.Title>
      </div>
      <div>
        {loading ? (
          <Slider {...settings}>
            {Array.from({ length: 4 }).map((_, idx) => (
              <div key={idx} className="px-2">
                <Card className="shadow-sm">
                  <Skeleton active avatar paragraph={{ rows: 5 }} />
                </Card>
              </div>
            ))}
          </Slider>
        ) : (
          <Slider {...settings}>
            {products.map((product) => (
              <MainCard key={product._id} product={product} onClick={() => router.push(`/product_details/${product._id}`)} />
            ))}
          </Slider>
        )}
      </div>
    </section>
  );
};

export default CategoriesForWomen;
