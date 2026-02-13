"use client";
import React, { useEffect, useState } from "react";
import { Skeleton, Typography, Empty } from "antd";
import ProductSidebar from "./ProductSidebar";
import axios from "axios";
import MainCard from "../Home/Card";
import { useRouter } from "next/navigation";

const { Title } = Typography;

const ProductCategoryList = ({ route }) => {
  const router = useRouter();
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState("");
  const [loading, setLoading] = useState(true);
  const [selectedFilter, setSelectedFilter] = useState("");
  const [originalProducts, setOriginalProducts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        let categorySlug = "";
        switch (route.category) {
          case "women":
            categorySlug = "Categories_For_Women";
            setCategory("Women's Clothing");
            break;
          case "men":
            categorySlug = "Categories_For_Men";
            setCategory("Men's Clothing");
            break;
          case "joggers":
            categorySlug = "joggers";
            setCategory("Jogger's Shoes");
            break;
          default:
            setCategory("");
            break;
        }

        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/product/productGetByName/${categorySlug}`,
        );
        setProducts(response.data);
        setOriginalProducts(response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [route.category]);

  const handleFilter = (e) => {
    const newFilter = e === selectedFilter ? "" : e;
    setSelectedFilter(newFilter);
    const filteredProducts = newFilter
      ? originalProducts.filter((item) => item.type.includes(newFilter))
      : originalProducts;
    setProducts(filteredProducts);
  };

  if (loading) {
    return (
      <div className="flex flex-col lg:flex-row gap-0 w-full min-h-screen bg-white">
        {/* Sidebar Skeleton - Desktop/Laptop (lg and above) */}
        <div className="hidden lg:block lg:w-auto lg:flex-shrink-0">
          <div className="w-[295px] p-3 border-r border-gray-200">
            <Skeleton paragraph={{ rows: 12 }} className="w-full" />
          </div>
        </div>

        {/* Main Content Skeleton */}
        <div className="flex flex-col w-full lg:flex-1">
          {/* Mobile/Tablet Filter Button Skeleton */}
          <div className="lg:hidden px-4 py-4 border-b border-gray-200">
            <Skeleton.Button active block style={{ height: 40 }} />
          </div>

          {/* Page Header Skeleton */}
          <div className="px-4 sm:px-6 lg:px-8 py-6 border-b border-gray-100">
            <Skeleton.Avatar active size={32} style={{ marginRight: 12 }} />
            <Skeleton paragraph={{ rows: 1 }} style={{ marginTop: 12 }} />
          </div>

          {/* Products Grid Skeleton */}
          <div className="flex-1 px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-10">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
              {Array.from({ length: 12 }).map((_, index) => (
                <div key={index}>
                  <Skeleton.Image active style={{ width: "100%", height: 200 }} />
                  <Skeleton active paragraph={{ rows: 2 }} style={{ marginTop: 12 }} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col lg:flex-row gap-0 w-full min-h-screen bg-white">
      {/* Sidebar - Desktop/Laptop (lg and above) */}
      <div className="hidden lg:block lg:w-auto lg:flex-shrink-0 lg:sticky lg:top-20 lg:h-fit">
        <ProductSidebar
          route={route}
          selectedFilter={selectedFilter}
          handleFilter={handleFilter}
        />
      </div>

      {/* Main Content Area */}
      <div className="flex flex-col w-full lg:flex-1">
        {/* Mobile/Tablet Filter Button */}
        <div className="lg:hidden px-4 py-4 border-b border-gray-200">
          <ProductSidebar
            route={route}
            selectedFilter={selectedFilter}
            handleFilter={handleFilter}
          />
        </div>

        {/* Page Header */}
        <div className="px-4 sm:px-6 lg:px-8 py-6 border-b border-gray-100">
          <div className="flex items-center gap-3">
            <img
              src="/Images/New Arrival Logo.png"
              alt={category}
            // className="w-8 h-8 sm:w-10 sm:h-10"
            />
            <Title level={2} className="!m-0 text-xl sm:text-2xl lg:text-3xl">
              {category}
            </Title>
          </div>
        </div>

        {/* Products Grid */}
        <div className="flex-1 px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-10">
          {products.length === 0 ? (
            <div className="flex items-center justify-center h-[calc(100vh-300px)]">
              <Empty
                description={<Title level={4}>No Products Found</Title>}
              />
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
              {products.map((product) => (
                <MainCard key={product._id} product={product} onClick={() => router.push(`/product_details/${product._id}`)} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCategoryList;
